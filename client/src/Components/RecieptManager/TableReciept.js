import * as React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { Grid, Box, Button, Checkbox, Modal } from '@mui/material';
import { red , lightBlue } from '@mui/material/colors';
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
    const [openModal, setOpenModal] = React.useState(false);
    const statusSelectAll = useSelector(state => state.statusSelectAll)
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


    const DeleteReciept = (MAHD, isDelete) => {
        console.log(MAHD);
        if (isDelete) {
            setOpenModal(true)
        } else {
            setOpen(!open)
            dispatch({
                type: "DELETE_RECIEPT",
                MAHD: MAHD,
            })
        }
    }

    const PermanentlyDelete = (MAHD) => {
        console.log(MAHD)
        dispatch({
            type:"DELETE_ONE_RECIEPT",
            MAHD: MAHD,
        })
        setOpenModal(false)
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

   
    const label = { inputProps: { 'aria-label': 'Checkbox demo' }};

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
            <TableRow style={{ backgroundColor: TypeReciept(row.isEdit, row.isDelete) }} sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                                            <Button onClick={() => DeleteReciept(row.MAHD, row.isDelete)} style={{ fontWeight: '700', fontSize: '0.6rem', backgroundColor: 'red', color: 'white' }}>
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
    const listRecieptDelete = useSelector(state => state.listRecieptDelete)

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
    }, [typeReciept, typeByDate, listReciept])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    {console.log(listRecieptDelete)}
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
                            <Row key={row.MAHD} row={row} />
                        )) : null
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}
