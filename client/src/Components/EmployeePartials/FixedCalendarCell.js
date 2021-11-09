import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
// material
import { TableCell} from '@mui/material';


//icon
import { IoIosAdd } from "react-icons/io";

// ----------------------------------------------------------------------
const styles = theme =>  ({
    goodTable_Cell: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid',
        height: '80px',
    } 
})

class FixedCalendarCell extends Component {
  constructor(props) {
    super(props);
    this.state= {
      change: 'false'
    }
  }
  render() {
    const { classes } = this.props;
    return (
        <TableCell 
            className={classes.goodTable_Cell} 
            style={{
                position: 'relative',
                backgroundColor: '#ff6057'
            }}
            
        >
            <IoIosAdd 
                size={30}
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                }}
                color='#0096FF'
            />
            
        </TableCell>
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


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(FixedCalendarCell));