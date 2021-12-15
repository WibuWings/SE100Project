import React, { Component } from 'react';
import { Container, Grid, Button, CardActionArea, CardActions, CardMedia } from '@mui/material';
import '../../css/SellProduct.css'
import Tabs from './Tabs'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import exampleImg from '../../img/good-example.jpg'
import { BiPlusMedical } from 'react-icons/bi';
import { connect } from 'react-redux'
import axios from 'axios';
import ShoppingBags from './ShoppingBags';
import Printf from './Print'
import HistoryReciept from './HistoryReciept';

class SellProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            change: false,
            test1: true,
        }
        this.storeID = this.props.infoUser.managerID ? this.props.infoUser.managerID : this.props.infoUser.email;
        this.loadAllType();
        this.loadAllGood();

    }
    storeID = "";
    bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    AddProduct = (value) => {
        if (value.remain <= 0) {
            this.props.showAlert('Shout out !', 'warning')
        } else {
            var isCheck = false;
            var currentQuantity;
            var maxQuantity;
            this.props.shoppingBags.map(value1 => {
                if (value1.product.name === value.name) {
                    isCheck = true;
                    currentQuantity = value1.quantity
                    maxQuantity = value.remain
                }
                return value;
            })
            if (isCheck) {
                if (currentQuantity < maxQuantity) {
                    this.props.raiseQuantity(value.name);
                }
            } else {
                const newProduct = {
                    product: Object.assign({},{...value}),
                    quantity: 1,
                }
                this.props.addNewProductToShoppingBags(newProduct);
            }
        }
    }

    async loadAllType() {
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.storeID,
            }
        }

        await axios.get(`http://localhost:5000/api/product/type`,
            {
                params: { ...data }
            })
            .then(res => {
                result = res.data.data;
                localStorage.getItem('token', res.data.token);
            })
            .catch(err => {
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
            })
        //Get data và lưu các tên Type vào bảng
        var listTypeInfor = [];
        for (var i = 0; i < result.length; i++) {
            listTypeInfor.push(result[i]);
        }
        this.props.getTypeToReducer(listTypeInfor);
        this.setState({ change: !this.state.change });
    }

    async loadAllGood() {
        var resultProduct = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.storeID,
            }
        }
        await axios.get(`http://localhost:5000/api/product/`, {
            params: { ...data }
        })
            .then(res => {
                resultProduct = res.data.data;
            })
            .catch(err => {
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
            })
        // Get hết từ cái productjoinType
        var result = [];
        const data1 = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.storeID,
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
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
            })
        // Lấy các cái jointype
        var joinTypeInfor = [];
        for (let i = 0; i < result.length; i++) {
            joinTypeInfor.push(result[i]);
        }

        var listProductInfor = [];
        for (let i = 0; i < resultProduct.length; i++) {
            var typeIDList = [];
            for (var j = 0; j < joinTypeInfor.length; j++) {
                if (resultProduct[i]._id.productID && joinTypeInfor[j]._id.productID &&
                    resultProduct[i]._id.productID === joinTypeInfor[j]._id.productID) {
                    typeIDList.push(joinTypeInfor[j]._id.typeID);
                }
            }
            listProductInfor.push(
                {
                    ...resultProduct[i],
                    typeIDList: typeIDList
                });
        }
        this.props.getProductToReducer(listProductInfor);
        this.setState({ change: !this.state.change });
    }

    componentWillMount() {
        document.title = 'SellProduct'
    }

    render() {
        
        return (
            <div id="scroll-bar" className="sell-product" >
                <Container style={{ marginBottom: '20px' }} maxWidth="xl">
                    <Grid container spacing={2}>
                        <Grid item lg={8} md={12} sm={12}>
                            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '8px', marginTop: '20px', backgroundColor: '#ffffff', height: 'calc(100vh - 40px)', overflow: 'hidden' }}>
                                <div style={{ overflow: 'hidden', marginBottom: '5px' }}>
                                    <Tabs></Tabs>
                                </div>
                                <Container id="choses-product" style={{ height: '94%', overflowY: 'scroll' }} maxWidth="xl">
                                    <Grid container spacing={2}>
                                        {(this.props.listProduct.state !== undefined && this.props.listProduct.state.length !== 0)
                                            ? this.props.listProduct.state.filter(value => {
                                                if (this.props.chooseTypeProductID === 'all') {
                                                    return value;
                                                }
                                                if (value.typeIDList.includes(this.props.chooseTypeProductID)) {
                                                    return value;
                                                }
                                            }).map(value => (
                                                <Grid item lg={3} md={4} sm={4} xs={4} style={{ display: (value.remain <= 0) ? 'none' : 'block' }}>
                                                    <Card onClick={() => this.AddProduct(value)}>
                                                        <CardActionArea>
                                                            <CardMedia
                                                                style={{ display: (value.remain <= 0) ? 'block' : 'none' }}
                                                                component="img"
                                                                height="140"
                                                                image='https://res.cloudinary.com/databaseimg/image/upload/v1637083732/aqd37xtgxukcq3x9eb4q.png'
                                                                alt="green iguana"
                                                            />
                                                            <div style={{ display: (value.remain > 0) ? 'block' : 'none' }}>
                                                                {
                                                                    value.imgUrl === "none"
                                                                        ? <CardMedia
                                                                            component="img"
                                                                            height="140"
                                                                            image={'https://res.cloudinary.com/databaseimg/image/upload/v1639499294/cxhk98s9yflooysp4lyy.webp'}
                                                                            alt="green iguana"
                                                                        />
                                                                        : <CardMedia
                                                                            component="img"
                                                                            height="140"
                                                                            image={value.imgUrl}
                                                                            alt="green iguana"
                                                                        />
                                                                }
                                                            </div>

                                                            <CardContent style={{ padding: '5px' }}>
                                                                <Typography style={{ textAlign: 'center' }} gutterBottom variant="h6" component="div">

                                                                    {value.name}
                                                                </Typography>
                                                            </CardContent>
                                                            <CardContent style={{ textAlign: 'center', margin: '0', padding: '0' }}>
                                                                <Typography style={{ textAlign: 'center', margin: '0', padding: '0', fontSize: '0.7rem', fontWeight: '700', color: '#00000080' }} gutterBottom variant="h6" component="div">
                                                                    Quantity: {value.remain < 0 ? 0 : value.remain}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions style={{ justifyContent: 'center' }}>
                                                            <Button style={{ color: 'green', fontWeight: '700' }} endIcon={<BiPlusMedical></BiPlusMedical>} size="medium" color="primary">
                                                                {this.props.regulation.currency === 'vnd' ? (value.sellPrice).toLocaleString() : ((value.sellPrice) / this.props.regulation.exchangeRate).toFixed(2).toLocaleString()}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            )) : (<div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '100px' }}>
                                                <h3>Không có gì</h3>
                                            </div>)}
                                    </Grid>
                                </Container>
                            </div>
                        </Grid>
                        <Grid item lg={4} md={12}>
                            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '8px', marginTop: '20px', backgroundColor: '#ffffff', height: 'calc(100vh - 40px)', overflow: 'hidden', overflowX: 'hidden' }}>
                                <div id="choses-product" style={{ backgroundColor: '#e0e0e0', height: '60%', margin: '10px', overflowY: 'scroll', overflowX: 'hidden' }} >
                                    <Grid sty container spacing={0}>
                                        {/* Table */}
                                        <Grid item className="customizeTable" style={{ backgroundColor: '#bdbdbd', alignContent: 'center', justifyContent: 'center', borderBottom: '2px solic black' }} md={12} sm={12}>
                                            <Grid style={{ textAlign: 'center', alignItems: 'center', justifyItems: 'center', fontWeight: 'bold' }} container spacing={0}>
                                                <Grid item md={1} sm={1}>
                                                    #
                                                </Grid>
                                                <Grid item md={1} sm={1}>
                                                </Grid>
                                                <Grid item md={4} sm={4}>
                                                    Name
                                                </Grid>
                                                <Grid item md={3} sm={3}>
                                                    Quantity
                                                </Grid>
                                                <Grid style={{ fontWeight: '700' }} item md={3} sm={3}>
                                                    Giá
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        {/* Bắt đầu hóa đơn */}
                                        <ShoppingBags></ShoppingBags>
                                    </Grid>
                                </div>
                                <div style={{ height: '40%' }}>
                                    <Printf ></Printf>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
                {this.props.statusShowHistoryReciept ? (
                    <HistoryReciept></HistoryReciept>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        listProduct: state.listProduct,
        chooseTypeProductID: state.chooseTypeProduct,
        infoUser: state.infoUser,
        shoppingBags: state.shoppingBags,
        statusShowHistoryReciept: state.statusShowHistoryReciept,
        regulation: state.regulationReducer
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
            });
        },
        getTypeToReducer: (data) => {
            dispatch({
                type: "GET_PRODUCT_TYPE",
                data: data
            });
        },
        getProductToReducer: (data) => {
            dispatch({
                type: "GET_PRODUCT_AND_TYPE",
                data: data
            });
        },
        addNewProductToShoppingBags: (newProduct) => {
            dispatch({
                type: "ADD_NEW_PRODUCT_SHOPPING_BAGS",
                newProduct: newProduct,
            })
        },
        raiseQuantity: (name) => {
            dispatch({
                type: "RAISE_QUANTITY_SHOPPING_BAGS",
                name: name,
            })
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
        hideHistoryReceipt: () => {
            dispatch({
                type: "CHANGE_HISTORY_RECIEPT_STATUS"
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SellProduct);