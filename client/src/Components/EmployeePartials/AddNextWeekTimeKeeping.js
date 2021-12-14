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
          textAlign: "center",
          marginLeft: '4px',
        }
      }
    }
  }))(TextField);

var listDayInWeek = [
    {ID:'Monday',name:'Monday'}, 
    {ID:'Tuesday',name:'Tuesday'}, 
    {ID:'Wednesday',name:'Wednesday'}, 
    {ID:'Thursday',name:'Thursday'}, 
    {ID:'Friday',name:'Friday'}, 
    {ID:'Saturday',name:'Saturday'}, 
    {ID:'Sunday',name:'Sunday'}
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

    calculateDay(dateString1, dateString2)
    {
        return (
            (new Date(dateString1)).setHours(0, 0, 0) 
                - 
            (new Date(dateString2)).setHours(0,0,0)
            )
            /(1000 * 60 * 60 * 24);
    }

    checkContraint() {
        if(this.state.dayChosed.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("You haven't select the day of week","warning");
            return false;
        }
        if(this.state.shiftID.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("You haven't select the shift","warning");
            return false;
        }
        console.log(this.state.withdrawID );
        if( this.state.withdrawID == undefined || this.state.withdrawID.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("You haven't select the absent employee","warning"); 
            return false;
        }
        if(this.state.alterID== undefined || this.state.alterID.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("You haven't select the ablternative employee","warning"); 
            return false;
        }
        if(!this.isGreater(document.querySelector('input[name="realDate"]').value, this.getCurrentDateTime() ))
        {
            this.props.hideAlert();
			this.props.showAlert("The input day must be greater than today","warning"); 
            return false;
        }
        // Check thử ngày nhập nhỏ hơn ngày báo nghỉ bn ngày
        if(this.props.regulation != {})
        {
            if(this.calculateDay(document.querySelector('input[name="realDate"]').value, this.getCurrentDateTime() ) < 
            this.props.regulation.lessChangeTimeKeepingDay)
            {
                console.log("Tính ngày",this.calculateDay(document.querySelector('input[name="realDate"]').value, this.getCurrentDateTime()));
                this.props.hideAlert();
			    this.props.showAlert("The input day must be greater than today at least "+ this.props.regulation.lessChangeTimeKeepingDay+" day(s)","warning");
                return false;
            }
        }
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
                this.props.hideAlert();
                this.props.showAlert("Save absent day success","success");
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
                // console.log("err.response.data.message", err.response.data.message);
                if(err.response.data.message)
                {
                    this.props.hideAlert();
				    this.props.showAlert(err.response.data.message,"warning");
                }
                else {
                    this.props.hideAlert();
				    this.props.showAlert("Something happened, restart and try again","warning");
                }
                console.log(err);
          })
        
        // console.log(this.props.nextWeekTimeKeeping)

    }

    render() {
        return (
            <form style={{ zIndex: '10', width: '60%', justifyContent: 'center', marginTop: '80px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} 
                    title="Change Offday" />
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
                                            Day in week
                                        </div>
                                        <FormControl sx={{ minWidth: 80 }}>
                                            {/* <InputLabel id="select-filled-label">Type</InputLabel> */}
                                            <StyledTextField
                                                value={this.dayChosed}
                                                onChange={(event) => {
                                                    this.dayChosed = event.target.value;
                                                    this.setState({dayChosed: event.target.value});

                                                }}
                                                readOnly={true}
                                                style={{
                                                    height: 36,
                                                    marginRight: 10,
                                                    width: 120,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                {/* {
                                                    listDayInWeek.map((item) =>
                                                        <MenuItem value={item.ID}>
                                                            {item.name}
                                                        </MenuItem>
                                                    )
                                                }    */}
                                            </StyledTextField> 
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
                                    <Grid item md={12}>
                                        <Divider></Divider>
                                    </Grid>
                                    <Grid item md={12}
                                        className='input-item'
                                        
                                        style={{display: 'flex', justifyContent: 'space-evenly'}}
                                    >
                                        <Button variant="contained" style={{backgroundColor: 'red'}} onClick={() => this.props.changeAddNextWeekTimeKeepingStatus()}>
                                            Cancel
                                        </Button>
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
        regulation: state.regulationReducer,
        statusDarkmode: state.statusDarkmode,
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNextWeekTimeKeepingModal);

               