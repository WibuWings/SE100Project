import React, { Component } from 'react';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Button, Modal, Grid} from '@mui/material';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../CSS/GoodManager.css';
import { connect } from 'react-redux';
import GoodImage from '../../img/good-example.jpg';
import AddTypeModal from './AddTypeModal';
var productTypes =[
     'food', 'detergent', 'cuisine'
];

var typeSet = [];

class GoodImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSelect: "null",
            type:'none',
            url: 'http://res.cloudinary.com/databaseimg/image/upload/v1634117795/ubvxisehhpvnu2lbqmeg.png',
        }; 
        
    }
    handleAdd(){
        this.props.changeAddTypeStatus();
        this.props.setAddTypeStatus();
    }
    imgUrl= 'none';
    profileImageChange = (fileChangeEvent) => {
        this.setState({
            imageSelect: fileChangeEvent.target.files[0],
        })
        const file = fileChangeEvent.target.files[0];
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
        } else {
            const formData = new FormData();
            formData.append("file", fileChangeEvent.target.files[0])
            formData.append("upload_preset", "qqqhcaa3");
            axios.post(`https://api.cloudinary.com/v1_1/databaseimg/image/upload`, formData)
                .then(res => {
                    alert(res.data.url);
                    // this.props.updateAvatar(res.data.url);
                    this.imgUrl=res.data.url;
                    // axios.post(`http://localhost:5000/api/update-avatar`,{
                    //     _id: this.props.infoUser.email,
                    //     avatar: res.data.url,
                    //     token: localStorage.getItem('token'),
                    // }).then(res => {
                    //     console.log("Thành công");
                    // }).catch(err => {
                    //     console.log("Lỗi");
                    // })
                })
                .catch(err => {
                    console.log("Thất bại");
                })

        }

    }
    importGood = () => {
        const data = {
            token: localStorage.getItem('token'),
            _id: {
                // productID: document.querySelector('input[name="goodID"]').value,
                importDate:document.querySelector('input[name="importDate"]').value
            },
            name: document.querySelector('input[name="goodName"]').value,
            quantity: document.querySelector('input[name="goodQuantity"]').value,
            remain: document.querySelector('input[name="goodQuantity"]').value,
            importPrice: document.querySelector('input[name="originalPrice"]').value,
            sellPrice: document.querySelector('input[name="sellPrice"]').value,
            expires: document.querySelector('input[name="expiredDate"]').value,
            imgUrl: this.imgUrl,
            unit: document.querySelector('input[name="unit"]').value,
        }
        console.log(data.imgUrl);
    }
    
    render() {
        return(
            <div 
                style={{ 
                    height: 600, width: '100%', overflowY: 'scroll', backgroundColor: 'rgb(221,235,255)'   
                }}
            >   
                <div className="good-import-header"></div>
                <div>Good Import</div>
                <Grid className="import-container" container spacing={2}>
                    <Grid item md={8} sm={12}  >
                        
                    </Grid>
                    <Grid item md={4} sm={12} >
                        
                    </Grid>
                    <Grid item sm={12} md={12} >
                        
                    </Grid>
                </Grid>
                <label style={{overflow: 'hidden', marginTop: '15px ' }}>
                    <Image style={{ width: '100px', height: '100px' }} cloudName="databaseimg" ></Image>
                </label>
                <input 
                    id="profile-header-update-avatar" 
                    type="file" 
                    accept="image/png, image/jpeg" 
                    style={{ display: 'none' }} 
                    onChange={(e) => this.profileImageChange(e)}
                >
                </input>
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
                {this.props.addTypeStatus ? (
                    <div className="modal-add">
                        <div onClick={() => {this.props.changeAddTypeStatus();}} className="modal-overlay"></div>
                        <AddTypeModal></AddTypeModal>
                    </div>
                ): null}
            </div>
        );        
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        addTypeStatus: state.addTypeStatus,
        infoUser: state.infoUser,
        isAddTypeStatus: state.isAddTypeStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddTypeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_TYPE_STATUS",
            });
        },
        updateAvatar: (avatar) => {
            dispatch({
                type: "UPDATE_AVATAR",
                avatar: avatar
            })
        },
        setAddTypeStatus: () => {
            dispatch({
                type: "SET_ADD_TYPE_STATUS",
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodImport);
