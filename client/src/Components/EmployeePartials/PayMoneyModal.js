import React, { Component } from 'react';
import { Card, CardHeader, Table, Grid, TextField, 
    TableCell, TableContainer, Button, InputLabel,
    Paper, TableRow, TableHead } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import { GiCancel } from 'react-icons/gi'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import { withStyles } from '@material-ui/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { AiFillPlusCircle} from "react-icons/ai";
import CancelIcon from '@mui/icons-material/Cancel';

var productTypes =[
    'food', 'detergent', 'cuisine'
];

var typeSet = [];
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
        height: '40px',
    } 
})
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


class PayEmployeeModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            goodID : "",
            change: false,
            imageSelect: "null",
            type:'none',
            url: 'http://res.cloudinary.com/databaseimg/image/upload/v1634117795/ubvxisehhpvnu2lbqmeg.png',
        }; 
        // console.log("listTimeKeeper", this.props.listTimeKeeper);
        // console.log("this.props.employeeID", this.props.employeeID);
    }

    getShiftInforByID(shiftID)
    {
        var listShift = this.props.listShift;
        for(var i = 0 ; i < listShift.length; i++)
        {
            if(listShift[i]._id.shiftID == shiftID)
            {
                return listShift[i].name + ' (' + listShift[i].timeFrom + '-' + listShift[i].timeEnd + ')';
            }
        }
        return "Can't get shift";
    }

    getEmployeeFullNameByID(employeeID)
    {
            for(var i = 0 ; i < this.props.listEmployee.employees.length; i++)
            {
                var currentEmployee = this.props.listEmployee.employees[i];
                if(currentEmployee._id.employeeID==employeeID)
                {
                        return currentEmployee.lastName + ' ' + currentEmployee.firstName;
                }
            }
        return "Can't get name";
    }

    payEmployee(){
        // alert("Confirm password");
        // viết api để trả lương ở đây
        // this.props.changePayEmployeeStatus();
        // Thử api
        const data = {
            token: localStorage.getItem('token'),
            updatedTimeKeeping: {
                _id: this.props.listTimeKeeper[0]._id,
                isPaidSalary: true,
            }
        };
        console.log("tính lương", data);
        axios.put(`http://localhost:5000/api/employee/time-keeping`, data)
            .then(res => {
                console.log("Update success");
                alert('Đã update thành công sản phẩm');
                
            })
            .catch(err => {
                console.log(err);
            })


        // Cập nhật redux trạng thái trả lương nhiều cái cùng lúc

    }
    
    render() {
        const { classes } = this.props;
        return (
            <form style={{ zIndex: '10', width: '60%', justifyContent: 'center', marginTop: '80px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' , textAlign: 'center'}} title="PAY EMPLOYEE" />
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
                            {/* <label className="profile-header__avatar" for="profile-header-update-avatar" style={{ overflow: 'hidden' }}>
                                <Image style={{width: '150px',height: '150px' }} cloudName="databaseimg" publicId={this.imgUrl=='none' ? 'http://res.cloudinary.com/databaseimg/image/upload/v1634358564/b9wj5lcklxitjglymxqh.png' : this.imgUrl}></Image>
                            </label>
                            <input id="profile-header-update-avatar" type="file" style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={(e) => this.profileImageChange(e)}></input> */}
                        </Grid>
                        <Grid item md={12}>

                            <Card>
                                
                                <Grid container md={12}>
                                     <TableContainer component={Paper}>
                                            <Table className={classes.goodTable} sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center" width='180px'>Day</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center" width='80px'>Date Of Week</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center" >Shift</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center">ID</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center">Name</TableCell>
                                                        <TableCell className={classes.goodTable_Cell_Header} align="center">Salary</TableCell>
                                                        {/* <TableCell className={classes.goodTable_Cell_Header} align="center"></TableCell> */}
                                                    </TableRow>
                                                    {
                                                        this.props.listTimeKeeper.map((timeKeeper)=>
                                                        timeKeeper._id.employee._id.employeeID != this.props.employeeID.id ? (null) :
                                                            (
                                                            <TableRow>
                                                                <TableCell className={classes.goodTable_Cell}>
                                                                    {timeKeeper._id.realDate.substring(0,timeKeeper._id.realDate.indexOf('T') )}
                                                                </TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>{timeKeeper._id.dateInWeek}</TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>
                                                                    {timeKeeper._id.shiftType.name + " ("+ timeKeeper._id.shiftType.timeFrom + 
                                                                    ' - '+  timeKeeper._id.shiftType.timeEnd +')'}
                                                                </TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>{timeKeeper._id.employee._id.employeeID}</TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>
                                                                    {timeKeeper._id.employee.firstName + " " + timeKeeper._id.employee.lastName}
                                                                </TableCell>
                                                                <TableCell className={classes.goodTable_Cell}>
                                                                    {timeKeeper.isPaidSalary.toString()}
                                                                </TableCell>
                                                            </TableRow>
                                                            )
                                                        )
                                                    }
                                                </TableHead>
                                            </Table>
                                    </TableContainer>
                                    <Grid item md={3}
                                        className='input-item'
                                    >
                                        <Button variant="contained" onClick={() => this.payEmployee()}>
                                            Pay employee
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
        listTimeKeeper: state.listTimeKeeping,
        listShift: state.listShift,
        listEmployee: state.listEmployee,
        infoUser: state.infoUser,
        employeeID: state.currentEmployeeViewValue,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changePayEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_PAY_EMPLOYEE_STATUS",
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(PayEmployeeModal));

               