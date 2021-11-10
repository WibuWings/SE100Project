import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, InputLabel } from '@mui/material';
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import { withStyles } from '@material-ui/styles';

const StyledTextField = withStyles((theme) => ({
    root: {
      "& .MuiInputBase-root": {
        height: 36,
        "& input": {
          textAlign: "right",
          marginLeft: '4px',
        }
      }
    }
  }))(TextField);

class UpdateEmployeeModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            change: false,
        }; 
        this.loadInitialData();
    }
    

    cancel = () => {
        
    }

    updateEmployee = () => {
        const data = {
            token: localStorage.getItem('token'),
            employee: {
                _id: {
                    employeeID: this.id,
                    storeID: this.props.infoUser.email,
                },
                managerID: this.props.infoUser.email,
                password: document.querySelector('input[name="password"]').value,
                firstName: document.querySelector('input[name="firstName"]').value,
                lastName: document.querySelector('input[name="lastName"]').value,
                phoneNumber: document.querySelector('input[name="phoneNumber"]').value,
                dateOfBirth: document.querySelector('input[name="birthDay"]').value,
                email: document.querySelector('input[name="email"]').value,
                address: document.querySelector('input[name="adress"]').value,
                cardID: document.querySelector('input[name="cardID"]').value,
                startDate: document.querySelector('input[name="startDate"]').value,
            }   
        }
        console.log(data);
        axios.put(`http://localhost:5000/api/employee`, data)
            .then(res => {
                console.log("Update success");
            })
            .catch(err => {
                console.log(err);
            })
        this.props.changeUpdateEmployeeStatus();
    }

    id = "";
    password = "";
    firstName = "";
    lastName = "";
    cardID = "";
    phoneNumber = "";
    address = "";
    email = "";
    startDate = "";
    birthDay = "";


    loadInitialData() {
        var currentEmployee = this.props.currentEditEmployee.state;
        console.log("currentEmployee", currentEmployee);
        this.id = currentEmployee._id.employeeID;
        this.password = currentEmployee.password;
        this.firstName = currentEmployee.firstName;
        this.lastName = currentEmployee.lastName;
        this.cardID = currentEmployee.cardID;
        this.phoneNumber = currentEmployee.phoneNumber;
        this.address = currentEmployee.address;
        this.email = currentEmployee.email;
        this.startDate = currentEmployee.startDate;
        if(this.startDate!=null)
        {
            this.startDate = this.startDate.substring(0, this.startDate.indexOf('T'));
        }
        this.birthDay = currentEmployee.dateOfBirth;
        if(this.birthDay!=null)
        {
            this.birthDay = this.birthDay.substring(0, this.birthDay.indexOf('T'));
        }
        this.setState({change: !this.state.change})
    }

    render() {
        return (
            <form style={{ zIndex: '10', width: '60%', justifyContent: 'center', marginTop: '80px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' , textAlign: 'center'}} title="UPDATE EMPLOYEE" />
                        <div 
                        style={{ 
                            width: '100%', backgroundColor: 'rgb(221,235,255)'   
                        }}
                    >   
                    <Grid className="import-container" container >
                        <Grid item md={12}  
                            style={{
                                display: 'flex', 
                                justifyContent:'center', 
                                flexDirection:'column',
                                alignItems:'center',
                                marginTop: '0px'
                            }}
                        >   
                            <label className="profile-header__avatar" for="profile-header-update-avatar" style={{ overflow: 'hidden' }}>
                                <Image style={{width: '150px',height: '150px' }} cloudName="databaseimg" publicId={this.imgUrl=='none' ? 'http://res.cloudinary.com/databaseimg/image/upload/v1634358564/b9wj5lcklxitjglymxqh.png' : this.imgUrl}></Image>
                            </label>
                            {/* Ẩn đi */}
                            <input id="profile-header-update-avatar" type="file" style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={(e) => this.profileImageChange(e)}></input>
                        </Grid>
                        <Grid item md={12}>

                            <Card>
                                
                               <Grid container md={12}>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div 
                                            className="input-label"
                                            style={{
                                                width: '116px'
                                            }}
                                        >
                                            ID
                                        </div>
                                        <StyledTextField
                                            classname='input-box' 
                                            type="text" 
                                            // class="input-val" 
                                            style = {{width: '70%'}} 
                                            fullWidth 
                                            size="small" 
                                            variant="outlined"
                                            value={this.id}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label" style={{width: '114px'}}>Password</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="password" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.password}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>First Name</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="firstName"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.firstName}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Last Name</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="lastName"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.lastName}
                                        />
                                    </Grid>
                                    
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>ID CARD</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="cardID" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.cardID}
                                        />
                                    </Grid>
                                    
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>PhoneNumber</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="phoneNumber"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.phoneNumber}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Adress</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="adress" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.address}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>StartDate</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="date"
                                            name="startDate"
                                            style = {{width: '100%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.startDate}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Email</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="email"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.email}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>BirthDay</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="date" 
                                            // class="input-val"
                                            name="birthDay"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.birthDay}
                                        />
                                    </Grid>
                                    <Grid item md={9}></Grid>
                                    <Grid item md={3}
                                        className='input-item'
                                    >
                                        <Button variant="contained" onClick={() => this.updateEmployee()}>
                                            UPDATE
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={12} >
                            
                        </Grid>
                    </Grid> 
                </div>
                </Card>
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addEmployeeStatus: state.addEmployeeStatus,
        confirmStatus: state.confirmStatus,
        currentEditEmployee: state.currentEditEmployee,
        infoUser: state.infoUser
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_EMPLOYEE_STATUS",
            });
        },
        changeUpdateEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_UPDATE_EMPLOYEE_STATUS",
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployeeModal);

               