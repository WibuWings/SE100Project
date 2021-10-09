import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import {GiCancel} from 'react-icons/gi'

class ModalAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: Date.now(),
        }
    }
    
    hanhleCancel = (e) => {
        this.props.changeAddStatus();
    }

    changeTime = (e) => {
        this.setState({
            value: e,
        })
    }

    render() {
        return (
            <form style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Create shift" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12}>
                                <TextField
                                    id="outlined-basic"
                                    variant="outlined"
                                    fullWidth
                                    label="Shift description"
                                    required
                                    type="text"
                                />
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <Stack spacing={3}>
                                        <TimePicker
                                            label="Time"
                                            value={this.state.value}
                                            onChange={(newValue) => this.changeTime(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                        <TimePicker
                                            label="Time"
                                            value={this.state.value}
                                            onChange
                                            renderInput={(params) => <TextField onChange={(e) => this.changeTime(e)} {...params} />}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                        <Button style={{ backgroundColor: 'yellowgreen' }} variant="contained" startIcon={<BiPlusMedical />}>
                            Xác nhận
                        </Button>
                        <Button style={{ backgroundColor: 'red' }} onClick={(e) => this.hanhleCancel(e)} variant="contained" startIcon={<GiCancel />}>
                            Hủy
                        </Button>
                    </Box>
                </Card>
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addStatus: state.addStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAdd);