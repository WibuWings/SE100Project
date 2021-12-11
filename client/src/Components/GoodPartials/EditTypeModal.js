import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, Modal } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit} from 'react-icons/bi';
import { TiDelete } from "react-icons/ti";
import Stack from '@mui/material/Stack';
import { GiCancel } from 'react-icons/gi'
import axios from 'axios';
import TypeInfo from './TypeInfo';
class EditTypeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            change: false,
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
    

    render() {
        return (
            <form style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="All Good Type" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid container item md={12} xs={12} spacing={0}>
                                { this.props.typeProduct.map((type) => (
                                    <TypeInfo type={type}></TypeInfo>
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
        typeProduct: state.typeProduct,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTypeModal);