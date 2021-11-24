import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import { withStyles } from '@material-ui/styles';
import '../../css/EmployeeManager.css'
// material
import { Paper, TableContainer, Table, 
  TableHead, TableCell, TableRow, Button,
  Menu, MenuItem, Grid
} from '@mui/material';
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";
// ----------------------------------------------------------------------
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

class UnShiftEmployee extends Component {
  constructor(props) {
    super(props);
    this.state= {
      change: false
    }
    this.getAllNextWeekTimeKeeping();
    console.log("nextweek", this.props.nextWeekTimeKeeping);
  }

  async getAllNextWeekTimeKeeping()
  {
    var result = [];
    const data = {
      token: localStorage.getItem('token'),
      filter: {
          "_id.storeID": this.props.infoUser.email,
      }   
    }
    await axios.get(`http://localhost:5000/api/employee/off-day`, {
        params: {...data}
    })
        .then(res => {
            result = res.data.data;
            console.log("Báo nghỉ", res.data.data);
            this.props.getEmployeeDayOff(result);
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
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

  reload()
  {
    this.setState({change: !this.state.change})
  }

  openOption = false;

  handleClose ()
  {
      this.openOption = false;
      this.setState({change: !this.state.change});
  }

  handleOpen()
  {
      this.openOption = true;
      alert("Ấn vào mở rồi")
      this.setState({change: !this.state.change});
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

  render() {
    const { classes } = this.props;
    return (
      <div style={{marginTop: 0, padding: 24}}>
          <span
              style={{
                  color: '#fff',
                  backgroundColor: 'blue',
                  padding: 10,
              }}
          >CHANGE TIMEKEEPING</span> 
          <TableContainer component={Paper} >
                <Table className={classes.goodTable} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='80px' rowSpan={2}>Day</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" rowSpan={2}>Shift</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" rowSpan={2}>Real Date</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" colSpan={2}>Withdraw</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" colSpan={2}>Change</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">ID</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Name</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">ID</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Name</TableCell>
                        </TableRow>
                        {
                          this.props.nextWeekTimeKeeping.map((item) =>
                          // this.findEmployeeNameByID(item._id.employee._id.employeeID) == false 
                          // || this.findEmployeeNameByID(item.alternativeEmployee._id.employeeID) == false
                          this.findShift(item._id.shiftType._id.shiftID) == false
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
                              <TableCell className={classes.goodTable_Cell}>{item.alternativeEmployee._id.employeeID}</TableCell>
                              <TableCell className={classes.goodTable_Cell} style={{
                                backgroundColor: this.findEmployeeNameByID(item.alternativeEmployee._id.employeeID) ? '#fff' :'#ff6057' 
                              }}>{this.getEmployeeNameByID(item.alternativeEmployee._id.employeeID)}</TableCell>
                              <TableCell width={60} className={classes.goodTable_Cell} >
                                  <div style={{display: 'flex'}}>
                                      <AiOutlineEdit size={20} 
                                        onClick={() =>
                                          {
                                            this.props.changeUpdateNextWeekTimeKeepingStatus();
                                            this.props.changeUpdateNextWeekTimeKeepingValue(item);
                                          }
                                        }
                                      />
                                      <AiFillDelete size={20} 
                                          onClick={() => 
                                              {
                                                  const data = {
                                                      token: localStorage.getItem('token'),   
                                                      offDay: {
                                                          _id: item._id
                                                      }
                                                  }
                                                  console.log("data.offDay._id", data.offDay._id)
                                                  axios.delete(`http://localhost:5000/api/employee/off-day`,{data: data})
                                                    .then(res => {
                                                        alert("success");
                                                    })
                                                    .catch(err => {
                                                        alert(err);
                                                    })
                                                  this.props.deleteNextWeekTimeKeeping(item);
                                              }
                                            // this.props.changeUpdateNextWeekTimeKeepingStatus();
                                            
                                            // this.props.changeUpdateNextWeekTimeKeepingValue(item);
                                          }
                                      />
                                    </div>      
                              </TableCell> 
                          </TableRow> 
                          )
                        }
                    </TableHead>
                    
                </Table>
            </TableContainer>
              
            <Button 
              variant="contained"
              onClick={() => this.props.changeAddNextWeekTimeKeepingStatus()}
            >
              Add</Button>
      </div>
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    nextWeekTimeKeeping: state.nextWeekTimeKeeping,
    listEmployee: state.listEmployee,
    listShift: state.listShift,
    infoUser: state.infoUser,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
    changeUpdateNextWeekTimeKeepingValue: (data) => {
      dispatch({
        type: "SET_UPDATE_NEXT_WEEK_TIMEKEEPER_VALUE",
        data: data
      });
    },
    deleteNextWeekTimeKeeping: (data) => {
      dispatch({
        type: "DELETE_NEXT_WEEK_TIMEKEEPER",
        data: data
      });
      console.log("data", data)
    },
    getEmployeeDayOff: (data) => {
      dispatch({
        type: "SET_NEXT_WEEK_TIMEKEEPER",
        data: data
      });
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(UnShiftEmployee));