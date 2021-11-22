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

    handleEdit = (e, id, description, from, to, salary) => {
        const data = {
            description: description,
            from: from,
            id: id,
            to: to,
            salary: salary,
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

    handleDelete = (idShift) => {
        if (idShift) {
            axios.post(`http://localhost:5000/api/profile/delete-shift`, {
                token: localStorage.getItem('token'),
                email: this.props.infoUser.email,
                idShift: idShift
            })
                .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('token', res.data.token);
                        this.props.deleteShift(idShift);
                        this.props.hideAlert();
                        this.props.showAlert("Delete shift success", "success");
                    }
                })
                .catch(err => {
                    this.props.changeLoginStatus();
                    this.props.hideAlert();
                    this.props.showAlert("Login timeout, signin again", "warning");
                })
        }

    }

    render() {
        return (
            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                <Card style={{ position: "relative", marginTop: '15px'}}>
                    <CardHeader style={{ color: !this.props.statusDarkmode ? '#0091ea' : 'white', backgroundColor: !this.props.statusDarkmode ? '#efeeef' : '#455a64' }} title="List Shift" />
                    <Divider />
                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Description</StyledTableCell>
                                        <StyledTableCell align="center">Salary</StyledTableCell>
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
                                                <StyledTableCell component="th" scope="row">{item.name}</StyledTableCell>
                                                <StyledTableCell align="center">{item.salary}</StyledTableCell>
                                                <StyledTableCell align="center">{item.timeFrom}</StyledTableCell>
                                                <StyledTableCell align="center">{item.timeEnd}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton name={item._id.shiftID} onClick={(e) => this.handleEdit(e, item._id.shiftID, item.name, item.timeFrom, item.timeEnd, item.salary)} color="secondary" aria-label="fingerprint">
                                                        <FiEdit />
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton name={item._id.shiftID} onClick={(e) => this.handleDelete(item._id.shiftID)} style={{ color: 'red' }} aria-label="fingerprint">
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
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addStatus: state.addStatus,
        listShift: state.listShift,
        infoUser: state.infoUser,
        statusDarkmode: state.statusDarkmode
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
        },
        showAlert: (message, typeMessage) => {
            dispatch({
                type: "SHOW_ALERT",
                message: message,
                typeMessage: typeMessage,
            })
        },
        changeLoginStatus: () => {
            dispatch({
                type: "CHANGE_LOGIN_STATUS",
            });
        },
        hideAlert: () => {
            dispatch({
                type: "HIDE_ALERT",
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListShift);