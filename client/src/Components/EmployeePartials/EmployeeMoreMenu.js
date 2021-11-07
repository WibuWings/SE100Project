import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import {GiPayMoney} from "react-icons/gi";
import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';

// ----------------------------------------------------------------------

class EmployeeMoreMenu extends Component {
  currentEmployee = {};


  constructor(props) {
    super(props);
    this.state= {
      change: 'false'
    }
    this.myRef = React.createRef();
  }
  setIsOpen(val) {
    this.isOpen = val;
    this.setState({change: val});
    
  }

  edit() {
    this.props.changeUpdateEmployeeStatus();
  }

  delete() {
    this.getEmployeeByID();
    const data = {
      token: localStorage.getItem('token'),
      employee:
      [
          {
              employeeID: this.props.data,
              storeID: this.props.infoUser.email, 
          },
      ] 
    }
    console.log(data);

    axios.delete(`http://localhost:5000/api/employee/delete`,{data: data})
        .then(res => {
            alert("delete permantly employee(s) success");
        })
        .catch(err => {
            alert(err);
        })
  }

  getEmployeeByID(employeeID) {
    var listEmployee = this.props.listEmployee.employees;
    console.log(listEmployee);
    for(var i = 0; i < listEmployee.length ; i++)
    {
      if(employeeID == listEmployee[i]._id.employeeID)
      {
        this.currentEmployee = listEmployee[i];
        return;
      }
    }
  }

  isOpen=false;
  render() {
    return (
      <>
        <IconButton ref={this.myRef} onClick={() => this.setIsOpen(true)}>
          <Icon icon={moreVerticalFill} width={20} height={20} />
        </IconButton>
  
        <Menu
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
          open={this.isOpen}
          onClose={() => this.setIsOpen(false)}
          anchorEl={this.myRef.current}
          // PaperProps={{
          //   sx: { width: 200, maxWidth: '100%' }
          // }}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem sx={{ color: 'text.secondary' }}
            onClick={() => this.delete()}
          >
            <ListItemIcon>
              <Icon icon={trash2Outline} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Delete" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
  
          <MenuItem sx={{ color: 'text.secondary' }}
            onClick={() => this.edit()}
          >
            <ListItemIcon>
              <Icon icon={editFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Edit" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
          <MenuItem sx={{ color: 'text.secondary' }}
            onClick={()=> this.props.changePayEmployeeStatus()}
          >
            <ListItemIcon>
              <GiPayMoney size={24}/> 
            </ListItemIcon>
            <ListItemText primary="Pay money" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        </Menu>
      </>
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
  return {
    updateEmployeeStatus: state.updateEmpoyeeStatus,
    payEmployeeStatus: state.payEmployeeStatus,
    listEmployee: state.listEmployee,
    infoUser: state.infoUser,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      changeUpdateEmployeeStatus: () => {
          dispatch({
              type: "CHANGE_UPDATE_EMPLOYEE_STATUS",
          });
      },
      changePayEmployeeStatus: () => {
        dispatch({
            type: "CHANGE_PAY_EMPLOYEE_STATUS",
        });
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeMoreMenu);