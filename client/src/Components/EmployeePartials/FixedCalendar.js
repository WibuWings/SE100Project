import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
// material
import { Paper, TableContainer, Table, TableHead, TableCell, TableRow } from '@mui/material';
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
  }
  // Lấy các ca làm và từ đó tạo các dòng của ca làm đó, đầu tiên cứ mặc định là có 3 ca làm đã
  listShift = [
    {
        timeFrom: '6h',
        timeTo: '9h',
        name: 'Morning shift 1'
    },
    {
        timeFrom: '9h',
        timeTo: '12h',
        name: 'Morning shift 2'
    },
    {
        timeFrom: '12h',
        timeTo: '4h',
        name: 'Afternoon shift'
    },
    {
        timeFrom: '4h',
        timeTo: '8h',
        name: 'Night shift'
    }
  ]
  render() {
    const { classes } = this.props;
    return (
      <div style={{marginTop: 10, padding: 24, height: 600, overflowY: 'auto'}}> 
            <TableContainer component={Paper}>
                <Table className={classes.goodTable} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Shift</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Mon</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Tue</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Wed</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Thu</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Fri</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Sat</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Sun</TableCell>
                        </TableRow>
                        {
                            this.listShift.map((shift) => (
                                <TableRow>
                                    <TableCell className={classes.goodTable_Cell}>{shift.timeFrom + '-' + shift.timeTo}</TableCell>
                                    <FixedTableCell></FixedTableCell>
                                    <FixedTableCell></FixedTableCell>
                                    <FixedTableCell></FixedTableCell>
                                    <FixedTableCell></FixedTableCell>
                                    <FixedTableCell></FixedTableCell>
                                    <FixedTableCell></FixedTableCell>
                                    <FixedTableCell></FixedTableCell>
                                </TableRow>
                            ))
                        }
                    </TableHead>
                </Table>
            </TableContainer>
      </div>
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      
  }
}


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(FixedCalendar));