import {connect} from 'react-redux';
import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/styles';
// material
import { TableCell, List, ListItem, ListItemButton, ListItemText} from '@mui/material';
import '../../css/EmployeeManager.css';

//icon
import { IoIosAdd,} from "react-icons/io";
import {  AiFillCloseCircle} from "react-icons/ai";


import AddEmployeeToShift from './AddEmployeeToShift';
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
    this.setState({change : !this.state.change})
  }

  getEmployeeNameByID(employeeID)
  {
      for(var i = 0 ; i < this.props.listEmployee.employees.length; i++)
      {
          var currentEmployee = this.props.listEmployee.employees[i];
          if(currentEmployee._id.employeeID==employeeID)
          {
            return currentEmployee.firstName;
          }
      }
      return "Can't get name";
  }

  findEmployeeNameByID(employeeID)
  {
      for(var i = 0 ; i < this.props.listEmployee.employees.length; i++)
      {
          var currentEmployee = this.props.listEmployee.employees[i];
          if(currentEmployee._id.employeeID==employeeID)
          {
            return true;
          }
      }
      return false;
  }

  getCurrentDateTime()
  {
      var currentDate = new Date();
      var day = (currentDate.toString().split(' '))[2];
      if(day.length < 2)
      {
          day = '0' + day;
      }
      var month = (new Date().getMonth() + 1).toString();
      if(month.length<2)
      {
          month = '0' + month;
      }
      return new Date().getFullYear() + '-' + month + '-' + day;
  }

  async addThisShiftAssign(employeeID)
  {
      const data = {
          token: localStorage.getItem('token'),
          shiftAssign: {
            _id: {
              dateInWeek: this.props.dayIndex,
              storeID: this.props.infoUser.email,
              shiftType: {
                  _id: {
                      shiftID: this.props.shiftID,
                      storeID: this.props.infoUser.email,
                  },
              },
              employee: {
                  _id: {
                      employeeID: employeeID,
                      storeID: this.props.infoUser.email,
                  },
              },
            },
          }
          
      }
      await axios.post(`http://localhost:5000/api/employee/shift-assign`, data)
        .then(res => {
            this.props.hideAlert();
            this.props.showAlert("Save shift assign success","success");
        })
        .catch(err => {
            this.props.hideAlert();
            this.props.showAlert("Something happened, restart and try again","warning");
            console.log('bug when add shift-assign',err);
        })
      this.handleChange();
      this.props.AddShiftAssign(data.shiftAssign);
  }

  sendShiftInfoToRedux(){
     var shiftAssign = {
        _id: {
          dateInWeek: this.props.dayIndex,
          storeID: this.props.infoUser.email,
          shiftType: {
              _id: {
                  shiftID: this.props.shiftID,
                  storeID: this.props.infoUser.email,
              },
          },
        }
     }
     this.props.changeCurrentShiftValue(shiftAssign);
  }

  removeShift(employeeID)
  {
    const data1 = {
        token: localStorage.getItem('token'),
        shiftAssign: {
          _id: {
            dateInWeek: this.props.dayIndex,
            storeID: this.props.infoUser.email,
            shiftType: {
                _id: {
                    shiftID: this.props.shiftID,
                    storeID: this.props.infoUser.email,
                },
            },
            employee: {
                _id: {
                    employeeID: employeeID,
                    storeID: this.props.infoUser.email,
                },
            },
          }
      },
    }
      axios.delete(`http://localhost:5000/api/employee/shift-assign`,{data: data1})
      .then(res => {
        this.props.hideAlert();
        this.props.showAlert("Delete shift assign success","success");
      })
      .catch(err => {
        this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
      })
      const data = {
          _id: {
            dateInWeek: this.props.dayIndex,
            storeID: this.props.infoUser.email,
            shiftType: {
                _id: {
                    shiftID: this.props.shiftID,
                    storeID: this.props.infoUser.email,
                },
            },
            employee: {
                _id: {
                    employeeID: employeeID,
                    storeID: this.props.infoUser.email,
                },
            },
        },
      }
      
      // console.log("data", data);
      this.props.RemoveShiftAssign(data);
      
  }

  findShiftInShiftAssign()
  {
      var listShiftAssign = this.props.listShiftAssign;
      for(var i = 0 ; i < listShiftAssign.length ; i++)
      {
          if(this.props.shiftID == listShiftAssign[i]._id.shiftType._id.shiftID && 
            this.props.dayIndex == listShiftAssign[i]._id.dateInWeek && 
            this.findEmployeeNameByID(listShiftAssign[i]._id.employee._id.employeeID))
            { 
                return true;
            }
      }
      return false;
  }

  findEmployeeInShift(employeeID)
  {
      var listShiftAssign = this.props.listShiftAssign;
      for(var i = 0 ; i < listShiftAssign.length; i++)
      {
          if(this.props.shiftID == listShiftAssign[i]._id.shiftType._id.shiftID 
            && this.props.dayIndex == listShiftAssign[i]._id.dateInWeek
            && listShiftAssign[i]._id.employee._id.employeeID == employeeID)
          return true;
      }
      return false;
  }
  
  render() {
    const { classes } = this.props;
    return (
        <TableCell 
            id="scroll-bar"
            className={classes.goodTable_Cell} 
            style={{
                position: 'relative',
                backgroundColor: !this.findShiftInShiftAssign() ?'#ff6057': 'yellowgreen',
                height: '80px',
            }}
            // ref={this.myRef}    
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
                    onClick={() => { 
                        this.sendShiftInfoToRedux(); 
                        this.props.changeAddEmployeeToShiftStatus()
                      }
                    }
                >    
                </IoIosAdd>
                
            </div>
            { 
              this.props.listShiftAssign.map((item) => 
                (
                  ( this.props.shiftID == item._id.shiftType._id.shiftID 
                    && this.props.dayIndex == item._id.dateInWeek 
                    && this.findEmployeeNameByID(item._id.employee._id.employeeID))
                  ? <div style={{
                            backgroundColor: "#fff", 
                            padding: 10, 
                            width: '100%',
                            position: 'relative',
                            marginBottom: 4
                            }}
                    >
                      <span>
                          {item._id.employee._id.employeeID + ' - ' 
                          + this.getEmployeeNameByID(item._id.employee._id.employeeID)}
                      </span>
                      <AiFillCloseCircle
                          style={{
                            color: 'red',
                            position: 'absolute',
                            right: 0, 
                            top: 0,
                          }} 
                          size={20}
                          onClick={() => this.removeShift(item._id.employee._id.employeeID)}
                      ></AiFillCloseCircle>
                    </div>
                  : null
                )
              )
            }
            {
              // this.isOpen 
              // ? 
              // // Đây là cái bảng chọn nhân viên
              // <List 
              //   style={{
              //     position: 'absolute',
              //     right: 0,
              //     top: 20,
              //     zIndex: 10,
              //     maxHeight: 100,
              //     overflowY: 'auto',
              //     width: 140,
              //     backgroundColor: '#fff',
              //     width: 200
              //   }}
              //   id="scroll-bar"
              // >
              //   {/* <div style={{height: 12, backgroundColor:'#333'}}></div> */}
              //   {
              //     this.props.listEmployee.employees.map((item) =>
              //       this.findEmployeeInShift(item._id.employeeID) ? null :
              //       <ListItem style={{display: 'flex', flexDirection: 'column'}} disablePadding height={30} onClick={() => this.addThisShiftAssign(item._id.employeeID)}>
              //           <ListItemButton>
              //               <ListItemText>
              //                 <span style={{fontSize: 14}}>{item._id.employeeID + ' - ' + item.firstName}</span>
                                
              //               </ListItemText>
              //           </ListItemButton>
              //           <div style={{
              //               height: 2,
              //               width: '100%',
              //               border: '1px solid #333'
              //           }}></div>
              //       </ListItem>
              //     )
              //   }
              // </List>
              // : null
            }
            {/* {this.props.statusAddEmployeeToShift
            ? 
                <div 
                    className="modal-add"
                >
                    <div onClick={() => {
                          console.log("Đã được đóng")
                          this.props.changeAddEmployeeToShiftStatus();
                      }} className="modal-overlay"></div>
                    <AddEmployeeToShift
                        style={{
                            marginTop: 0
                        }}
                    >
                    </AddEmployeeToShift>
                </div>
            : null
            } */}
        </TableCell>
        
    );
  }
  
}
const mapStateToProps = (state, ownProps) => {
    return {
        listEmployee: state.listEmployee,
        listShiftAssign: state.listShiftAssign,
        infoUser: state.infoUser,
        statusAddEmployeeToShift: state.statusAddEmployeeToShift,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    AddShiftAssign: (data) => {
      dispatch({
          type: "ADD_NEW_SHIFT_ASSIGN",
          data: data,
      });
    },
    RemoveShiftAssign: (data) => {
      dispatch({
          type: "DELETE_SHIFT_ASSIGN",
          data: data,
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
    changeAddEmployeeToShiftStatus: () => {
      dispatch({
          type: "CHANGE_ADD_EMPLOYEE_TO_SHIFT_STATUS",
      });
    },
    changeCurrentShiftValue: (data) => {
      dispatch({
        type: "SET_CURRENT_SHIFT_VALUE",
        data: data
      });
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(FixedCalendarCell));