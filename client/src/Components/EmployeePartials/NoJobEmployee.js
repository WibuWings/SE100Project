import React, { Component } from 'react';
import { Table, TableCell, TableContainer, TableRow, TableHead, Paper} from '@mui/material';
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import { withStyles } from '@material-ui/styles';

var productTypes =[
    'food', 'detergent', 'cuisine'
];

var typeSet = [];

var listUsers = [];

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
    },
    goodTable_Cell: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid',
    } 
})

class NoJobEmployee extends Component {

    genID = 0;

    constructor(props) {
        super(props);
        
        this.state = {
            change: false,
        };
        listUsers = [];
    }

    cancel = () => {
        this.props.changeAddEmployeeStatus();
    }

    addEmployee = () => {
        this.addEmployeeToDatabase();
        this.props.changeAddEmployeeStatus();
    }

    findEmployeeInAssign(employeeID)
    {
        var shiftAssign = this.props.listShiftAssign;
        for(var i = 0 ; i < shiftAssign.length; i++)
        {
            if(shiftAssign[i]._id.employee._id.employeeID == employeeID)
            {
                return true;
            }
        }
        return false;
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <TableContainer component={Paper} style={{width: 400}} >
                    <Table>
                        <TableHead>
                            <TableRow style={{height: 20}}>
                                <TableCell className={classes.goodTable_Cell_Header} style={{color: '#fff', backgroundColor: '#000'}} align="center" >      ID</TableCell>
                                <TableCell className={classes.goodTable_Cell_Header} style={{color: '#fff', backgroundColor: '#000'}} align="center">Employee</TableCell>
                            </TableRow>
                        </TableHead>
                        {

                            this.props.listEmployee.employees.map((item) => 
                                !this.findEmployeeInAssign(item._id.employeeID)
                                ?<TableRow>
                                    <TableCell className={classes.goodTable_Cell_Header} align="center" style={{height: 30}}>{item._id.employeeID}</TableCell>
                                    <TableCell className={classes.goodTable_Cell_Header} align="center">{item.firstName + ' ' + item.lastName}</TableCell>
                                </TableRow>
                                :(null)
                            )
                        }
                        
                    </Table>
                </TableContainer>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addEmployeeStatus: state.addEmployeeStatus,
        confirmStatus: state.confirmStatus,
        infoUser: state.infoUser,
        listEmployee: state.listEmployee,
        listShiftAssign: state.listShiftAssign,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_EMPLOYEE_STATUS",
            });
        },
        getEmployee: (data) => {
            dispatch({
                type: "GET_EMPLOYEE",
                employees: data,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles, {withTheme: true})(NoJobEmployee));

               