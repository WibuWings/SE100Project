import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box,  CardContent } from '@mui/material';
import UnstyledButtonCustom from './button'


class ModalAdd extends Component {
    render() {
        return (
            <form style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Change Password" />
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
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                        <UnstyledButtonCustom style={{ color: 'red' }} color="red" name="Xác nhận"></UnstyledButtonCustom>
                        <UnstyledButtonCustom name="Hủy"></UnstyledButtonCustom>
                    </Box>
                </Card>
            </form>
        );
    }
}

export default ModalAdd;