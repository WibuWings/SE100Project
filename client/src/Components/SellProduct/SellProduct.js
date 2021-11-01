import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { Container, Grid, Button, CardActionArea, CardActions, CardMedia } from '@mui/material';
import ComponentToPrint  from './ComponentToPrint';
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
import { Image } from 'cloudinary-react';
import ShoppingBags from './ShoppingBags';
import Printf from './Print'

class SellProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            change: false,
            test1: true,
        }
        this.loadAllType();
        this.loadAllGood();
    }


    bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    AddProduct = (value) => {
        const is = this.state.test1;
        this.setState({
            test1: !is
        })
        this.props.addProductToShoppingBags(value);
        console.log(this.props.shoppingBags);
    }


    async loadAllType() {
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                storeID: this.props.infoUser.email,
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
                console.log(err);
                alert(err);
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
                storeID: this.props.infoUser.email,
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
                storeID: this.props.infoUser.email,
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
        for (var i = 0; i < result.length; i++) {
            joinTypeInfor.push(result[i]);
        }
        console.log("joinTypeInfor", joinTypeInfor);

        var listProductInfor = [];
        for (var i = 0; i < resultProduct.length; i++) {
            var typeIDList = [];
            for (var j = 0; j < joinTypeInfor.length; j++) {
                if (resultProduct[i]._id.productID && joinTypeInfor[j]._id.productID &&
                    resultProduct[i]._id.productID == joinTypeInfor[j]._id.productID) {
                    typeIDList.push(joinTypeInfor[j]._id.typeID);
                }
            }

            listProductInfor.push(
                {
                    ...resultProduct[i],
                    typeIDList: typeIDList
                });
        }

        console.log("listProductInfor: ", listProductInfor);
        this.props.getProductToReducer(listProductInfor);
        // console.log("this.props.listProduct.state: ", this.props.listProduct.state);
        this.setState({ change: !this.state.change });
    }

    

    
    

    render() {
        console.log("ĐÃ reset");
        return (
            <div className="sell-product" >
                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        <Grid item md={8} sm={4}  >
                            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '8px', marginTop: '20px', backgroundColor: '#ffffff', height: 'calc(100vh - 40px)', overflow: 'hidden' }}>
                                <div style={{ overflow: 'hidden', marginBottom: '5px' }}>
                                    <Tabs></Tabs>
                                </div>
                                <Container id="choses-product" style={{ height: '94%', overflowY: 'scroll' }} maxWidth="xl">
                                    <Grid container spacing={2}>
                                        {this.props.listProduct.state
                                            ? this.props.listProduct.state.filter(value => {
                                                if (this.props.chooseTypeProductID === 'all') {
                                                    return value;
                                                }
                                                if (value.typeIDList.includes(this.props.chooseTypeProductID)) {
                                                    return value;
                                                }
                                            }).map(value => (
                                                <Grid item md={3} sm={3}>
                                                    <Card onClick={() => this.AddProduct(value)}>
                                                        <CardActionArea>
                                                            {
                                                                value.imgUrl == "none"
                                                                    ? <CardMedia
                                                                        component="img"
                                                                        height="140"
                                                                        image={exampleImg}
                                                                        alt="green iguana"
                                                                    />

                                                                    : <CardMedia
                                                                        component="img"
                                                                        height="140"
                                                                        image={value.imgUrl}
                                                                        alt="green iguana"
                                                                    />
                                                            }
                                                            <CardContent style={{ padding: '5px' }}>
                                                                <Typography style={{ textAlign: 'center' }} gutterBottom variant="h6" component="div">
                                                                    {value.name}
                                                                </Typography>
                                                            </CardContent>
                                                        </CardActionArea>
                                                        <CardActions style={{ justifyContent: 'center' }}>
                                                            <Button style={{ color: 'green', fontWeight: '700' }} endIcon={<BiPlusMedical></BiPlusMedical>} size="medium" color="primary">
                                                                {value.sellPrice}
                                                            </Button>
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            )) : (null)}
                                    </Grid>
                                </Container>
                            </div>
                        </Grid>
                        <Grid item md={4} lg={4} >
                            <div style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: '8px', marginTop: '20px', backgroundColor: '#ffffff', height: 'calc(100vh - 40px)', overflow: 'hidden', overflowX: 'hidden' }}>
                                <div id="choses-product" style={{ backgroundColor: '#ebebeb', height: '60%', margin: '10px', overflowY: 'scroll' }} >
                                    <Grid sty container spacing={0}>
                                        {/* Table */}
                                        <Grid item className="customizeTable" style={{ backgroundColor: 'rgba(20,20,20,0.4)', alignContent: 'center', justifyContent: 'center', borderBottom: '2px solic black' }} md={12} sm={12}>
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
        addProductToShoppingBags: (product) => {
            dispatch({
                type: "ADD_PRODUCT_SHOPPING_BAGS",
                product: product,
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SellProduct);