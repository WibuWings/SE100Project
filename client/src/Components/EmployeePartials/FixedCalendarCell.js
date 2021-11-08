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

class FixedCalendar extends Component {
  constructor(props) {
    super(props);
    this.state= {
      change: 'false'
    }
  }
  render() {
    const { classes } = this.props;
    return (
        <div style={{marginTop: 10, padding: 24, height: 80, overflowY: 'auto'}}> 
                <TableCell className={classes.goodTable_Cell_Header} align="center">Shift</TableCell>
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