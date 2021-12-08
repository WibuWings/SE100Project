import React from 'react';
import { Card, CardHeader, Divider, TableBody, TableHead, TableRow, Paper, Box, Button, CardContent, Table, TableCell, TableContainer } from '@mui/material';
import { BiPlusMedical } from 'react-icons/bi';
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { tableCellClasses } from '@mui/material/TableCell';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

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



function ProfileCoupon(props) {
    const statusDarkmode = useSelector(state => state.statusDarkmode)
    const dispatch = useDispatch()
    const listCoupon = useSelector(state => state.listCoupon)
    const regulation = useSelector(state => state.regulationReducer)
    const infoUser = useSelector(state => state.infoUser)


    const openModalAddCoupon = () => {
        dispatch({
            type: "CHANGE_ADD_COUPON_STATUS"
        })
    }

    const convertTime = (time) => {
        let date = new Date(time)
        return date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear()
    }

    const deleteCoupon = async (idCoupon) => {
        await axios.post(`http://localhost:5000/api/coupon/delete`, {
            token: localStorage.getItem('token'),
            email: infoUser.email,
            _id: {
                couponID: idCoupon,
                storeID: infoUser.email,
            }
        }).then(res => {

        }).catch(err => {

        })
        dispatch({
            type: "DELETE_COUPON",
            idCoupon: idCoupon
        })
        dispatch({
            type: "SHOW_ALERT",
            message: "Delete coupon success",
            typeMessage: "success",
        })
    }

    const editCoupon = (data) => {
        dispatch({
            type: "CHANGE_ADD_COUPON_STATUS"
        })
        dispatch({
            type: "CHANGE_EDIT_COUPON_STATUS"
        })
        dispatch({
            type: "OBJECT_EDIT_COUPON",
            objectEditCoupon: data
        })
    }

    React.useEffect(() => {
        console.log(listCoupon)
    }, [listCoupon])


    return (
        <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
            <Card style={{ position: "relative", marginTop: '15px' }}>
                <CardHeader style={{ color: !statusDarkmode ? '#0091ea' : 'white', backgroundColor: !statusDarkmode ? '#efeeef' : '#455a64' }} title="Coupon" />
                <Divider />
                <CardContent>
                    <TableContainer id="choses-product" component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Coupon name</StyledTableCell>
                                    <StyledTableCell align="center">Quantity</StyledTableCell>
                                    <StyledTableCell align="center">Discount</StyledTableCell>
                                    <StyledTableCell align="center">Min Total</StyledTableCell>
                                    <StyledTableCell align="center">From</StyledTableCell>
                                    <StyledTableCell align="center">To</StyledTableCell>
                                    <StyledTableCell align="center">Edit</StyledTableCell>
                                    <StyledTableCell align="center">Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            {listCoupon.map(item => {
                                return (
                                    <TableBody>
                                        <StyledTableRow key="abc">
                                            <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                                            <StyledTableCell align="center">{item.quantity}</StyledTableCell>
                                            <StyledTableCell align="center">{item.percent}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                {regulation.currency === 'vnd' ? (item.minTotal).toLocaleString() : ((item.minTotal) / regulation.exchangeRate).toFixed(2).toLocaleString()}
                                            </StyledTableCell>
                                            <StyledTableCell align="center">{convertTime(item.timeFrom)}</StyledTableCell>
                                            <StyledTableCell align="center">{convertTime(item.timeEnd)}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton onClick={() => editCoupon(item)} name={item._id.couponID} color="secondary" aria-label="fingerprint">
                                                    <FiEdit />
                                                </IconButton>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton onClick={() => deleteCoupon(item._id.couponID)} name={item._id.couponID} style={{ color: 'red' }} aria-label="fingerprint">
                                                    <FiTrash2 />
                                                </IconButton>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                )
                            })}
                        </Table>
                    </TableContainer>
                </CardContent>
                <Divider />
                <Box className="add-shift" sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                    <Button onClick={() => openModalAddCoupon()} style={{ backgroundColor: 'yellowgreen' }} variant="contained" startIcon={<BiPlusMedical />}>
                        add
                    </Button>
                </Box>
            </Card>
        </div>
    );
}

export default ProfileCoupon;