import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, InputLabel, Stack } from '@mui/material';
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import { withStyles } from '@material-ui/styles';
import { GiCancel } from 'react-icons/gi'

class AddEmployeeToShiftModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            change: false,
        };
        console.log('listEmployee', this.props.listEmployee)
    }

    
    cancel = () => {
        this.props.changeAddEmployeeToShiftStatus();
    }

    addEmployee = () => {
    }



    render() {
        return (
            <form style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="All Employee To Shift" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid container item md={12} xs={12} spacing={0}>
                                {/* { this.props.listEmployee.map((type) => (
                                    <Grid item md={10} style={{padding: 4, paddingLeft: 20}}>
                                        <span>{this.type._id.typeID + ' '+ this.type.name}</span>
                                    </Grid>
                                    <Grid item md={2}>
                                        <BiEdit  size={20} color={'yellowgreen'}onClick={() => this.edit(this.type)}/>
                                        <TiDelete size={20} color={'red'} onClick={() => this.openModal()}/>
                                    </Grid>   
                                ))} */}
                                {
                                    // this.props={.list}
                                }
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Stack spacing={3}>
                                   
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                        <Button style={{ backgroundColor: 'red' }} onClick={() => this.cancel()} variant="contained" startIcon={<GiCancel />}>
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
        addEmployeeStatus: state.addEmployeeStatus,
        confirmStatus: state.confirmStatus,
        infoUser: state.infoUser,
        listEmployee: state.listEmployee,
        listSackedEmployee: state.listSackedEmployee,
        regulation: state.regulationReducer,
        statusDarkmode: state.statusDarkmode,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddEmployeeToShiftStatus: () => {
            dispatch({
                type: "CHANGE_ADD_EMPLOYEE_TO_SHIFT_STATUS",
            });
        },
        getEmployee: (data) => {
            dispatch({
                type: "GET_EMPLOYEE",
                employees: data,
            });
        },
        addEmployee: (data) => {
            dispatch({
                type: "ADD_EMPLOYEE",
                employees: data,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeToShiftModal);

               