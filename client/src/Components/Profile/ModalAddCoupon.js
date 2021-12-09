import React from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button } from '@mui/material';
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import { GiCancel } from 'react-icons/gi'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

function ModalAddCoupon(props) {
    const statusDarkmode = useSelector(state => state.statusDarkmode)
    const statusEditCoupon = useSelector(state => state.statusEditCoupon)
    const objectEditCoupon = useSelector(state => state.objectEditCoupon)
    const infoUser = useSelector(state => state.infoUser)
    const [timeFrom, setTimeFrom] = React.useState(statusEditCoupon ? new Date(objectEditCoupon.timeFrom) : new Date());
    const [timeEnd, settimeEnd] = React.useState(statusEditCoupon ? new Date(objectEditCoupon.timeEnd) : new Date());
    const [isDescription, setIsDescription] = React.useState(false);
    const [percent, setPercent] = React.useState(statusEditCoupon ? objectEditCoupon.percent : 100);
    const [isPercent, setIsPercent] = React.useState(false);
    const [description, setDiscription] = React.useState(statusEditCoupon ? objectEditCoupon.name : "Discount 2/9")
    const [minTotal, setMinTotal] = React.useState(statusEditCoupon ? objectEditCoupon.minTotal : 100000)
    const [isMinTotal, setIsMinTotal] = React.useState(false)
    const [quantity, setQuantity] = React.useState(statusEditCoupon ? objectEditCoupon.quantity : 10)
    const [isQuantity, setIsQuantity] = React.useState(false)
    const dispatch = useDispatch()

    const blurDiscription = (e) => {
        if (e.target.value.length === 0) {
            setDiscription(e.target.value)
            setIsDescription(true);
        } else {
            setDiscription(e.target.value)
            setIsDescription(false);
        }
    }

    const blurDiscount = (e) => {
        if (e.target.value > 100 || e.target.value < 0 || e.target.value == "") {
            setIsPercent(true)
        }
        else {
            setIsPercent(false)
            setPercent(Number(e.target.value).toFixed(0))
        }
    }

    const blurQuantity = (e) => {
        if (e.target.value < 0 || e.target.value == "") {
            setIsQuantity(true)
        } else {
            setIsQuantity(false)
            setQuantity(e.target.value)
        }
    }

    const blurMinTotal = (e) => {
        if (e.target.value < 100000 || e.target.value == "") {
            setIsMinTotal(true)
        } else {
            setIsMinTotal(false)
            setMinTotal(e.target.value)
        }
    }

    const changeTimeFrom = (newValue) => {
        if (newValue) {
            setTimeFrom(newValue);
        }
    }

    const changetimeEnd = (newValue) => {
        if (newValue) {
            settimeEnd(newValue);
        }
    }

    const addCoupon = async () => {
        if (timeEnd - timeFrom >= 0) {
            if (!isPercent && !isDescription && !isMinTotal && !isQuantity) {
                const data = {
                    _id: {
                        storeID: infoUser.email,
                        couponID: makeCode(6),
                    },
                    name: description,
                    percent: percent,
                    minTotal: minTotal,
                    timeFrom: timeFrom,
                    timeEnd: timeEnd,
                    quantity: quantity,
                }
                await axios.post(`http://localhost:5000/api/coupon/create`, {
                    token: localStorage.getItem('token'),
                    email: infoUser.email,
                    coupon: data,
                }).then(res => {

                }).catch(err => {

                })
                dispatch({
                    type: "ADD_COUPON",
                    data: data
                })
                dispatch({
                    type: "SHOW_ALERT",
                    message: "Add coupon success",
                    typeMessage: "success",
                })
                dispatch({
                    type: "CHANGE_ADD_COUPON_STATUS"
                })
            }
        } else {
            dispatch({
                type: "SHOW_ALERT",
                message: "The end date must be greater than the start date",
                typeMessage: "warning",
            })
        }
    }

    const editCoupon = async () => {
        if (timeEnd - timeFrom >= 0) {
            if (!isPercent && !isDescription && !isQuantity) {
                const data = {
                    _id: {
                        couponID: objectEditCoupon._id.couponID,
                        storeID: infoUser.email
                    },
                    name: description,
                    minTotal: minTotal,
                    percent: percent,
                    timeFrom: timeFrom,
                    timeEnd: timeEnd,
                    quantity: Number(quantity),
                }
                await axios.post(`http://localhost:5000/api/coupon/update`, {
                    token: localStorage.getItem('token'),
                    email: infoUser.email,
                    coupon: {...data},
                }).then(res => {
                    dispatch({
                        type: "EDIT_COUPON",
                        data: data
                    })
                    dispatch({
                        type: "SHOW_ALERT",
                        message: "Edit coupon success",
                        typeMessage: "success",
                    })
                    dispatch({
                        type: "CHANGE_ADD_COUPON_STATUS"
                    })
                    dispatch({
                        type: "RESET_EDIT_COUPON_STATUS"
                    })
                }).catch(err => {
                    dispatch({
                        type: "SHOW_ALERT",
                        message: "Edit coupon faile",
                        typeMessage: "warning",
                    })
                })
            }
        } else {
            dispatch({
                type: "SHOW_ALERT",
                message: "The end date must be greater than the start date",
                typeMessage: "warning",
            })
        }
    }

    const hanhleCancel = () => {
        dispatch({
            type: "CHANGE_ADD_COUPON_STATUS"
        })
        dispatch({
            type: "RESET_EDIT_COUPON_STATUS"
        })
    }

    const makeCode = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    return (
        <form className="modal-add-shift" style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
            <Card>
                <CardHeader style={{ color: !statusDarkmode ? '#0091ea' : 'white', backgroundColor: !statusDarkmode ? '#efeeef' : '#455a64' }} title="Create coupon" />
                <Divider />
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item md={12} xs={12}>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                id="outlined-error-helper-text"
                                onBlur={(e) => blurDiscription(e)}
                                label="Coupon description"
                                defaultValue={description}
                                error={isDescription}
                                helperText={isDescription ? "Enter something" : ""}
                                required
                                type="text"
                                name="disciption"
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                onBlur={(e) => blurDiscount(e)}
                                label="Discount"
                                defaultValue={percent}
                                error={isPercent}
                                helperText={isPercent ? "Enter greater than 0 and less than 100" : ""}
                                type="number"
                                id="outlined-error-helper-text"
                                name="discount (%)"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                onBlur={(e) => blurQuantity(e)}
                                label="Quantity"
                                defaultValue={quantity}
                                error={isQuantity}
                                helperText={isQuantity ? "Enter greater than 0" : ""}
                                type="number"
                                id="outlined-error-helper-text"
                                name="quantity"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                required
                                fullWidth
                                onBlur={(e) => blurMinTotal(e)}
                                label="Minimum Total Amount"
                                defaultValue={minTotal}
                                error={isMinTotal}
                                helperText={isMinTotal ? "Enter greater than 100.000" : ""}
                                type="number"
                                id="outlined-error-helper-text"
                                name="mintotal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="From"
                                        value={timeFrom}
                                        minDate={new Date('2017-01-01')}
                                        onChange={(newValue) => changeTimeFrom(newValue)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                    <DesktopDatePicker
                                        label="To"
                                        value={timeEnd}
                                        minDate={new Date('2017-01-01')}
                                        onChange={(newValue) => changetimeEnd(newValue)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Stack>
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                    {statusEditCoupon ? (
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => editCoupon()} variant="contained" startIcon={<BiEdit />}>
                            Save
                        </Button>) : (
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => addCoupon()} variant="contained" startIcon={<BiPlusMedical />}>
                            Add
                        </Button>
                    )}
                    <Button style={{ backgroundColor: 'red' }} onClick={(e) => hanhleCancel(e)} variant="contained" startIcon={<GiCancel />}>
                        Cancel
                    </Button>
                </Box>
            </Card>
        </form >
    );
}

export default ModalAddCoupon;