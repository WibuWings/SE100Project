import React from 'react';
import { Grid, Card, CardHeader, Divider, CardContent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


function DataReciept(props) {
    const dispatch = useDispatch()
    const typeByDate = useSelector(state => state.typeByDate)
    const [value, setValue] = React.useState(new Date());
    const [value1, setValue1] = React.useState('all');

    const selectDate = () => {
        const data = {
            type: "typeByDate",
            day: value.getDate(),
            month: value.getMonth() + 1,
            year: value.getFullYear(),
        }
        dispatch({
            type: "TYPE_BY_DATE",
            typeByDate: data,
        })
    }

    const changeTime = (newValue) => {
        if (newValue) {
            setValue(newValue);
        }
        if (typeByDate.type === 'typeByDate') {
            const data = {
                type: "typeByDate",
                day: newValue.getDate(),
                month: newValue.getMonth() + 1,
                year: newValue.getFullYear(),
            }
            dispatch({
                type: "TYPE_BY_DATE",
                typeByDate: data,
            })
        }
    }

    const selectType = () => {
        if (value1 === 'all') {
            dispatch({
                type: "TYPE_BY_DATE",
                typeByDate: { type: 'all' },
            })
        } else if (value1 === 'yesterday') {
            let yesterday = new Date()
            const data = {
                type: "yesterday",
                day: yesterday.getDate() - 1,
                month: yesterday.getMonth() + 1,
                year: yesterday.getFullYear(),
            }
            dispatch({
                type: "TYPE_BY_DATE",
                typeByDate: data,
            })
        } else if (value1 === 'today') {
            let today = new Date()
            const data = {
                type: "today",
                day: today.getDate(),
                month: today.getMonth() + 1,
                year: today.getFullYear(),
            }
            dispatch({
                type: "TYPE_BY_DATE",
                typeByDate: data,
            })
        } else if (value1 === 'lastmonth') {
            let today = new Date()
            const data = {
                type: "lastmonth",
                month: today.getMonth(),
                year: today.getFullYear(),
            }
            dispatch({
                type: "TYPE_BY_DATE",
                typeByDate: data,
            })
        } else if (value1 === 'lastyear') {
            let today = new Date()
            const data = {
                type: "lastyear",
                year: today.getFullYear() - 1,
            }
            dispatch({
                type: "TYPE_BY_DATE",
                typeByDate: data,
            })
        }
    }

    const changeType = (e) => {
        setValue1(e.target.value)
        if (typeByDate.type === 'all' || typeByDate.type === 'yesterday' || typeByDate.type === 'today' || typeByDate.type === 'lastmonth' || typeByDate.type === 'lastyear') {
            if (e.target.value === 'all') {
                dispatch({
                    type: "TYPE_BY_DATE",
                    typeByDate: { type: 'all' },
                })
            }
            if (e.target.value === 'yesterday') {
                let yesterday = new Date()
                let data = {
                    type: "yesterday",
                    day: yesterday.getDate() - 1,
                    month: yesterday.getMonth() + 1,
                    year: yesterday.getFullYear(),
                }
                dispatch({
                    type: "TYPE_BY_DATE",
                    typeByDate: data,
                })
            }
            if (e.target.value === 'today') {
                let today = new Date()
                const data = {
                    type: "today",
                    day: today.getDate(),
                    month: today.getMonth() + 1,
                    year: today.getFullYear(),
                }
                dispatch({
                    type: "TYPE_BY_DATE",
                    typeByDate: data,
                })
            }
            if (e.target.value === 'lastmonth') {
                let today = new Date()
                const data = {
                    type: "lastmonth",
                    month: today.getMonth(),
                    year: today.getFullYear(),
                }
                dispatch({
                    type: "TYPE_BY_DATE",
                    typeByDate: data,
                })
            }
            if (e.target.value === 'lastyear') {
                let today = new Date()
                const data = {
                    type: "lastyear",
                    year: today.getFullYear() - 1,
                }
                dispatch({
                    type: "TYPE_BY_DATE",
                    typeByDate: data,
                })
            }
        }
    }

    React.useEffect(() => {
        dispatch({
            type: "TYPE_BY_DATE",
            typeByDate: { type: 'all' },
        })
    }, [])

    return (
        <Grid container spacing={2}>
            <Grid item md={12} sm={12}  >
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Date" />
                    <Divider></Divider>
                    <CardContent>
                        <Grid container spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Grid item md={12} sm={12}>
                                    <div className="form-check">
                                        <input onClick={() => selectType()} style={{ transform: 'translateY(70%)' }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={value1}
                                                label="Age"
                                                onChange={(e) => changeType(e)}
                                            >
                                                <MenuItem value='all'>All</MenuItem>
                                                <MenuItem value='today'>Today</MenuItem>
                                                <MenuItem value='yesterday'>Yesterday</MenuItem>
                                                <MenuItem value='lastmonth'>Last month</MenuItem>
                                                <MenuItem value='lastyear'>Last year</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item md={12} sm={12}>
                                    <div className="form-check">
                                        <input onClick={() => selectDate()} style={{ transform: 'translateY(70%)' }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <DesktopDatePicker
                                            label="Ngày"
                                            value={value}
                                            minDate={new Date('2017-01-01')}
                                            onChange={(newValue) => changeTime(newValue)}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </div>
                                </Grid>
                            </LocalizationProvider>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default DataReciept;