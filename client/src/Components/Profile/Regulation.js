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
        this.loadInitialData();
    }

    blurAnything = (e) => {
        this.setState({
            isSaveRegulations: true,
        })
    }

    checkConstraint(data) {
        if(data.regulation.exchangeRate <= 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Exchange rate must be greater than 0","warning");    
            return false;
        }
        else if(data.regulation.miniumEmployeeAge <= 15)
        {
            this.props.hideAlert();
			this.props.showAlert("Minium old of employee must be greater than 16","warning"); 
            return false;
        }
        else if(data.regulation.lessChangeTimeKeepingDay <= 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Day before absent must be greater than 0","warning"); 
            return false;
        }
        else if(data.regulation.minExpiredProduct <= 0)
        {
            this.props.hideAlert();
			this.props.showAlert("The different of expired day and import day must be greater than 0","warning"); 
            return false;
        }
        return true;
    }

    currency = '';
    exchangeRate = 0;
    miniumEmployeeAge = 0;
    lessChangeTimeKeepingDay = 0;
    minExpiredProduct = 0;

    loadInitialData()
    {
        if(this.props.regulation != {})
        {
            this.currency = this.props.regulation.currency;
            this.exchangeRate = this.props.regulation.exchangeRate;
            this.miniumEmployeeAge = this.props.regulation.miniumEmployeeAge;
            this.lessChangeTimeKeepingDay = this.props.regulation.lessChangeTimeKeepingDay;
            this.minExpiredProduct = this.props.regulation.minExpiredProduct;
        }
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
            this.props.showAlert("Change regulation OK", "success");
        })
        .catch(err => {
            this.props.hideAlert();
            this.props.showAlert("Login timeout, signin again", "warning");
        });

        // Thêm vào redux:
        this.props.updateRegulation(data.regulation);
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
                                    defaultValue={this.currency}
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
                                    defaultValue={this.exchangeRate}
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
                                    defaultValue={this.lessChangeTimeKeepingDay}
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
                                    defaultValue={this.miniumEmployeeAge}
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
                                    defaultValue={this.minExpiredProduct}
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
        statusDarkmode: state.statusDarkmode,
        regulation : state.regulationReducer,
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
        setRegulation: (data) => {
            dispatch({
                type: "SET_REGULATION",
                data: data,
            });
        },
        updateRegulation: (data) => {
            dispatch({
                type: "UPDATE_REGULATION",
                data: data,
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Regulation);