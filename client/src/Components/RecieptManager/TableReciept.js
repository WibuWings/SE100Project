import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Grid, Box, Button, Checkbox } from '@mui/material';
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

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const statusSelectAll = useSelector(state => state.statusSelectAll)
    const dispatch = useDispatch();
    const [statusSelectReplace, setStatusSelectReplace] = React.useState(false);
    
    React.useEffect(() => {
        setStatusSelectReplace(statusSelectAll)
    },[statusSelectAll])

    const countQuantity = () => {
        let count = 0;
        row.listProduct.map(value => {
            count += value.quantity;
        })
        return count;
    }

    const DeleteReciept = (MAHD) => {
        console.log(MAHD);
        setOpen(!open)
        dispatch({
            type: "DELETE_RECIEPT",
            MAHD: MAHD,
        })
    }

    const TypeReciept = (isEdit, isDelete) => {
        if (isDelete) {
            return 'red'
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

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const ChangeCheckbox = (e, MAHD) => {
        setStatusSelectReplace(!statusSelectReplace);
        console.log(e.target.checked)
        console.log(MAHD)
    }

    return (
        <React.Fragment>
            <TableRow style={{ backgroundColor: TypeReciept(row.isEdit, row.isDelete) }} sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    {console.log(statusSelectAll)}
                    <Checkbox {...label}   checked={statusSelectReplace}  onChange={(e) => ChangeCheckbox(e, row.MAHD)} color="default" />
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
                <TableCell align="right">{row.totalMoney}</TableCell>
                <TableCell align="right">{row.discount}</TableCell>
                <TableCell align="right">{row.totalFinalMoney}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography style={{ fontWeight: '600' }} variant="h6" gutterBottom component="div">
                                Detail Recipet
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid item md={6} xs={6}>
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
                                <Grid item md={6} xs={6}>
                                    <Grid container spacing={3}>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Mã hóa đơn:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.MAHD}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Trạng thái:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{StatusTypeReciept(row.isEdit, row.isDelete)}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Thời gian:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.date}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Giờ:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.time}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Mã HD củ:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.oldBill ? row.oldBill.MAHD : "Không có"}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Người bán:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.name}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Tổng số lượng:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{countQuantity()}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Tổng tiền hàng:</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.totalMoney.toLocaleString()}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>Giảm giá (%):</p>
                                                </Grid>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0' }}>{row.discount}</p>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item md={6} xs={6}>
                                            <Grid container>
                                                <Grid item md={6} xs={6}>
                                                    <p style={{ marginBottom: '0', fontWeight: '600' }}>TỔNG:</p>
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
                                        <Grid style={{ justifyContent: 'end' }} item md={2} xs={2}>
                                            <Button onClick={() => DeleteReciept(row.MAHD)} style={{ fontWeight: '700', fontSize: '0.6rem', backgroundColor: 'red', color: 'white' }}>
                                                <FiXSquare style={{ marginRight: '5px', fontSize: '1rem', transform: 'translateY(-5%)' }}></FiXSquare>
                                                Xóa bỏ
                                            </Button>
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
    const typeReciept = useSelector(state => state.typeReciept)
    const listReciept = useSelector(state => state.listReciept)
    const typeByDate = useSelector(state => state.typeByDate)
    const [listRecieptReplace, setListRecieptReplace] = React.useState(listReciept);


    React.useEffect(() => {
        var list = typeReciept.length === 0 ? listReciept : listReciept.filter(value => {
            for (var i = 0; i < typeReciept.length; i++) {
                if (typeReciept[i] === 'delete') {
                    if (value.isDelete) {
                        return value;
                    }
                } else if (typeReciept[i] === 'return') {
                    if (!value.isDelete && value.isEdit) {
                        return value;
                    }
                } else {
                    if (!value.isDelete && !value.isEdit) {
                        return value;
                    }
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

        console.log(typeByDate)
        setListRecieptReplace(list)
    }, [typeReciept, typeByDate])

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow style={{ backgroundColor: 'black', color: 'white' }}>
                        <TableCell>
                            
                        </TableCell>
                        <TableCell />
                        <TableCell >Mã HĐ</TableCell>
                        <TableCell align="right">Ngày hóa đơn</TableCell>
                        <TableCell align="right">Tổng hóa đơn</TableCell>
                        <TableCell align="right">Giảm giá</TableCell>
                        <TableCell align="right">Khách hàng trả</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listRecieptReplace ?
                        listRecieptReplace.map((row) => (
                            <Row key={row.MAHD}  row={row} />
                        )) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
