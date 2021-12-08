import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Grid, Box } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { red } from '@mui/material/colors'
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import { FiEdit } from 'react-icons/fi'
import axios from 'axios';


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const listReciept = useSelector(state => state.listReciept)
    const infoUser = useSelector(state => state.infoUser)
    const regulation = useSelector(state => state.regulationReducer)
    const statusEditInfoBill = useSelector(state => state.statusEditInfoBill)
    const editReciept = (MAHD, coupon) => {
        if (coupon) {
            dispatch({
                type: "HIDE_ALERT",
            })
            dispatch({
                type: "SHOW_ALERT",
                message: "This bill has used to discount!",
                typeMessage: "warning"
            })
        } else {
            let objectInfoBill = [];
            listReciept.map(value => {
                if (value.MAHD === MAHD) {
                    objectInfoBill = value
                }
                return value;
            })
            if (!statusEditInfoBill) {
                dispatch({
                    type: "INFO_SHOPPING_BAGS_EDIT",
                    listProduct: objectInfoBill.listProduct,
                })
                dispatch({
                    type: "ADD_INFO_BILL_EDIT",
                    InfoBill: objectInfoBill,
                })
                dispatch({
                    type: "CHANGE_EDIT_INFOMATION_STATUS",
                })
                dispatch({
                    type: "CHANGE_HISTORY_RECIEPT_STATUS"
                })
            } else {
                dispatch({
                    type: "HIDE_ALERT",
                })
                dispatch({
                    type: "SHOW_ALERT",
                    message: "You are editing another bill!",
                    typeMessage: "warning"
                })
            }
        }
    }

    const TypeReciept = (isEdit, isDelete) => {
        if (isDelete) {
            return red[400]
        } else if (isEdit) {
            return '#f4f492'
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

    const showEdit = (isEdit, isDelete) => {
        if (isEdit || isDelete) {
            return true;
        }
    }

    const countQuantity = () => {
        let count = 0;
        row.listProduct.map(value => {
            count += value.quantity;
        })
        return count;
    }

    return (
        <React.Fragment>
            <TableRow style={{ backgroundColor: TypeReciept(row.isEdit, row.deleted), borderWidth: open ? '2px' : null, borderStyle: 'solid', borderColor: '#90a4ae #90a4ae transparent #90a4ae' }} sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                <TableCell align="right">
                    {regulation.currency === 'vnd' ? (row.totalMoney).toLocaleString() : ((row.totalMoney) / regulation.exchangeRate).toFixed(2).toLocaleString()}
                </TableCell>
                <TableCell align="right">{row.discount}</TableCell>
                <TableCell align="right">
                    {regulation.currency === 'vnd' ? (row.totalFinalMoney).toLocaleString() : ((row.totalFinalMoney) / regulation.exchangeRate).toFixed(2).toLocaleString()}
                </TableCell>
                <TableCell>
                    {!showEdit(row.isEdit, row.deleted) ? (
                        <IconButton onClick={() => editReciept(row.MAHD, row.coupon)} color="secondary" aria-label="fingerprint">
                            <FiEdit />
                        </IconButton>
                    ) : null}
                </TableCell>
            </TableRow>
            <TableRow style={{ borderWidth: open ? '2px' : null, borderStyle: 'solid', borderColor: 'transparent #90a4ae #90a4ae #90a4ae' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography style={{ fontWeight: '600' }} variant="h6" gutterBottom component="div">
                                Detail Recipet
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item lg={6} md={12} xs={12}>
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
                                                    <TableCell align="right">
                                                        {regulation.currency === 'vnd' ? (value.product.sellPrice).toLocaleString() : ((value.product.sellPrice) / regulation.exchangeRate).toFixed(2).toLocaleString()}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {regulation.currency === 'vnd' ? (value.quantity * value.product.sellPrice).toLocaleString() : ((value.quantity * value.product.sellPrice) / regulation.exchangeRate).toFixed(2).toLocaleString()}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Grid>
                                <Grid style={{ borderLeft: '1px solid black', marginTop: '15px' }} item lg={6} md={12} xs={12}>
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
                                                    <p style={{ marginBottom: '0' }}>{StatusTypeReciept(row.isEdit, row.isDelete)}</p>
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
                                                    <p style={{ marginBottom: '0' }}>
                                                        {regulation.currency === 'vnd' ? (row.totalMoney).toLocaleString() : ((row.totalMoney) / regulation.exchangeRate).toFixed(2).toLocaleString()}
                                                    </p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Coupon:</p>
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
                                                    <p style={{ marginBottom: '0' }}>
                                                        {regulation.currency === 'vnd' ? (row.totalFinalMoney - row.totalMoney).toLocaleString() : ((row.totalFinalMoney - row.totalMoney) / regulation.exchangeRate).toFixed(2).toLocaleString()}
                                                    </p>
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
                                                    <p style={{ marginBottom: '0', fontWeight: '600' }}>
                                                        {regulation.currency === 'vnd' ? (row.totalFinalMoney).toLocaleString() : ((row.totalFinalMoney) / regulation.exchangeRate).toFixed(2).toLocaleString()}
                                                    </p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
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

    const listReciept = useSelector(state => state.listReciept)

    return (
        <TableContainer style={{ overflowX: 'hidden' }} component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow style={{ backgroundColor: 'black', color: 'white' }}>
                        <TableCell />
                        <TableCell >Id Receipt</TableCell>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Discount</TableCell>
                        <TableCell align="right">Total final</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listReciept ?
                        listReciept.map((row) => (
                            <Row key={row.MAHD} row={row} />
                        )) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
