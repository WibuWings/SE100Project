import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, Alert } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import { GiCancel, GiVampireCape } from 'react-icons/gi'
import axios from 'axios';

var listTypeInfor = [];

class UpdateTypeModal extends Component {
    constructor(props) {
        super(props);
        this.state= {
            change: 'false'
        }
        this.loadInitialData();
        this.getAllTypeList();
    }
    storeID = "";
    typeList = [];

    async getAllTypeList(){
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        console.log(data.token);
        // alert(data.token);
        console.log(data.filter);
        await axios.get(`http://localhost:5000/api/product/type`, 
        {
            params: {...data}
        })
            .then(res => {
                result = res.data.data;
            })
            .catch(err => {
                alert(err);
            })
        //Get data và lưu các tên Type vào bảng
        for(var i=0; i < result.length ; i++)
        {
            listTypeInfor.push(result[i]);
        }
    }
    addType = () => {
        var newTypeName = document.querySelector('input[name="typeName"]').value.trim();
        if(this.checkConstraint(newTypeName)==false)  return;
        var genTypeID = 0;
        if(listTypeInfor.length>0)
        {
            genTypeID = parseInt(listTypeInfor[listTypeInfor.length-1]._id.typeID) + 1;
        } 
        const data = {
            token: localStorage.getItem('token'),
            productType: {
                _id:{
                    typeID: genTypeID,
                    storeID: this.props.infoUser.email,
                },
                name: newTypeName,
            }    
        }
        axios.post(`http://localhost:5000/api/product/type`, data)
            .then(res => {
                alert("Save success");
                //TODO: Cập nhật token ở đây nữa
            })
            .catch(err => {
                alert(err);
            })
        this.props.changeAddTypeStatus();
    }
    
    checkConstraint(typeName) {
        //Constraint 1: Check name
        for(var i=0;i<listTypeInfor.length;i++)
        {
            if(listTypeInfor[i].name==typeName)
            {
                if(typeName.trim()==this.props.typeProductValue.name)
                {
                    alert("Không đổi tên à anh zai");
                    return false;
                }
                alert("Trùng tên rồi anh chai");
                return false;
            }
            
        }        
        // Constraint 2: Not blank
        if(typeName.length==0)
        {
            alert("Không nhập gì à anh chai")
            return false;
        }
        return true;

    }
    cancel = () => {
        this.props.changeStatusUpdateType();
    }

    handle = () => {
        this.editType();
    }

    editType = () => {
        var newTypeName = this.typeName;
        if(this.checkConstraint(newTypeName)==false) return;
        const data = {
            token: localStorage.getItem('token'),
            productType: {
                _id: {
                    typeID: this.props.typeProductValue._id.typeID,
                    storeID: this.props.infoUser.email,
                }, 
                name: newTypeName,
            }
        }
        // alert(data.product.name)
        axios.put(`http://localhost:5000/api/product/type`, data)
            .then(res => {
                // Có khi mình sẽ cập nhật type ở dây
                console.log("Update success");
                alert('update được rồi anh trai')
            })
            .catch(err => {
                console.log(err);
                alert("Lỗi gì cmnr")
            })
        this.props.changeStatusUpdateType();
        this.props.updateNameToRedux(data.productType);
        // this.loadAllGood();
        // console.log("Cập nhập redux nào mấy anh")
        // this.props.updateNameToProductRedux(data.productType);
        // this.props.changeEditTypeStatus();
    }

    getTypeNamebyTypeID (typeID) {
        var typeName="Null";
        console.log("typeList", this.props.typeProduct);
        for(var i = 0; i < this.props.typeProduct.length;i++)
        {   
            if(this.props.typeProduct[i]._id.typeID == typeID)
            {
                typeName = this.props.typeProduct[i].name;
                break;
            }
        }
        return typeName;
    }

    async loadAllGood() {
        var resultProduct = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }
        }
        await axios.get(`http://localhost:5000/api/product/`, {
            params: { ...data }
        })
            .then(res => {
                resultProduct = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
        // Get hết từ cái productjoinType
        var result = [];
        const data1 = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        await axios.get(`http://localhost:5000/api/product/join`, {
            params: { ...data1 }
        })
            .then(res => {
                result = res.data.data;
                localStorage.getItem('token', res.data.token);
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
        // Lấy các cái jointype
        var joinTypeInfor = [];
        for (let i = 0; i < result.length; i++) {
            joinTypeInfor.push(result[i]);
        }
        console.log("joinTypeInfor", joinTypeInfor);

        var listProductInfor = [];
        for (let i = 0; i < resultProduct.length; i++) {
            var typeIDList = [];
            var joinType = '';
            for (var j = 0; j < joinTypeInfor.length; j++) {
                if (resultProduct[i]._id.productID && joinTypeInfor[j]._id.productID &&
                    resultProduct[i]._id.productID === joinTypeInfor[j]._id.productID) 
                {
                    typeIDList.push(joinTypeInfor[j]._id.typeID);
                    joinType = joinType + ' ' + this.getTypeNamebyTypeID(joinTypeInfor[j]._id.typeID);
                }
            }

            listProductInfor.push(
                {
                    ...resultProduct[i],
                    typeIDList: typeIDList,
                    joinType: joinType
                });
        }
        this.props.getProductToReducer(listProductInfor);
    }

    typeName = "";
    loadInitialData = () => {
        this.typeName = this.props.typeProductValue.name;
        this.setState({change: true});
    }

    changeTypeName(e)
    {
        this.typeName = e.target.value;
    }
    render() {
        return (
            <form style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader 
                        style={{ color: 'blue', backgroundColor: '#efeeef', textAlign: 'center' }} 
                        title={"Update Type"}
                        />
                    <Divider />
                    <CardContent>
                        <Grid 
                            container 
                            spacing={2}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            <Grid item md={2} xs={12}>
                                TypeName
                            </Grid>
                            <Grid item md={10} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    required
                                    type="text"
                                    name="typeName"
                                    defaultValue={this.typeName}
                                    onChange={(e) => this.changeTypeName(e)}
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Stack spacing={3}>
                                   
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                        <Button 
                            style={{ backgroundColor: 'yellowgreen' }} 
                            // onClick={() => this.addShift()} 
                            onClick={() => this.handle()}
                            variant="contained" 
                            startIcon={<BiPlusMedical />}
                        >
                            Xác nhận
                        </Button>
                        <Button 
                            style={{ backgroundColor: 'red' }} 
                            // onClick={() => this.editShift()}
                            onClick={() => this.cancel()}
                            variant="contained" 
                            startIcon={<GiCancel />}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        typeProduct: state.typeProduct,
        infoUser: state.infoUser,
        typeProductValue: state.typeProductValue
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
        addTypeToReducer: (data) => {
            dispatch({
                type: "ADD_TYPE",
                data: data,
            });
        },
         changeStatusUpdateType: () => {
            dispatch({
                type: "CHANGE_UPDATE_TYPE_STATUS",
            }); 
        },
        updateNameToRedux: (data) => {
            dispatch({
                type: "UPDATE_TYPE",
                data: data,
            });
        },
        getProductToReducer: (data) => {
            dispatch({
                type: "GET_PRODUCT_AND_TYPE",
                data: data
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTypeModal);