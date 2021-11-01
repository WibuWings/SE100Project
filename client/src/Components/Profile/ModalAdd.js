import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { GiCancel } from 'react-icons/gi'
import axios from 'axios';

class ModalAdd extends Component {
    constructor(props) {
        super(props);

        if (this.props.editShiftStatus) {
            var _timeFrom = new Date();
            var fromHour = parseInt(this.props.objectEditShift.from.slice(0, this.props.objectEditShift.from.indexOf(':')));
            var fromMin = parseInt(this.props.objectEditShift.from.slice(this.props.objectEditShift.from.indexOf(':') + 1));
            _timeFrom.setHours(fromHour, fromMin);

            var _timeTo = new Date();
            var toHour = parseInt(this.props.objectEditShift.to.slice(0, this.props.objectEditShift.to.indexOf(':')));
            var toMin = parseInt(this.props.objectEditShift.to.slice(this.props.objectEditShift.to.indexOf(':') + 1));
            _timeTo.setHours(toHour, toMin);
        }


        this.state = {
            timeFrom: this.props.editShiftStatus ? _timeFrom : Date.now(),
            timeTo: this.props.editShiftStatus ? _timeTo : Date.now(),
            isSalary: false,
            isDescription: false,
            isTimeTo: false,
            valueTime: this.props.editShiftStatus ? 1 : null,
        }
    }

    descriptionShift = this.props.editShiftStatus ? this.props.objectEditShift.description : "Ex : abc"
    timeFrom = this.props.editShiftStatus ? this.props.objectEditShift.from : "00:00 AM"
    timeTo = this.props.editShiftStatus ? this.props.objectEditShift.to : "00:00 AM"
    salary = this.props.editShiftStatus ? this.props.objectEditShift.salary : 10000

    // Handle user
    hanhleCancel = (e) => {
        this.props.changeAddStatus();
        if (this.props.editShiftStatus) {
            this.props.changeEditShiftStatus();
        }
    }

    changeTimeFrom = (e) => {
        var hourse = e.getHours()
        const minutes = e.getMinutes()
        if (hourse >= 12) {
            hourse = hourse - 12;
            this.timeFrom = hourse.toString() + ":" + minutes.toString() + " PM"
        } else {
            this.timeFrom = hourse.toString() + ":" + minutes.toString() + " AM"
        }
        console.log(this.timeFrom);
        this.setState({
            timeFrom: e,
        })
    }

    changeTimeTo = (e) => {
        var hourse = e.getHours()
        const minutes = e.getMinutes()
        if (hourse >= 12) {
            hourse = hourse - 12;
            this.timeTo = hourse.toString() + ":" + minutes.toString() + " PM"
        } else {
            this.timeTo = hourse.toString() + ":" + minutes.toString() + " AM"
        }
        console.log(this.timeTo);
        this.setState({
            timeTo: e,
        })
    }

    blurDiscription = (e) => {
        this.descriptionShift = e.target.value;
        if (e.target.value === "") {
            this.setState({
                isDescription: true,
            })
        } else {
            this.setState({
                isDescription: false,
            })
        }
    }


    // Tạo code để xác nhận
    makeCode = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    editShift = async () => {
        if (!this.state.isSalary && !this.state.isDescription && (this.state.timeTo - this.state.timeFrom > 0)) {
            var data = {
                token: localStorage.getItem('token'),
                idUser: this.props.infoUser.email,
                id: this.props.objectEditShift.id,
                salary: this.salary,
                description: this.descriptionShift,
                from: this.timeFrom,
                to: this.timeTo,
            }
            await axios.post(`http://localhost:5000/api/profile/update-shift`, data)
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        this.props.hideAlert();
                        this.props.showAlert("Edit shift success", "success");
                        this.props.updateShift(data);
                    }
                    this.props.changeEditShiftStatus();
                    this.props.changeAddStatus();
                })
                .catch(err => {
                    this.props.changeLoginStatus();
                    this.props.hideAlert();
                    this.props.showAlert("Login timeout, signin again", "warning");
                })

        }
    }

    blurSalary = (e) => {
        if (e.target.value <= -1) {
            this.setState({
                isSalary: true,
            })
        } else {
            this.setState({
                isSalary: false,
            })
        }
        this.salary = e.target.value;
    }

    // Call API
    addShift = () => {
        if (!this.state.isSalary && !this.state.isDescription && (this.state.timeTo - this.state.timeFrom > 0)) {
            const code = this.makeCode(6);
            const data = {
                idUser: this.props.infoUser.email,
                id: code,
                salary: this.salary,
                description: this.descriptionShift,
                from: this.timeFrom,
                to: this.timeTo,
            }
            const data1 = {
                name: this.descriptionShift,
                salary: this.salary,
                timeFrom: this.timeFrom,
                timeEnd: this.timeTo,
                _id: { shiftID: code }
            }
            if (data) {
                axios.post(`http://localhost:5000/api/profile/add-shift`, {
                    email: this.props.infoUser.email,
                    token: localStorage.getItem('token'),
                    data: data,
                })
                    .then(res => {
                        if (res.data.token) {
                            this.props.addShift(data1);
                            localStorage.setItem('token', res.data.token);
                            this.props.hideAlert();
                            this.props.showAlert("Add shift success", "success");
                        }
                        this.props.changeAddStatus();
                    })
                    .catch(err => {
                        this.props.changeLoginStatus();
                        this.props.hideAlert();
                        this.props.showAlert("Login timeout, signin again", "warning");
                    })
            }
        }
    }

    render() {
        return (
            <form style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Create shift" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    defaultValue={(this.props.editShiftStatus ? this.props.objectEditShift.description : this.descriptionShift)}
                                    onBlur={(e) => this.blurDiscription(e)}
                                    label="Shift description"
                                    error={this.state.isDescription}
                                    helperText={this.state.isDescription ? "Enter something" : ""}
                                    required
                                    type="text"
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    onBlur={(e) => this.blurSalary(e)}
                                    label="Salary/1h"
                                    defaultValue={this.props.editShiftStatus ? this.props.objectEditShift.salary : this.salary}
                                    error={this.state.isSalary}
                                    helperText={this.state.isSalary ? "Greater than 0" : ""}
                                    type="number"
                                    id="outlined-error-helper-text"
                                    name="salary"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <TimePicker
                                            label="Time From"
                                            value={this.state.timeFrom}
                                            onChange={(newValue) => this.changeTimeFrom(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <TimePicker
                                            label="Time To"
                                            value={this.state.timeTo}
                                            onChange={(newValue) => this.changeTimeTo(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                        {this.props.editShiftStatus ? (
                            <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.editShift()} variant="contained" startIcon={<BiEdit />}>
                                Save
                            </Button>) : (
                            <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.addShift()} variant="contained" startIcon={<BiPlusMedical />}>
                                Xác nhận
                            </Button>
                        )}
                        <Button style={{ backgroundColor: 'red' }} onClick={(e) => this.hanhleCancel(e)} variant="contained" startIcon={<GiCancel />}>
                            Hủy
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addStatus: state.addStatus,
        infoUser: state.infoUser,
        editShiftStatus: state.editShiftStatus,
        objectEditShift: state.objectEditShift,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
            });
        },
        addShift: (data) => {
            dispatch({
                type: "ADD_SHIFT",
                newShift: data,
            })
        },
        changeEditShiftStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_SHIFT_STATUS",
            })
        },
        updateShift: (data) => {
            dispatch({
                type: "OBJECT_UPDATE_SHIFT",
                data: data,
            })
        },
        showAlert: (message, typeMessage) => {
            dispatch({
                type: "SHOW_ALERT",
                message: message,
                typeMessage: typeMessage,
            })
        },
        changeLoginStatus: () => {
            dispatch({
                type: "CHANGE_LOGIN_STATUS",
            });
        },
        hideAlert: () => {
            dispatch({
                type: "HIDE_ALERT",
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd);