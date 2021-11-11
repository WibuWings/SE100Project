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
                            <TableCell className={classes.goodTable_Cell_Header} align="center" >Shift</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">ID</TableCell>
                            <TableCell className={classes.goodTable_Cell_Header} align="center">Name</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                            <TableCell className={classes.goodTable_Cell}></TableCell>
                        </TableRow>
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
    
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      
  }
}


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(TimeKeepingTable));