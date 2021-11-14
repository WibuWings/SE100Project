import React, { Component } from 'react';
import { Container, Grid, Button } from '@mui/material';
import CollapsibleTable from './TableReciept'
import StatusReceiptType from './StatusReceiptType';
import DateReciept from './DateReciept';
import ControlReciept from './ControlReciept';
import '../../css/RecieptManager.css'
import SearchReceipt from './SearchReceipt';

class ReceiptManager extends Component {
    render() {
        return (
            <div className="profile" style={{ overflow: 'scroll', overflowX: 'hidden', height: '100vh' }}>
                <Container style={{ marginBottom: '20px', marginTop: '20px' }} maxWidth="xl">
                    <Grid className="profile-body" container spacing={2}>
                        <Grid item  lg={3} md={12} sm={12}>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}>
                                    <DateReciept></DateReciept>
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <StatusReceiptType></StatusReceiptType>
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <ControlReciept></ControlReciept>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item  lg={9} md={12} sm={12}>
                            <Grid>
                                <Grid item md={12} sm={12}>
                                    <SearchReceipt></SearchReceipt>
                                </Grid>
                            </Grid>
                            <CollapsibleTable></CollapsibleTable>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default ReceiptManager;