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
            isSaveRegulations: false,
        }
    }

    blurAnything = (e) => {
        this.setState({
            isSaveRegulations: true,
        })
    }

    checkConstraint(data) {
        if(data.regulation.exchangeRate <= 0)
        {
            alert("Tỉ giá không thể nhỏ hơn 0");
            return false;
        }
        else if(data.regulation.miniumEmployeeAge <= 0)
        {
            alert("Tuổi tối thiểu của nhân viên không được nhỏ hơn 0");
            return false;
        }
        else if(data.regulation.lessChangeTimeKeepingDay <= 0)
        {
            alert("Ngày báo trước nghỉ không được nhỏ hơn 0");
            return false;
        }
        else if(data.regulation.minExpiredProduct <= 0)
        {
            alert("Hiệu ngày hết hạn và ngày nhập không được nhỏ hơn 0");
            return false;
        }
        return true;
    }


    SaveRegulations = async () => {
        const data = {
            email: this.props.infoUser.email,
            token: localStorage.getItem('token'),
            regulation : {
                _id: this.props.infoUser.email,
                currency: document.querySelector('select[name="currency"]').value,
                exchangeRate: document.querySelector('input[name="exchangeRate"]').value,
                miniumEmployeeAge: document.querySelector('input[name="miniumEmployeeAge"]').value, 
                lessChangeTimeKeepingDay: document.querySelector('input[name="lessChangeTimeKeepingDay"]').value,
                minExpiredProduct: document.querySelector('input[name="minExpiredProduct"]').value,
            },
        }
        console.log("Thông tin quy định", data);
        if(this.checkConstraint(data)== false) return;
        await axios.post(`http://localhost:5000/api/profile/regulation`, data)
        .then(res => {
            console.log("Add thành công");
        })
        .catch(err => {
            this.props.hideAlert();
            this.props.showAlert("Login timeout, signin again", "warning");
        });
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
                                    onBlur={(e) => this.blurAnything(e)}
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
                                    label="Exchange rate ($ to VNĐ)"
                                    defaultValue='20000'
                                    name="exchangeRate"
                                    onBlur={(e) => this.blurAnything(e)}
                                    variant="outlined"
                                    type="number"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Minium day before timekeeping change"
                                    defaultValue='2'
                                    name="lessChangeTimeKeepingDay"
                                    variant="outlined"
                                    onBlur={(e) => this.blurAnything(e)}
                                    type="number"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Employee Minium Age"
                                    defaultValue='2'
                                    name="miniumEmployeeAge"
                                    variant="outlined"
                                    onBlur={(e) => this.blurAnything(e)}
                                    type="number"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Min expired product days"
                                    defaultValue='2'
                                    name="minExpiredProduct"
                                    variant="outlined"
                                    onBlur={(e) => this.blurAnything(e)}
                                    type="number"
                                />
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