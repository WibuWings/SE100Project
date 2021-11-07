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
import EmployeeTableHeader from './EmployeePartials/EmployeeTableHeader';
import USERLIST from './EmployeePartials/fakeData'
import AddEmployeeModal from './EmployeePartials/AddEmployeeModal';
import UpdateEmployeeModal from './EmployeePartials/UpdateEmployeeModal';
import PayMoneyModal from './EmployeePartials/PayMoneyModal';
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
    { id: 'ID', label: 'ID', alignRight: false },
    { id: 'firstName', label: 'Name', alignRight: false },
    { id: 'lastName', label: 'Last Name', alignRight: false },
    { id: 'old', label: 'Old', alignRight: false },
    { id: 'gender', label: 'Gender', alignRight: false },
    { id: 'province', label: 'Province', alignRight: false },
    { id: 'phoneNumber', label: 'Phone', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'adress', label: 'Adress', alignRight: false },
    { id: '' }
];

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
        this.getAllEmployee();
    }

    handleFilterByName(event){
        filterName = event.target.value;
    }

    addEmployee () {
        this.props.changeAddEmployeeStatus();
    }

    // Dữ liệu mà Tài sẽ trả về khi get, còn khi post, delete, put thì chỉ trả về email với token thôi

    sampleData = {
        email: "",
        token: "",
        employees: [
            {
                _id: {
                    employeeID: "0",
                    storeID: "19522006@gm.uit.edu.vn",
                },
                managerID: "19522006@gm.uit.edu.vn",
                password: "abc123",
                firstName: "Antonio",
                lastName: "Rudiger",
                phoneNumber: "03232323232",
                dateOfBirth: "2021-11-02T00:00:00.000Z",
                email: "1912@gmail.com",
                address: "Wherever",
                cardID: "2511098589",
                startDate: "2021-11-02T00:00:00.000Z",
                endDate: "",
            },
            {
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
        ]
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
                // console.log(err);
                alert(err)
            })
        listUsers = [];
        for(var i = 0; i < result.length; i++)
        {
            listUsers.push(result[i]);
        }
        // Thêm vào cái redux
        this.props.getEmployee(listUsers);
        console.log("listUsers", listUsers);
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

    getSackedEmployee () {
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        axios.get(`http://localhost:5000/api/employee/delete`, {
            params: {...data}
        })
            .then(res => {
                // alert("Lấy hết đc product ròi anh chai");
                result = res.data.data;
                console.log(res.data.data);
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
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

    render() {
        return (
            <div
                style={{height:'800px', overflowY: 'auto'}}
            >
                <div>
                    <Button
                        onClick={() => {this.getAllEmployee()}}
                        variant="contained"
                    >
                        Get Employee
                    </Button>
                    <Button
                        onClick={() => this.addEmployeeToDatabase()}
                        variant="contained"
                    >
                        Add Employee
                    </Button>
                    <Button
                        onClick={() => this.updateEmployee()}
                        variant="contained"
                    >
                        Update Employee
                    </Button>
                    <Button
                        onClick={() => this.deleteEmployeeFromDatabase()}
                        variant="contained"
                    >
                        Delete Employee
                    </Button>
                    <Button
                        onClick={() => this.getSackedEmployee()}
                        variant="contained"
                    >
                        Get Sacked Employee
                    </Button>
                    <Button
                        onClick={() => this.backToWork()}
                        variant="contained"
                    >
                        Back To Work
                    </Button>
                    <Button
                        onClick={() => this.deleteEmployeePermantlyFromDatabase()}
                        variant="contained"
                    >
                        Delete Permantly
                    </Button>
                </div>
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

                    <Card>
                    {/* <EmployeeToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        // onFilterName={this.handleFilterByName(event)}
                    /> */}
                    <TableContainer style ={{maxHeight:'500px',overflowY: 'scroll'}}>
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
                                    
                                // const { id, firstName, lastName, gender, province,email, adress, old, phone, avatarUrl, isVerified } = row;
                                // const isItemSelected = selected.indexOf(firstName) !== -1;
                                // _id: {
                                //     employeeID: String,
                                //     storeID: String,
                                // },
                                // managerID: String,
                                // password: String,
                                // firstName: String,
                                // lastName: String,
                                // phoneNumber: String,
                                // dateOfBirth: Date,
                                // email: String,
                                // address: String,
                                // cardID: String,
                                // startDate: Date,
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
                                        <TableCell align="left">
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
                                        <TableCell align="left">{row.lastName}</TableCell>  
                                        <TableCell align="left">{row.dateOfBirth.substring(0,row.dateOfBirth.indexOf('T'))}</TableCell>
                                        <TableCell align="left">{"gender"}</TableCell>
                                        <TableCell align="left">{"province"}</TableCell>
                                        <TableCell align="left">{row.phoneNumber}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="left">{row.address}</TableCell>
                                        <TableCell align="right">
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
                {/* <Container
                    style={{marginTop: 20}}
                    style={{
                        marginBottom: 220,
                        marginTop: 20
                    }}
                >
                    <span
                        style = {{
                            color: "#fff",
                            border: '1px solid cyan',
                            padding: 12,
                            height: 40,
                            backgroundColor: '#222'
                        }}
                    >
                        Sacked Employee
                    </span>
                    <Card> */}
                    {/* <EmployeeToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        // onFilterName={this.handleFilterByName(event)}
                    /> */}
                    {/* <TableContainer>
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
                            style={{height: '400px'}}
                        >
                        {
                                filteredUsers
                                .map((row) => {
                                    
                                const { id, firstName, lastName, gender, province,email, adress, old, phone, avatarUrl, isVerified } = row;
                                const isItemSelected = selected.indexOf(firstName) !== -1;

                                return (
                                    <TableRow
                                        hover
                                        key={id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        // selected={isItemSelected}
                                        // aria-checked={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                            checked={isItemSelected}
                                            // onChange={(event) => handleClick(event, name)}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{id}</TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar alt={firstName} src={avatarUrl} />
                                            <Typography variant="subtitle2" noWrap>
                                                {firstName}
                                            </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="left">{lastName}</TableCell>   */}
                                        {/* <TableCell align="left">{old}</TableCell>
                                        <TableCell align="left">{gender}</TableCell>
                                        <TableCell align="left">{province}</TableCell>
                                        <TableCell align="left">{phone}</TableCell>
                                        <TableCell align="left">{email}</TableCell>
                                        <TableCell align="left">{adress}</TableCell>
                                        <TableCell align="right">
                                            <EmployeeMoreMenu />
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
                        rowsPerPage={rowsPerPage}
                        page={page}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
                        
                    /> */}
                    {/* </Card>
                </Container> */}
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
                        <div onClick={() => {this.props.changeUpdateEmployeeStatus();}} className="modal-overlay"></div>
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
        }

    }
}
export default connect(mapStateToProps , mapDispatchToProps)(EmployeeManager);
