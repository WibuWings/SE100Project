import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit} from 'react-icons/bi';
import { TiDelete } from "react-icons/ti";
import Stack from '@mui/material/Stack';
import { GiCancel } from 'react-icons/gi'
import axios from 'axios';
import AddTypeModal from './AddTypeModal';

var productTypes =[
    
];


class EditTypeModal extends Component {
    constructor(props) {
        super(props);
        this.loadType();
    }
    confirm = () => {
        // Thực hiện các lệnh xử lý tại đây
        this.props.changeConfirmStatus();
    }
    cancel = () => {
        // this.props.changeConfirmStatus();
        this.props.changeEditTypeStatus();
    }
    edit = () => {
        this.props.changeAddTypeStatus();
        this.props.setEditTypeStatus();
    }
    delete = () => {
        const data = {
            token: localStorage.getItem('token'),
            productTypes:
            [
                {
                    typeID:"12",
                    storeID:"19522006@gm.uit.edu.vn"
                }
            ]
                
        }
        alert(data.product.name)
        axios.delete(`http://localhost:5000/api/product/type`, data)
            .then(res => {
                console.log("Update success");
                alert('delete được rồi anh trai')
            })
            .catch(err => {
                console.log(err);
                alert("Lỗi gì cmnr")
            })
        this.props.changeAddTypeStatus();
    }
    
    sampleTypeData = {
        email:"19522006@gm.uit.edu.vn",
        token: "this is token",
        data:[
            {
                _id: {
                    typeID:"11",
                    storeID:"19522006@gm.uit.edu.vn"
                },
                name:"Kinggg",
            },
            {
                _id:{
                    typeID:"12",
                    storeID:"19522007@gm.uit.edu.vn"
                },
                name: "Đồ ăn",
                createdAt:"2001-09-30T17:00:00.000Z"
            },
            {
                _id:{
                    typeID:"5",
                    storeID:"19522006@gm.uit.edu.vn"
                },
                name:"AA"
            }
        ]
    }

    loadType = () => {
        var typeList = this.sampleTypeData.data;
        productTypes = [];
        for(var i=0 ; i< typeList.length ; i ++)
        {
            productTypes.push(typeList[i].name);
        }
    }

    render() {
        return (
            <form style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="All Good Type" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid container item md={12} xs={12} spacing={0}>
                                {productTypes.map((type) => (
                                    <Grid item md={3} style={{border:'1px solid #333', padding: 4}}>
                                        <span>{type}</span>
                                        <BiEdit onClick={() => this.edit()}/>
                                        <TiDelete onClick={() => this.delete()}/>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Stack spacing={3}>
                                   
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                        <Button style={{ backgroundColor: 'red' }} onClick={(e) => this.cancel(e)} variant="contained" startIcon={<GiCancel />}>
                            Thoát
                        </Button>
                    </Box>
                </Card>
                {this.props.addTypeStatus ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeAddTypeStatus();}} className="modal-overlay"></div>
                            <AddTypeModal></AddTypeModal>
                        </div>
                    ): null}
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        editTypeStatus: state.editTypeStatus,
        addTypeStatus: state.addTypeStatus,
        isAddTypeStatus: state.isAddTypeStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeEditTypeStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_TYPE_STATUS",
            });
        },
        changeAddTypeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_TYPE_STATUS",
            });
        },
        setEditTypeStatus: () => {
            dispatch({
                type: "SET_EDIT_TYPE_STATUS",
            })
        },
        changeConfirmStatus: () => {
            dispatch({
                type: "CHANGE_CONFIRM_STATUS",
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTypeModal);