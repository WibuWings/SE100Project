import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import { FiEdit } from 'react-icons/fi'


function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch();
    const listReciept = useSelector(state => state.listReciept)

    const editReciept = (MAHD) => {
        let objectInfoBill = [];
        listReciept.map(value => {
            if (value.MAHD === MAHD) {
                objectInfoBill = value
            }
        })
        dispatch({
            type: "EDIT_SHOPPING_BAGS",
            MAHD: MAHD,
        })
        dispatch({
            type: "INFO_SHOPPING_BAGS_EDIT",
            listProduct: objectInfoBill.listProduct,
        })
        dispatch({
            type:"ADD_INFO_BILL_EDIT",
            InfoBill: objectInfoBill,
        })
        dispatch({
            type: "CHANGE_EDIT_INFOMATION_STATUS",
        })
        dispatch({
            type: "CHANGE_HISTORY_RECIEPT_STATUS"
        })
    }

    return (
        <React.Fragment>
            <TableRow style={{ backgroundColor: !row.isEdit ? '#a6ffa6' : '#f4f492' }} sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
                <TableCell align="right">{row.discount}</TableCell>
                <TableCell align="right">{row.totalMoney}</TableCell>
                <TableCell>
                    {!row.isEdit ? (
                        <IconButton onClick={() => editReciept(row.MAHD)} color="secondary" aria-label="fingerprint">
                            <FiEdit />
                        </IconButton>
                    ) : null}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell align="right">Amount</TableCell>
                                        <TableCell align="right">Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">
                                            {row.name}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
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
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow style={{ backgroundColor: 'black', color: 'white' }}>
                        <TableCell />
                        <TableCell >Mã HĐ</TableCell>
                        <TableCell align="right">Người bán</TableCell>
                        <TableCell align="right">Ngày hóa đơn</TableCell>
                        <TableCell align="right">Giảm giá</TableCell>
                        <TableCell align="right">Tổng tiền</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {console.log(listReciept)}
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
