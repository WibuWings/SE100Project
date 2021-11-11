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
        height: '20px',
    },
    goodTable_Cell: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid',
        height: '80px',
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
    render() {
        const { classes } = this.props;
        return (
            <div style={{padding: 24}}>
                <span style={{backgroundColor: 'blue', color: '#fff', padding: 10}}>
                    NOJOB EMPLOYEE
                </span>
               
                <TableContainer component={Paper} style={{width: 400}} >
                    <Table>
                        <TableHead>
                                <TableRow>
                                    <TableCell className={classes.goodTable_Cell_Header} align="center" style={{height: 30}}>ID</TableCell>
                                    <TableCell className={classes.goodTable_Cell_Header} align="center">Employee</TableCell>
                                </TableRow>
                        </TableHead>
                        {
                            this.props.listEmployee.employees.map((item) => 
                            
                                <TableRow>
                                    <TableCell className={classes.goodTable_Cell_Header} align="center" style={{height: 30}}>{item._id.employeeID}</TableCell>
                                    <TableCell className={classes.goodTable_Cell_Header} align="center">{item.firstName + ' ' + item.lastName}</TableCell>
                                </TableRow>

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

               