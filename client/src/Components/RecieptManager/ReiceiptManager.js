import React, { Component } from 'react';
import { Container, Grid, Button } from '@mui/material';
import CollapsibleTable from './TableReciept'
import StatusReceiptType from './StatusReceiptType';
import '../../css/RecieptManager.css'
class ReceiptManager extends Component {
    render() {
        return (
            <div className="profile" style={{ overflow: 'scroll', overflowX: 'hidden', height: '100vh' }}>
                <Container style={{ marginBottom: '20px', marginTop: '20px' }} maxWidth="xl">
                    <Grid className="profile-body" container spacing={2}>
                        <Grid item md={3} sm={4}  >
                            <StatusReceiptType></StatusReceiptType>
                        </Grid>
                        <Grid item md={9} sm={9}  >
                            <CollapsibleTable></CollapsibleTable>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default ReceiptManager;