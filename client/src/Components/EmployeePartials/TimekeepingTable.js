import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
// material
import { Paper, TableContainer, Table, TableHead, TableCell, TableRow, Button} from '@mui/material';

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
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='80px'>Day</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='80px'>Date Of Week</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" >Shift</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">ID</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Name</TableCell>
                        </TableRow>
                        {
                            this.props.listTimeKeeper.map((timeKeeper)=>
                                (
                                  <TableRow>
                                    <TableCell className={classes.goodTable_Cell}>{timeKeeper.realDate}</TableCell>
                                    <TableCell className={classes.goodTable_Cell}>{timeKeeper._id.dateInWeek}</TableCell>
                                    <TableCell className={classes.goodTable_Cell}>{this.getShiftInforByID(timeKeeper._id.shiftType._id.shiftID)}</TableCell>
                                    <TableCell className={classes.goodTable_Cell}>{timeKeeper._id.employee._id.employeeID}</TableCell>
                                    <TableCell className={classes.goodTable_Cell}>{this.getEmployeeFullNameByID(timeKeeper._id.employee._id.employeeID)}</TableCell>
                                </TableRow>
                                )
                            )
                        }
                        
                        <TableRow>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
      </div>
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
      listTimeKeeper: state.listTimeKeeping,
      listShift: state.listShift,
      listEmployee: state.listEmployee,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      
  }
}


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(TimeKeepingTable));