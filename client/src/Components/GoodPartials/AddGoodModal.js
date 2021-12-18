import React, { Component } from 'react';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Button, Modal, Grid, Card, CardHeader, Divider, CardContent} from '@mui/material';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import { connect } from 'react-redux';
import GoodImage from '../../img/good-example.jpg';
import AddTypeModal from './AddTypeModal';
import { withStyles } from '@material-ui/styles';
import { AiFillPlusCircle} from "react-icons/ai";
import DateTimePicker from '@mui/lab/DateTimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmModal from './ConfirmModal';
import { GiConsoleController } from 'react-icons/gi';
import {
    Link
} from "react-router-dom";

// Use for choose type:
var typeSet = [];

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

class AddGoodModal extends Component {
    imgUrl= 'none';
    dateTime= Date.now();
    currentDateTime = '2021-01-02';
    finishUpImage = true;
    curCurrencySelect = 'vnd';

    constructor(props) {
        super(props);
        this.state = {
            imageSelect: "null",
            type:'none',
            url: 'http://res.cloudinary.com/databaseimg/image/upload/v1634117795/ubvxisehhpvnu2lbqmeg.png',
            change: false,
        }; 
        //this.loadAllType(); 
        // this.loadAllGood();

        this.currentDateTime = this.getCurrentDateTime();
        typeSet = [];
        // console.log("typeProduct", this.props.typeProduct);
        var listProductInfor = this.props.listProduct.state;
        if(listProductInfor.length > 0)
        {
            this.generatedID = parseInt(listProductInfor[listProductInfor.length-1]._id.productID) + 1;
        } 
        this.setState({change: !this.state.change})
    }
    
    getCurrentDateTime()
    {
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

    handleAdd(){
        this.props.changeAddTypeStatus();
        this.props.setAddTypeStatus();
    }

    async profileImageChange(fileChangeEvent) {
        this.setState({
            imageSelect: fileChangeEvent.target.files[0],
        })
        this.finishUpImage = false;
        const file = fileChangeEvent.target.files[0];
        const { type } = file;
        if (!(type.endsWith('jpeg') || type.endsWith('png') || type.endsWith('jpg') || type.endsWith('gif'))) {
        } else {
            const formData = new FormData();
            formData.append("file", fileChangeEvent.target.files[0])
            formData.append("upload_preset", "qqqhcaa3");
            await axios.post(`https://api.cloudinary.com/v1_1/databaseimg/image/upload`, formData)
                .then(res => {
                    this.imgUrl=res.data.url;
                    this.setState({
                        change: 'true'
                    });
                })
                .catch(err => {
                    console.log("Thất bại");
                })
        }
        this.finishUpImage = true;
    }

    limitText = (limitField, limitNum) => {
        if (limitField.target.value.length > limitNum) {
            limitField.target.value = limitField.target.value.substring(0, limitNum);
        }
    }

    calculateDay(dateString1, dateString2)
    {
        return (
            (new Date(dateString1)).setHours(0, 0, 0) 
                - 
            (new Date(dateString2)).setHours(0,0,0)
            )
            /(1000 * 60 * 60 * 24);
    }

    async importGood(e) {
        var currentCurrency = document.querySelector('#currencySelector').value;
        var isContinue = this.checkConstraint();
        if(!isContinue)
        {
            e.preventDefault();
            return;
        }
        
        // // Thêm hàng hoá
        const data = {
            token: localStorage.getItem('token'),
            product: {
                _id: {
                    productID: this.generatedID,
                    importDate: document.querySelector('input[name="importDate"]').value,
                    storeID: this.props.infoUser.email,
                },
                name: document.querySelector('input[name="goodName"]').value,
                quantity: document.querySelector('input[name="goodQuantity"]').value,
                remain: document.querySelector('input[name="goodQuantity"]').value,
                importPrice: (currentCurrency == 'vnd') ?
                    document.querySelector('input[name="originalPrice"]').value :
                    document.querySelector('input[name="originalPrice"]').value* this.props.regulation.exchangeRate,
                sellPrice: (currentCurrency == 'vnd') ?
                    document.querySelector('input[name="sellPrice"]').value:
                    document.querySelector('input[name="sellPrice"]').value * this.props.regulation.exchangeRate,
                expires: document.querySelector('input[name="expiredDate"]').value,
                imgUrl: this.imgUrl,
                unit: document.querySelector('input[name="unit"]').value,
            }   
        }
        console.log(data);

        axios.post(`http://localhost:5000/api/product`, data)
            .then(res => {
                console.log("Save success");
                this.props.hideAlert();
				this.props.showAlert("Save product success","success");
            })
            .catch(err => {
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
                console.log('Bug when add product', err);
            })

        //Thêm vào bảng joinType nữa

        // Giờ thêm nhiều type thì phải làm cái này nhiều lần
        for(var i = 0 ; i < typeSet.length ; i++)
        {
            const data1 = {
                token: localStorage.getItem('token'),
                productJoinType: {
                    _id : {
                        productID: this.generatedID,
                        typeID: typeSet[i], 
                        importDate: document.querySelector('input[name="importDate"]').value,
                        storeID: this.props.infoUser.email,
                    }
                }
            }
            axios.post(`http://localhost:5000/api/product/join`, data1)
                .then(res => {
                    console.log("lưu vô bảng join thành công");
                })
                .catch(err => {
                    console.log(err);
                })
        }
        this.props.changeStatusAddGood();
        // Thêm vào redux
        var dataRedux = {
            _id: {
                productID: this.generatedID.toString(),
                importDate: document.querySelector('input[name="importDate"]').value + 'T00:00:00.000+00:00',
                storeID: this.props.infoUser.email,
            },
            name: document.querySelector('input[name="goodName"]').value,
            quantity: document.querySelector('input[name="goodQuantity"]').value,
            remain: document.querySelector('input[name="goodQuantity"]').value,
            importPrice: (currentCurrency == 'vnd') ?
                document.querySelector('input[name="originalPrice"]').value :
                document.querySelector('input[name="originalPrice"]').value* this.props.regulation.exchangeRate,
            sellPrice: (currentCurrency == 'vnd') ?
                document.querySelector('input[name="sellPrice"]').value:
                document.querySelector('input[name="sellPrice"]').value * this.props.regulation.exchangeRate,
            expires: document.querySelector('input[name="expiredDate"]').value + 'T00:00:00.000+00:00',
            imgUrl: this.imgUrl,
            unit: document.querySelector('input[name="unit"]').value,
            typeIDList: typeSet,
        }
        // console.log("dataRedux", dataRedux); 
        this.props.addProductToRedux(dataRedux);
        // console.log(data);
        console.log("this.props.listProduct.state", this.props.listProduct.state)
    }
    
    checkConstraint = () => {
        // Kiểm tra các constraint ở đây coi thử ổn chưa
        // Constraint 1: Check name
        var productName =  document.querySelector('input[name="goodName"]').value;
        if(productName.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Product name can't be left blanked","warning");
            return false;
        }
        // Constraint 2: Check quantity
        if(document.querySelector('input[name="goodQuantity"]').value.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Product quantity can't be left blanked","warning");
            return false;
        }
        else if(parseInt(document.querySelector('input[name="goodQuantity"]').value) <= 0) 
        {
            this.props.hideAlert();
			this.props.showAlert("Product quantity must be greater than 0","warning");
            return false;
        }
        // Constraint 3: check Unit
        if(document.querySelector('input[name="unit"]').value.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Product unit can't be left blanked","warning");
            return false;
        }
        // Constraint 4: Check import Price
        if(document.querySelector('input[name="originalPrice"]').value.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Product import price can't be left blanked","warning");
            return false;
        }
        else if(parseFloat(document.querySelector('input[name="originalPrice"]').value) <= 0.0) 
        {
            this.props.hideAlert();
			this.props.showAlert("Product import price must be greater than 0","warning");
            return false;
        }
        // Constraint 5: check sell Price
        if(document.querySelector('input[name="sellPrice"]').value.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Product sell price can't be left blanked","warning");
            return false;
        }
        else if(parseFloat(document.querySelector('input[name="sellPrice"]').value) <= 0.0) 
        {
            this.props.hideAlert();
			this.props.showAlert("Product sell price must be greater than 0","warning");
            return false;
        }
        // Constraint 6: Ngày nhập phải nhỏ  hơn ngày hết hạn
        if (
            (
                new Date(document.querySelector('input[name="importDate"]').value).getTime()
                - 
                new Date(document.querySelector('input[name="expiredDate"]').value).getTime()
            ) >= 0)
        {
            this.props.hideAlert();
            this.props.showAlert('Product was expired',"warning");
            return false;
        }
        // Constraint 7: Check giá gốc nhỏ hơn giá bán
        // if(
        //     parseFloat(document.querySelector('input[name="sellPrice"]').value) 
        //     - 
        //     parseFloat(document.querySelector('input[name="originalPrice"]').value) <=0.0
        //     ) 
        // {
        //     this.props.hideAlert();
		// 	this.props.showAlert("Sell price must greater than original price","warning");
        //     return false;
        // }
        // Constraint 8: check xem đã  up ảnh lên xong chưa
        if(this.finishUpImage == false)
        {
            this.props.hideAlert();
			this.props.showAlert("Image was not uploaded yet","warning");
            return false;
        }
        // Constraint 9: Ngày nhập phải nhỏ  hơn ngày hết hạn theo regulation
        if(this.props.regulation!={})
        {
            if (
                this.calculateDay(document.querySelector('input[name="expiredDate"]').value, document.querySelector('input[name="importDate"]').value)
                < this.props.regulation.minExpiredProduct)
                // minExpiredProduct
            {
                this.props.hideAlert();
                 this.props.showAlert('The expired day must be at least ' + this.props.regulation.minExpiredProduct + ' older than the import day'
                 ,"warning");
                return false;
            }
        }

        return true;
    }

    generatedID = 0;

    getTypeNamebyTypeID (typeID) {
        var typeName='Fuck';
        for(var i = 0; i< this.props.typeProduct.length;i++)
        {   
            if(this.props.typeProduct[i]._id.typeID == typeID)
            {
                typeName = this.props.typeProduct[i].name;
                break;
            }
        }
        return typeName;
    }

    foundTypeInSet(typeID) {
        for(var i = 0 ; i < typeSet.length; i++)
        {
            if(typeSet[i]==typeID._id.typeID) return true;
        }
        return false;
    }
    
    render() {
        return(
            <form style={{ zIndex: '10', minWidth: '500px', width: '90%', justifyContent: 'center', marginTop: '10%' }}>   
                <Card>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="ADD GOOD" />
                    <Divider />
                    <CardContent>
                        <Grid className="import-container" container spacing={2}>
                        <Grid item md={2}  
                            style={{
                                display: 'flex', 
                                justifyContent:'center', 
                                flexDirection:'column',
                                alignItems:'center',
                                paddingLeft: '30px'
                            }}
                        >   
                            <label className="profile-header__avatar" for="profile-header-update-avatar" style={{ overflow: 'hidden', marginTop: '15px ' }}>
                                <Image style={{width: '180px',height: '180px', padding: '10px' }} cloudName="databaseimg" publicId={this.imgUrl=='none' ? 'http://res.cloudinary.com/databaseimg/image/upload/v1634358564/b9wj5lcklxitjglymxqh.png' : this.imgUrl}></Image>
                            </label>
                            {/* Ẩn đi */}
                            <input id="profile-header-update-avatar" type="file" style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={(e) => this.profileImageChange(e)}></input>
                        </Grid>
                        <Grid item md={10}>
                                    <Grid container md={12}>
                                        <Grid item md={6} 
                                            className='input-item'
                                        >
                                            <div 
                                                className="input-label"
                                                style={{
                                                    width: '176px'
                                                }}
                                            >
                                                ID
                                            </div>
                                            <StyledTextField
                                                classname='input-box' 
                                                type="text" 
                                                // class="input-val" 
                                                style = {{width: '100%'}} 
                                                fullWidth 
                                                size="small" 
                                                name="goodID" 
                                                variant="outlined"
                                                value={this.generatedID}
                                                readOnly={true}
                                                disabled={true}
                                            />
                                        </Grid>
                                        <Grid item md={6} 
                                            className='input-item'
                                            style={{
                                                marginLeft: 0,
                                                paddingLeft: 0,
                                            }}
                                        >
                                            <div className="input-label" style={{width: 138}}>Import Date</div>
                                            <StyledTextField
                                                classname='input-box'   
                                                type="date" 
                                                style = {{width: '100%'}} 
                                                fullWidth
                                                name="importDate"
                                                size="small"
                                                variant="outlined"
                                                defaultValue={this.currentDateTime}
                                            />
                                        </Grid>
                                        
                                        <Grid item md={6} 
                                            className='input-item'
                                        >
                                            <div className="input-label"style={{width: '176px'}}>Name</div>
                                            <StyledTextField
                                                classname='input-box'   
                                                type="text" 
                                                // class="input-val" 
                                                style = {{width: '100%'}} 
                                                fullWidth
                                                size="small"
                                                name="goodName" 
                                                variant="outlined" 
                                                
                                                onKeyDown={(e) => this.limitText(e, 20)}
                                                onKeyUp={(e) => this.limitText(e, 20)}
                                            />
                                        </Grid>
                                        <Grid item md={4}
                                            className='input-item'
                                            style={{padding: '0px', marginLeft: '0px', marginRight: 0}}
                                        >
                                            <div 
                                                className="input-label" 
                                                style={{width: '110px'}}
                                            >
                                                Quantity
                                            </div>
                                            <StyledTextField
                                                style = {{width: '60%'}} 
                                                fullWidth
                                                name="goodQuantity" 
                                                variant="outlined"
                                                type="number"
                                                
                                                onKeyDown={(e) => this.limitText(e, 10)}
                                                onKeyUp={(e) => this.limitText(e, 10)}
                                            />
                                        </Grid>
                                        <Grid item md={2}
                                            className='input-item'
                                            style={{
                                                paddingRight: 5
                                            }}
                                        >
                                            <div 
                                                className="input-label"
                                                style={{
                                                    marginLeft: 0,
                                                    paddingLeft: 0,
                                                    width: 40
                                                }}
                                            >
                                                Unit
                                            </div>
                                            <StyledTextField
                                                classname='input-box'
                                                style = {{width: '100%', marginLeft: '4px'}} 
                                                fullWidth
                                                variant="outlined"
                                                type="text" 
                                                name="unit" 
                                                
                                                onKeyDown={(e) => this.limitText(e, 10)}
                                                onKeyUp={(e) => this.limitText(e, 10)}
                                            />
                                        </Grid>
                                        <Grid item md={6} 
                                            className='input-item'
                                        >
                                            <div className="input-label" style={{width: 176}}>Expired Date</div>
                                            <StyledTextField
                                                classname='input-box'   
                                                type="date" 
                                                style = {{width: '100%'}} 
                                                fullWidth
                                                size="small"
                                                name="expiredDate" 
                                                variant="outlined"
                                                defaultValue={this.currentDateTime}
                                            />
                                        </Grid>
                                        <Grid item md={6} className='input-item' style={{marginLeft: -8}}>
                                            <div className="input-label" style={{width: 138}}>Currency</div>
                                            <StyledTextField
                                                // fullWidth
                                                id="currencySelector"
                                                name="currency"
                                                variant="outlined"
                                                style = {{width: '100%'}} 
                                                select

                                                SelectProps={{ native: true }}
                                                onChange={(event) => {
                                                    this.curCurrencySelect = event.target.value;
                                                    this.setState({change: !this.state.change})
                                                }}
                                            >
                                                <option value="vnd">
                                                    VNĐ
                                                </option>
                                                {
                                                    this.props.regulation != {} ?
                                                    <option value="dollar">
                                                        $
                                                    </option>
                                                    : (null)
                                                }
                                                
                                            </StyledTextField>
                                        </Grid>
                                        <Grid item md={6}
                                            className='input-item'
                                        >
                                            <div className="input-label" style={{width: 189}}>Original Price</div>
                                            <StyledTextField
                                                classname='input-box'
                                                style = {{width: '100%', marginRight: 8}} 
                                                fullWidth
                                                name="originalPrice" 
                                                variant="outlined"
                                                type="number" 
                                                onKeyDown={(e) => this.limitText(e, 10)}
                                                onKeyUp={(e) => this.limitText(e, 10)}
                                            />
                                            <div style={{width: 30}}>
                                                { this.curCurrencySelect == 'vnd' ? <div>VNĐ</div> : <div>$</div>}
                                            </div>
                                            
                                        </Grid>
                                        <Grid item md={6}
                                            className='input-item'
                                            style={{padding: '0px', marginLeft: '0px', paddingRight: 24}}
                                        >
                                            <div 
                                                className="input-label"
                                                style={{width: '150px'}}
                                            >
                                                Sell Price
                                            </div>
                                            <StyledTextField
                                                classname='input-box'
                                                style = {{width: '100%', marginLeft: '4px',marginRight:'8px'}} 
                                                fullWidth
                                                name="sellPrice" 
                                                variant="outlined"
                                                type="number" 
                                                onKeyDown={(e) => this.limitText(e, 10)}
                                                onKeyUp={(e) => this.limitText(e, 10)}
                                            />
                                            { this.curCurrencySelect == 'vnd' ? <div>VNĐ</div> : <div>$</div>}
                                        </Grid>
                                        
                                        <Grid item md={12}
                                            className='input-item'
                                        >
                                            <div 
                                                className="input-label"
                                                style={{width:129}}
                                            >
                                                Product Type
                                            </div>
                                            <FormControl sx={{ minWidth: 120 }}>
                                                <Select
                                                    value={this.state.type}
                                                    onChange={(event) => {
                                                        this.setState({type: event.target.value});
                                                        if(!typeSet.includes(event.target.value))
                                                        {
                                                            typeSet.push(event.target.value);
                                                        }
                                                        this.setState({change: !this.state.change})
                                                    }}
                                                    style={{
                                                        height: 36,
                                                    }}
                                                >
                                                    {
                                                        this.props.typeProduct.length== 0 ? <MenuItem value={'none'}>None</MenuItem>:
                                                        this.props.typeProduct.map((type) =>
                                                            this.foundTypeInSet(type) ? null :
                                                            <MenuItem value={type._id.typeID}>{type.name}</MenuItem>
                                                        )
                                                    }   
                                                </Select> 
                                            </FormControl>
                                            <Button onClick={() => this.handleAdd()}>
                                                <AiFillPlusCircle
                                                    size={28}
                                                    style={{
                                                        fontSize: 28,
                                                        margin: 0,
                                                        padding: 0,
                                                        width: 28,
                                                        height: 28
                                                    }}    
                                                />
                                            </Button>
                                            <div className='all-type-container'>
                                                {
                                                    Array.from(typeSet).map((type) =>
                                                        <div className='type-container'>
                                                            
                                                            <CancelIcon
                                                                className='close-icon'
                                                                size={10}
                                                                onClick={() => {
                                                                    typeSet = typeSet.filter(function(item) {
                                                                        return item != type;
                                                                    })
                                                                    console.log(typeSet);
                                                                    this.setState({type: 'none'});
                                                                }}
                                                    
                                                            />
                                                            <span className='type-title'>
                                                                {this.getTypeNamebyTypeID(type)}
                                                            </span>
                                                        </div>
                                                        
                                                    )
                                                }
                                            </div>
                                        </Grid>
                                    </Grid>
                            </Grid>
                        </Grid> 
                    </CardContent>
                    <Divider />    
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                            margin: 10,
                            paddingBottom: 10,
                        }}
                    >
                        <Button className="btn btn-primary" style={{backgroundColor: 'red'}} variant="contained" onClick={(e) => this.props.changeStatusAddGood()}>
                            Cancel
                        </Button>
                        <Button className="btn btn-primary" variant="contained" onClick={(e) => this.importGood(e)}>
                            IMPORT
                        </Button> 
                    </div>
                                   
                </Card>    
                {this.props.addTypeStatus ? (
                    <div className="modal-add">
                        <div onClick={() => {this.props.changeAddTypeStatus();}} className="modal-overlay"></div>
                        <AddTypeModal></AddTypeModal>
                    </div>
                ): null}
                {this.props.confirmStatus ? (
                    <div className="modal-add">
                        <div onClick={() => {this.props.changeConfirmStatus();}} className="modal-overlay"></div>
                        <ConfirmModal></ConfirmModal>
                    </div>
                ): null}
            </form>
        );        
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        addTypeStatus: state.addTypeStatus,
        infoUser: state.infoUser,
        isAddTypeStatus: state.isAddTypeStatus,
        confirmStatus: state.confirmStatus,
        typeProduct: state.typeProduct,
        listProduct: state.listProduct,
        regulation: state.regulationReducer,
        statusDarkmode: state.statusDarkmode,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddTypeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_TYPE_STATUS",
            });
        },
        updateAvatar: (avatar) => {
            dispatch({
                type: "UPDATE_AVATAR",
                avatar: avatar
            })
        },
        setAddTypeStatus: () => {
            dispatch({
                type: "SET_ADD_TYPE_STATUS",
            });
        },
        changeConfirmStatus: () => {
            dispatch({
                type: "CHANGE_CONFIRM_STATUS",
            });
        },
        setConfirm: () => {
            dispatch({
                type: "SET_CONFIRM_IMPORT_GOOD",
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
        getProductToReducer: (data) => {
            dispatch({
                type: "GET_PRODUCT_AND_TYPE",
                data: data
            });
        },
        getProductType: (data) => {
            dispatch({
                type: "GET_PRODUCT_TYPE",
                data: data
            });
        },
        changeStatusAddGood: () => {
            dispatch({
                type: "CHANGE_ADD_GOOD_STATUS",
            }); 
        },
        addProductToRedux: (data) => {
            dispatch({
                type: "ADD_PRODUCT",
                data: data,
            }); 
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGoodModal);
