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
            <form style={{ zIndex: '10', minWidth: '600px',width: '70%', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="Instruction" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={12} xs={12} style={{margin: '0px 12px'}}>
                                <label style={{fontWeight: 700, display: 'block'}}>Note:</label>
                                - Uploaded file must have the column exactly like the template file<br/>
                                - Product ID in the file can be changed<br/>
                                - You can separate to add multiple types by adding ' || ' between the type
                            </Grid>
                            <Grid item md={12} xs={12} style={{margin: '0px 12px'}}>
                                <label style={{fontWeight: 700, display: 'block'}}>Step by step:</label>
                                - Click in the upload excel button<br/>
                                - Choose a excel file and click OK<br/>
                                - Wait for the alert or fix excel file, upload again if your excel file was error
                            </Grid>
                            {
                                Object.keys(this.props.regulation).length == 0 ? null :
                                <Grid item md={12} xs={12} style={{margin: '0px 12px'}}>
                                    <label style={{fontWeight: 700, display: 'block'}}>Regulation:</label>
                                    - The expiration date must be at least {this.props.regulation.minExpiredProduct} day(s) older than the import date 
                                </Grid>
                            }
                        </Grid>
                        <a  style={{margin: '0px 12px'}}
                            target="_blank" rel="noopener noreferrer"
                            href="https://docs.google.com/spreadsheets/d/1bk99RhxehlZk-1B4c93rIZ7MvUNlWO7F/edit?usp=sharing&ouid=107720637610074440067&rtpof=true&sd=true">
                            Template link here !
                        </a>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={(e) => this.cancel(e)} variant="contained" startIcon={<GiCancel />}>
                            Exit    
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
        regulation: state.regulationReducer,
        statusDarkmode: state.statusDarkmode,
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