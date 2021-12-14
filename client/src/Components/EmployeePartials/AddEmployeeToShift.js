import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, InputLabel, Stack } from '@mui/material';
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import { withStyles } from '@material-ui/styles';
import { GiCancel } from 'react-icons/gi'
import {IoMdAdd } from "react-icons/io";

class AddEmployeeToShiftModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            change: false,
        };
        console.log('listEmployee', this.props.listEmployee);
        console.log('current Shift value', this.props.currentShiftValue)
    }

    
    cancel = () => {
        this.props.changeAddEmployeeToShiftStatus();
    }

    addEmployee = () => {
    }

    getShiftInforByID(shiftID)
    {
        var listShift = this.props.listShift;
        for(var i = 0 ; i < listShift.length; i++)
        {
            if(listShift[i]._id.shiftID == shiftID)
            {
                return listShift[i].name + ' (' + listShift[i].timeFrom + '-' + listShift[i].timeEnd + ')';
            }
        }
        return "Can't get shift";
    }

    findEmployeeInShift(employeeID)
    {
        var listShiftAssign = this.props.listShiftAssign;
        // Lỗi ở chỗ thêm shift assign
        console.log("listShiftAssign", listShiftAssign);
        for(var i = 0 ; i < listShiftAssign.length; i++)
        {
            if(this.props.currentShiftValue._id.shiftType._id.shiftID == listShiftAssign[i]._id.shiftType._id.shiftID 
                && this.props.currentShiftValue._id.dateInWeek == listShiftAssign[i]._id.dateInWeek
                && listShiftAssign[i]._id.employee._id.employeeID == employeeID)
            return true;
        }
        return false;
    }

    async addEmployeeToShift(employeeID) {
        console.log("employeeID", employeeID)
        var currentShift = this.props.currentShiftValue;
        currentShift._id.employee = {
            _id: {
                employeeID: employeeID,
                storeID: this.props.infoUser.email,
            },
        }

        const data = {
            token: localStorage.getItem('token'),
            shiftAssign: currentShift, 
        }
        console.log(currentShift);
        await axios.post(`http://localhost:5000/api/employee/shift-assign`, data)
        .then(res => {
            this.props.hideAlert();
            this.props.showAlert("Save shift assign success","success");
            this.props.AddShiftAssign(data.shiftAssign);
        })
        .catch(err => {
            this.props.hideAlert();
            this.props.showAlert("Something happened, restart and try again","warning");
            console.log('bug when add shift-assign',err);
        })
    }

    render() {
        return (
            <form  style={{zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="All Employee To Shift" />
                    <Divider />
                    <CardContent>

                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                {"Add to shift: "}
                                {this.getShiftInforByID(this.props.currentShiftValue._id.shiftType._id.shiftID)}
                                {" in " +this.props.currentShiftValue._id.dateInWeek}
                            </Grid>
                            <Grid id='scroll-bar' item md={12} xs={12} style={{
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    maxHeight: 200,
                                    overflowY: 'auto',
                                }}>
                                    {
                                        this.props.listEmployee.employees.map((item) =>
                                            this.findEmployeeInShift(item._id.employeeID) ? (null) :
                                            <Grid 
                                                onClick={() => this.addEmployeeToShift(item._id.employeeID)}
                                                className='add-employee-to-shift-button'
                                                style={{padding: 10, width: '100%', height: 40, borderRadius: '10px', border: '1px solid #333', marginRight: 20, display: 'flex', marginTop: 10}} item md={8}>
                                                <div style={{marginRight: 20 , borderRadius: '100%',marginTop: 'auto', marginBottom: 'auto'}}>
                                                    <IoMdAdd size={20}  color={'yellowgreen'} style={{marginTop: -5}}>
                                                    </IoMdAdd>
                                                </div>
                                                
                                                <label style={{marginTop: 'auto', marginBottom: 'auto'}}>
                                                    {item._id.employeeID + ' - ' + item.lastName + ' ' + item.firstName}
                                                </label>
                                            </Grid> 
                                        )
                                    }
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
        currentShiftValue: state.currentShiftValue,
        listShift: state.listShift,
        listShiftAssign: state.listShiftAssign,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        AddShiftAssign: (data) => {
            dispatch({
                type: "ADD_NEW_SHIFT_ASSIGN",
                data: data,
            });
          },
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

               