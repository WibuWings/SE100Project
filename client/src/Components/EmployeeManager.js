import React, { Component } from 'react';
import Page from './EmployeePartials/Page';
import Label from './EmployeePartials/Label';
import Scrollbar from './EmployeePartials/Scrollbar';
import SearchNotFound from './EmployeePartials/SearchNotFound';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import {connect} from 'react-redux'
import plusFill from '@iconify/icons-eva/plus-fill';
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
import EmployeeToolbar from './EmployeePartials/EmployeeToolbar';
import EmployeeMoreMenu from './EmployeePartials/EmployeeMoreMenu';
import SackedEmployeeMenu from './EmployeePartials/SackedEmployeeMenu';
import EmployeeTableHeader from './EmployeePartials/EmployeeTableHeader';
import USERLIST from './EmployeePartials/fakeData'
import AddEmployeeModal from './EmployeePartials/AddEmployeeModal';
import UpdateEmployeeModal from './EmployeePartials/UpdateEmployeeModal';
import PayMoneyModal from './EmployeePartials/PayMoneyModal';
import FixedCalendar from './EmployeePartials/FixedCalendar';
import UnShiftEmployee from './EmployeePartials/UnShiftEmployee';
import AddNextWeekTimeKeepingModal from './EmployeePartials/AddNextWeekTimeKeeping';
import UpdateNextWeekTimeKeepingModal from './EmployeePartials/UpdateNextWeekTimeKeeping';
import NoJobEmployee from './EmployeePartials/NoJobEmployee';
import { withStyles } from '@material-ui/styles';
import TimekeepingTable from './EmployeePartials/TimekeepingTable';
import AddTimeKeepingModal from './EmployeePartials/AddTimeKeeperModal';
import UpdateTimeKeepingModal from './EmployeePartials/UpdateTimeKeepingModal';

import axios from 'axios';

function EmployeeObj(employeeID, managerID, password, firstName, lastName, 
    phoneNumber, dateOfBirth, email, address, cardID, startDate, endDate) {
    return {
        employeeID: employeeID,
        managerID: managerID,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        email: email,
        address: address,
        cardID: cardID,
        startDate: startDate,
        endDate: endDate,
    };
}

const TABLE_HEAD = [
    { id: 'ID', label: 'ID', alignCenter: true },
    { id: 'firstName', label: 'Name', alignCenter: true },
    { id: 'lastName', label: 'Last Name', alignCenter: true },
    { id: 'old', label: 'Old', alignCenter: true },
    { id: 'gender', label: 'Gender', alignCenter: true },
    { id: 'province', label: 'Province', alignCenter: true },
    { id: 'phoneNumber', label: 'Phone', alignCenter: true },
    { id: 'email', label: 'Email', alignCenter: true },
    { id: 'adress', label: 'Adress', alignCenter: true },
    { id: '' }
];

const styles = theme =>  ({
    goodTable: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid'
    },
    goodTable_Cell_Header: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid',
        height: '40px',
    },
    goodTable_Cell: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid',
        height: '80px',
    } 
})

var selected = [];
var filterName = "";
var filteredUsers = [];
var listUsers = [];
var page = 5;
var rowsPerPage = 5;
class EmployeeManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            change: false,
        }; 
        //this.getAllEmployee();
        // this.getAllEmployee();
        this.getSackedEmployee();
    }

    handleFilterByName(event){
        filterName = event.target.value;
    }

    addEmployee () {
        this.props.changeAddEmployeeStatus();
    }
    // Lấy danh sách các nhân viên
    async getAllEmployee () {
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        await axios.get(`http://localhost:5000/api/employee/`, {
            params: {...data}
        })
            .then(res => {
                result = res.data.data;
            })
            .catch(err => {
                alert(err)
            })
        listUsers = [];
        for(var i = 0; i < result.length; i++)
        {
            listUsers.push(result[i]);
        }
        // Thêm vào cái redux
        this.props.getEmployee(listUsers);
        this.setState({change: !this.state.change});
    }
    // Thêm nhân viên
    addEmployeeToDatabase()
    {
        const data = {
            token: localStorage.getItem('token'),
            employee: {
                _id: {
                    employeeID: "1",
                    storeID: "19522006@gm.uit.edu.vn",
                },
                managerID: "19522006@gm.uit.edu.vn",
                password: "abc123",
                firstName: "Antonio",
                lastName: "Rudiger",
                phoneNumber: "03232323232",
                dateOfBirth: "2021-11-02T00:00:00.000Z",
                email: "1911@gmail.com",
                address: "Wherever",
                cardID: "25110985819",
                startDate: "2021-11-02T00:00:00.000Z",
                endDate: "2021-11-31T00:00:00.000Z",
            }   
        }
        axios.post(`http://localhost:5000/api/employee`, data)
            .then(res => {
                console.log("Save success");
                alert("Lưu thành công")
            })
            .catch(err => {
                alert(err);
                console.log(err);
            })
    }
    // Xoá nhân viên
    deleteEmployeeFromDatabase()
    {
        const data = {
            token: localStorage.getItem('token'),
            employee:
            [
                {
                    employeeID: "1",
                    storeID: "19522006@gm.uit.edu.vn", 
                },
            ]
            
        }
        axios.delete(`http://localhost:5000/api/employee`,{data: data})
            .then(res => {
                alert("delete employee(s) success");
            })
            .catch(err => {
                alert(err);
            })
    }
    // Sửa nhân viên
    updateEmployee()
    {
        const data = {
            token: localStorage.getItem('token'),
            employee: {
                _id: {
                    employeeID: "1",
                    storeID: "19522006@gm.uit.edu.vn",
                },
                managerID: "19522006@gm.uit.edu.vn",
                password: "abc123",
                firstName: "Antonio",
                lastName: "Rudiger Christensen",
                phoneNumber: "03232323232",
                dateOfBirth: "2021-11-02T00:00:00.000Z",
                email: "1911@gmail.com",
                address: "Wherever",
                cardID: "25110985819",
                startDate: "2021-11-02T00:00:00.000Z",
                endDate: "2021-11-31T00:00:00.000Z",
            }
        }
        axios.put(`http://localhost:5000/api/employee`, data)
            .then(res => {
                console.log("Update success");
            })
            .catch(err => {
                console.log(err);
            })
    }

    async getSackedEmployee () {
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        await axios.get(`http://localhost:5000/api/employee/delete`, {
            params: {...data}
        })
            .then(res => {
                // alert("Lấy hết đc product ròi anh chai");
                result = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
        this.props.getSackedEmployee(result);
        this.setState({change: !this.state.change});
    }

    backToWork() {
        const data = {
            token: localStorage.getItem('token'),
            employee:
            [
                {
                    employeeID: "1",
                    storeID: "19522006@gm.uit.edu.vn", 
                },
            ]
            
        }
        axios.patch(`http://localhost:5000/api/employee/delete`, data)
            .then(res => {
                alert("back to work success");
            })
            .catch(err => {
                alert(err);
            })
    }

    // Xoá nhân viên hoàn toàn
    deleteEmployeePermantlyFromDatabase()
    {
        const data = {
            token: localStorage.getItem('token'),
            employee:
            [
                {
                    employeeID: "1",
                    storeID: "19522006@gm.uit.edu.vn", 
                },
            ]
            
        }
        axios.delete(`http://localhost:5000/api/employee/delete`,{data: data})
            .then(res => {
                alert("delete permantly employee(s) success");
            })
            .catch(err => {
                alert(err);
            })
    }

    componentWillMount() {
        document.title = 'Employee Manager'
    }

    render() {
        const { classes } = this.props;
        return (
            <div
                style={{display: 'block', overflowY: 'auto', height: '100vh'}}
                id="scroll-bar"
            >
                <Container
                    style={{marginTop: 20, }}
                >
                    <span
                        style = {{
                            color: "#fff",
                            padding: 12,
                            border: '1px solid cyan',
                            backgroundColor: '#222'
                        }}
                    >
                        Current Employee
                    </span>
                    <Button
                        variant='contained'
                        startIcon={<Icon icon={plusFill} />}
                        onClick={() => this.addEmployee()}
                    >
                        New User
                    </Button>

                    <Card style={{width: '100%', margin: 0}}>
                    {/* <EmployeeToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        // onFilterName={this.handleFilterByName(event)}
                    /> */}
                    <TableContainer id="scroll-bar" style ={{maxHeight:'500px' ,overflow: 'auto'}}>
                        <Table>
                            <EmployeeTableHeader
                                // order={order}
                                // orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={USERLIST.length}
                                numSelected={selected.length}
                                // onRequestSort={handleRequestSort}
                                // onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody
                                style={{height: '100%', width: '100%'}}
                            >
                            {
                                this.props.listEmployee.employees.map((row) => {
                                return (
                                    <TableRow
                                        hover
                                        // key={id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        // selected={isItemSelected}
                                        // aria-checked={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                            // checked={isItemSelected}
                                            // onChange={(event) => handleClick(event, name)}
                                            />
                                        </TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="center">
                                            {row._id.employeeID}
                                        </TableCell>
                                        <TableCell className = {classes.goodTable_Cell} component="th" scope="row" padding="none" align="center">
                                                {row.firstName}
                                        </TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="center">{row.lastName}</TableCell>  
                                        <TableCell className = {classes.goodTable_Cell}align="center">
                                            {row.dateOfBirth.indexOf('T') != -1 ? row.dateOfBirth.substring(0,row.dateOfBirth.indexOf('T')): row.dateOfBirth}
                                        </TableCell>
                                        <TableCell className = {classes.goodTable_Cell}align="center">{"gender"}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell}align="center">{"province"}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell}align="center">{row.phoneNumber}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell}align="center">{row.email}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell}align="center">{row.address}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell}align="right">
                                            <EmployeeMoreMenu
                                                data={row._id.employeeID}    
                                            >
                                            </EmployeeMoreMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={USERLIST.length}
                        // rowsPerPage={rowsPerPage}
                        // page={page}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                    </Card>
                </Container>
                <FixedCalendar/>
                <NoJobEmployee></NoJobEmployee>
                <UnShiftEmployee/>
                <TimekeepingTable></TimekeepingTable> 
                

                {/* Sacked EMployee */}
                <Container
                    style={{marginTop: 20, }}
                >
                    <span
                        style = {{
                            color: "#fff",
                            padding: 12,
                            border: '1px solid red',
                            backgroundColor: 'red'
                        }}
                    >
                        Sacked Employee
                    </span>

                    <Card>
                    {/* <EmployeeToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        // onFilterName={this.handleFilterByName(event)}
                    /> */}
                    <TableContainer id="scroll-bar"style ={{maxHeight:'500px',overflowY: 'scroll'}}>
                        <Table>
                            <EmployeeTableHeader
                                // order={order}
                                // orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                // rowCount={USERLIST.length}
                                // numSelected={selected.length}
                                // onRequestSort={handleRequestSort}
                                // onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody
                                style={{height: '100%', width: '100%'}}
                            >
                            {
                                this.props.listSackedEmployee.employees.map((row) => {
                                    
                                    // console.log("row", row);
                                    // if(row == {} || row == null) return (<div></div>);
                                return (
                                    <TableRow
                                        hover
                                        // key={id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        // selected={isItemSelected}
                                        // aria-checked={isItemSelected}
                                    >
                                        <TableCell className = {classes.goodTable_Cell} padding="checkbox">
                                            <Checkbox
                                            // checked={isItemSelected}
                                            // onChange={(event) => handleClick(event, name)}
                                            />
                                        </TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="left">
                                            {row._id.employeeID}
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                            {/* <Avatar alt={row.firstName} src={avatarUrl} /> */}
                                            <Typography variant="subtitle2" noWrap>
                                                {row.firstName}
                                            </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="left">{row.lastName}</TableCell>  
                                        <TableCell className = {classes.goodTable_Cell} align="left">{row.dateOfBirth.substring(0,row.dateOfBirth.indexOf('T'))}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="left">{"gender"}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="left">{"province"}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="left">{row.phoneNumber}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="left">{row.email}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="left">{row.address}</TableCell>
                                        <TableCell className = {classes.goodTable_Cell} align="right">
                                            <SackedEmployeeMenu
                                                data={row._id.employeeID}    
                                            >
                                            </SackedEmployeeMenu>
                                        </TableCell>
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {/* <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={USERLIST.length}
                        // rowsPerPage={rowsPerPage}
                        // page={page}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
                    /> */}
                    </Card>
                </Container>


                {/* Đây là phần modal */}
                {this.props.addEmployeeStatus ? (
                    <div 
                        className="modal-add"
                    >
                        <div onClick={() => {this.props.changeAddEmployeeStatus();}} className="modal-overlay"></div>
                        <AddEmployeeModal
                            style={{
                                marginTop: 0
                            }}
                        >
                        </AddEmployeeModal>
                    </div>
                ): null}
                {this.props.updateEmployeeStatus ? (
                    <div 
                        className="modal-add"
                    >
                        <div onClick={() => {this.props.changeUpdateEmployeeStatus();}} 
                            className="modal-overlay"
                        />
                        <UpdateEmployeeModal
                            style={{
                                marginTop: 0
                            }}
                        >
                        </UpdateEmployeeModal>
                    </div>
                ): null}
                {this.props.payEmployeeStatus ? (
                    <div 
                        className="modal-add"
                        style={{width: '100%'}}
                    >
                        <div onClick={() => {this.props.changePayEmployeeStatus();}} className="modal-overlay"></div>
                        <PayMoneyModal
                            style={{
                                marginTop: 0
                            }}
                        >
                        </PayMoneyModal>
                    </div>
                ): null}
                {this.props.statusAddNextWeekTimeKeeping 
                ? 
                    <div 
                        className="modal-add"
                    >
                        <div onClick={() => {this.props.changeAddNextWeekTimeKeepingStatus();}} className="modal-overlay"></div>
                        <AddNextWeekTimeKeepingModal
                            style={{
                                marginTop: 0
                            }}
                        >
                        </AddNextWeekTimeKeepingModal>
                    </div>
                : null
                }
                {this.props.statusUpdateNextWeekTimeKeeping 
                ? 
                    <div 
                        className="modal-add"
                    >
                        <div onClick={() => {this.props.changeUpdateNextWeekTimeKeepingStatus();}} className="modal-overlay"></div>
                        <UpdateNextWeekTimeKeepingModal
                            style={{
                                marginTop: 0
                            }}
                        >
                        </UpdateNextWeekTimeKeepingModal>
                    </div>
                : null
                }
                {this.props.statusAddTimeKeeping 
                ? 
                    <div 
                        className="modal-add"
                    >
                        <div onClick={() => {this.props.changeAddTimeKeepingStatus()}} className="modal-overlay"></div>
                        <AddTimeKeepingModal
                            style={{
                                marginTop: 0
                            }}
                        >
                        </AddTimeKeepingModal>
                    </div>
                : null
                }
                {this.props.statusUpdateTimeKeeping 
                ? 
                    <div 
                        className="modal-add"
                    >
                        <div onClick={() => {this.props.changeUpdateTimeKeepingStatus();}} className="modal-overlay"></div>
                        <UpdateTimeKeepingModal
                            style={{
                                marginTop: 0
                            }}
                        >
                        </UpdateTimeKeepingModal>
                    </div>
                : null
                }
            </div>
            
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addEmployeeStatus: state.addEmployeeStatus,
        updateEmployeeStatus: state.updateEmpoyeeStatus,
        payEmployeeStatus: state.payEmployeeStatus,
        infoUser: state.infoUser,
        listEmployee: state.listEmployee,
        listSackedEmployee: state.listSackedEmployee,
        statusAddNextWeekTimeKeeping: state.statusAddNextWeekTimeKeeping,
        statusUpdateNextWeekTimeKeeping: state.statusUpdateNextWeekTimeKeeping,
        statusAddTimeKeeping: state.statusAddTimeKeeping,
        statusUpdateTimeKeeping: state.statusUpdateTimeKeeping,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_EMPLOYEE_STATUS",
            });
        },
        changeUpdateEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_UPDATE_EMPLOYEE_STATUS",
            });
        },
        changePayEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_PAY_EMPLOYEE_STATUS",
            });
        },
        getEmployee: (data) => {
            dispatch({
                type: "GET_EMPLOYEE",
                employees: data,
            });
        },
        getSackedEmployee: (data) => {
            dispatch({
                type: "GET_EMPLOYEE_SACKED",
                employees: data,
            });
        },
        changeAddNextWeekTimeKeepingStatus: () => {
            dispatch({
                type: "CHANGE_ADD_NEXTWEEK_TIMEKEEPING_STATUS",
            });
        },
        changeUpdateNextWeekTimeKeepingStatus: () => {
            dispatch({
                type: "CHANGE_UPDATE_NEXTWEEK_TIMEKEEPING_STATUS",
            });
        },
        changeAddTimeKeepingStatus: () => {
            dispatch({
                type: "CHANGE_ADD_TIMEKEEPING_STATUS",
            });
        },
        changeUpdateTimeKeepingStatus: () => {
            dispatch({
                type: "CHANGE_UPDATE_TIMEKEEPING_STATUS",
            });
        },
    }
}
export default connect(mapStateToProps , mapDispatchToProps)((withStyles(styles, {withTheme: true}))(EmployeeManager));
