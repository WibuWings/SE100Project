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

function createData(index, id, name, quantity, originalPrice, sellPrice, importTime, productType, imgUrl, unit, expires, storeID) {
    return {
        storeID,
        index,
        id,
        name,
        quantity,
        sellPrice,
        importTime,
        imgLink: imgUrl,
        hidden:
        {
            expires: expires,
            remaining: quantity,
            originalPrice: originalPrice,
            productType: productType,
            unit: unit,
        },
    };
}


var rows = [];

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
        this.loadAllType();
        this.loadAllGood();
    }
    removeProduct= (row) => {
        // Đây là xử lý ở phía dữ liệu, có thể await gì đó.
        // Xử lý ở phía giao diện(tạm)

        // Đây là câu lệnh để update nhẹ
        this.setState({update: this.state.update})
    }
    async loadAllGood() {
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        await axios.get(`http://localhost:5000/api/product/`, {
            params: {...data}
        })
            .then(res => {
                // alert("Lấy hết đc product ròi anh chai");
                result = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
        // Get data và lưu các tên Type vào dữ liệU
        //Get data và lưu các tên Type vào bảng
        listProductInfor=[];
        for(var i=0; i < result.length ; i++)
        {
            listProductInfor.push(result[i]);
        }
        // Get hết từ cái productjoinType
        const data1 = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        await axios.get(`http://localhost:5000/api/product/join`, {
            params: {...data}
        })
            .then(res => {
                result = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })  
        // Lấy các cái jointype
        joinTypeInfor = [];
        for(var i = 0 ; i < result.length; i++)
        {
            joinTypeInfor.push(result[i]);
        }

        //createData(index, id, name, quantity, originalPrice, sellPrice, importTime, productType, imgUrl)
        // Cập nhật vào cái row đi cho chắc
        rows = [];
        for(var i = 0; i < listProductInfor.length ; i++)
        {
            var obj = listProductInfor[i];

            var joinType = '';
            // // Lấy tất cả các type trong cái product
            for(var j = 0; j < joinTypeInfor.length ; j++)
            {

                // console.log("joinTypeInfor[]", j ,joinTypeInfor[j])
                if(joinTypeInfor[j]._id.productID == obj._id.productID && joinTypeInfor[j]._id.storeID == obj._id.storeID)
                {
                    joinType = joinType + ' ' + this.getTypeNamebyTypeID(joinTypeInfor[j]._id.typeID);
                }
            }

            rows.push(
                createData((i+1), obj._id.productID, obj.name, obj.quantity, 
                    obj.importPrice, obj.sellPrice, obj._id.importDate, joinType, 
                    obj.imgUrl, obj.unit, obj.expires, obj._id.storeID)
            );
        }
        
        this.setState({change: !this.state.change});
    }

    async loadAllType() {
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }

        await axios.get(`http://localhost:5000/api/product/type`, 
        {
            params: {...data}
        })
            .then(res => {
                result = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
        //Get data và lưu các tên Type vào bảng
        listTypeInfor=[];
        for(var i=0; i < result.length ; i++)
        {
            listTypeInfor.push(result[i]);
        }

        this.setState({change: true});
    }
    getTypeNamebyTypeID (typeID) {
        var typeName='';
        for(var i = 0; i<listTypeInfor.length;i++)
        {   
            if(listTypeInfor[i]._id.typeID == typeID)
            {
                typeName = listTypeInfor[i].name;
                break;
            }
        }
        return typeName;
    }

    render() {
        const { classes } = this.props;
        return (
            <div style={{height: '550px', width: '100%', overflowY: 'scroll'}}>
                <TableContainer component={Paper}>
                    <Table className={classes.goodTable} aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.goodTable_Cell} align="center">Index</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">ID</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">GoodName</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">Quantity</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">Sell Price</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">ImportTime</TableCell>
                                <TableCell className={classes.goodTable_Cell}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <GoodRow key={row.name} row={row} />
                            ))}
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
        confirmStatus: state.confirmStatus
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(GoodTable));
