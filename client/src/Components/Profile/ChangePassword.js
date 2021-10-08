import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, Button, CardContent } from '@mui/material';


class ChangePassword extends Component {
    render() {
        return (
            <form style={{boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{color: 'blue' , backgroundColor: '#efeeef'}} title="Change Password" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    variant="standard"
                                    fullWidth
                                    label="Current password"
                                    required
                                    type="password"
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    label="New password"
                                    name="password"
                                    required
                                    variant="standard"
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    fullWidth
                                    label="New password again"
                                    name="re-password"
                                    required
                                    variant="standard"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end',  p: 2}}>
                        <Button color="primary"  variant="contained">Change</Button>
                    </Box>
                </Card>
            </form>
        );
    }
}

export default ChangePassword;