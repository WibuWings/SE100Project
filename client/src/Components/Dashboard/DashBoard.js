import React, { Component } from 'react';
import '../../css/Dashboard.css'
import { Container, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { DiApple } from 'react-icons/di'
import StaticDateRangePickerDemo from './Calendar'
import AppWebsiteVisits from './Statistic';
import SplitButton from './GroupButton';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction" // needed for dayClick


class DashBoard extends Component {

    renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    render() {
        return (
            <div className="dashboard" style={{ overflow: 'scroll', overflowX: 'hidden', height: '100vh' }}>
                <Container style={{ marginTop: '40px' }} maxWidth="xl">
                    <Grid container spacing={3}>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <div className="dashboard-css">
                                <div className="dashboard-item-img" style={{ marginBottom: '30px' }}>
                                    <DiApple className="dashboard-item-icon"></DiApple>
                                </div>
                                <Typography style={{ marginBottom: '10px' }} variant="h4">256</Typography>
                                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                    Total money
                                </Typography>
                            </div>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <div className="dashboard-css sold-good">
                                <div className="dashboard-item-img sold-good" style={{ marginBottom: '30px' }}>
                                    <DiApple className="dashboard-item-icon sold-good"></DiApple>
                                </div>
                                <Typography style={{ marginBottom: '10px' }} variant="h4">256</Typography>
                                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                    Sold good
                                </Typography>
                            </div>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <div className="dashboard-css imported-good">
                                <div className="dashboard-item-img imported-good" style={{ marginBottom: '30px' }}>
                                    <DiApple className="dashboard-item-icon imported-good"></DiApple>
                                </div>
                                <Typography style={{ marginBottom: '10px' }} variant="h4">256</Typography>
                                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                    Imported good
                                </Typography>
                            </div>
                        </Grid>
                        <Grid className="dashboard-item" item md={3} sm={12} >
                            <div className="dashboard-css error-receipt">
                                <div className="dashboard-item-img error-receipt" style={{ marginBottom: '30px' }}>
                                    <DiApple className="dashboard-item-icon error-receipt"></DiApple>
                                </div>
                                <Typography style={{ marginBottom: '10px' }} variant="h4">256</Typography>
                                <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                    Error receipt
                                </Typography>
                            </div>
                        </Grid>
                        <Grid className="dashboard-item" item md={12} sm={12} >
                            <div style={{ borderRadius: '20px' }}>
                                <StaticDateRangePickerDemo></StaticDateRangePickerDemo>
                            </div>
                        </Grid>
                        <Grid className="dashboard-item" item md={12} sm={12} >
                            <div style={{ borderRadius: '20px' }}>
                                <FullCalendar
                                    plugins={[ dayGridPlugin, interactionPlugin ]}
                                    initialView="dayGridMonth"
                                    weekends={true}
                                    events={[
                                        { title: 'event 1', date: '2021-10-18' },
                                        { title: 'event 2', date: '2021-10-18' }
                                    ]}
                                />
                            </div>
                        </Grid>
                        <Grid className="dashboard-item" item md={12} sm={12} >
                            <AppWebsiteVisits></AppWebsiteVisits>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default DashBoard;