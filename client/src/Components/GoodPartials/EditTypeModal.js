import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit} from 'react-icons/bi';
import { TiDelete } from "react-icons/ti";
import Stack from '@mui/material/Stack';
import { GiCancel } from 'react-icons/gi'
import axios from 'axios';
import UpdateTypeModal from './UpdateTypeModal';

var productTypes =[];
var listTypeInfor = [];

class EditTypeModal extends Component {
    constructor(props) {
        super(props);
        this.loadAllType();
        this.state = {
            change: false
        }
    }
    confirm = () => {
        // Thực hiện các lệnh xử lý tại đây
        this.props.changeConfirmStatus();
    }
    cancel = () => {
        // this.props.changeConfirmStatus();
        this.props.changeEditTypeStatus();
    }
    edit = (type) => {
        // this.props.setEditTypeStatus();
        this.props.typeToUpdate(type);
        // this.props.changeEditTypeStatus();
        this.props.changeStatusUpdateType();
    }
    async delete(type){
        const data = {
            token: localStorage.getItem('token'),
            productTypes:
            [
                {
                    typeID: type._id.typeID,
                    storeID: type._id.storeID
                }
            ]
                
        }
        await axios.delete(`http://localhost:5000/api/product/type`,{data: data})
            .then(res => {
                console.log("delete success");
            })
            .catch(err => {
                alert(err);
                // alert("Lỗi gì cmnr")
            })
        // Ở đây mình phải cập nhật join nữa
        // Phải get tất cả cái join mà có cái type là type hiện tại
        var allJoinMatch = [];
        const data1 = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
                "_id.typeID": type._id.typeID,
            }   
        }
        await axios.get(`http://localhost:5000/api/product/join`, 
        {
            params: {...data1}
        })
            .then(res => {
                allJoinMatch = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })

        var allProductJoin = [];
        for(var i = 0 ; i < allJoinMatch.length; i++)
        {
            allProductJoin.push({
                productID: allJoinMatch[i]._id.productID,
                typeID: type._id.typeID,
                importDate: allJoinMatch[i]._id.importDate,
                storeID: this.props.infoUser.email,
                
            });
        }
        
        const dataJoin = {
            token: localStorage.getItem('token'),
            productJoinTypes: allProductJoin,      
        }

        console.log(dataJoin);

        await axios.delete(`http://localhost:5000/api/product/join`,{data: dataJoin})
            .then(res => {
                console.log("delete join success");
            })
            .catch(err => {
                alert(err);
            })

        this.loadAllType();
        this.setState({change: !this.state.change})
    }
    


    async loadAllType() {
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        await axios.get(`http://localhost:5000/api/product/type`, 
        {
            params: {...data}
        })
            .then(res => {
                result = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err); // 401 ở đây
            })
        //Get data và lưu các tên Type vào bảng
        listTypeInfor=[];
        for(var i=0; i < result.length ; i++)
        {
            listTypeInfor.push(result[i]);
        }
        productTypes=[];
        for(var i=0 ; i< listTypeInfor.length ; i ++)
        {
            productTypes.push(listTypeInfor[i].name);
        }
        this.setState({change: true});
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
                                { listTypeInfor.map((type) => (
                                    <Grid item md={3} style={{border:'1px solid #333', padding: 4}}>
                                        <span>{type.name}</span>
                                        <BiEdit onClick={() => this.edit(type)}/>
                                        <TiDelete onClick={() => this.delete(type)}/>
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
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        editTypeStatus: state.editTypeStatus,
        addTypeStatus: state.addTypeStatus,
        isAddTypeStatus: state.isAddTypeStatus,
        infoUser: state.infoUser,
        typeProductValue: state.typeProductValue,
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
        typeToUpdate: (data) => {
            dispatch({
                type: "UPDATE_PRODUCT_TYPE",
                _id: {
                    typeID: data._id.typeID,
                    storeID: data._id.storeID,
                },
                name: data.name
            })
        },
        changeStatusUpdateType: () => {
            dispatch({
                type: "CHANGE_UPDATE_TYPE_STATUS",
            }); 
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTypeModal);