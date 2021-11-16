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
    {ID:'Monday',name:'Thứ hai'}, 
    {ID:'Tuesday',name:'Thứ ba'}, 
    {ID:'Wednesday',name:'Thứ tư'}, 
    {ID:'Thursday',name:'Thứ năm'}, 
    {ID:'Friday',name:'Thứ sáu'}, 
    {ID:'Saturday',name:'Thứ bảy'}, 
    {ID:'Sunday',name:'Chủ nhật'}
];
class AddNextWeekTimeKeepingModal extends Component {

    genID = 0;
    dayChosed = '';
    constructor(props) {
        super(props);
        this.dayChosed = this.getDayInWeek(this.getCurrentDateTime());
        this.state = {
            change: false,
            withdrawID: '',
            alterID: '',
            dayChosed: this.getDayInWeek(this.getCurrentDateTime()),
            shiftID: '',
        };
        
    }

    cancel = () => {
        this.props.changeAddNextWeekTimeKeepingStatus();
    }

    addEmployee = () => {
        this.addEmployeeToDatabase();
        this.props.changeAddEmployeeStatus();
    }

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

    isGreater(dateString1, dateString2){
        return (new Date(dateString1).getTime() - new Date(dateString2).getTime()) > 0;
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
        console.log(this.state.withdrawID );
        if( this.state.withdrawID == undefined || this.state.withdrawID.length == 0)
        {
            alert("Chưa chọn nhân viên nào nghỉ"); 
            return false;
        }
        if(this.state.alterID== undefined || this.state.alterID.length == 0)
        {
            alert("Chưa chọn nhân viên nào thay thế");
            return false;
        }
        if(!this.isGreater(document.querySelector('input[name="realDate"]').value, this.getCurrentDateTime() ))
        {
            alert("Ngày nhập phải nhỏ hơn ngày báo nghỉ");
            return false;
        }   

        // Có CSDL thì báo xem có trùng với cái cũ ko nữa
        
        alert("Đã check hết constraint");
        return true;
    }
    getDayInWeek(date) {
        const d = new Date(date);
    
        const weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
    
        return weekday[d.getDay()];
    }

    async addChange() {
        if(this.checkContraint()==false) return ;
        const data1 = {
            token: localStorage.getItem('token'),
            offDay: {
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
                            employeeID: this.state.withdrawID,
                            storeID: this.props.infoUser.email,
                        },
                    },
                    realDate: document.querySelector('input[name="realDate"]').value,
                },
                alternativeEmployee: {
                    _id: {
                        employeeID: this.state.alterID,
                        storeID: this.props.infoUser.email,
                    },
                },
                
            }
        };
        await axios.post(`http://localhost:5000/api/employee/off-day`, data1)
          .then(res => {
              console.log("Save success");
              alert("Lưu thành công")
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
                            employeeID: this.state.withdrawID,
                            storeID: this.props.infoUser.email,
                        },
                    },
                    realDate: document.querySelector('input[name="realDate"]').value,
                },
                alternativeEmployee: {
                    _id: {
                        employeeID: this.state.alterID,
                        storeID: this.props.infoUser.email,
                    },
                },
                
            };
            
            this.props.addNewChange(data);
            console.log("nextweek", this.props.nextWeekTimeKeeping);
            this.props.changeAddNextWeekTimeKeepingStatus();
          })
          .catch(err => {
                console.log("err.response.data.message", err.response.data.message);
                if(err.response.data.message)
                {
                    alert(err.response.data.message);
                }
                console.log(err);
          })
        
        // console.log(this.props.nextWeekTimeKeeping)

    }

    render() {
        return (
            <form style={{ zIndex: '10', width: '60%', justifyContent: 'center', marginTop: '80px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' , textAlign: 'center'}} 
                    title="Change NextWEEK TimeKeeper" />
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
                                            onChange={(event) => {
                                                this.dayChosed = this.getDayInWeek(event.target.value);
                                                this.setState({dayChosed: this.getDayInWeek(event.target.value)});
                                            }}
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
                                                value={this.dayChosed}
                                                onChange={(event) => {
                                                    this.dayChosed = event.target.value;
                                                    this.setState({dayChosed: event.target.value});

                                                }}
                                                readOnly={true}
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
                                            Widraw Employee
                                        </div>
                                        <FormControl sx={{ minWidth: 320 }}>
                                            {/* <InputLabel id="select-filled-label">Type</InputLabel> */}
                                            <Select
                                                // value={this.state.type}
                                                onChange={(event) => {
                                                    this.setState({withdrawID: event.target.value});
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
                                    <Grid item md={12} 
                                        className='input-item'
                                    >
                                        <div className="input-label" style={{width: '220px'}}>
                                            Alter Employee
                                        </div>
                                        <FormControl sx={{ minWidth: 320 }}>
                                            {/* <InputLabel id="select-filled-label">Type</InputLabel> */}
                                            <Select
                                                // value={this.state.type}
                                                onChange={(event) => {
                                                    this.setState({alterID: event.target.value});
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
                                                        !(this.state.withdrawID == item._id.employeeID) ?
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
        changeAddNextWeekTimeKeepingStatus: () => {
            dispatch({
                type: "CHANGE_ADD_NEXTWEEK_TIMEKEEPING_STATUS",
            });
        },
        getEmployee: (data) => {
            dispatch({
                type: "GET_EMPLOYEE",
                employees: data,
            });
        },
        addNewChange: (data) => {
            dispatch({
                type: "ADD_NEW_NEXT_WEEK_TIMEKEEPER",
                data: data,
            });
        } 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNextWeekTimeKeepingModal);

               