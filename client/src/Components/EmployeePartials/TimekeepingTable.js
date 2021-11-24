import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
// material
import { Paper, TableContainer, Table, TableHead, TableCell, TableRow, Button} from '@mui/material';
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

class TimeKeepingTable extends Component {
  constructor(props) {
    super(props);
    this.state= {
      change: 'false'
    }
    this.getAllTimeKeeping()
  }

    async getAllTimeKeeping()
    {
        var result = [];
        const data = {
          token: localStorage.getItem('token'),
          filter: {
              "_id.storeID": this.props.infoUser.email,
          }   
        }
        await axios.get(`http://localhost:5000/api/employee/time-keeping`, {
            params: {...data}
        })
            .then(res => {
                result = res.data.data;
                // console.log("điểm danh", res.data.data);
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
        // To redux
        this.props.getTimeKeeping(result);
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
          >ALL TIMEKEEPING</span>
          <TableContainer component={Paper}>
                <Table className={classes.goodTable} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='180px'>Day</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='80px'>Date Of Week</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" >Shift</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">ID</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Name</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Paid</TableCell>
                            {/* <TableCell className={classes.goodTable_Cell_Header} align="center"></TableCell> */}
                        </TableRow>
                        {
                            this.props.listTimeKeeper.map((timeKeeper)=>
                                (
                                  <TableRow>
                                    <TableCell className={classes.goodTable_Cell}>
                                        {timeKeeper._id.realDate.substring(0,timeKeeper._id.realDate.indexOf('T') )}
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
                                    {/* <TableCell className={classes.goodTable_Cell}>
                                      <div style={{display: 'flex'}}>
                                        <AiOutlineEdit size={20} 
                                            onClick={() =>
                                              {
                                                this.props.changeUpdateTimeKeepingStatus();
                                                this.props.changeUpdateTimeKeepingValue(timeKeeper);
                                              }
                                            }
                                          />
                                          <AiFillDelete size={20} 
                                            onClick={() => 
                                                {
                                                    // axios.delete(`http://localhost:5000/api/????`,{data: data})
                                                    //   .then(res => {
                                                    //       alert("success");
                                                    //   })
                                                    //   .catch(err => {
                                                    //       alert(err);
                                                    //   })
                                                    this.props.deleteTimeKeeping(timeKeeper);
                                                    console.log(this.props.listTimeKeeper);
                                                }
                                                
                                              // this.props.changeUpdateNextWeekTimeKeepingStatus();
                                              
                                              // this.props.changeUpdateNextWeekTimeKeepingValue(item);
                                            }
                                        />
                                      </div>
                                    </TableCell> */}
                                </TableRow>
                                )
                            )
                        }
                    </TableHead>
                </Table>
          </TableContainer>
            {/* <Button 
                variant="contained"
                onClick={() => this.props.changeAddTimeKeepingStatus()}
            >
              Add
            </Button> */}
      </div>
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
      listTimeKeeper: state.listTimeKeeping,
      listShift: state.listShift,
      listEmployee: state.listEmployee,
      infoUser: state.infoUser
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
    changeUpdateTimeKeepingValue: (data) => {
      dispatch({
        type: "SET_UPDATE_TIMEKEEPER_VALUE",
        data: data
      });
    },
    deleteTimeKeeping: (data) => {
      console.log("data", data)
      dispatch({
        type: "DELETE_TIMEKEEPER",
        data: data
      });  
    },
    getTimeKeeping: (data) => {
      dispatch({
        type: "GET_TIMEKEEPER",
        data: data
      });  
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(TimeKeepingTable));