import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Grid, Box, Button, Checkbox, Modal } from '@mui/material';
import { red, lightBlue } from '@mui/material/colors';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { FiXSquare } from 'react-icons/fi'
import { TiArrowBack } from 'react-icons/ti'

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const statusSelectAll = useSelector(state => state.statusSelectAll)
    const infoUser = useSelector(state => state.infoUser)
    const dispatch = useDispatch();
    const [statusSelectReplace, setStatusSelectReplace] = React.useState(false);

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

    React.useEffect(() => {
        setStatusSelectReplace(statusSelectAll)
    }, [statusSelectAll])

    const countQuantity = () => {
        let count = 0;
        row.listProduct.map(value => {
            count += value.quantity;
        })
        return count;
    }

    const handleClose = () => {
        setOpen(false);
    };

    //Xoa mềm
    const DeleteReciept = (MAHD, isDelete) => {
        if (isDelete) {
            setOpenModal(true)
        } else {
            axios.post('http://localhost:5000/api/sell-product/soft-delete', {
                token: localStorage.getItem('token'),
                email: infoUser.email,
                MAHD: MAHD
            })
                .then(res => {
                    if (res.data.status === 1) {
                        localStorage.setItem('token', res.data.token)
                        dispatch({
                            type: "DELETE_RECIEPT",
                            MAHD: MAHD,
                        })
                        dispatch({
                            type: "HIDE_ALERT",
                        })
                        dispatch({
                            type: "SHOW_ALERT",
                            message: 'Delete success',
                            typeMessage: 'success',
                        })
                    }
                })
                .catch(err => {
                    dispatch({
                        type: "CHANGE_LOGIN_STATUS",
                    });
                    dispatch({
                        type: "HIDE_ALERT",
                    })
                    dispatch({
                        type: "SHOW_ALERT",
                        message: 'Login timeout, signin again',
                        typeMessage: 'warning',
                    })
                })
            setOpen(!open)
        }
    }

    // Xóa vĩnh viễn
    const PermanentlyDelete = async (MAHD) => {
        axios.post('http://localhost:5000/api/sell-product/permanently-delete', {
            token: localStorage.getItem('token'),
            email: infoUser.email,
            MAHD: MAHD
        })
            .then(res => {
                if (res.data.status === 1) {
                    localStorage.setItem('token', res.data.token)
                    dispatch({
                        type: "DELETE_ONE_RECIEPT",
                        MAHD: MAHD,
                    })
                    dispatch({
                        type: "HIDE_ALERT",
                    })
                    dispatch({
                        type: "SHOW_ALERT",
                        message: 'Delete success',
                        typeMessage: 'success',
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: "CHANGE_LOGIN_STATUS",
                });
                dispatch({
                    type: "HIDE_ALERT",
                })
                dispatch({
                    type: "SHOW_ALERT",
                    message: 'Login timeout, signin again',
                    typeMessage: 'warning',
                })
            })
        setOpenModal(false)
    }

    const TypeReciept = (isEdit, isDelete, oldBill) => {
        if (isDelete) {
            return red[400]
        } else if (isEdit) {
            return '#f4f492'
        } else if (oldBill) {
            return '#00897b'
        } else {
            return '#a6ffa6'
        }
    }

    const StatusTypeReciept = (isEdit, isDelete) => {
        if (isDelete) {
            return 'Đã xóa'
        } else if (isEdit) {
            return 'Đổi trả'
        } else {
            return 'Thành công'
        }
    }

    const RestoneReciept = async (MAHD) => {
        await axios.post('http://localhost:5000/api/sell-product/restone-receipt', {
            token: localStorage.getItem('token'),
            email: infoUser.email,
            MAHD: MAHD
        })
            .then(res => {
                localStorage.setItem('token', res.data.token)
                if (res.data.status === 1) {
                    dispatch({
                        type: 'RESTONE_ONE_RECIEPT',
                        MAHD: MAHD
                    })
                    dispatch({
                        type: "HIDE_ALERT",
                    })
                    dispatch({
                        type: "SHOW_ALERT",
                        message: 'Restone success',
                        typeMessage: 'success',
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: "CHANGE_LOGIN_STATUS",
                });
                dispatch({
                    type: "HIDE_ALERT",
                })
                dispatch({
                    type: "SHOW_ALERT",
                    message: 'Login timeout, signin again',
                    typeMessage: 'warning',
                })
            })
        setOpen(false);
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const ChangeCheckbox = (e, MAHD) => {
        setStatusSelectReplace(!statusSelectReplace);
        if (e.target.checked) {
            dispatch({
                type: "ADD_MAHD_RECIEPT",
                MAHD: MAHD,
            })
        } else {
            dispatch({
                type: "DELETE_MAHD_RECIEPT",
                MAHD: MAHD,
            })
        }
    }

    return (
        <React.Fragment>
            <TableRow style={{ backgroundColor: TypeReciept(row.isEdit, row.deleted, row.oldBill), borderWidth: open ? '2px' : null, borderStyle: 'solid', borderColor: '#90a4ae #90a4ae transparent #90a4ae' }} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <Checkbox {...label} checked={statusSelectReplace} onChange={(e) => ChangeCheckbox(e, row.MAHD)} color="default" />
                </TableCell>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.MAHD}
                </TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.totalMoney.toLocaleString()}</TableCell>
                <TableCell align="right">{row.discount}</TableCell>
                <TableCell align="right">{row.totalFinalMoney.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow style={{ borderWidth: open ? '2px' : null, borderStyle: 'solid', borderColor: 'transparent #90a4ae #90a4ae #90a4ae' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography style={{ fontWeight: '600' }} variant="h6" gutterBottom component="div">
                                Detail Recipet
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item lg={6} md={12} sm={12} xs={12}>
                                    <Table size="small" aria-label="purchases">
                                        <TableHead>
                                            <TableRow>

                                                <TableCell>#</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Quantity</TableCell>
                                                <TableCell align="right">Price</TableCell>
                                                <TableCell align="right">Total Price</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row.listProduct.map((value, key) => (
                                                <TableRow key={value.name}>
                                                    <TableCell>
                                                        {key + 1}
                                                    </TableCell>
                                                    <TableCell>{value.product.name}</TableCell>
                                                    <TableCell>{value.quantity}</TableCell>
                                                    <TableCell align="right">{value.product.sellPrice.toLocaleString()}</TableCell>
                                                    <TableCell align="right">
                                                        {(value.quantity * value.product.sellPrice).toLocaleString()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid style={{ borderLeft: '1px solid black', marginTop: '15px' }} item lg={6} md={12} sm={12} xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Id Receipt:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.MAHD}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Status:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{StatusTypeReciept(row.isEdit, row.deleted)}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Date:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.date}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Time:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.time}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Old bill:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.oldBill ? row.oldBill.MAHD : "Không có"}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Seller:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.name}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Total quanitty:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{countQuantity()}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Total money:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.totalMoney.toLocaleString()}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Id coupon:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.coupon ? row.coupon.idCoupon : "Không áp dụng"}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Reduce money:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{(row.totalFinalMoney - row.totalMoney).toLocaleString()}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Discount (%):</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.discount}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0', fontWeight: '600' }}>TOTAL:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0', fontWeight: '600' }}>{row.totalFinalMoney.toLocaleString()}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid style={{ marginBottom: '10px' }} item md={12} xs={12}>
                                    <Grid style={{ justifyContent: 'end' }} container>
                                        {row.deleted ? (
                                            <Grid style={{ justifyContent: 'end' }} item md={2} xs={2}>
                                                <Button onClick={() => RestoneReciept(row.MAHD)} style={{ fontWeight: '700', fontSize: '0.6rem', backgroundColor: '#00bfa5', color: 'white' }}>
                                                    <TiArrowBack style={{ marginRight: '5px', fontSize: '1rem', transform: 'translateY(-5%)' }}></TiArrowBack>
                                                    Restone
                                                </Button>
                                            </Grid>
                                        ) : null}
                                        <Grid style={{ justifyContent: 'end' }} item md={2} xs={2}>
                                            <Button onClick={() => DeleteReciept(row.MAHD, row.deleted)} style={{ fontWeight: '700', fontSize: '0.6rem', backgroundColor: red[400], color: 'white' }}>
                                                <FiXSquare style={{ marginRight: '5px', fontSize: '1rem', transform: 'translateY(-5%)' }}></FiXSquare>
                                                Delete
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 style={{ textAlign: 'center' }} id="parent-modal-title">Are you sure to delete?</h2>
                    <Grid container spacing={2}>
                        <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                            <Button onClick={() => PermanentlyDelete(row.MAHD)} style={{ color: 'white', backgroundColor: red[500] }}>DELETE</Button>
                        </Grid>
                        <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                            <Button onClick={() => setOpenModal(false)} style={{ backgroundColor: lightBlue[100] }}>CANCEL</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};


export default function CollapsibleTable() {
    const typeReciept = useSelector(state => state.typeReciept)
    const listReciept = useSelector(state => state.listReciept)
    const typeByDate = useSelector(state => state.typeByDate)
    const [listRecieptReplace, setListRecieptReplace] = React.useState(listReciept);
    const statusSelectAll = useSelector(state => state.statusSelectAll)
    const search = useSelector(state => state.search)
    const dispatch = useDispatch()
    let listMAHD = []
    React.useEffect(() => {
        var list = typeReciept.length === 0 ? listReciept : listReciept.filter(value => {
            for (var i = 0; i < typeReciept.length; i++) {
                switch (typeReciept[i]) {
                    case 'delete':
                        if (value.deleted) {
                            return value;
                        }
                        break;
                    case 'return':
                        if (!value.deleted && value.isEdit) {
                            return value;
                        }
                        break;
                    default:
                        if (!value.deleted && !value.isEdit) {
                            return value;
                        }
                        break;
                }
            }
        })

        if (typeByDate.type === 'typeByDate' || typeByDate.type === 'yesterday' || typeByDate.type === 'today') {
            list = list.filter(value => {
                let timeMau = value.date;
                timeMau = timeMau.replace(/\s/g, "");
                timeMau = timeMau.split("/");
                if (typeByDate.day == timeMau[0] && typeByDate.month == timeMau[1] && typeByDate.year == timeMau[2]) {
                    return value;
                }
            })
        }

        if (typeByDate.type === 'lastmonth') {
            list = list.filter(value => {
                let timeMau = value.date;
                timeMau = timeMau.replace(/\s/g, "");
                timeMau = timeMau.split("/");
                if (typeByDate.month == timeMau[1] && typeByDate.year == timeMau[2]) {
                    return value;
                }
            })
        }

        if (typeByDate.type === 'lastyear') {
            list = list.filter(value => {
                let timeMau = value.date;
                timeMau = timeMau.replace(/\s/g, "");
                timeMau = timeMau.split("/");
                if (typeByDate.year == timeMau[2]) {
                    return value;
                }
            })
        }

        if (search.length !== 0) {
            list = list.filter(value => {
                let isCheck = true
                for (let i = 0; i < search.length; i++) {
                    if (search[0] !== value.MAHD[0]) {
                        isCheck = false;
                        break;
                    }
                }
                if (isCheck) {
                    return value;
                }
            })
        }

        list.map(value => {
            listMAHD.push(value.MAHD)
        })

        statusSelectAll ? dispatch({
            type: "SELECTED_ALL_RECIEPT",
            listMAHD: listMAHD,
        }) : dispatch({
            type: "RESET_MAHD_RECIEPT"
        })
        setListRecieptReplace(list)
    }, [typeReciept, typeByDate, listReciept, statusSelectAll, search])


    return (
        <TableContainer style={{ overflowX: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }} component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow style={{ backgroundColor: 'black', color: 'white' }}>
                        <TableCell>
                        </TableCell>
                        <TableCell />
                        <TableCell >ID Receipt</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Discount</TableCell>
                        <TableCell align="right">Total final</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listRecieptReplace ?
                        listRecieptReplace.map((row) => (
                            <Row key={row.MAHD} row={row} />
                        )) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
