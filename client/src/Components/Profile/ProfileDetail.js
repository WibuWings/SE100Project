import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, Button, CardContent } from '@mui/material';
import axios from 'axios';


class ProfileDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: "",
        }
    }

    render() {
        var listCountry;

        axios.get(`https://provinces.open-api.vn/api/?depth=2`)
            .then(res => {
                this.setState({
                    list: res.data,
                })
                console.log(res.data);
            })
            .catch(err => {
                console.log("fail");
            })

        return (
            <form autoComplete="off" noValidate>
                <Card>
                    <CardHeader subheader="The information can be edited" title="Profile" />
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
                                    required
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Select province"
                                    name="state"
                                    required
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option
                                    >
                                        An giang
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Select province"
                                    name="state"
                                    required
                                    disabled
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option
                                    >
                                        An giang
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <TextField
                                    fullWidth
                                    label="Select province"
                                    name="state"
                                    required
                                    disabled
                                    select
                                    SelectProps={{ native: true }}
                                    variant="outlined"
                                >
                                    <option
                                    >
                                        An giang
                                    </option>
                                </TextField>
                            </Grid>
                            <Grid item md={6} xs={12}>
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
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
}

export default ProfileDetail;