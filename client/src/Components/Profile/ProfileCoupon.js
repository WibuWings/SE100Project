import React from 'react';
import { Grid ,Modal, Card, CardHeader, Divider, TableBody, TableHead, TableRow, Paper, Box, Button, CardContent, Table, TableCell, TableContainer } from '@mui/material';
import { BiPlusMedical } from 'react-icons/bi';
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { tableCellClasses } from '@mui/material/TableCell';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { red, lightBlue } from '@mui/material/colors';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

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
    const [idDelete, setIdDelete] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const openModalAddCoupon = () => {
        dispatch({
            type: "CHANGE_ADD_COUPON_STATUS"
        })
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const convertTime = (time) => {
        let date = new Date(time)
        return date.getDate() + " / " + (date.getMonth() + 1) + " / " + date.getFullYear()
    }

    const showModal = (id) => {
        setIdDelete(id);
        handleOpen()
    }

    const deleteCoupon = async (idCoupon) => {
        await axios.post(`http://localhost:5000/api/coupon/delete`, {
            token: localStorage.getItem('token'),
            email: infoUser.email,
            _id: {
                couponID: idDelete,
                storeID: infoUser.email,
            }
        }).then(res => {

        }).catch(err => {

        })
        dispatch({
            type: "DELETE_COUPON",
            idCoupon: idDelete
        })
        dispatch({
            type: "SHOW_ALERT",
            message: "Delete coupon success",
            typeMessage: "success",
        })
        handleClose()
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
                                                <IconButton onClick={() => showModal(item._id.couponID)} name={item._id.couponID} style={{ color: 'red' }} aria-label="fingerprint">
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
                        Add
                    </Button>
                </Box>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 style={{ textAlign: 'center', fontSize: '1.4rem', marginBottom: '15px' }} >Are you sure delete this coupon ?</h2>
                    <Divider />
                    <Grid style={{ marginTop: '5px' }} container spacing={2}>
                        <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                            <Button onClick={() => deleteCoupon()} style={{ color: 'white', backgroundColor:  red[500] }}>DELETE</Button>
                        </Grid>
                        <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                            <Button onClick={() => setOpen(false)} style={{ backgroundColor: lightBlue[100] }}>CANCEL</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
}

export default ProfileCoupon;