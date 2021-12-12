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
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, Modal} from '@mui/material';

// ----------------------------------------------------------------------
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: '5px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
class EmployeeMoreMenu extends Component {
  currentEmployee = {};


    constructor(props) {
        super(props);
        this.state= {
            change: 'false',
            openModal: false
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
                this.props.hideAlert();
                this.props.showAlert("Employee has returned to work","success");
            })
            .catch(err => {
                this.props.hideAlert();
                this.props.showAlert("Something happened, restart and try again","warning");
            })

        // Xoá khỏi redux sacked
        this.props.backToWorkSackedEmployee(this.props.data);

        // Thêm vào redux ko sacked
        this.props.addEmployee(this.getSackedEmployeeByID(this.props.data));
    }

    delete() {
        this.handleClose();
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

        axios.delete(`http://localhost:5000/api/employee/delete`,{data: data})
            .then(res => {
                this.props.hideAlert();
                this.props.showAlert("Delete permantly employee(s) success","success");
            })
            .catch(err => {
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
            })

        // To redux
        var employeeID = this.props.data;
        this.props.deletePermantlyEmployee(employeeID);
    }

    handleClose() {
        this.setState({openModal: false});
    }
  
    openModal() {
        this.setState({openModal: true});
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
                    onClick={() => this.openModal()}
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
        <Modal
            open={this.state.openModal}
            onClose={() => this.handleClose()}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
                <h2 style={{ textAlign: 'center' , fontSize: 20}} id="parent-modal-title">Are you sure to delete?</h2>
                <Grid container spacing={2}>
                    <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                        <Button onClick={() => this.delete()} style={{ color: 'white', backgroundColor: '#f44336' }}>DELETE</Button>
                    </Grid>
                    <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                        <Button onClick={() => this.handleClose()} style={{ backgroundColor: '#ADD8E6' }}>CANCEL</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
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
        },
        showAlert: (message, typeMessage) => {
            dispatch({
                type: "SHOW_ALERT",
                message: message,
                typeMessage: typeMessage,
            })
        },
        hideAlert: () => {
            dispatch({
                type: "HIDE_ALERT",
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeMoreMenu);