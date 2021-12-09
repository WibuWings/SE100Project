import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import { GiCancel } from 'react-icons/gi'
import axios from 'axios';

class ExcelInstruction extends Component {
    constructor(props) {
        super(props);
    }

    cancel = () => {
        this.props.exit();
    }

    render() {
        return (
            <form style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Confirm" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12}>
                                Instruction
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Stack spacing={3}>
                                   
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                        <Button style={{ backgroundColor: 'red' }} onClick={(e) => this.cancel(e)} variant="contained" startIcon={<GiCancel />}>
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
        confirmStatus: state.confirmStatus,
        deleteStatus: state.deleteStatus,
        confirmCode: state.confirmCode,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        exit: () => {
            dispatch({
                type: "CHANGE_EXCEL_INSTRUCTION_STATUS",
            });
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExcelInstruction);