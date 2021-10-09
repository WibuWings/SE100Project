import React, { Component } from 'react';
import { Card, CardHeader, Divider, TableHead, TableRow, Paper, Box, Button, CardContent, Table, TableBody, TableCell, TableContainer } from '@mui/material';
import { BiPlusMedical } from 'react-icons/bi';
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import { FiEdit ,FiTrash2} from 'react-icons/fi'
import { tableCellClasses } from '@mui/material/TableCell';
import {connect} from 'react-redux'

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




class ListShift extends Component {

    handleEdit = ()=>{
        console.log("click");
        this.props.changeAddStatus();
    }


    render() {
        return (
            <Card style={{ position: "relative", marginTop: '15px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="List Shift" />
                <Divider />
                <CardContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Description</StyledTableCell>
                                    <StyledTableCell align="center">From</StyledTableCell>
                                    <StyledTableCell align="center">To</StyledTableCell>
                                    <StyledTableCell align="center">Edit</StyledTableCell>
                                    <StyledTableCell align="center">Delete</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow key="abc">
                                    <StyledTableCell component="th" scope="row">Ca 1</StyledTableCell>
                                    <StyledTableCell align="center">10:00 AM</StyledTableCell>
                                    <StyledTableCell align="center">12:00 PM</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton onClick={() => this.handleEdit()} color="secondary" aria-label="fingerprint">
                                            <FiEdit />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton onClick={() => this.handleEdit()} style={{color:'red'}} aria-label="fingerprint">
                                            <FiTrash2 />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                            <TableBody>
                                <StyledTableRow key="abc">
                                    <StyledTableCell component="th" scope="row">Ca 1</StyledTableCell>
                                    <StyledTableCell align="center">10:00 AM</StyledTableCell>
                                    <StyledTableCell align="center">12:00 PM</StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton onClick={() => this.handleEdit()} color="secondary" aria-label="fingerprint">
                                            <FiEdit />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">
                                        <IconButton  onClick={() => this.handleEdit()} style={{color:'red'}} aria-label="fingerprint">
                                            <FiTrash2 />
                                        </IconButton>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
                <Divider />
                <Box className="add-shift" sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                    <Button style={{ backgroundColor: 'yellowgreen' }} onClick={()=> this.handleEdit()} variant="contained" startIcon={<BiPlusMedical />}>
                        add
                    </Button>
                </Box>
            </Card>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addStatus: state.addStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
            });
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(ListShift);