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
    this.getEmployeeByID(this.props.data);
  }
  setIsOpen(val) {
    this.isOpen = val;
    this.setState({change: val});
    
  }

  edit() {
    this.setIsOpen(false);
    this.getEmployeeByID(this.props.data);
    // console.log("send nude", this.currentEmployee);
    this.props.setUpdateEmployee(this.currentEmployee);
    this.props.changeUpdateEmployeeStatus();
  }

  delete() {
    this.setIsOpen(false);
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

    axios.delete(`http://localhost:5000/api/employee`,{data: data})
        .then(res => {
            alert("delete employee(s) success");
        })
        .catch(err => {
            alert(err);
        })
    
    //Move to sacked
    this.props.deleteEmployeeToSackRedux(this.currentEmployee)
    // Delete redux
    this.props.deleteEmployeeRedux(this.props.data);

    // Xoá hết shiftAssign
    for(var i = 0; i < this.props.listShiftAssign.length; i++)
    {
        if(this.props.listShiftAssign[i]._id.employee._id.employeeID == this.props.data) 
        {
          const data1 = {
            token: localStorage.getItem('token'),
            shiftAssign: {...this.props.listShiftAssign[i]}
          }
          console.log("data1", data1)
          axios.delete(`http://localhost:5000/api/employee/shift-assign`,{data: data1})
          .then(res => {
              // alert("success");
              // Xoá đi trong redux
              this.props.RemoveShiftAssign(data1.shiftAssign);
          })
          .catch(err => {
              alert(err);
          })
        }
        
    }

  }

  getEmployeeByID(employeeID) {
    var listEmployee = this.props.listEmployee.employees;
    console.log(listEmployee);
    for(var i = 0; i < listEmployee.length ; i++)
    {
      if(employeeID == listEmployee[i]._id.employeeID)
      {
        this.currentEmployee = listEmployee[i];
        return listEmployee[i];
      }
    }
  }

  viewEmployee()
  {
      console.log("this.props.data", this.props.data)
      this.props.setIDView(this.props.data);
      this.props.changePayEmployeeStatus();
      this.setIsOpen(false);
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
            onClick={()=> this.viewEmployee()}
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
    listShiftAssign: state.listShiftAssign,
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
      setUpdateEmployee: (currentEmployee) => {
        dispatch({
          type: "SET_UPDATE_EMPLOYEE",
          data: currentEmployee
        });
      }, 
      deleteEmployeeRedux: (id) => {
        dispatch({
          type: "DELETE_EMPLOYEE",
          id: id
        });
      },
      deleteEmployeeToSackRedux: (data) => {
        dispatch({
          type: "DELETE_EMPLOYEE_SACKED",
          data: data
        });
      },
      setIDView: (id) => {
        dispatch({
          type: "SET_ID_EMPLOYEE",
          id: id
        });
      },
      RemoveShiftAssign: (data) => {
        dispatch({
            type: "DELETE_SHIFT_ASSIGN",
            data: data,
        });
      }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EmployeeMoreMenu);