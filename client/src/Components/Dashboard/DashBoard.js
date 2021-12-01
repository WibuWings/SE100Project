import React, { Component } from 'react';
import '../../css/Dashboard.css'
import { Container, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { DiApple } from 'react-icons/di'
import AppWebsiteVisits from './Statistic';
import DaiLyMoneyTracking from './DaiLyMoneyTracking';
import GroupButtonDashboard from './GroupButtonDashboard';
import TotalMoney from './TotalMoney';
import ErrorReceipt from './ErrorReceipt';
import CouponManager from './CouponManager';
import ProductStatis from './ProductStatis';
import SalaryStats from './SalaryStats';
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
                            <GroupButtonDashboard></GroupButtonDashboard>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <TotalMoney></TotalMoney>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            {/* <div className="dashboard-css sold-good">
                                <div className="dashboard-item-img sold-good" style={{ marginBottom: '30px' }}>
                                    <DiApple className="dashboard-item-icon sold-good"></DiApple>
                                </div>
                                <Typography style={{ marginBottom: '10px' }} variant="h4">256</Typography>
                                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                    Sold good
                                </Typography>
                            </div> */}
                            <ProductStatis></ProductStatis>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            {/* <div className="dashboard-css imported-good">
                                <div className="dashboard-item-img imported-good" style={{ marginBottom: '30px' }}>
                                    <DiApple className="dashboard-item-icon imported-good"></DiApple>
                                </div>
                                <Typography style={{ marginBottom: '10px' }} variant="h4">256</Typography>
                                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                    Imported good
                                </Typography>
                            </div> */}
                            <SalaryStats></SalaryStats>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <ErrorReceipt></ErrorReceipt>
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

export default DashBoard;