import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, Modal} from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit} from 'react-icons/bi';
import { TiDelete } from "react-icons/ti";
import Stack from '@mui/material/Stack';
import { GiCancel } from 'react-icons/gi'
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

class TypeInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: false,
            openModal: false
        }
    }

    edit = (type) => {
        // this.props.setEditTypeStatus();
        this.props.typeToUpdate(type);
        // this.props.changeEditTypeStatus();
        this.props.changeStatusUpdateType();
    }

    async getAllTypeList(){
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
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
            })

        this.props.getProductType(result);
    }

    async delete(type){
        console.log("type", type);
        this.handleClose();
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
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
                console.log('bug when delete type',err);
            })
        this.props.deleteTypeFromRedux(data.productTypes[0]);
        
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
                console.log('Bug when get join', err);
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
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
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
            })
        
        // Cập nhật các redux khi xoá join
        this.props.deleteTypeProductInProduct(type._id.typeID);


        // this.getAllTypeList();
        console.log('this.typeProduct', this.props.typeProduct)
        this.setState({change: !this.state.change})
        this.props.hideAlert();
	    this.props.showAlert("Delete type success   ","success");
    }

    handleClose() {
        this.setState({openModal: false});
    }

    openModal() {
        this.setState({openModal: true});
    }

    type = this.props.type;

    render() {
        return (
            <Grid md={12}>
                <Grid container>
                    <Grid item md={10} style={{padding: 4, paddingLeft: 20}}>
                        <span>{this.type._id.typeID + ' '+ this.type.name}</span>
                    </Grid>
                    <Grid item md={2}>
                        <BiEdit  size={20} color={'yellowgreen'}onClick={() => this.edit(this.type)}/>
                        <TiDelete size={20} color={'red'} onClick={() => this.openModal()}/>
                    </Grid>           
                </Grid>
                
                <Modal
                    open={this.state.openModal}
                    onClose={() => this.handleClose()}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 style={{ textAlign: 'center' }} id="parent-modal-title">Are you sure to delete?</h2>
                        <Grid container spacing={2}>
                            <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                                <Button onClick={() => this.delete(this.type)} style={{ color: 'white', backgroundColor: '#f44336' }}>DELETE</Button>
                            </Grid>
                            <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                                <Button onClick={() => this.handleClose()} style={{ backgroundColor: '#ADD8E6' }}>CANCEL</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
                <Divider></Divider>
            </Grid>
        )
    }
}

const mapStateToProps1 = (state, ownProps) => {
    return {
        editTypeStatus: state.editTypeStatus,
        addTypeStatus: state.addTypeStatus,
        isAddTypeStatus: state.isAddTypeStatus,
        infoUser: state.infoUser,
        typeProductValue: state.typeProductValue,
        typeProduct: state.typeProduct,
    }
}

const mapDispatchToProps1 = (dispatch, ownProps) => {
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
        deleteTypeFromRedux: (data) => {
            dispatch({
                type: "DELETE_TYPE",
                data: data
            });
            
        },
        showAlert: (message, typeMessage) => {
            dispatch({
                type: "SHOW_ALERT",
                message: message,
                typeMessage: typeMessage,
            })
        },
        hideAlert: () => {
            dispatch({
                type: "HIDE_ALERT",
            })
        },
        deleteTypeProductInProduct: (typeID) => {
            dispatch({
                type: "DELETE_TYPE_PRODUCT",
                typeID: typeID
            })
        },
        getProductType: (data) => {
            dispatch({
                type: "GET_PRODUCT_TYPE",
                data: data
            });
        },
        
    }
}

export default connect(mapStateToProps1, mapDispatchToProps1)(TypeInfo);