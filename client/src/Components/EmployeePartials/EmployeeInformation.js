import {connect} from 'react-redux';
import React, { Component } from 'react';
import { Card, CardHeader, Table, Grid, TextField, 
    TableCell, TableContainer, Button, InputLabel,
    Paper, TableRow, TableHead } from '@mui/material';
import { Image } from 'cloudinary-react';


class EmployeeInformation extends Component {
    constructor(props) {
      super(props);
      this.loadInitialData();
    }

    currentEmployee ;

    loadInitialData() {
        this.currentEmployee = this.getEmployeeInformationByID(this.props.employeeID.id);
    }

    getEmployeeInformationByID(employeeID)
    {
        for(var i = 0 ; i < this.props.listEmployee.employees.length; i++)
        {
            var currentEmployee = this.props.listEmployee.employees[i];
            if(currentEmployee._id.employeeID==employeeID)
            {
                console.log("currentEmployee", currentEmployee)
                return currentEmployee;
            }
        }
        return {};
    }

    toReadableDay(dayToConvert) {
        var days = dayToConvert.split('-');
        return days[2] + '/' + days[1] + '/'+ days[0];
    }

    render() {
      return (
        <div>
            <Grid container>
                <Grid item xs={2} display={{
                    display: 'flex',
                    // alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 20
                }}>
                    {
                        this.currentEmployee.imgUrl =='none' ? 
                        <div
                            style={{
                                backgroundImage: "url('https://res.cloudinary.com/databaseimg/image/upload/v1638852707/pskte7yrug4ifktds96c.png'",
                                 width: '80%', height: 0, paddingTop: '80%', backgroundSize: 'cover'
                            }} 
                        >
                        </div>
                        : 
                        <div 
                            style={{
                                backgroundImage: "url('" + this.currentEmployee.imgUrl + "')",
                                width: '80%', height: 0, paddingTop: '80%', backgroundSize: 'cover'
                            }}
                        > 
                        </div>
                    }
                </Grid>
                <Grid item xs={8}>
                    <Grid container style={{marginTop: 14}}>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                Username:
                            </lable>
                            <div class="property-val">
                                {this.currentEmployee._id.employeeID}
                            </div>
                        </Grid>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                Password:
                            </lable>
                            <div class="property-val">
                                {this.currentEmployee.password}
                            </div>
                        </Grid>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                First Name:
                            </lable>
                            <div class="property-val">
                                {this.currentEmployee.firstName}
                            </div>
                        </Grid>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                Last Name:
                            </lable>
                            <div class="property-val">
                                {this.currentEmployee.lastName}
                            </div>
                        </Grid>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                CardID:
                            </lable>
                            <div class="property-val">
                                {this.currentEmployee.cardID}
                            </div>
                        </Grid>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                Phone Number:
                            </lable>
                            <div class="property-val">
                                {this.currentEmployee.phoneNumber}
                            </div>
                        </Grid>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                Address:
                            </lable>
                            <div class="property-val">
                                {this.currentEmployee.address}
                            </div>
                        </Grid>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                StartDate:
                            </lable>
                            <div class="property-val">
                                {this.toReadableDay(this.currentEmployee.startDate.indexOf('T')!=-1 ? 
                                this.currentEmployee.startDate.substring(0, this.currentEmployee.startDate.indexOf('T')) :
                                this.currentEmployee.startDate)
                                }
                            </div>
                        </Grid>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                Email:
                            </lable>
                            <div class="property-val">
                                {this.currentEmployee.email}
                            </div>
                        </Grid>
                        <Grid item xs={6} class="property-display">
                            <lable class="property-name">
                                Birthday:
                            </lable>
                            <div class="property-val">
                                {this.toReadableDay(this.currentEmployee.dateOfBirth.indexOf('T')!=-1 ? 
                                this.currentEmployee.dateOfBirth.substring(0, this.currentEmployee.dateOfBirth.indexOf('T')) : 
                                this.currentEmployee.dateOfBirth)}
                            </div>
                        </Grid>
                        
                    </Grid>
                </Grid>
            </Grid>
        </div>
      );
    }
    
  }
  const mapStateToProps = (state, ownProps) => {
    return {
        listEmployee: state.listEmployee,
        employeeID: state.currentEmployeeViewValue,
    }
  }
  
  const mapDispatchToProps = (dispatch, ownProps) => {
    return {
       
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(EmployeeInformation);