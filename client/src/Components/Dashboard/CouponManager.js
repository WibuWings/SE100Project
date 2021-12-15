import React from 'react';
import { Card, CardHeader, Divider, TableBody, TableHead, TableRow, Paper, Grid, Button, CardContent, Table, TableCell, TableContainer } from '@mui/material';
import { BiPlusMedical } from 'react-icons/bi';
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { tableCellClasses } from '@mui/material/TableCell';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



function CouponManager(props) {
    const statusDarkmode = useSelector(state => state.statusDarkmode)
    const [value, setValue] = React.useState(new Date())
    const [value1, setValue1] = React.useState('all')
    const [typeCheck, setTypeCheck] = React.useState('groupBy')
    const listCoupon = useSelector(state => state.listCoupon)
    const listReceipt = useSelector(state => state.listReciept)
    const [listReceiptHaveCoupon, setListReceiptHaveCoupon] = React.useState([]);
    const [totalDiscount, setTotalDiscount] = React.useState(0);
    const regulation = useSelector(state => state.regulationReducer)

    const selectType = (e) => {
        console.log(e.target.value);
        setTypeCheck(e.target.value);
    }

    const changeType = (e) => {
        console.log(e.target.value)
        setValue1(e.target.value)
    }

    const changeTime = (newValue) => {
        setValue(newValue);
    }

    React.useEffect(() => {
        let list = listReceipt.filter(item => {
            if (item.coupon && !item.deleted && !item.isEdit) {
                return item
            }
        })
        if (typeCheck === 'groupBy') {
            if (value1 == 'all') {
                setListReceiptHaveCoupon(list)
            } else {
                list = list.filter(item=> {
                    if(value1 == item.coupon._id.couponID){
                        return item
                    }
                })
                setListReceiptHaveCoupon(list)
            }
        } else {
            list = list.filter(item => {
                let timeMau = item.date;
                timeMau = timeMau.replace(/\s/g, "");
                timeMau = timeMau.split("/");
                if(value.getDate() == timeMau[0] && value.getMonth() + 1 == timeMau[1] && value.getFullYear() == timeMau[2]) {
                    return item
                }
            })
            setListReceiptHaveCoupon(list)
        }
        let money = 0
        list.map(item => {
            money += item.totalFinalMoney - item.totalMoney;
        })
        setTotalDiscount(money)
    }, [typeCheck, value1, value])



    return (
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', marginBottom: '30px' }}>
            <Card style={{ position: "relative" }}>
                <CardHeader style={{ color: !statusDarkmode ? '#0091ea' : 'white', backgroundColor: !statusDarkmode ? '#efeeef' : '#455a64' }} title="Coupon Manager" />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={3} sm={3}>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12}  >
                                    <Card>
                                        <CardHeader style={{ color: !statusDarkmode ? '#0091ea' : 'white', backgroundColor: !statusDarkmode ? '#efeeef' : '#455a64' }} title="Date" />
                                        <Divider></Divider>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <Grid item md={12} sm={12}>
                                                        <div className="form-check">
                                                            <input onClick={(e) => selectType(e)} style={{ transform: 'translateY(70%)' }} value="groupBy" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                                                            <FormControl fullWidth>
                                                                <InputLabel id="demo-simple-select-label">Group by</InputLabel>
                                                                <Select
                                                                    labelId="demo-simple-select-label"
                                                                    id="demo-simple-select"
                                                                    value={value1}
                                                                    label="Option"
                                                                    onChange={(e) => changeType(e)}
                                                                >
                                                                    <MenuItem value='all'>All</MenuItem>
                                                                    {listCoupon.map(value => (
                                                                        <MenuItem value={value._id.couponID}>{value.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                    </Grid>
                                                    <Grid item md={12} sm={12}>
                                                        <div className="form-check">
                                                            <input onClick={(e) => selectType(e)} style={{ transform: 'translateY(70%)' }} value="date" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
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
                        </Grid>
                        <Grid style={{ height: '500px' }} item md={9} sm={9}>
                            <Grid container spacing={3}>
                                <Grid id="choses-product" style={{ overflowX: 'hidden', overflowY: 'auto', height: '430px', marginTop: '20px' }} item md={12} sm={12}  >
                                    <TableContainer id="choses-product" component={Paper}>
                                        <Table  sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Name coupon</StyledTableCell>
                                                    <StyledTableCell align="center">Id Reciept</StyledTableCell>
                                                    <StyledTableCell align="center">Date</StyledTableCell>
                                                    <StyledTableCell align="center">Dicount(%)</StyledTableCell>
                                                    <StyledTableCell align="center">Reduce Money</StyledTableCell>
                                                </TableRow>
                                            </TableHead >
                                            {listReceiptHaveCoupon.map(item => {
                                                return (
                                                    <TableBody>
                                                        <StyledTableRow key="abc">
                                                            <StyledTableCell component="th" scope="row">{item.coupon.name}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.MAHD}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.date}</StyledTableCell>
                                                            <StyledTableCell align="center">{item.coupon.percent}</StyledTableCell>
                                                            <StyledTableCell align="center">{regulation.currency === 'vnd' ? (item.totalFinalMoney - item.totalMoney).toLocaleString(): ((item.totalFinalMoney - item.totalMoney)/regulation.exchangeRate).toFixed(2).toLocaleString()}</StyledTableCell>
                                                        </StyledTableRow>
                                                    </TableBody>
                                                )
                                            })}
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item md={12} sm={12}  >
                                    <h5 style={{ textAlign: 'end', paddingRight: '20px', borderTop: '2px solid black' }}>Discount:
                                        <span style={{ color: 'red' }}>   {regulation.currency === 'vnd' ? totalDiscount.toLocaleString() : ((totalDiscount/regulation.exchangeRate).toFixed(2)).toLocaleString()}  {(regulation.currency == 'vnd') ? 'VNĐ' : '$'}</span>
                                    </h5>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </CardContent>
                <Divider />

            </Card>
        </div>
    );
}

export default CouponManager;