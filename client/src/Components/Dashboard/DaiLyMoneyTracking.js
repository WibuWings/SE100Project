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
            <div id="choses-product" style={{ backgroundColor: 'white', height: '500px', width: '80%', overflow: 'hidden', margin: 'auto', overflowY: 'scroll', marginTop: '20px' }}>
                <ul style={{ textDecoration: 'none', listStyle: 'none', paddingLeft: '0' }}>
                    {
                        dailyListReciept.map(value => (
                            <li style={{ borderBottom: '1px #0000004d solid', marginBottom: '5px', paddingBottom: '5px' }}>
                                <Grid container spacing={2}>
                                    <Grid item sm={6} md={6}>
                                        <div>{value.deleted? "Hủy hóa đơn" : "Thành công"}</div>
                                        <div style={{ fontWeight: '700', color: value.deleted? "red" : "green"}}>{value.deleted? "-" : "+"} {value.totalFinalMoney}</div>
                                    </Grid>
                                    <Grid style={{ display: 'flex', justifyContent: 'center' }} item sm={6} md={3}>
                                        <div style={{ color: '#00000075', paddingLeft: '10px', fontSize: '1rem' }}>{value.name}</div>
                                    </Grid>
                                    <Grid style={{ display: 'flex', justifyContent: 'center' }} item sm={6} md={3}>
                                        <div style={{ color: '#00000075', paddingLeft: '10px', fontSize: '1rem' }}>{value.time}</div>
                                    </Grid>
                                </Grid>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
}

export default DaiLyMoneyTracking;