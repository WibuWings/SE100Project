import React, { Component } from 'react';
import { Card, CardHeader, Table, Grid, TextField, 
    TableCell, TableContainer, Button, InputLabel,
    Paper, TableRow, TableHead } from '@mui/material';
import { connect } from 'react-redux'
import axios from 'axios';
import '../../css/GoodManager.css';
import { withStyles } from '@material-ui/styles';
import EmployeeInformation from './EmployeeInformation';


var productTypes =[
    'food', 'detergent', 'cuisine'
];

var typeSet = [];
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
        height: '40px',
    } 
})
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


class PayEmployeeModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            goodID : "",
            change: false,
            imageSelect: "null",
            type:'none',
            url: 'http://res.cloudinary.com/databaseimg/image/upload/v1634117795/ubvxisehhpvnu2lbqmeg.png',
        }; 
        // console.log("listTimeKeeper", this.props.listTimeKeeper);
        // console.log("this.props.employeeID", this.props.employeeID);
    }

    getShiftInforByID(shiftID)
    {
        var listShift = this.props.listShift;
        for(var i = 0 ; i < listShift.length; i++)
        {
            if(listShift[i]._id.shiftID == shiftID)
            {
                return listShift[i].name + ' (' + listShift[i].timeFrom + '-' + listShift[i].timeEnd + ')';
            }
        }
        return "Can't get shift";
    }

    getEmployeeFullNameByID(employeeID)
    {
            for(var i = 0 ; i < this.props.listEmployee.employees.length; i++)
            {
                var currentEmployee = this.props.listEmployee.employees[i];
                if(currentEmployee._id.employeeID==employeeID)
                {
                        return currentEmployee.lastName + ' ' + currentEmployee.firstName;
                }
            }
        return "Can't get name";
    }

    exit() {
        this.props.changePayEmployeeStatus();  
    }

    payEmployee(){
        // alert("Confirm password");
        // viết api để trả lương ở đây
        // this.props.changePayEmployeeStatus();
        try {
            for(var i =0; i< this.props.listTimeKeeper.length; i++)
            {
                if(this.props.listTimeKeeper[i]._id.employee._id.employeeID != this.props.employeeID.id) continue;
                // Thử api
                const data = {
                    token: localStorage.getItem('token'),
                    updatedTimeKeeping: {
                        _id: this.props.listTimeKeeper[i]._id,
                        isPaidSalary: true,
                    }
                };
                axios.put(`http://localhost:5000/api/employee/time-keeping`, data)
                    .then(res => {
                        console.log("Update success");
                    })
                    .catch(err => {
                        console.log(err);
                    })
                // Cập nhật redux khi update việc trả lương

            }
        }
        catch(e)
        {
            alert("Đã có lỗi xảy ra")
        }
        
        // this.props.changePayEmployeeStatus();    
        // Cập nhật redux trạng thái trả lương nhiều cái cùng lúc

    }

    findShift(shiftID) {
        var shifts= this.props.listShift;
          for(var i = 0 ; i < shifts.length ; i++)
          {
              if(shifts[i]._id.shiftID == shiftID)
              {
                  return true;
              }
          }
          return false;
    }

    getShiftNameAndTime(shiftID)
    {
        var shifts= this.props.listShift;
        for(var i = 0 ; i < shifts.length ; i++)
        {
            if(shifts[i]._id.shiftID == shiftID)
            {
                return shifts[i].name + ' (' + shifts[i].timeFrom + ' - ' + shifts[i].timeEnd +') ';
            }
        }
        return "Can't get shift";
    }

    getEmployeeNameByID(employeeID)
    {
        for(var i = 0 ; i < this.props.listEmployee.employees.length; i++)
        {
            var currentEmployee = this.props.listEmployee.employees[i];
            if(currentEmployee._id.employeeID==employeeID)
            {
                return currentEmployee.firstName;
            }
        }
        return "This employee was sacked";
    }
    findEmployeeNameByID(employeeID)
    {
        for(var i = 0 ; i < this.props.listEmployee.employees.length; i++)
        {
            var currentEmployee = this.props.listEmployee.employees[i];
            if(currentEmployee._id.employeeID==employeeID)
            {
                return true;
            }
        }
        return false;
    }

    toReadableDay(dayToConvert) {
        var days = dayToConvert.split('-');
        return days[2] + '/' + days[1] + '/'+ days[0];
    }

    render() {
        const { classes } = this.props;
        return (
            <form 
                style={{ zIndex: '10', width: '80%', height: 600,justifyContent: 'center', marginTop: '40px', overflow:'auto'}} 
                autoComplete="off" noValidate id='scroll-bar'
            >
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' , textAlign: 'center'}} title="PAY EMPLOYEE" />
                        <div 
                        style={{ 
                            width: '100%', backgroundColor: 'rgb(221,235,255)'   
                        }}
                    >   
                    <Grid className="import-container" container >
                        <Grid item md={12}>
                            <Card>
                                <Grid container md={12}>
                                    <EmployeeInformation></EmployeeInformation>
                                </Grid>
                                <label
                                    style={{margin: 18, marginBottom: 4, fontWeight: 700}}
                                >
                                    Timekeeping table
                                </label>
                                
                                <Grid container md={12}>
                                     <TableContainer 
                                        component={Paper}
                                        style={{
                                            marginLeft: 18,
                                            marginRight: 18,
                                            // Thay đổi chiều dài cột tại đây
                                            maxHeight: 400,
                                            overflow: 'auto',
                                        }}
                                        id="scroll-bar"
                                     >
                                            
                                            <Table className={classes.goodTable} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center" width='120px'>Day</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center" width='140px'>Date Of Week</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center" >Shift</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center">ID</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center">Name</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center">Salary</TableCell>
                                                        {/* <TableCell className={classes.goodTable_Cell_Header} align="center"></TableCell> */}
                                                    </TableRow>
                                                    {
                                                        this.props.listTimeKeeper.map((timeKeeper)=>
                                                        timeKeeper._id.employee._id.employeeID != this.props.employeeID.id ? (null) :
                                                            (
                                                            <TableRow>
                                                                <TableCell className={classes.goodTable_Cell}>
                                                                    {this.toReadableDay(timeKeeper._id.realDate.substring(0,timeKeeper._id.realDate.indexOf('T') ))}
                                                                </TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>{timeKeeper._id.dateInWeek}</TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>
                                                                    {timeKeeper._id.shiftType.name + " ("+ timeKeeper._id.shiftType.timeFrom + 
                                                                    ' - '+  timeKeeper._id.shiftType.timeEnd +')'}
                                                                </TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>{timeKeeper._id.employee._id.employeeID}</TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>
                                                                    {timeKeeper._id.employee.firstName + " " + timeKeeper._id.employee.lastName}
                                                                </TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>
                                                                    {timeKeeper.isPaidSalary.toString()}
                                                                </TableCell>
                                                            </TableRow>
                                                            )
                                                        )
                                                    }
                                                </TableHead>
                                            </Table>
                                    </TableContainer>
                                    <Grid item md={12} style={{marginTop: 4}}>
                                        <lable style={{margin: '12px 18px',}}>
                                            TotalSalary: 
                                        </lable>
                                        <Button style={{margin: '6px 18px', float: 'right'}}variant="contained" onClick={() => this.payEmployee()}>
                                            Pay employee
                                        </Button>
                                    </Grid>
                                    
                                </Grid>
                                <Grid container md={12}>
                                    <label
                                        style={{margin: 18, marginBottom: 4, fontWeight: 700}}
                                    >
                                        ChangeTimekeeping table
                                    </label>
                                    <TableContainer component={Paper} 
                                        style={{
                                            margin: 18, 
                                            marginTop: 0,
                                            // Thay đổi chiều dài cột tại đây
                                            maxHeight: 400,
                                            overflow: 'auto',
                                        }}
                                        id='scroll-bar' 
                                    >
                                        <Table className={classes.goodTable} size="small" aria-label="a dense table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell className={classes.goodTable_Cell_Header} align="center" width='80px'>Day</TableCell>
                                                    <TableCell className={classes.goodTable_Cell_Header} align="center">Shift</TableCell>
                                                    <TableCell className={classes.goodTable_Cell_Header} align="center">Real Date</TableCell>
                                                    <TableCell className={classes.goodTable_Cell_Header} align="center">ID</TableCell>
                                                    <TableCell className={classes.goodTable_Cell_Header} align="center">Name</TableCell>
                                                </TableRow>
                                                {
                                                this.props.nextWeekTimeKeeping.map((item) =>
                                                // this.findEmployeeNameByID(item._id.employee._id.employeeID) == false 
                                                // || this.findEmployeeNameByID(item.alternativeEmployee._id.employeeID) == false
                                                this.props.employeeID.id != item._id.employee._id.employeeID
                                                || this.findShift(item._id.shiftType._id.shiftID) == false
                                                ? (null) :
                                                <TableRow
                                                    style={{
                                                        position: 'relative',
                                                    }}
                                                >
                                                    <TableCell className={classes.goodTable_Cell}>{item._id.dateInWeek}</TableCell>
                                                    <TableCell className={classes.goodTable_Cell}>{this.getShiftNameAndTime(item._id.shiftType._id.shiftID)}</TableCell>
                                                    <TableCell className={classes.goodTable_Cell}>
                                                        {item._id.realDate ? item._id.realDate.indexOf('T') !=-1 ? item._id.realDate.substring(0,item._id.realDate.indexOf('T') ) : item._id.realDate : "Loading..."}
                                                    </TableCell>
                                                    <TableCell className={classes.goodTable_Cell}>{item._id.employee._id.employeeID}</TableCell>
                                                    <TableCell className={classes.goodTable_Cell}>{this.getEmployeeNameByID(item._id.employee._id.employeeID)}</TableCell>
                                                </TableRow> 
                                                )
                                                }
                                            </TableHead>
                                            
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid container md={12}>
                                    <Grid item md={10}>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Button style={{margin: '4px 18px',float: 'right', backgroundColor:"#f00"}} variant="contained" onClick={() => this.exit()}>
                                            Exit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
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
        listTimeKeeper: state.listTimeKeeping,
        listShift: state.listShift,
        listEmployee: state.listEmployee,
        nextWeekTimeKeeping: state.nextWeekTimeKeeping,
        infoUser: state.infoUser,
        employeeID: state.currentEmployeeViewValue,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changePayEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_PAY_EMPLOYEE_STATUS",
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(PayEmployeeModal));

               