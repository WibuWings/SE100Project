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
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { Grid, Box, Button, Checkbox, Modal, Divider } from '@mui/material';
import { red, lightBlue } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSelector, useDispatch } from 'react-redux'
import { FiXSquare } from 'react-icons/fi'
import { TiArrowBack } from 'react-icons/ti'
import { Image } from 'cloudinary-react';
import GoodImage from './goodExample.jpg';
import { fontWeight } from '@material-ui/system';
import { AiOutlineEdit, AiFillDelete } from "react-icons/ai";

const styles = theme => ({
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

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const statusSelectAll = useSelector(state => state.statusSelectAll)
    const infoUser = useSelector(state => state.infoUser)
    const dispatch = useDispatch();
    const [statusSelectReplace, setStatusSelectReplace] = React.useState(false);
    const regulation = useSelector(state => state.regulationReducer)
    const typeProduct = useSelector(state => state.typeProduct)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        borderRadius: '5px',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    React.useEffect(() => {
        setStatusSelectReplace(statusSelectAll)
    }, [statusSelectAll])

    const countQuantity = () => {
        let count = 0;
        row.listProduct.map(value => {
            count += value.quantity;
        })
        return count;
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const getTypeNamebyTypeID = (typeID) => {
        var typeName="Null";
        for(var i = 0; i < typeProduct.length;i++)
        {   
            if(typeProduct[i]._id.typeID == typeID)
            {
                typeName = typeProduct[i].name;
                break;
            }
        }
        return typeName;
    }

    

    const editProduct = async (row) => 
    {
        dispatch({type: "UPDATE_GOOD_DATA", data: row});
        dispatch({ type: "CHANGE_UPDATE_GOOD_STATUS", });
    }

    const deleteProduct = async (row) => {
        // Xoá sản phẩm
        console.log("row", row)
        const data = {
            token: localStorage.getItem('token'),
            products:
            [
                {
                    productID: row._id.productID,
                    importDate: row._id.importDate,
                    storeID: row._id.storeID,
                }
            ]
            
        }
        axios.delete(`http://localhost:5000/api/product`,{data: data})
            .then(res => {
                dispatch({
                    type: "HIDE_ALERT",
                })
                dispatch({
                    type: "SHOW_ALERT",
                    message: "Delete product success",
                    typeMessage: "success",
                })
            })
            .catch(err => {
                dispatch({
                    type: "HIDE_ALERT",
                })
                dispatch({
                    type: "SHOW_ALERT",
                    message: "Something happened, restart and try again",
                    typeMessage: "warning",
                })
            })
        
        // Get hết các cái join của sản phẩm
        var allJoinMatch = [];
        const data1 = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": row._id.storeID,
                "_id.productID": row._id.productID,
            }   
        }
        await axios.get(`http://localhost:5000/api/product/join`, 
        {
            params: {...data1}
        })
            .then(res => {
                allJoinMatch = res.data.data;
            })
            .catch(err => {
                dispatch({
                    type: "HIDE_ALERT",
                })
                dispatch({
                    type: "SHOW_ALERT",
                    message: "Something happened, restart and try again",
                    typeMessage: "warning",
                })
            })
        console.log(allJoinMatch);
        // Xoá các join liên quan đến sản phẩm
        var allProductJoin = [];
        for(var i = 0 ; i < allJoinMatch.length; i++)
        {
            allProductJoin.push({
                productID: row._id.productID,
                typeID: allJoinMatch[i]._id.typeID,
                importDate: allJoinMatch[i]._id.importDate,
                storeID: row._id.storeID,
            });
        }
        const dataJoin = {
            token: localStorage.getItem('token'),
            productJoinTypes: allProductJoin,      
        }

        console.log(dataJoin);

        await axios.delete(`http://localhost:5000/api/product/join`,{data: dataJoin})
            .then(res => {
                console.log("delete join success");
            })
            .catch(err => {
                dispatch({
                    type: "HIDE_ALERT",
                })
                dispatch({
                    type: "SHOW_ALERT",
                    message: "Something happened, restart and try again",
                    typeMessage: "warning",
                })
            })
        dispatch({
            type: "DELETE_PRODUCT",
            data: row,
        });
    }

    const calculateDay = (dateString1, dateString2) =>
    {
        // console.log("dateString1", dateString1);
        // console.log("dateString2", dateString2);
        if(dateString1.indexOf('T') != -1)
        {
            dateString1 = dateString1.substring(0, dateString1.indexOf('T'));
        }
        var time = (
            (new Date(dateString1)).setHours(0, 0, 0) 
                - 
            (new Date(dateString2)).setHours(0,0,0)
            )
            /(1000 * 60 * 60 * 24);
        if(time > 0) return time;
        else return <lable style={{color: 'red'}}>'Product is expired!'</lable>;
    }

    const getCurrentDateTimeString = () => {
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

    return (
        <React.Fragment>
            <TableRow style={{ borderWidth: open ? '2px' : null, borderStyle: 'solid', borderColor: '#90a4ae #90a4ae transparent #90a4ae' }} sx={{ '& > *': { borderBottom: 'unset' } }}>
                {/* <TableCell>
                    <Checkbox {...label} checked={statusSelectReplace} onChange={(e) => ChangeCheckbox(e, row.MAHD)} color="default" />
                </TableCell> */}
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row._id.productID}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">
                    <div style={{display: 'flex', justifyContent:'flex-end'}}>
                        {
                            row.typeIDList.map((typeID) => 
                                <label style={{
                                        backgroundColor: '#088F8F', 
                                        color: 'white', 
                                        padding: '4px 8px', 
                                        borderRadius:'4px',
                                        marginLeft: 10
                                    }}>
                                    {getTypeNamebyTypeID(typeID)}
                                </label>
                            )
                        }
                    </div>
                </TableCell>
                <TableCell align="right">{row.quantity + ' (' + row.unit + ')'}</TableCell>
                <TableCell align="right">{row.remain + ' (' + row.unit + ')'}</TableCell>
                <TableCell align="right">
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        {
                            Object.keys(regulation).length == 0 ?
                                <div>{row.sellPrice}</div> :
                                regulation.currency == 'vnd' ?
                                    <div>{row.sellPrice}</div> :
                                    <div>{(row.sellPrice / regulation.exchangeRate).toFixed(2)}</div>
                        }

                        <div style={{ marginLeft: 4 }}>
                            {
                                (Object.keys(regulation).length == 0)
                                    ? ' VNĐ' :
                                    (regulation.currency == 'vnd' ? ' VNĐ' : ' $')
                            }
                        </div>
                    </div>
                </TableCell>
            </TableRow>
            <TableRow style={{ borderWidth: open ? '2px' : null, borderStyle: 'solid', borderColor: 'transparent #90a4ae #90a4ae #90a4ae' }}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Divider></Divider>
                        <label style={{ fontWeight: 700, marginTop: 20, fontSize: 16, marginLeft: 10 }}>Product detail</label>
                        <Grid container>
                            <Grid item md={2}>
                                {
                                    row.imgUrl == "none"
                                        ? <div style={{ width: '100px', height: '100px', objectFit: 'cover', margin: 10 }}><img src={GoodImage} style={{ width: '100px', height: '100px', objectFit: 'cover' }} /></div>

                                        : <div style={{ width: '100px', height: '100px', objectFit: 'cover', margin: 10 }}><Image style={{ width: '100px', height: '100px', objectFit: 'cover' }} cloudName="databaseimg" publicId={row.imgUrl}>{row.imgUrl}</Image></div>
                                }
                            </Grid>
                            <Grid item md={10}>
                                <Grid container>
                                    <Grid item md={6}>
                                        <div style={{ display: 'flex' , marginTop: 10}}>
                                            <div style={{ fontWeight: 700, marginRight: 8, marginLeft: 20 }}>
                                                {'Import price:'}
                                            </div>
                                            {
                                                Object.keys(regulation).length == 0 ?
                                                    <div>{row.importPrice}</div> :
                                                    regulation.currency == 'vnd' ?
                                                        <div>{row.importPrice}</div> :
                                                        <div>{(row.importPrice / regulation.exchangeRate).toFixed(2)}</div>
                                            }
                                            <div style={{ marginLeft: 4 }}>
                                                {
                                                    (Object.keys(regulation).length == 0)
                                                        ? ' VNĐ' :
                                                        (regulation.currency == 'vnd' ? ' VNĐ' : ' $')
                                                }
                                            </div>
                                        </div>
                                    </Grid>
                                    <Grid item md={6}>
                                        <div style={{dislay: 'flex', marginTop: 10}}>
                                            <lable style={{ fontWeight: 700, marginRight: 8, marginLeft: 20 }}>
                                                Expired Day: 
                                            </lable>
                                            <label>
                                                {row.expires == null ? '' : row.expires.indexOf('T') == -1 ? row.expires : row.expires.substring(0, row.expires.indexOf('T'))}
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item md={6}>
                                        <div style={{dislay: 'flex', marginTop: 10}}>
                                            <lable style={{ fontWeight: 700, marginRight: 8 , marginLeft: 18 }}>
                                                Sold quantity: 
                                            </lable>
                                            <label>
                                                {row.quantity - row.remain}
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item md={6}>
                                        <div style={{dislay: 'flex', marginTop: 10}}>
                                            <lable style={{ fontWeight: 700, marginRight: 8, marginLeft: 20 }}>
                                                Day before expired: 
                                            </lable>
                                            <label>
                                                {calculateDay(row.expires.indexOf('T') == -1 ? row.expires : row.expires.substring(0, row.expires.indexOf('T')), getCurrentDateTimeString())}
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item md={6}>
                                        <div style={{dislay: 'flex', marginTop: 10}}>
                                            <lable style={{ fontWeight: 700, marginRight: 8, marginLeft: 20 }}>
                                                Profit per product: 
                                            </lable>
                                            <label> 
                                                {
                                                    Object.keys(regulation).length == 0 ?
                                                        <div>{(row.sellPrice - row.importPrice)}</div> :
                                                        regulation.currency == 'vnd' ?
                                                            <div>{(row.sellPrice - row.importPrice)}</div> :
                                                            <div>{((row.sellPrice - row.importPrice) / regulation.exchangeRate).toFixed(2)}</div>
                                                }
                                                
                                            </label>
                                            <label style={{ marginLeft: 4 }}>
                                                {
                                                    (Object.keys(regulation).length == 0)
                                                        ? ' VNĐ' :
                                                        (regulation.currency == 'vnd' ? ' VNĐ' : ' $')
                                                }
                                            </label>
                                        </div>
                                    </Grid>
                                    <Grid item md={6}>
                                        <div style={{dislay: 'flex', marginTop: 10}}>
                                            <lable style={{ fontWeight: 700, marginRight: 8, marginLeft: 20 }}>
                                                Real profit: 
                                            </lable>
                                            <label> 
                                                {
                                                    Object.keys(regulation).length == 0 ?
                                                        <div>{(row.sellPrice - row.importPrice)*(row.quantity - row.remain)}</div> :
                                                        regulation.currency == 'vnd' ?
                                                            <div>{(row.sellPrice - row.importPrice)*(row.quantity - row.remain)}</div> :
                                                            <div>{((row.sellPrice - row.importPrice)*(row.quantity - row.remain) / regulation.exchangeRate).toFixed(2)}</div>
                                                }
                                                
                                            </label>
                                            <label style={{ marginLeft: 4 }}>
                                                {
                                                    (Object.keys(regulation).length == 0)
                                                        ? ' VNĐ' :
                                                        (regulation.currency == 'vnd' ? ' VNĐ' : ' $')
                                                }
                                            </label>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        {/* Khu này dành cho sửa xoá các kiểu */}
                        <Grid style={{ marginBottom: '10px' }} item md={12} xs={12}>
                            <Grid style={{ justifyContent: 'end' }} container>
                                <Grid style={{ justifyContent: 'end' }} item md={2} xs={2}>
                                    <Button onClick={() => editProduct(row)} style={{ fontWeight: '700', fontSize: '0.6rem', backgroundColor: '#00bfa5', color: 'white' }}>
                                        <AiOutlineEdit style={{ marginRight: '5px', fontSize: '1rem', transform: 'translateY(-5%)' }}></AiOutlineEdit>
                                        Edit
                                    </Button>
                                </Grid> 
                                <Grid style={{ justifyContent: 'end' }} item md={2} xs={2}>
                                    <Button onClick={() => setOpenModal(true)} style={{ fontWeight: '700', fontSize: '0.6rem', backgroundColor: red[400], color: 'white' }}>
                                        <FiXSquare style={{ marginRight: '5px', fontSize: '1rem', transform: 'translateY(-5%)' }}></FiXSquare>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Collapse>
                </TableCell>
            </TableRow>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <h2 style={{ textAlign: 'center' }} id="parent-modal-title">Are you sure to delete?</h2>
                    <Grid container spacing={2}>
                        <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                            <Button onClick={() => deleteProduct(row)} style={{ color: 'white', backgroundColor: red[500] }}>DELETE</Button>
                        </Grid>
                        <Grid style={{ justifyContent: 'center', display: 'flex' }} item md={6} sm={6}  >
                            <Button onClick={() => setOpenModal(false)} style={{ backgroundColor: lightBlue[100] }}>CANCEL</Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

class GoodTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false
        }
        console.log("this.props.listProduct.state", this.props.listProduct.state);
    }

    getTypeNamebyTypeID(typeID) {
        var typeName = "Null";
        for (var i = 0; i < this.props.typeProduct.length; i++) {
            if (this.props.typeProduct[i]._id.typeID == typeID) {
                typeName = this.props.typeProduct[i].name;
                break;
            }
        }
        return typeName;
    }

    render() {
        const { classes } = this.props;
        return (
            <TableContainer id='scroll-bar' style={{ maxHeight: '100vh', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', overflow: 'auto', overflowX: 'hidden' }} component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow style={{ backgroundColor: 'black', color: 'white' }}>
                            <TableCell></TableCell>
                            <TableCell >Product ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Remain</TableCell>
                            <TableCell align="right">Sell Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {listRecieptReplace ?
                            listRecieptReplace.map((row) => (
                                <Row key={row.MAHD} row={row} />
                            )) : null
                        } */}
                        {
                            this.props.listProduct.state == undefined ? (null) :
                                this.props.listProduct.state.map((product) => (
                                    product == undefined ? null :
                                        <Row key={product._id.productID} row={product} />
                                ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
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
        deleteProductToRedux: (data) => {
            dispatch({
                type: "DELETE_PRODUCT",
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles, { withTheme: true }))(GoodTable));
