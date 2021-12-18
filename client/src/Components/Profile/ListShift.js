import React, { Component } from 'react';
import { Modal ,Grid,Card, CardHeader, Divider, TableHead, TableRow, Paper, Box, Button, CardContent, Table, TableBody, TableCell, TableContainer } from '@mui/material';
import { BiPlusMedical } from 'react-icons/bi';
import { IconButton } from '@mui/material'
import { styled } from '@mui/material/styles';
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { tableCellClasses } from '@mui/material/TableCell';
import { connect } from 'react-redux'
import axios from 'axios';
import { red, blue, lightBlue } from '@mui/material/colors';
import { CgDanger } from 'react-icons/cg'
import { useSelector, useDispatch } from 'react-redux'
import {TiArrowBack} from 'react-icons/ti'


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


class ListShift extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    deleteShiftId = ''

    handleEdit = (e, id, description, from, to, salary) => {
        const data = {
            description: description,
            from: from,
            id: id,
            to: to,
            salary: salary,
        }
        if (id) {
            this.props.objectEditShift(data)
            this.props.changeEditShiftStatus();
            this.props.changeAddStatus();
        }
    }

    showModal = (id) => {
        this.setState({
            open: true
        })
        this.deleteShiftId = id;
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
                        this.setState({
                            open: false 
                        })
                    }
                })
                .catch(err => {
                    this.setState({
                        open: false 
                    })
                    this.props.changeLoginStatus();
                    this.props.hideAlert();
                    this.props.showAlert("Login timeout, signin again", "warning");
                })
        }

    }

    render() {
        return (
            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                <Card style={{ position: "relative", marginTop: '15px' }}>
                    <CardHeader style={{ color: !this.props.statusDarkmode ? '#0091ea' : 'white', backgroundColor: !this.props.statusDarkmode ? '#efeeef' : '#455a64' }} title="List Shift" />
                    <Divider />
                    <CardContent>
                        <TableContainer id="choses-product" component={Paper}>
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
                                                <StyledTableCell align="center">
                                                    {this.props.regulation == {} ? (item.salary).toLocaleString() : this.props.regulation.currency === 'vnd' ? (item.salary).toLocaleString() : ((item.salary) / this.props.regulation.exchangeRate).toFixed(2).toLocaleString()}
                                                </StyledTableCell>
                                                <StyledTableCell align="center">{item.timeFrom}</StyledTableCell>
                                                <StyledTableCell align="center">{item.timeEnd}</StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton name={item._id.shiftID} onClick={(e) => this.handleEdit(e, item._id.shiftID, item.name, item.timeFrom, item.timeEnd, item.salary)} color="secondary" aria-label="fingerprint">
                                                        <FiEdit />
                                                    </IconButton>
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <IconButton name={item._id.shiftID} onClick={(e) => this.showModal(item._id.shiftID)} style={{ color: 'red' }} aria-label="fingerprint">
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
                <Modal
                    open={this.state.open}
                    onClose={() => this.setState({open: false})}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description"
                >
                    <Box sx={{ ...style, width: 400 }}>
                        <h2 style={{ textAlign: 'center', fontSize: '1.4rem', marginBottom: '15px' }} >Are you sure delete this shift ?</h2>
                        <Divider />
                        <Grid style={{ marginTop: '5px' }} container spacing={2}>
                            <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                                <Button onClick={(e) => this.handleDelete(this.deleteShiftId)} style={{ color: 'white', backgroundColor: red[500] }}>DELETE</Button>
                            </Grid>
                            <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                                <Button onClick={() => this.setState({open: false})} style={{ backgroundColor: lightBlue[100] }}>CANCEL</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addStatus: state.addStatus,
        listShift: state.listShift,
        infoUser: state.infoUser,
        statusDarkmode: state.statusDarkmode,
        regulation: state.regulationReducer
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