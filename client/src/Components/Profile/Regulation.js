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
            timeStart: Date.now(),
            timeEnd: Date.now(),
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
        const data = {
            email: this.props.infoUser.email,
            token: localStorage.getItem('token'),
            currency:document.querySelector('select[name="currency"]').value, 
            timeStart: this.state.timeStart,
            timeEnd: this.state.timeEnd,
        }
        if (!this.state.isNumberEmployees && this.state.isSaveRegulations) {
              console.log("save");  
              console.log(data);
            //   axios.post(`https://provinces.open-api.vn/api/?depth=2`, )
        }

    }


    render() {
        return (
            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Regulation" />
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
                            </Grid>
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
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProfile: (data) => {
            dispatch({
                type: "UPDATA_DATA_USER",
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                old: data.old,
                gender: data.gender,
                storeName: data.storeName,
                tel: data.tel,
                province: data.province,
                district: data.district,
                address: data.address,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Regulation);