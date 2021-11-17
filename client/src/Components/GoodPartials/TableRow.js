import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Image } from 'cloudinary-react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { withStyles } from '@material-ui/styles';
import GoodImage from './goodExample.jpg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { Component } from 'react';
import { connect } from 'react-redux';

const styles = theme =>  ({
    goodTable_Cell:{
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid',
        height: 4,
        color: '#333'
    }
});



class GoodRow extends Component{
    constructor(props) {
        super(props);
        this.state ={
            update: false,
            change: false,
        }
        
    }
    isOpen = false;
    row = {};
    setOpen(value) {
        this.isOpen = value;
        this.setState({change: !this.state.change});
        console.log("this.isOpen",this.isOpen)
    }

    async deleteProduct() {
        // Xoá sản phẩm
        // const data = {
        //     token: localStorage.getItem('token'),
        //     products:
        //     [
        //         {
        //             productID: row.id,
        //             importDate: row.importTime,
        //             storeID: row.storeID,
        //         }
        //     ]
            
        // }
        // axios.delete(`http://localhost:5000/api/product`,{data: data})
        //     .then(res => {
        //         alert("delete product success");
        //     })
        //     .catch(err => {
        //         alert(err);
        //     })
        
        // // Get hết các cái join của sản phẩm
        // var allJoinMatch = [];
        // const data1 = {
        //     token: localStorage.getItem('token'),
        //     filter: {
        //         "_id.storeID": row.storeID,
        //         "_id.productID": row.id,
        //     }   
        // }
        // await axios.get(`http://localhost:5000/api/product/join`, 
        // {
        //     params: {...data1}
        // })
        //     .then(res => {
        //         allJoinMatch = res.data.data;
        //     })
        //     .catch(err => {
        //         console.log(err);
        //         alert(err);
        //     })
        // console.log(allJoinMatch);
        // // Xoá các join liên quan đến sản phẩm
        // var allProductJoin = [];
        // for(var i = 0 ; i < allJoinMatch.length; i++)
        // {
        //     allProductJoin.push({
        //         productID: row.id,
        //         typeID: allJoinMatch[i]._id.typeID,
        //         importDate: allJoinMatch[i]._id.importDate,
        //         storeID: row.storeID,
        //     });
        // }
        // const dataJoin = {
        //     token: localStorage.getItem('token'),
        //     productJoinTypes: allProductJoin,      
        // }

        // console.log(dataJoin);

        // await axios.delete(`http://localhost:5000/api/product/join`,{data: dataJoin})
        //     .then(res => {
        //         console.log("delete join success");
        //     })
        //     .catch(err => {
        //         alert(err);
        //     })

        // Tạm thời
        // window.location.reload();
    }
    render () {
        const { classes } = this.props;
        const row = this.props.data;
        console.log(row);
        return (
            <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell className={classes.goodTable_Cell} component="th" scope="row">{row._id.productID}</TableCell>
                <TableCell className={classes.goodTable_Cell} component="th" scope="row">{row.name}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">{row.quantity}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">{row.sellPrice}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">
                    {/* {row.importTime == null ? '' : row.importTime.substring(0,row.importTime.indexOf('T'))} */}
                    {row._id.importDate == null ? '': row._id.importDate.substring(0,row._id.importDate.indexOf('T'))}
                </TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">
                    <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!this.isOpen)}>
                        {this.isOpen ? (<KeyboardArrowUpIcon />) : (<KeyboardArrowDownIcon />)}
                    </IconButton>
                </TableCell>
            </TableRow>
            {
                this.isOpen ?
                <TableRow>
                    <TableCell className={classes.goodTable_Cell} style={{ padding: 0, height: 100}} colSpan={8}>
                        {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
                        <Collapse in={true} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Other information
                                </Typography>
                                <div style={{display: 'flex'}}>
                                    {  
                                        row.imgUrl == "none"
                                        ? <div style={{width: '100px', height: '100px', objectFit:'cover'}}><img src={GoodImage} style={{width: '100px', height: '100px', objectFit:'cover'}}/></div>
                                        
                                        : <div style={{width: '100px', height: '100px', objectFit:'cover'}}><Image style={{width: '100px', height: '100px', objectFit:'cover'}} cloudName="databaseimg" publicId={row.imgUrl}>{row.imgUrl}</Image></div>
                                    }
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell className={classes.goodTable_Cell}><div style={{color: '#333'}}>Expired Day</div></TableCell>
                                                <TableCell className={classes.goodTable_Cell}><div  style={{color: '#333'}}>Original Price</div></TableCell>
                                                <TableCell className={classes.goodTable_Cell} style={{color: '#333'}}><div  style={{color: '#333'}}>Good Remain</div></TableCell>
                                                <TableCell className={classes.goodTable_Cell} style={{color: '#333'}}><div  style={{color: '#333'}}>Product Type</div></TableCell>
                                                <TableCell className={classes.goodTable_Cell} style={{color: '#333'}}><div style={{color: '#333'}}>Unit</div></TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className={classes.goodTable_Cell} component="th" scope="row">
                                                    {/* {row.hidden.expires == null ? '': row.hidden.expires.substring(0,row.hidden.expires.indexOf('T'))} */}
                                                    {row.expires == null ? '': row.expires.substring(0,row.expires.indexOf('T'))}
                                                </TableCell>
                                                <TableCell className={classes.goodTable_Cell}>{row.importPrice}</TableCell>
                                                <TableCell className={classes.goodTable_Cell}>{row.remain}</TableCell>
                                                <TableCell className={classes.goodTable_Cell}>{row.joinType}</TableCell>
                                                <TableCell className={classes.goodTable_Cell}>{row.unit}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                    <div className="button-container">
                                        <Button 
                                            onClick={() => {
                                                // Truyền cái data vào trong hàm đây luôn
                                                const data = row;
                                                this.props.updateProduct(data);
                                                this.props.openUpdateModal();
                                            }}
                                            variant="contained"
                                        >
                                            Update
                                        </Button>
                                        <Button 
                                            variant="contained"
                                            onClick={() => this.deleteProduct()}
                                        >
                                            Delete
                                            
                                        </Button>
                                    </div>
                                </div>  
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
                : null
            }
            
            </React.Fragment>
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
        updateProduct: (data) => {
            dispatch({type: "UPDATE_GOOD_DATA", data});
        },
        openUpdateModal: (data) => {
            dispatch({ type: "CHANGE_UPDATE_GOOD_STATUS", });
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, {withTheme: true}))(GoodRow));