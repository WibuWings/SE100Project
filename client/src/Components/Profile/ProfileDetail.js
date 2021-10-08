import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, Button, CardContent } from '@mui/material';
import { connect } from 'react-redux'


class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabledHuyen: true,
            disabledXa: true,
            listDistrict: "",
        }
    }
    
    changeCountry = (e) => {
        console.log(e.target);
        if(e.target.value === '0') {
            this.setState({
                disabledHuyen: true,
            })
        } else {
            console.log(this.props.country[0].filter(word => word.name === e.target.value));
            const listDistrict = this.props.country[0].filter(word => word.name === e.target.value);
            this.setState({
                listDistrict: listDistrict[0].districts,
                disabledHuyen: false,
            })
        }
    }
    

    render() {
            
        console.log(this.state.listDistrict);
        return (
            <form style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{color: 'blue' , backgroundColor: '#efeeef'}} title="Profile" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="First name"
                                    required
                                    name="firstName"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Old"
                                    name="old"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Gender"
                                    name="gender"
                                    required
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
                                    name="storeName"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Salary/1h"
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
                                    onChange={(e) => this.changeCountry(e)}
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value="0">--Select province--</option>
                                    {(this.props.country.length !== 0) ? this.props.country[0].map(item => {
                                        return (
                                            <option
                                            >
                                                {item.name}
                                            </option>
                                        )
                                    }): null}
                                   
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Select district"
                                    name="district"
                                    required
                                    disabled={this.state.disabledHuyen}
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option value="0">--Select district--</option>
                                    {(this.state.listDistrict !== "") ? this.state.listDistrict.map(item => {
                                        return (
                                            <option
                                            >
                                                {item.name}
                                            </option>
                                        )
                                    }): null}
                                </TextField>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Adress details"
                                    name="adress"
                                    required
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end',  p: 2}}>
                        <Button color="primary" variant="contained">Save details</Button>
                    </Box>
                </Card>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        country: state.country,
    }
}

export default connect(mapStateToProps)(ProfileDetail);