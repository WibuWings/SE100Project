import * as React from 'react';
import { Component } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { withStyles } from '@material-ui/styles';
import axios from 'axios';
import { connect } from 'react-redux';
import GoodRow from './TableRow';

const styles = theme =>  ({
    goodTable: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid'
    },
    goodTable_Cell: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid',
        height: '40px',
    } 
})


var listProductInfor = [];
var joinTypeInfor = [];
var listTypeInfor = [];

class GoodTable extends Component {
    constructor(props) {
        super(props);
        this.state ={
            update: false
        }
        console.log("this.props.listProduct.state", this.props.listProduct.state);
    }

    getTypeNamebyTypeID (typeID) {
        var typeName="Null";
        for(var i = 0; i < this.props.typeProduct.length;i++)
        {   
            if(this.props.typeProduct[i]._id.typeID == typeID)
            {
                typeName = this.props.typeProduct[i].name;
                break;
            }
        }
        return typeName;
    }

    render() {
        const { classes } = this.props;
        return (
            <div id="scroll-bar" style={{height: '550px', width: '100%', overflowY: 'auto'}}>
                <TableContainer id="scroll-bar" component={Paper}>
                    <Table className={classes.goodTable} aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.goodTable_Cell} align="center">ID</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">GoodName</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">Quantity</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">Sell Price</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">ImportTime</TableCell>
                                <TableCell className={classes.goodTable_Cell}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.props.listProduct.state == undefined ? (null):
                                this.props.listProduct.state.map((product) => (
                                    product==undefined ? null :
                                    <GoodRow data={product} />
                                ))
                            }   
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addTypeStatus: state.addTypeStatus,
        infoUser: state.infoUser,
        isAddTypeStatus: state.isAddTypeStatus,
        confirmStatus: state.confirmStatus,
        listProduct: state.listProduct,
        typeProduct: state.typeProduct,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(GoodTable));
