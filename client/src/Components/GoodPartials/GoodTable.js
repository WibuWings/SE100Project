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
        this.loadAllType();
        this.loadAllGood();
        console.log(this.props.listProduct.state);
    }
    removeProduct= (row) => {
        // Đây là xử lý ở phía dữ liệu, có thể await gì đó.
        // Xử lý ở phía giao diện(tạm)

        // Đây là câu lệnh để update nhẹ
        this.setState({update: this.state.update})
    }
    async loadAllGood() {
        var resultProduct = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }
        }
        await axios.get(`http://localhost:5000/api/product/`, {
            params: { ...data }
        })
            .then(res => {
                resultProduct = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
        // Get hết từ cái productjoinType
        var result = [];
        const data1 = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        await axios.get(`http://localhost:5000/api/product/join`, {
            params: { ...data1 }
        })
            .then(res => {
                result = res.data.data;
                localStorage.getItem('token', res.data.token);
            })
            .catch(err => {
                console.log(err);
                alert(err)
            })
        // Lấy các cái jointype
        var joinTypeInfor = [];
        for (let i = 0; i < result.length; i++) {
            joinTypeInfor.push(result[i]);
        }
        console.log("joinTypeInfor", joinTypeInfor);

        var listProductInfor = [];
        for (let i = 0; i < resultProduct.length; i++) {
            var typeIDList = [];
            var joinType = '';
            for (var j = 0; j < joinTypeInfor.length; j++) {
                if (resultProduct[i]._id.productID && joinTypeInfor[j]._id.productID &&
                    resultProduct[i]._id.productID === joinTypeInfor[j]._id.productID) 
                {
                    typeIDList.push(joinTypeInfor[j]._id.typeID);
                    joinType = joinType + ' ' + this.getTypeNamebyTypeID(joinTypeInfor[j]._id.typeID);
                }
            }

            listProductInfor.push(
                {
                    ...resultProduct[i],
                    typeIDList: typeIDList,
                    joinType: joinType
                });

            // rows.push(
            //     createData((i+1), obj._id.productID, obj.name, obj.quantity, 
            //         obj.importPrice, obj.sellPrice, obj._id.importDate, joinType, 
            //         obj.imgUrl, obj.unit, obj.expires, obj._id.storeID)
            // );
            
        }
        this.props.getProductToReducer(listProductInfor);
        this.setState({ change: !this.state.change });
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
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getProductToReducer: (data) => {
            dispatch({
                type: "GET_PRODUCT_AND_TYPE",
                data: data
            });
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(GoodTable));
