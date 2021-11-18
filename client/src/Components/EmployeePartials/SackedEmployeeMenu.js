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

    getSackedEmployeeByID(employeeID) {
        var listEmployee = this.props.listSackedEmployee.employees;
        console.log(listEmployee);
        for(var i = 0; i < listEmployee.length ; i++)
        {
          if(employeeID == listEmployee[i]._id.employeeID)
          {
            return listEmployee[i];
          }
        }
    }

    backToWork() {
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
        axios.patch(`http://localhost:5000/api/employee/delete`, data)
            .then(res => {
                alert("back to work success");
            })
            .catch(err => {
                alert(err);
            })

        // Xoá khỏi redux sacked
        this.props.backToWorkSackedEmployee(this.props.data);

        // Thêm vào redux ko sacked
        this.props.addEmployee(this.getSackedEmployeeByID(this.props.data));
    }

    delete() {
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

        // To redux
        var employeeID = this.props.data;
        this.props.deletePermantlyEmployee(employeeID);
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
                onClick={() => this.backToWork()}
            >
                <ListItemIcon>
                <Icon icon={editFill} width={24} height={24} />
                </ListItemIcon>
                <ListItemText primary="Return" primaryTypographyProps={{ variant: 'body2' }} />
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
        listSackedEmployee: state.listSackedEmployee,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        backToWorkSackedEmployee: (id) => {
            dispatch({
                type: "RETURN_TO_WORK",
                id: id
            });
        },
        addEmployee: (data) => {
            dispatch({
                type: "ADD_EMPLOYEE",
                employees: data,
            });
        },
        deletePermantlyEmployee: (employeeID) => {
            dispatch({
                type: "DELETE_PERMANTLY_EMPLOYEE",
                employeeID: employeeID,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeMoreMenu);