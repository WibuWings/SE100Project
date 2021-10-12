import React, { Component } from 'react';
import { Card, CardHeader, Divider, TableHead, TableRow, Paper, Box, Button, CardContent, Table, TableBody, TableCell, TableContainer } from '@mui/material';
import { BiPlusMedical } from 'react-icons/bi';
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { tableCellClasses } from '@mui/material/TableCell';
import { connect } from 'react-redux'
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




class ListShift extends Component {

    handleEdit = (e, id, description, from, to , value) => {
        const data = {
            description: description,
            from: from,
            id: id,
            to: to,
            value: value,
        }
        console.log(data);
        if (id) {
            this.props.objectEditShift(data)
            this.props.changeEditShiftStatus();
            this.props.changeAddStatus();
        }
    }

    handleAdd = () => {
        this.props.changeAddStatus();
    }

    handleDelete = (e) => {
        var elementShift = e.target.parentElement;
        var idShift = elementShift.name;
        if (!idShift) {
            idShift = elementShift.parentElement.name;
        }

        if (idShift) {
            this.props.deleteShift(idShift);
            axios.post(`http://localhost:5000/api/delete-shift`, {
                email: this.props.infoUser.email,
                idShift: idShift
            })
                .then(res => {
                    console.log("Thành công");
                })
                .catch(err => {
                    console.log("thất bại");
                })
        }

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
                            {this.props.listShift.map(item => {
                                return (
                                    <TableBody>
                                        <StyledTableRow key="abc">
                                            <StyledTableCell component="th" scope="row">{item.description}</StyledTableCell>
                                            <StyledTableCell align="center">{item.from}</StyledTableCell>
                                            <StyledTableCell align="center">{item.to}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton name={item.id} onClick={(e) => this.handleEdit(e, item.id, item.description, item.from, item.to, item.value)} color="secondary" aria-label="fingerprint">
                                                    <FiEdit />
                                                </IconButton>
                                            </StyledTableCell>
                                            <StyledTableCell align="center">
                                                <IconButton name={item.id} onClick={(e) => this.handleDelete(e)} style={{ color: 'red' }} aria-label="fingerprint">
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
                    <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleAdd()} variant="contained" startIcon={<BiPlusMedical />}>
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
        listShift: state.listShift,
        infoUser: state.infoUser,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
            });
        },
        deleteShift: (idShift) => {
            dispatch({
                type: "DELETE_SHIFT",
                idShift: idShift,
            })
        },
        changeEditShiftStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_SHIFT_STATUS",
            })
        },
        objectEditShift: (data) => {
            dispatch({
                type: "OBJECT_EDIT_SHIFT",
                data: data
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListShift);