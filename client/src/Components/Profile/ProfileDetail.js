import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, Button, CardContent } from '@mui/material';
import { connect } from 'react-redux'
import axios from 'axios'

class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledHuyen: true,
            nameProvince: this.props.infoUser.province,
            nameDistrict: this.props.infoUser.district,
            isTel: true,
            isOld: true,
            isSave: false,
            listDistrict: "",
            reLoad: true,
        }
    }

    SaveDetails = () => {
        if (this.state.isTel && this.state.isOld) {
            const data = {
                email: document.querySelector('input[name="email"]').value,
                firstName: document.querySelector('input[name="firstName"]').value,
                lastName: document.querySelector('input[name="lastName"]').value,
                old: document.querySelector('input[name="old"]').value,
                gender: document.querySelector('select[name="gender"],select').value,
                storeName: document.querySelector('input[name="storeName"]').value,
                tel: document.querySelector('input[name="tel"]').value,
                salary: document.querySelector('input[name="salary"]').value,
                province: document.querySelector('select[name="province"]').value,
                district: document.querySelector('select[name="district"]').value,
                address: document.querySelector('input[name="address"]').value,
            }

            axios.post(`http://localhost:5000/api/update-profile`, data)
                .then(res => {
                    console.log("Save success");
                })
                .catch(err => {
                    console.log("Save faile");
                })

            this.props.updateProfile(data);
        }
    }

    changeCountry = (e) => {
        this.setState({
            nameProvince: e.target.value,
        })
        if (e.target.value === '0') {
            document.querySelector('select[name="province"]').value = e.target.value;
            this.setState({
                disabledHuyen: true,
            })
        } else {
            const listDistrict = this.props.country[0].filter(word => word.codename === e.target.value);
            this.setState({
                listDistrict: listDistrict[0].districts,
                disabledHuyen: false,
                isSave: true,
            })
        }
    }

    changeDistrict = (e) => {
        this.setState({
            nameDistrict: e.target.value,
        })
    }

    blurTel = (e) => {
        const regex = /^\d+$/;
        document.querySelector('select[name="province"]').defaultValue = this.props.infoUser.province;
        if (e.target.value === '' || regex.test(e.target.value)) {
            this.setState({
                isTel: true,
            })
            if(this.state.isOld){
                this.setState({
                    isSave: true,
                })
            }
            return true;
        } else if (!regex.test(e.target.value)) {
            this.setState({
                isTel: false,
                isSave: false,
            })
            return false;
        } else {
            this.setState({
                isSave: false,
                isTel: false,
            })
            return false;
        }
    }

    blurOld = (e) => {
        const regex = /^\d+$/;
        if (e.target.value === '' || regex.test(e.target.value)) {
            this.setState({
                isOld: true,
            })
            if ( this.state.isTel){
                this.setState({
                    isSave: true,
                })
            }
            return true;
        } else if (!regex.test(e.target.value)) {
            this.setState({
                isOld: false,
                isSave: false,
            })
            return false;
        } else {
            this.setState({
                isOld: false,
            })
            return false
        }
    }

    blurAll = (e) => {
        if (e.target.value !== "0" && e.target.value !== "") {
            if(this.state.isOld && this.state.isTel)
            {
                this.setState({
                    isSave: true,
                })
            }
        }
    }


    componentWillMount() {
        if (!this.props.country[0]) {
            axios.get(`https://provinces.open-api.vn/api/?depth=2`)
                .then(res => {
                    this.props.updateProvince(res.data);
                })
                .catch(err => {
                    console.log("fail");
                })
        } else {
            this.setState({
                listDistrict: this.props.country[0].filter(word => word.codename === this.props.infoUser.province)[0].districts,
                disabledHuyen: false,
            })
        }
        console.log("compoenetWillLoad");
    }


    render() {
        return (
            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Profile" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    onBlur={(e) => this.blurAll(e)}
                                    label="First name"
                                    required
                                    name="firstName"
                                    defaultValue={this.props.infoUser.firstName}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    onBlur={(e) => this.blurAll(e)}
                                    label="Last name"
                                    name="lastName"
                                    defaultValue={this.props.infoUser.lastName}
                                    required
                                    variant="outlined"
                                    id="outlined-basic"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    disabled
                                    label="Email Address"
                                    defaultValue={this.props.infoUser.email}
                                    onBlur={(e) => this.blurAll(e)}
                                    name="email"
                                    value="lngthinphc@gmail.com"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Old"
                                    name="old"
                                    defaultValue={this.props.infoUser.old}
                                    required
                                    error={!this.state.isOld}
                                    onBlur={(e) => this.blurOld(e)}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Gender"
                                    name="gender"
                                    onBlur={(e) => this.blurAll(e)}
                                    required
                                    defaultValue={this.props.infoUser.gender}
                                    variant="outlined"
                                    select
                                    SelectProps={{ native: true }}
                                >
                                    <option value="0">
                                        --Select gender--
                                    </option>
                                    <option value="male">
                                        Male
                                    </option>
                                    <option value="female">
                                        Female
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Store Name"
                                    onBlur={(e) => this.blurAll(e)}
                                    defaultValue={this.props.infoUser.storeName}
                                    name="storeName"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Tel"
                                    defaultValue={this.props.infoUser.tel}
                                    error={!this.state.isTel}
                                    name="tel"
                                    variant="outlined"
                                    onBlur={(e) => this.blurTel(e)}
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    onBlur={(e) => this.blurAll(e)}
                                    label="Salary/1h"
                                    defaultValue={this.props.infoUser.salary}
                                    type="number"
                                    id="outlined-error-helper-text"
                                    name="salary"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Select province"
                                    name="province"
                                    required
                                    defaultValue={this.props.infoUser.province}
                                    value={this.state.nameProvince}
                                    onChange={(e) => this.changeCountry(e)}
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value="0">--Select province--</option>
                                    {(this.props.country.length !== 0) ? this.props.country[0].map(item => {
                                        return (
                                            <option value={item.codename}>
                                                {item.name}
                                            </option>
                                        )
                                    }) : null}

                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Select district"
                                    name="district"
                                    defaultValue={this.props.infoUser.district}
                                    value={this.state.nameDistrict}
                                    onChange={(e) => this.changeDistrict(e)}
                                    required
                                    disabled={this.state.disabledHuyen}
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value="0">--Select district--</option>
                                    {(this.state.listDistrict !== "") ? this.state.listDistrict.map(item => {
                                        return (
                                            <option value={item.codename}
                                            >
                                                {item.name}
                                            </option>
                                        )
                                    }) : null}
                                </TextField>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Adress details"
                                    defaultValue={this.props.infoUser.address}
                                    name="address"
                                    required
                                    variant="outlined"
                                    onBlur={(e) => this.blurAll(e)}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button onClick={() => this.SaveDetails()} disabled={!this.state.isSave} color="primary" variant="contained">Save details</Button>
                    </Box>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        country: state.country,
        infoUser: state.infoUser,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateProvince: (data) => {
            dispatch({
                type: "UPDATE_DATA",
                data: data,
            })
        },
        updateProfile: (data) => {
            dispatch({
                type: "UPDATA_DATA_USER",
                firstName: data.firstName,
                lastName: data.lastName,
                old: data.old,
                gender: data.gender,
                storeName: data.storeName,
                tel: data.tel,
                salary: data.salary,
                province: data.province,
                district: data.district,
                address: data.address,
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail);