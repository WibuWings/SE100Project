import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
// material
import { Paper, TableContainer, Table, TableHead, TableCell, TableRow, Button } from '@mui/material';
import FixedTableCell from './FixedCalendarCell';

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
        height: '80px',
    } 
})

class FixedCalendar extends Component {
  constructor(props) {
    super(props);
    this.state= {
      change: 'false'
    }
    this.getAllShiftAssign();
  }
  async getAllShiftAssign()
  {
    var result = [];
    const data = {
      token: localStorage.getItem('token'),
      filter: {
          "_id.storeID": this.props.infoUser.email,
      }   
    }
    await axios.get(`http://localhost:5000/api/employee/shift-assign`, {
        params: {...data}
    })
        .then(res => {
            result = res.data.data;
            this.props.setShiftAssign(result);
        })
        .catch(err => {
            console.log(err);
            alert(err)
        })
  }
  

  render() {
    const { classes } = this.props;
    return (
      <div style={{marginTop: 10, padding: 24, maxHeight: 600}}> 
          <TableContainer id="scroll-bar" component={Paper}>
              <Table className={classes.goodTable} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <TableHead>
                      <TableRow>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='12%'>
                                Shift
                            </TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='12%'>Mon</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='12%'>Tue</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='12%'>Wed</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='12%'>Thu</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='12%'>Fri</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='12%'>Sat</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='12%'>Sun</TableCell>
                      </TableRow>
                  </TableHead>
                      {
                          this.props.listShift.map((shift) => 
                          (
                              <TableRow>
                                  <TableCell className={classes.goodTable_Cell} width={100}>{shift.timeFrom + '-' + shift.timeEnd}</TableCell>
                                  <FixedTableCell shiftID = {shift._id.shiftID} dayIndex = {'Monday'}></FixedTableCell>
                                  <FixedTableCell shiftID = {shift._id.shiftID} dayIndex = {'Tuesday'}></FixedTableCell>
                                  <FixedTableCell shiftID = {shift._id.shiftID} dayIndex = {'Wednesday'}></FixedTableCell>
                                  <FixedTableCell shiftID = {shift._id.shiftID} dayIndex = {'Thursday'}></FixedTableCell>
                                  <FixedTableCell shiftID = {shift._id.shiftID} dayIndex = {'Friday'}></FixedTableCell>
                                  <FixedTableCell shiftID = {shift._id.shiftID} dayIndex = {'Saturday'}></FixedTableCell>
                                  <FixedTableCell shiftID = {shift._id.shiftID} dayIndex = {'Sunday'}></FixedTableCell>
                              </TableRow>
                          ))
                      }
              </Table>
          </TableContainer>
      </div>
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
    return {
        listShift: state.listShift,
        infoUser: state.infoUser,
        listShiftAssign: state.listShiftAssign,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      setShiftAssign: (data) => {
          dispatch({
              type: "SET_SHIFT_ASSIGN",
              data: data,
          });
      }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(FixedCalendar));