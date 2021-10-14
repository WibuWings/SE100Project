import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, InputLabel } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import { GiCancel } from 'react-icons/gi'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../CSS/GoodManager.css';
import GoodImage from './goodExample.jpg';
import AddTypeModal from './AddTypeModal';

var productTypes =[
    'food', 'detergent', 'cuisine'
];

var typeSet = [];

class UpdateGoodModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSelect: "null",
            type:'none',
            url: 'http://res.cloudinary.com/databaseimg/image/upload/v1634117795/ubvxisehhpvnu2lbqmeg.png',
        }; 
    }
    // Handle user
    hanhleCancel = () => {
        
    }

    changeTimeFrom = (e) => {
    
    }

    changeTimeTo = (e) => {
        
    }

    blurDiscription = (e) => {
        this.descriptionShift = e.target.value;
    }
    blurSalary = (e) => {
        this.salary = e.target.value;
    }

    updateGood = () => {
        this.props.changeUpdateGoodStatus();
    }

    cancel = () => {
        this.props.changeUpdateGoodStatus();
    }

    render() {
        console.log(this.props.objectEditShift);
        return (
            <form style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Add type" />
                    <Divider />
                    <CardContent>
                        <label style={{ borderRadius: '100%', overflow: 'hidden', marginTop: '15px ' }}>
                            <Image style={{ width: '100px', height: '100px' }} cloudName="databaseimg" 
                                publicId={( GoodImage )}></Image>
                        </label>
                        {/* Ẩn đi */}
                        <input id="profile-header-update-avatar" type="file" accept="image/png, image/jpeg" onChange={(e) => this.profileImageChange(e)}></input>
                        <Button
                            variant="contained"
                            component="label"
                            >
                            Upload File
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                        <div class="info-container"> 
                            <div class="input-label">Name</div>
                            <TextField 
                                type="text" 
                                class="input-val" 
                                size="small"  
                                name="goodName" 
                                variant="outlined" 
                            />
                            <div class="input-container">
                                <div class="input-label">Quantity:</div>
                                <TextField 
                                    type="number" 
                                    class="input-val" 
                                    size="small" 
                                    name="goodQuantity" 
                                    variant="outlined" 
                                />
                            </div>
                            <div class="input-container">
                                <div class="input-label">Original Price:</div>
                                <TextField 
                                    type="number" 
                                    lass="input-val" 
                                    size="small" 
                                    name="originalPrice" 
                                    variant="outlined" 
                                    defaultValue={0}
                                />
                            </div>
                            <div class="input-container">
                                <div class="input-label">Sell Price:</div>
                                <TextField 
                                    type="number" 
                                    lass="input-val" 
                                    size="small" 
                                    name="sellPrice" 
                                    variant="outlined" 
                                    defaultValue={0}
                                />
                            </div>
                            <div class="input-container">
                                <div class="input-label">Unit:</div>
                                <TextField 
                                    type="text" 
                                    class="input-val" 
                                    size="small" 
                                    name="unit" 
                                    variant="outlined" 
                                />
                            </div>
                            <div class="input-container">
                                <div class="input-label">Import Time:</div>
                                <TextField 
                                    type="date" 
                                    class="input-val" 
                                    size="small" 
                                    name="importDate" 
                                    variant="outlined" 
                                    defaultValue={new Date().getDate()+"-"+(new Date().getMonth()+1)+"-"+new Date().getFullYear()}
                                />
                            </div>
                            <div class="input-container">
                                <div class="input-label">Expired Date:</div>
                                <TextField 
                                    type="date" 
                                    class="input-val" 
                                    size="small" 
                                    name="expiredDate" 
                                    variant="outlined" 
                                />
                            </div>
                            <div class="input-container">
                                <div class="input-label">Product Type:</div>
                                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="select-filled-label">Type</InputLabel>
                                    <Select
                                        labelid="select-filled-label"
                                        id="select-filled"
                                        value={this.state.type}
                                        onChange={(event) => {
                                            this.setState({type: event.target.value});
                                            if(!typeSet.includes(event.target.value))
                                            {
                                                typeSet.push(event.target.value);
                                            }
                                        }}
                                    >
                                        {
                                            productTypes.length== 0 ? <MenuItem value={'none'}>None</MenuItem>
                                            : productTypes.map((type) =>
                                                <MenuItem value={type}>{type}</MenuItem>
                                            )
                                        }   
                                    </Select>
                                </FormControl>
                                <div>
                                    {
                                        Array.from(typeSet).map((type) =>
                                            <button 
                                                onClick={() => {
                                                    typeSet = typeSet.filter(function(item) {
                                                        return item != type;
                                                    })
                                                    console.log(typeSet);
                                                    this.setState({type: this.state.type});
                                                }}  
                                            >
                                                {type}
                                            </button>
                                        )
                                    }
                                </div>
                                <Button onClick={() => this.handleAdd()}>Add type</Button>
                                
                            </div>
                            <Button variant="contained" onClick={() => this.importGood()}>
                                Import
                            </Button>
                            {/* Chỗ này lỗi chetmẹ rồi =))) */}
                        </div>
                        {this.props.addStatus ? (
                            <div className="modal-add">
                                <div onClick={() => {this.props.changeAddStatus();}} className="modal-overlay"></div>
                                <AddTypeModal></AddTypeModal>
                            </div>
                        ): null}
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                        {this.props.editShiftStatus ? (
                            <Button 
                                style={{ backgroundColor: 'yellowgreen' }} 
                                // onClick={() => this.editShift()}
                                onClick={() => this.cancel()}
                                variant="contained" 
                                startIcon={<BiEdit />}
                            >
                                Cancel
                            </Button>
                            ) : (
                            <Button 
                                style={{ backgroundColor: 'yellowgreen' }} 
                                // onClick={() => this.addShift()} 
                                onClick={() => this.updateGood()}
                                variant="contained" 
                                startIcon={<BiPlusMedical />}
                            >
                                Xác nhận
                            </Button>
                        )}
                        <Button 
                            style={{ backgroundColor: 'red' }} 
                            // onClick={() => this.editShift()}
                            onClick={() => this.cancel()}
                            variant="contained" 
                            startIcon={<GiCancel />}
                        >
                            Cancel
                        </Button>
                        {/* <Button style={{ backgroundColor: 'red' }} onClick={(e) => this.hanhleCancel(e)} variant="contained" startIcon={<GiCancel />}>
                            Hủy
                        </Button> */}
                    </Box>
                </Card>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        updateGoodStatus: state.updateGoodStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeUpdateGoodStatus: () => {
            dispatch({
                type: "CHANGE_UPDATE_GOOD_STATUS",
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGoodModal);