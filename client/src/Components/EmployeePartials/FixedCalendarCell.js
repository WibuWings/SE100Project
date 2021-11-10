import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
// material
import { TableCell, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import '../../css/EmployeeManager.css';

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
  isOpen=false;

  constructor(props) {
    super(props);
    this.state= {
      change: false
    }
  }

  handleChange() {
    this.isOpen = !this.isOpen;
    console.log("this.isOpen", this.isOpen)
    this.setState({change : !this.state.change})
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
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    width: 22,
                    height: 22,
                    textAlign: 'center'
                }}
                className='add-employee-to-shift-button'
            >
                <IoIosAdd 
                    size={30}
                    style={{
                        position: 'absolute',
                        right: -4,
                        top: -3,
                    }}
                    color='#0096FF'
                    onClick={() => this.handleChange()}
                >    
                </IoIosAdd>
                
            </div>
            {
              this.isOpen 
              ? 
              <List 
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 20,
                  zIndex: 10,
                  height: 100,
                  overflowY: 'auto',
                  width: 140,
                  backgroundColor: '#fff',
                }}
              >
                  <ListItem disablePadding height={30} onClick={() => this.handleChange()}>
                      <ListItemButton>
                          <ListItemText>1-Azpili</ListItemText>
                      </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => this.handleChange()}>
                      <ListItemButton>
                          <ListItemText>2-Chris</ListItemText>
                      </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding onClick={() => this.handleChange()}>
                      <ListItemButton>
                          <ListItemText>3-Antonio</ListItemText>
                      </ListItemButton>
                  </ListItem>
              </List>
              : null
            }
            
            
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