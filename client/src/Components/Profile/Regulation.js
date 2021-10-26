import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, Button, CardContent } from '@mui/material';
import { connect } from 'react-redux'
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

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
            })
        } else {
            this.setState({
                isNumberEmployees: false,
                numberEmployees: e.target.value,
            })
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
                                    defaultValue={this.props.infoUser.gender}
                                    variant="outlined"
                                    select
                                    SelectProps={{ native: true }}
                                >
                                    <option value="male">
                                        VNĐ
                                    </option>
                                    <option value="female">
                                        $
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Number of employees"
                                    defaultValue={this.state.numberEmployees}
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
                        <Button onClick={() => this.SaveDetails()} disabled={!this.state.isSaveRegulations} color="primary" variant="contained">Save details</Button>
                    </Box>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        country: state.country,
        district: state.district,
        infoUser: state.infoUser,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProvince: (data) => {
            dispatch({
                type: "UPDATE_DATA_PROVINCE",
                data: data,
            })
        },
        updateDistrict: (data) => {
            dispatch({
                type: "UPDATE_DATA_DISTRICT",
                data: data,
            })
        },
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