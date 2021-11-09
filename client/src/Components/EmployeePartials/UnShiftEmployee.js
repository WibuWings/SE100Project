import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
// material
import { Paper, TableContainer, Table, TableHead, TableCell, TableRow } from '@mui/material';

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

class UnShiftEmployee extends Component {
  constructor(props) {
    super(props);
    this.state= {
      change: 'false'
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div style={{marginTop: 0, padding: 24}}> 
          <TableContainer component={Paper}>
                <Table className={classes.goodTable} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.goodTable_Cell_Header} align="center" width='80px'>Shift</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Mon</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Tue</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Wed</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Thu</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Fri</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Sat</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Sun</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
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
    
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      
  }
}


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(UnShiftEmployee));