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
    TablePagination,
    TableHead, TableSortLabel,
    CardContent, 
    CardHeader,
    Divider
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
import AddEmployeeToShift from './EmployeePartials/AddEmployeeToShift';
import axios from 'axios';

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
        height: '20px',
    } 
})

var selected = [];
var filterName = "";
var filteredUsers = [];
var listUsers = [];
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
                this.props.hideAlert();
                this.props.showAlert("Something happened, restart and try again","warning");
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
                this.props.hideAlert();
				this.props.showAlert("Save employee success!","success");
            })
            .catch(err => {
                this.props.hideAlert();
                this.props.showAlert("Something happened, restart and try again","warning");
                // console.log(err);
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
                this.props.hideAlert();
				this.props.showAlert("Sacked employee success","success");
            })
            .catch(err => {
                this.props.hideAlert();
                this.props.showAlert("Something happened, restart and try again","warning");
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
                result = res.data.data;
            })
            .catch(err => {
                console.log('Bug when get delete employees',err);
                this.props.hideAlert();
                this.props.showAlert("Something happened, restart and try again","warning");
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
                this.props.hideAlert();
                this.props.showAlert("Employee return to work success","success");
            })
            .catch(err => {
                this.props.hideAlert();
                this.props.showAlert("Something happened, restart and try again","warning");
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
                this.props.hideAlert();
                this.props.showAlert("Delete permantly employee(s) success","success");
            })
            .catch(err => {
                this.props.hideAlert();
                this.props.showAlert("Something happened, restart and try again","warning");
            })
    }

    componentWillMount() {
        document.title = 'Employee Manager'
    }

    render() {
        const { classes } = this.props;
        return (
            <div
                style={{display: 'block', overflowY: 'auto', height: '100vh', width:'100%'}}
                id="scroll-bar"
            >
                <Card style={{margin: 16}}>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="Current employee(s)" />
                        <Divider />
                        
                        <CardContent style={{margin: 0}}>
                            <Button
                                variant='contained'
                                startIcon={<Icon icon={plusFill} />}
                                onClick={() => this.addEmployee()}
                                >
                                    New User
                                </Button>
                            <Card style={{width: '100%', margin: 0}}>
                                <TableContainer id="scroll-bar" style ={{maxHeight:'500px' , width: '100%',overflow: 'auto'}}>
                                    <Table>
                                        <TableRow>
                                            <TableCell align="center" className = {classes.goodTable_Cell}style={{color: '#fff', backgroundColor: '#000'}}>
                                                ID
                                            </TableCell>
                                            <TableCell component="th" className = {classes.goodTable_Cell}scope="row" padding="none" align="center" style={{color: '#fff', backgroundColor: '#000'}}> 
                                                First Name
                                            </TableCell>
                                            <TableCell align="center"  className = {classes.goodTable_Cell}style={{color: '#fff', backgroundColor: '#000'}} >Last Name</TableCell>  
                                            <TableCell align="center"  className = {classes.goodTable_Cell}style={{color: '#fff', backgroundColor: '#000'}}>
                                                Date Of Birth
                                            </TableCell>
                                            <TableCell align="center"  className = {classes.goodTable_Cell}style={{color: '#fff', backgroundColor: '#000'}}>Phone Number</TableCell>
                                            <TableCell align="center"  className = {classes.goodTable_Cell}style={{color: '#fff', backgroundColor: '#000'}}>Email</TableCell>
                                            <TableCell align="center"  className = {classes.goodTable_Cell}style={{color: '#fff', backgroundColor: '#000'}}>Address</TableCell>
                                            <TableCell align="center"  className = {classes.goodTable_Cell}style={{color: '#fff', backgroundColor: '#000'}}></TableCell>
                                        </TableRow>
                                        <TableBody
                                            style={{height: '100%', width: '100%'}}
                                        >
                                        {
                                            this.props.listEmployee.employees.map((row) => {
                                            return (
                                                <TableRow
                                                    hover
                                                    tabIndex={-1}
                                                    role="checkbox"
                                                >
                                                    <TableCell align="center">
                                                        {row._id.employeeID}
                                                    </TableCell>
                                                    <TableCell component="th" scope="row" padding="none" align="center">
                                                            {row.firstName}
                                                    </TableCell>
                                                    <TableCell align="center">{row.lastName}</TableCell>  
                                                    <TableCell align="center">
                                                        {row.dateOfBirth.indexOf('T') != -1 ? row.dateOfBirth.substring(0,row.dateOfBirth.indexOf('T')): row.dateOfBirth}
                                                    </TableCell>
                                                    <TableCell align="center">{row.phoneNumber}</TableCell>
                                                    <TableCell align="center">{row.email}</TableCell>
                                                    <TableCell align="center">{row.address}</TableCell>
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
                                
                            </Card>
                            
                        </CardContent>
                </Card>
                <Card  style={{margin: 16}}>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="Calendar shift" />
                        <Divider />
                        <CardContent>
                            <FixedCalendar/>
                        </CardContent>
                </Card>
                <Card  style={{margin: 16}}>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="No schedule employee(s)" />
                        <Divider />
                        <CardContent>
                            <NoJobEmployee></NoJobEmployee>
                        </CardContent>
                </Card>
                <Card  style={{margin: 16}}>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="Off day" />
                        <Divider />
                        <CardContent>
                            <UnShiftEmployee/>
                        </CardContent>
                </Card>    
                <Card  style={{margin: 16}}>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="All timekeeping(s)" />
                        <Divider />
                        <CardContent>
                            <TimekeepingTable></TimekeepingTable>
                        </CardContent>
                </Card>    
                <Card  style={{margin: 16}}>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="Sacked employee(s)" />
                        <Divider />
                        <CardContent>
                            <TableContainer id="scroll-bar" style ={{maxHeight:'500px',overflowY: 'auto', overflowX:'hidden', boxShadow: '1px 1px #888888'}}>
                                <Table>
                                    <TableRow>
                                        <TableCell align="center" className = {classes.goodTable_Cell} style={{color: '#fff', backgroundColor: '#000'}}>
                                            ID
                                        </TableCell>
                                        <TableCell component="th" className = {classes.goodTable_Cell} scope="row" padding="none" align="center" style={{color: '#fff', backgroundColor: '#000'}}> 
                                            First Name
                                        </TableCell>
                                        <TableCell align="center" className = {classes.goodTable_Cell} style={{color: '#fff', backgroundColor: '#000'}} >Last Name</TableCell>  
                                        <TableCell align="center" className = {classes.goodTable_Cell} style={{color: '#fff', backgroundColor: '#000'}}>
                                            Date Of Birth
                                        </TableCell>
                                        <TableCell align="center" className = {classes.goodTable_Cell} style={{color: '#fff', backgroundColor: '#000'}}>Phone Number</TableCell>
                                        <TableCell align="center" className = {classes.goodTable_Cell} style={{color: '#fff', backgroundColor: '#000'}}>Email</TableCell>
                                        <TableCell align="center" className = {classes.goodTable_Cell} style={{color: '#fff', backgroundColor: '#000'}}>Address</TableCell>
                                        <TableCell align="center" className = {classes.goodTable_Cell} style={{color: '#fff', backgroundColor: '#000'}}></TableCell>
                                    </TableRow>
                                    <TableBody
                                        style={{height: '100%', width: '100%'}}
                                    >
                                    {
                                        this.props.listSackedEmployee.employees.map((row) => {
                                        return (
                                            <TableRow
                                                hover
                                                tabIndex={-1}
                                            >
                                                <TableCell   align="center">
                                                    {row._id.employeeID}
                                                </TableCell>
                                                <TableCell component="th" scope="row" padding="none" align="center">
                                                    {row.firstName}
                                                </TableCell>
                                                <TableCell align="center">{row.lastName}</TableCell>  
                                                <TableCell align="center">{row.dateOfBirth.substring(0,row.dateOfBirth.indexOf('T'))}</TableCell>
                                                <TableCell align="center">{row.phoneNumber}</TableCell>
                                                <TableCell align="center">{row.email}</TableCell>
                                                <TableCell align="center">{row.address}</TableCell>
                                                <TableCell align="center">
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
                        </CardContent>
                </Card>    
                     
                    

                    


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
                {this.props.statusAddEmployeeToShift
                    ? 
                        <div 
                            className="modal-add"
                        >
                            <div onClick={() => {
                                this.props.changeAddEmployeeToShiftStatus();
                            }} className="modal-overlay"></div>
                            <AddEmployeeToShift
                                style={{
                                    marginTop: 0
                                }}
                            >
                            </AddEmployeeToShift>
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
        statusDarkmode: state.statusDarkmode,
        statusAddEmployeeToShift: state.statusAddEmployeeToShift,
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
        showAlert: (message, typeMessage) => {
            dispatch({
                type: "SHOW_ALERT",
                message: message,
                typeMessage: typeMessage,
            })
        },
        hideAlert: () => {
            dispatch({
                type: "HIDE_ALERT",
            })
        },
        changeAddEmployeeToShiftStatus: () => {
            dispatch({
                type: "CHANGE_ADD_EMPLOYEE_TO_SHIFT_STATUS",
            });
        },
    }
}
export default connect(mapStateToProps , mapDispatchToProps)((withStyles(styles, {withTheme: true}))(EmployeeManager));
