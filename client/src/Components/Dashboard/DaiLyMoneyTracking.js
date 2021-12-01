import React from 'react';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Grid, TextField } from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useSelector } from 'react-redux'


function DaiLyMoneyTracking(props) {
    const [value, setValue] = React.useState(new Date());
    const listReciept = useSelector(state => state.listReciept)
    const [dailyListReciept, setDailiListReciept] = React.useState([]);
    const changeTime = (newValue) => {
        if (newValue) {
            setValue(newValue);
        }
    }

    const totalMoneyDaily = () => {
        let money = 0
        dailyListReciept.map(value => {
            if(!value.isEdit) {
                if (!value.deleted) {
                    money += value.totalFinalMoney
                } else {
                    money -= value.totalFinalMoney
                }
            }
        })
        return money
    }

    const renderMoney = (item) => {
        if (item.deleted && item.isEdit) {
            return 0
        } else if (item.deleted) {
            return "-" + item.totalFinalMoney
        } else if (item.isEdit) {
            return 0
        } else {
            return "+" + item.totalFinalMoney
        }
    }

    const renderStatus = (item) => {
        if (item.deleted && item.isEdit) {
            return "Exchange"
        } else if (item.deleted) {
            return "Deleted"
        } else if (item.isEdit) {
            return "Exchange"
        } else {
            return "Success"
        }
    }

    const renderColor = (item) => {
        if (item.deleted && item.isEdit) {
            return "#c1c103"
        } else if (item.deleted) {
            return "red"
        } else if (item.isEdit) {
            return "#c1c103"
        } else {
            return "green"
        }
    }

    React.useEffect(() => {
        let day = value.getDate()
        let month = value.getMonth() + 1;
        let year = value.getFullYear()
        let arrListReciept
        arrListReciept = listReciept.filter(value => {
            let data = value.date;
            data = data.replace(/\s/g, "");
            data = data.split("/");
            if (data[0] == day && data[1] == month && data[2] == year) {
                return value
            }
        })
        setDailiListReciept(arrListReciept)
    }, [value])

    return (
        <div style={{ backgroundColor: 'white', borderRadius: '4px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', overflow: 'hidden', marginBottom: '30px' }}>
            <div style={{ height: 'auto', width: '90%', margin: 'auto', paddingTop: '20px' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date"
                        value={value}
                        minDate={new Date('2017-01-01')}
                        onChange={(newValue) => changeTime(newValue)}
                        renderInput={(params) => <TextField style={{ width: '100%' }} {...params} />}
                    />
                </LocalizationProvider>
            </div>
            <div id="choses-product" style={{ backgroundColor: 'white', height: '500px', width: '80%', overflow: 'hidden', margin: 'auto', overflowY: 'auto', marginTop: '20px', marginBottom: '20px' }}>
                <ul style={{ textDecoration: 'none', listStyle: 'none', paddingLeft: '0' }}>
                    {
                        dailyListReciept.length !== 0 ? dailyListReciept.map(value => (
                            <li style={{ borderBottom: '1px #0000004d solid', marginBottom: '5px', paddingBottom: '5px' }}>
                                <Grid container spacing={2}>
                                    <Grid item sm={6} md={6}>
                                        <div>{renderStatus(value)}</div>
                                        <div style={{ fontWeight: '700', color: renderColor(value) }}>{renderMoney(value)}</div>
                                    </Grid>
                                    <Grid style={{ display: 'flex', justifyContent: 'center' }} item sm={6} md={3}>
                                        <div style={{ color: '#00000075', paddingLeft: '10px', fontSize: '1rem' }}>{value.name}</div>
                                    </Grid>
                                    <Grid style={{ display: 'flex', justifyContent: 'center' }} item sm={6} md={3}>
                                        <div style={{ color: '#00000075', paddingLeft: '10px', fontSize: '1rem' }}>{value.time}</div>
                                    </Grid>
                                </Grid>
                            </li>
                        )) : (
                            <div style={{ justifyContent: 'center', display: 'flex', marginTop: '100px', color: 'rgba(0,0,0,0.5)' }}>
                                <h2>
                                    You have not sold any invoices today
                                </h2>
                            </div>
                        )
                    }
                </ul>
            </div>
            <div style={{ height: 'auto', width: '100%', paddingTop: '20px', paddingBottom: '20px', borderTop: '3px solid black' }}>
                <Grid container spacing={2}>
                    <Grid style={{ display: 'flex', justifyContent: 'end' }} item md={2}>
                        <h5 style={{ fontWeight: '800' }}>TOTAL : </h5>
                    </Grid>
                    <Grid style={{ display: 'flex', justifyContent: 'start' }} item md={5}>
                        {totalMoneyDaily() >= 0 ? (
                            <h5 style={{ color: 'green', fontWeight: 'bold' }}>{totalMoneyDaily()} VNĐ</h5>
                        ) : (
                            <h5 style={{ color: 'red', fontWeight: 'bold' }}>{totalMoneyDaily()} VNĐ</h5>
                        )}
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default DaiLyMoneyTracking;