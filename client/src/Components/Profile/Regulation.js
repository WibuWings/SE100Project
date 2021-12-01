import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, Button, CardContent } from '@mui/material';
import { connect } from 'react-redux'
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import axios from 'axios'

class Regulation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeStart: new Date(2018, 5, 35, 7, 0, 0),
            timeEnd: new Date(2018, 5, 35, 18, 0, 0),
            numberEmployees: 10,
            isNumberEmployees: false,
            isSaveRegulations: false,
        }
    }

    changeTimeStart = (newValue) => {
        this.setState({
            timeStart: newValue,
            isSaveRegulations: true,
        })
    }

    changeTimeEnd = (newValue) => {
        this.setState({
            isSaveRegulations: true,
            timeEnd: newValue,
        })
    }

    blurNumberEmployees = (e) => {
        if (e.target.value < 0) {
            this.setState({
                isNumberEmployees: true,
                numberEmployees: e.target.value,
                isSaveRegulations: true,
            })
        } else {
            this.setState({
                isNumberEmployees: false,
                numberEmployees: e.target.value,
                isSaveRegulations: true,
            })
        }
    }

    SaveRegulations = async () => {
        // const data = {
        //     email: this.props.infoUser.email,
        //     token: localStorage.getItem('token'),
        //     regulation : {
        //         currency: document.querySelector('select[name="currency"]').value,
        //         exchangeRate: document.querySelector('select[name="exchangeRate"]').value,
        //         miniumEmployeeAge: document.querySelector('select[name="miniumEmployeeAge"]').value, 
        //         lessChangeTimeKeepingDay: document.querySelector('select[name="lessChangeTimeKeepingDay"]').value,
        //         minExpiredProduct: document.querySelector('select[name="exchangeRate"]').value,
        //     },
        // }
        //     numberEmployees: this.state.numberEmployees,
        //     timeStart: {
        //         hours: this.state.timeStart.getHours(),
        //         minutes: this.state.timeStart.getMinutes(),
        //     },
        //     timeEnd: {
        //         hours: this.state.timeEnd.getHours(),
        //         minutes: this.state.timeEnd.getMinutes(),
        //     },
        // }
        // if (!this.state.isNumberEmployees && this.state.isSaveRegulations) {
        //       console.log("save");  
        //       console.log(data);
        //     await axios.post(`http://localhost:5000/api/profile/regulation`, data)
        //     .then(res => {
        //         this.props.hideAlert();
        //         this.props.showAlert("Login timeout, signin again", "success");
        //     })
        //     .catch(err => {
        //         this.props.hideAlert();
        //         this.props.showAlert("Login timeout, signin again", "warning");
        //     });
        // }
    }


    render() {
        return (
            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="Regulation" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Currency"
                                    name="currency"
                                    onBlur={(e) => this.blurNumberEmployees(e)}
                                    required
                                    defaultValue="vnd"
                                    variant="outlined"
                                    select
                                    SelectProps={{ native: true }}
                                >
                                    <option value="vnd">
                                        VNĐ
                                    </option>
                                    <option value="dollar">
                                        $
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Number of employees"
                                    defaultValue='10'
                                    name="numberEmployees"
                                    variant="outlined"
                                    error={this.state.isNumberEmployees}
                                    helperText={this.state.isNumberEmployees? "Enter more 0" : ''}
                                    type="number"
                                    onBlur={(e) => this.blurNumberEmployees(e)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Exchange rate"
                                    defaultValue='20000'
                                    name="exchangeRate"
                                    variant="outlined"
                                    // error={this.state.isNumberEmployees}
                                    // helperText={this.state.isNumberEmployees? "Enter more 0" : ''}
                                    type="number"
                                    // onBlur={(e) => this.blurNumberEmployees(e)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Less change timekeeping days"
                                    defaultValue='2'
                                    name="exchangeRate"
                                    variant="outlined"
                                    // error={this.state.isNumberEmployees}
                                    // helperText={this.state.isNumberEmployees? "Enter more 0" : ''}
                                    type="number"
                                    // onBlur={(e) => this.blurNumberEmployees(e)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Employee Minium Age"
                                    defaultValue='2'
                                    name="exchangeRate"
                                    variant="outlined"
                                    // error={this.state.isNumberEmployees}
                                    // helperText={this.state.isNumberEmployees? "Enter more 0" : ''}
                                    type="number"
                                    // onBlur={(e) => this.blurNumberEmployees(e)}
                                />
                            </Grid>
                            {/* <Grid item md={6} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <TimePicker
                                            label="Start"
                                            value={this.state.timeStart}
                                            className="timeFrom"
                                            onChange={(newValue) => this.changeTimeStart(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <TimePicker
                                            label="End"
                                            value={this.state.timeEnd}
                                            onChange={(newValue) => this.changeTimeEnd(newValue)}
                                            renderInput={(params) => <TextField onChange={(e) => this.changeTime(e)} {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid> */}
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button onClick={() => this.SaveRegulations()} disabled={!this.state.isSaveRegulations} color="primary" variant="contained">Save</Button>
                    </Box>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        infoUser: state.infoUser,
        statusDarkmode: state.statusDarkmode
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        hideAlert: () => {
            dispatch({
                type: "HIDE_ALERT",
            })
        },
        showAlert: (message, typeMessage) => {
            dispatch({
                type: "SHOW_ALERT",
                message: message,
                typeMessage: typeMessage,
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Regulation);