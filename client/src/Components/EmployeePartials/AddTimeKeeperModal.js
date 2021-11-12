import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, 
        Box, CardContent, Button, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import { withStyles } from '@material-ui/styles';

var productTypes =[
    'food', 'detergent', 'cuisine'
];

var typeSet = [];

const StyledTextField = withStyles((theme) => ({
    root: {
      "& .MuiInputBase-root": {
        height: 36,
        "& input": {
          textAlign: "right",
          marginLeft: '4px',
        }
      }
    }
  }))(TextField);

var listDayInWeek = [
    {ID:'T2',name:'Thứ hai'}, 
    {ID:'T3',name:'Thứ ba'}, 
    {ID:'T4',name:'Thứ tư'}, 
    {ID:'T5',name:'Thứ năm'}, 
    {ID:'T6',name:'Thứ sáu'}, 
    {ID:'T7',name:'Thứ bảy'}, 
    {ID:'CN',name:'Chủ nhật'}
];
class AddTimeKeepingModal extends Component {

    genID = 0;

    constructor(props) {
        super(props);
        
        this.state = {
            change: false,
            timeKeepingID: '',
            alterID: '',
            dayChosed: '',
            shiftID: '',
        };
    }

    // Thêm nhân viên
    async addEmployeeToDatabase()
    {
        const data = {
            token: localStorage.getItem('token'),
            employee: {
                _id: {
                    employeeID: document.querySelector('input[name="ID"]').value,
                    storeID: this.props.infoUser.email,
                },
                managerID: this.props.infoUser.email,
                password: document.querySelector('input[name="password"]').value,
                firstName: document.querySelector('input[name="firstName"]').value,
                lastName: document.querySelector('input[name="lastName"]').value,
                phoneNumber: document.querySelector('input[name="phoneNumber"]').value,
                dateOfBirth: document.querySelector('input[name="birthDay"]').value,
                email: document.querySelector('input[name="email"]').value,
                address: document.querySelector('input[name="adress"]').value,
                cardID: document.querySelector('input[name="cardID"]').value,
                startDate: document.querySelector('input[name="startDate"]').value,
                // endDate: "2021-11-31T00:00:00.000Z",
            }   
        }
        console.log(data);
        await axios.post(`http://localhost:5000/api/employee`, data)
            .then(res => {
                console.log("Save success");
                alert("Lưu thành công")
            })
            .catch(err => {
                alert(err);
                console.log(err);
            })
    }

    // cancel = () => {
    //     this.props.changeAddNextWeekTimeKeepingStatus();
    // }

    // addEmployee = () => {
    //     this.addEmployeeToDatabase();
    //     this.props.changeAddEmployeeStatus();
    // }

    getCurrentDateTime()
    {
        var currentDate = new Date();
        var day = (currentDate.toString().split(' '))[2];
        if(day.length < 2)
        {
            day = '0' + day;
        }
        var month = (new Date().getMonth() + 1).toString();
        if(month.length<2)
        {
            month = '0' + month;
        }
        return new Date().getFullYear() + '-' + month + '-' + day;
    }

    checkContraint() {
        if(this.state.dayChosed.length == 0)
        {
            alert("Chưa chọn ngày nào trong tuần");
            return false;
        }
        if(this.state.shiftID.length == 0)
        {
            alert("Chưa chọn ca nào");
            return false;
        }
        console.log(this.state.timeKeepingID );
        if( this.state.timeKeepingID == undefined || this.state.timeKeepingID.length == 0)
        {
            alert("Chưa chọn nhân viên nào để chấm công"); 
            return false;
        }
        // Có CSDL thì báo xem có trùng với cái cũ ko nữa
        
        alert("Đã check hết constraint");
        return true;
    }


    addChange() {
        if(this.checkContraint()==false);
        const data = {
            _id: {
                dateInWeek: this.state.dayChosed,
                storeID: this.props.infoUser.email,
                shiftType: {
                    _id: {
                        shiftID: this.state.shiftID,
                        storeID: this.props.infoUser.email,
                    },
                },
                employee: {
                    _id: {
                        employeeID: this.state.timeKeepingID,
                        storeID: this.props.infoUser.email,
                    },
                },
            },
            realDate: document.querySelector('input[name="realDate"]').value,
        };
        this.props.addNewTimeKeeper(data);
        this.props.changeAddTimeKeepingStatus();
    }

    render() {
        return (
            <form style={{ zIndex: '10', width: '60%', justifyContent: 'center', marginTop: '80px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' , textAlign: 'center'}} 
                    title="Change TimeKeeper" />
                        <div 
                        style={{ 
                            width: '100%', backgroundColor: 'rgb(221,235,255)'   
                        }}
                    >   
                    <Grid className="import-container" container >
                        <Grid item md={12}>

                            <Card>
                                
                                <Grid container md={12}>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div 
                                            className="input-label"
                                            style={{
                                                width: '116px'
                                            }}
                                        >
                                            Real Date
                                        </div>
                                        <StyledTextField
                                            classname='input-box' 
                                            type="date" 
                                            name='realDate'
                                            style = {{width: '70%'}} 
                                            fullWidth 
                                            size="small" 
                                            variant="outlined"
                                            defaultValue={this.getCurrentDateTime()}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label" style={{width: '220px'}}>
                                            Choose Day in week
                                        </div>
                                        <FormControl sx={{ minWidth: 120 }}>
                                            {/* <InputLabel id="select-filled-label">Type</InputLabel> */}
                                            <Select
                                                // value={this.state.type}
                                                onChange={(event) => {
                                                    this.setState({dayChosed: event.target.value});
                                                    // if(!typeSet.includes(event.target.value))
                                                    // {
                                                    //     typeSet.push(event.target.value);
                                                    // }
                                                    // this.setState({change: !this.state.change})
                                                }}
                                                style={{
                                                    height: 36,
                                                }}
                                            >
                                                {
                                                    listDayInWeek.map((item) =>
                                                        <MenuItem value={item.ID}>
                                                            {item.name}
                                                        </MenuItem>
                                                    )
                                                }   
                                            </Select> 
                                        </FormControl>
                                    </Grid>

                                    <Grid item md={8} 
                                        className='input-item'
                                    >
                                        <div className="input-label" style={{width: '114px'}}>
                                            Choose Shift
                                        </div>
                                        <FormControl sx={{ minWidth: 220 }}>
                                            {/* <InputLabel id="select-filled-label">Type</InputLabel> */}
                                            <Select
                                                // value={this.state.type}
                                                onChange={(event) => {
                                                    this.setState({shiftID: event.target.value});
                                                    // if(!typeSet.includes(event.target.value))
                                                    // {
                                                    //     typeSet.push(event.target.value);
                                                    // }
                                                    // this.setState({change: !this.state.change})
                                                }}
                                                style={{
                                                    height: 36,
                                                }}
                                            >
                                                {
                                                    this.props.listShift.length== 0 ? <MenuItem value={'none'}>None</MenuItem>
                                                    : this.props.listShift.map((shift) =>
                                                        <MenuItem value={shift._id.shiftID}>
                                                            {shift.name + ' (' + shift.timeFrom + ' - ' + shift.timeEnd + ')'}
                                                        </MenuItem>
                                                    )
                                                }   
                                            </Select> 
                                        </FormControl>

                                    </Grid>
                                    <Grid item md={12} 
                                        className='input-item'
                                    >
                                        <div className="input-label" style={{width: '220px'}}>
                                            TimeKeeping Employee
                                        </div>
                                        <FormControl sx={{ minWidth: 320 }}>
                                            {/* <InputLabel id="select-filled-label">Type</InputLabel> */}
                                            <Select
                                                // value={this.state.type}
                                                onChange={(event) => {
                                                    this.setState({timeKeepingID: event.target.value});
                                                    // if(!typeSet.includes(event.target.value))
                                                    // {
                                                    //     typeSet.push(event.target.value);
                                                    // }
                                                    // this.setState({change: !this.state.change})
                                                }}
                                                style={{
                                                    height: 36,
                                                }}
                                            >
                                                {
                                                    this.props.listEmployee.employees.map((item) =>
                                                        !(this.state.alterID == item._id.employeeID) ?
                                                        <MenuItem value={item._id.employeeID}>
                                                            {item._id.employeeID + ' - ' + item.firstName + ' ' + item.lastName}
                                                        </MenuItem>
                                                        : null
                                                    )
                                                }   
                                            </Select> 
                                        </FormControl>
                                    </Grid>
                                    <Grid item md={9}></Grid>
                                    <Grid item md={3}
                                        className='input-item'
                                    >
                                        <Button variant="contained" onClick={() => this.addChange()}>
                                            Add Change
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={12} >
                            
                        </Grid>
                    </Grid> 
                </div>
                </Card>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addEmployeeStatus: state.addEmployeeStatus,
        confirmStatus: state.confirmStatus,
        infoUser: state.infoUser,
        listShift: state.listShift,
        listEmployee: state.listEmployee,
        nextWeekTimeKeeping: state.nextWeekTimeKeeping,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddTimeKeepingStatus: () => {
            dispatch({
                type: "CHANGE_ADD_TIMEKEEPING_STATUS",
            });
        },
        getEmployee: (data) => {
            dispatch({
                type: "GET_EMPLOYEE",
                employees: data,
            });
        },
        addNewTimeKeeper: (data) => {
            dispatch({
                type: "ADD_NEW_TIME_KEEPER",
                data: data,
            });
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTimeKeepingModal);

               