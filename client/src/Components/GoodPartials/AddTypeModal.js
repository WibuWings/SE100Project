import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, Alert } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import { GiCancel, GiVampireCape } from 'react-icons/gi'
import axios from 'axios';

var listTypeInfor = [];

class AddTypeModal extends Component {
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
                storeID: this.props.infoUser.email,
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
                alert("Get success");
                result = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err); // 401 ở đây
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
        const data = {
            token: localStorage.getItem('token'),
            productType: {
                _id:{
                    typeID: listTypeInfor.length,
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
                if(!this.props.isAddTypeStatus && typeName.trim()==this.props.typeProductValue.name)
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
        this.props.changeAddTypeStatus();
    }

    handle = () => {
        if (this.props.isAddTypeStatus)
            this.addType();
        else 
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
        this.props.changeAddTypeStatus();
        this.props.changeEditTypeStatus();
    }
    typeName = "";
    loadInitialData = () => {
        if (this.props.isAddTypeStatus) {
            
        }
        else
        {
            this.typeName = this.props.typeProductValue.name;
            this.setState({change: true});
        } 
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
                        title={this.props.isAddTypeStatus? "Add Type" : "Edit Type"}
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
        addTypeStatus: state.addTypeStatus,
        isAddTypeStatus: state.isAddTypeStatus,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTypeModal);