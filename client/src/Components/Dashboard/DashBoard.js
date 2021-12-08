import React, { Component } from 'react';
import '../../css/Dashboard.css'
import { Container, Grid, Button } from '@mui/material';
import AppWebsiteVisits from './Statistic';
import DaiLyMoneyTracking from './DaiLyMoneyTracking';
import GroupButtonDashboard from './GroupButtonDashboard';
import TotalMoney from './TotalMoney';
import ErrorReceipt from './ErrorReceipt';
import CouponManager from './CouponManager';
import ProductStatis from './ProductStatis';
import ComponentToPrintRevenue from './ComponentToPrintRevenue';
import ReactToPrint from 'react-to-print';
import SalaryStats from './SalaryStats';
import { MdLocalPrintshop } from 'react-icons/md'
import { connect } from 'react-redux'

class DashBoard extends Component {

    renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    componentWillMount() {
        document.title = 'DashBoard'
    }

    render() {
        return (
            <div id="scroll-bar" className="dashboard" style={{ overflow: 'scroll', overflowX: 'hidden', height: '100vh' }}>
                <Container style={{ marginTop: '40px' }} maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid item md={12} sm={12}>
                            <div style={{ width: '100&', display: 'flex' }}>
                                <GroupButtonDashboard></GroupButtonDashboard>
                            </div>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <TotalMoney></TotalMoney>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <ProductStatis></ProductStatis>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <SalaryStats></SalaryStats>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <ErrorReceipt></ErrorReceipt>
                        </Grid>
                        <Grid style={{ justifyContent: 'end', display: 'flex' }} className="dashboard-item" item md={12} sm={12}>
                            <ReactToPrint
                                trigger={() => {
                                    return <div>
                                        <Button style={{ backgroundColor: '#01579b', color: 'white' }}>
                                            <MdLocalPrintshop style={{ marginRight: '10px' }}></MdLocalPrintshop>
                                            Export Revenue
                                        </Button>
                                    </div>;
                                }}
                                content={() => this.componentRef}
                            />
                            <div style={{ display: 'none' }}>
                                <ComponentToPrintRevenue listReceipt={this.props.listReceipt} ref={el => (this.componentRef = el)} />
                            </div>
                        </Grid>
                        <Grid className="dashboard-item" item md={12} sm={12} >
                            <AppWebsiteVisits></AppWebsiteVisits>
                        </Grid>

                        <Grid item md={12} sm={12}>
                            <DaiLyMoneyTracking></DaiLyMoneyTracking>
                        </Grid>

                        <Grid item md={12} sm={12}>
                            <CouponManager></CouponManager>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        listReceipt: state.listReciept,
    }
}

export default connect(mapStateToProps)(DashBoard);