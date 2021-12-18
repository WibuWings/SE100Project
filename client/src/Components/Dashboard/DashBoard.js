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
import SalaryStats from './SalaryStats';
import { MdLocalPrintshop } from 'react-icons/md'
import { connect } from 'react-redux'
import ModalConfirmPassword from './ExportRevenue';

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
                            <Button onClick={() => this.props.changeConfirmPasswordTest()} style={{ backgroundColor: '#01579b', color: 'white' }}>
                                <MdLocalPrintshop style={{ marginRight: '10px' }}></MdLocalPrintshop>
                                Export Revenue
                            </Button>
                            {this.props.statusConfirmPassword ?
                                <div  className="modal-comfirm-password">
                                    <ModalConfirmPassword></ModalConfirmPassword>
                                </div> : null
                            }
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
        isLogin: state.loginStatus,
        statusDarkmode: state.statusDarkmode,
        statusConfirmPassword: state.statusConfirmPassword,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeLoginStatus: () => {
            dispatch({
                type: "CHANGE_LOGIN_STATUS",
            })
        },
        changeConfirmPasswordTest: () => {
            dispatch({
                type: "CHANGE_MODAL_CONFIRM_PASSWORD_STATUS",
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
