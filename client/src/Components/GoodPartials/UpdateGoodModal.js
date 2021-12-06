import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, InputLabel } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import { GiCancel } from 'react-icons/gi'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import GoodImage from './goodExample.jpg';
import AddTypeModal from './AddTypeModal';
import { withStyles } from '@material-ui/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { AiFillPlusCircle} from "react-icons/ai";
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmModal from './ConfirmModal';

var productTypes =[];
var listTypeInfor=[];
// typeSet chứa id của các cái type
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

class UpdateGoodModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            goodID : "",
            change: false,
            imageSelect: "null",
            type:'none',
            url: 'http://res.cloudinary.com/databaseimg/image/upload/v1634117795/ubvxisehhpvnu2lbqmeg.png',
            exchangeRate: this.props.regulation=={} ? 1 : this.props.regulation.currency == 'vnd' ? 1 : this.props.regulation.exchangeRate,
        }; 
        typeSet = [];
        this.loadInitialData();
        this.loadAllType();
        this.loadCurrentTypes();
        
    }
    imgUrl='none';
    goodID='';
    importDate='';
    name='';
    imgUrl='';
    quantity = 0;
    remain = 0;
    unit = "";
    importPrice = "";
    sellPrice = "";
    expire ="";
    finishUpImage = true;

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
        productTypes=[];
        for(var i=0 ; i< listTypeInfor.length ; i ++)
        {
            productTypes.push(listTypeInfor[i].name);
        }
        this.setState({change: true});
    }

    async loadCurrentTypes() {
        // Get hết các cái join của sản phẩm
        var allJoinMatch = [];
        const data1 = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
                "_id.productID": this.goodID,
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
                console.log(err);
                alert(err);
            })
        console.log("Các join",allJoinMatch);
        // Thêm vào trên cái bảng typeSet
        for(var i = 0 ; i < allJoinMatch.length ; i ++)
        {
            typeSet.push(allJoinMatch[i]._id.typeID);
        }
        this.setState({change: !this.state.change});
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

    calculateDay(dateString1, dateString2)
    {
        return (
            (new Date(dateString1)).setHours(0, 0, 0) 
                - 
            (new Date(dateString2)).setHours(0,0,0)
            )
            /(1000 * 60 * 60 * 24);
    }


    curCurrencySelect = 'vnd';

    checkConstraint = () => {
        // Kiểm tra các constraint ở đây coi thử ổn chưa
        // Constraint 1: Check name
        var productName =  document.querySelector('input[name="goodName"]').value;
        if(productName.length == 0)
        {
            alert("Tên sản phẩm không được trống");
            return false;
        }
        // Constraint 2: Check quantity
        if(document.querySelector('input[name="goodQuantity"]').value.length == 0)
        {
            alert("Số lượng sản phẩm không được trống");
            return false;
        }
        else if(parseInt(document.querySelector('input[name="goodQuantity"]').value) <= 0) 
        {
            alert('Số lượng sản phẩm phải lớn hơn 0');
            return false;
        }
        // Constraint 3: check Unit
        if(document.querySelector('input[name="unit"]').value.length == 0)
        {
            alert('Đơn vị của sản phẩm không được trống');
            return false;
        }
        // Constraint 4: Check import Price
        if(document.querySelector('input[name="originalPrice"]').value.length == 0)
        {
            alert("Giá nhập không được trống");
            return false;
        }
        else if(parseFloat(document.querySelector('input[name="originalPrice"]').value) <= 0) 
        {
            alert('Giá nhập phải lớn hơn 0');
            return false;
        }
        // Constraint 5: check sell Price
        if(document.querySelector('input[name="sellPrice"]').value.length == 0)
        {
            alert("Giá bán không được trống");
            return false;
        }
        else if(parseFloat(document.querySelector('input[name="sellPrice"]').value) <= 0) 
        {
            alert('Giá bán phải lớn hơn 0');
            return false;
        }
        // Constraint 6: Ngày nhập phải nhỏ  hơn ngày hết hạn và ngày hết hạn, ngày nhập phải khác null
        if (
            (
                new Date(document.querySelector('input[name="importDate"]').value).getTime()
                - 
                new Date(document.querySelector('input[name="expiredDate"]').value).getTime()
            ) >= 0
        )
        {
            alert('Không thể nhập hàng hết hạn');
            return false;
        }
        // Constraint 7: Check giá gốc nhỏ hơn giá bán
        if(
            parseInt(document.querySelector('input[name="sellPrice"]').value) 
            - 
            parseInt(document.querySelector('input[name="originalPrice"]').value) <=0
            ) 
        {
            alert('Giá bán phải lớn hơn giá gốc');
            return false;
        }
        // Constraint 8: check xem đã  up ảnh lên xong chưa
        if(this.finishUpImage == false)
        {
            alert('Ảnh chưa được upload xong');
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
                 this.props.showAlert('Ngày hết hạn với ngày nhập phải cách nhau ít nhất ' + this.props.regulation.minExpiredProduct + ' ngày'
                 ,"warning");
                 return false;
             }
         }
        alert('Constraint đã check đầy đủ');
        return true;
    }

    handleAdd(){
        this.props.changeAddTypeStatus();
    }

    async updateGood() {
        var currentCurrency = document.querySelector('#currencySelector').value;
        var isContinue = this.checkConstraint();
        if(!isContinue)
        {
            return;
        }
        
        var productInfo = this.props.infoUpdate;
        const data = {
            token: localStorage.getItem('token'),
            product: {
                _id: {
                    productID: document.querySelector('input[name="goodID"]').value,
                    importDate: productInfo._id.importDate,
                    storeID: this.props.infoUser.email,
                },
                name: this.name,
                quantity: this.quantity,
                // remain: document.querySelector('input[name="goodQuantity"]').value,
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
        console.log("Updategood",data);
        axios.put(`http://localhost:5000/api/product`, data)
            .then(res => {
                console.log("Update success");
                alert('Đã update thành công sản phẩm')
            })
            .catch(err => {
                console.log(err);
            })
        // Get hết các cái join của sản phẩm
        var allJoinMatch = [];
        const data1 = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
                "_id.productID": this.goodID,
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
                console.log(err);
                alert(err);
            })
        console.log(allJoinMatch);
        // Xoá các join liên quan đến sản phẩm
        var allProductJoin = [];
        for(var i = 0 ; i < allJoinMatch.length; i++)
        {
            allProductJoin.push({
                productID: this.goodID,
                typeID: allJoinMatch[i]._id.typeID,
                importDate: allJoinMatch[i]._id.importDate,
                storeID: this.props.infoUser.email,
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
                alert(err);
            })
        // Thêm các cái hiện tại
        // Giờ thêm nhiều type thì phải làm cái này nhiều lần
        for(var i = 0 ; i < typeSet.length ; i++)
        {
            const data1 = {
                token: localStorage.getItem('token'),
                productJoinType: {
                    _id : {
                        productID: this.goodID,
                        typeID: typeSet[i], 
                        importDate: productInfo._id.importDate,
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

        // Thêm vào redux
        var reduxData = {
            _id: {
                productID: productInfo._id.productID,
                importDate: productInfo._id.importDate, 
                storeID: this.props.infoUser.email,
            },
            name: this.name,
            quantity: this.quantity,
            remain: this.remain,
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
        this.props.updateProductToRedux(reduxData);
        this.props.changeUpdateGoodStatus();
    }

    remain = 0;

    cancel = () => {
        this.props.changeUpdateGoodStatus();
    }

    loadInitialData = () => {
        // Load các dữ liệu ban đầu của form ở đây để mà update nhưng mà bị lỗi 401 mẹ
        //Xử lý sampleData
        var productInfo = this.props.infoUpdate;
        console.log(this.props.infoUpdate);

        this.goodID = (productInfo._id.productID == null) ? '' : productInfo._id.productID;
        this.importDate = productInfo._id.importDate;
        this.importDate = this.importDate == null ? '' :this.importDate.substring(0, this.importDate.indexOf('T'));
        this.name = productInfo.name == null ? '' : productInfo.name;
        this.imgUrl = productInfo.imgUrl == null ? '' : productInfo.imgUrl;
        this.quantity = productInfo.quantity == null ? '' : productInfo.quantity;
        this.remain = productInfo.remain;
        this.unit = productInfo.unit == null ? '' : productInfo.unit;
        this.importPrice = productInfo.importPrice == null ? '' : productInfo.importPrice;
        this.sellPrice = productInfo.sellPrice == null ? '' : productInfo.sellPrice;
        this.expire = productInfo.expires; //substring(0,productInfo.expire.indexOf('T'));
        this.expire = this.expire == null ? '' :this.expire.substring(0, this.expire.indexOf('T'));
        console.log("this.expire",this.expire );
        this.setState({change: !this.state.change});
    }

    profileImageChange = (fileChangeEvent) => {
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
            axios.post(`https://api.cloudinary.com/v1_1/databaseimg/image/upload`, formData)
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

    changeName = (e) => {
        this.name = e.target.value;
    }

    changeValue = (e, variable) =>
    {
        if(variable=='quantity')
        {
            this.quantity = e.target.value;
        }
    }

    foundTypeInSet(typeID) {
        for(var i = 0 ; i < typeSet.length; i++)
        {
            if(typeSet[i]==typeID._id.typeID) return true;
        }
        return false;
    }
    render() {
        
        return (
            <form style={{ zIndex: '10', width: '60%', justifyContent: 'center', marginTop: '80px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' , textAlign: 'center'}} title="UPDATE GOOD" />
                        <div 
                        style={{ 
                            width: '100%', backgroundColor: 'rgb(221,235,255)'   
                        }}
                    >   
                    <Grid className="import-container" container >
                        <Grid item md={12}  
                            style={{
                                display: 'flex', 
                                justifyContent:'center', 
                                flexDirection:'column',
                                alignItems:'center',
                                marginTop: '0px'
                            }}
                        >   
                            <label className="profile-header__avatar" for="profile-header-update-avatar" style={{ overflow: 'hidden' }}>
                                <Image style={{width: '150px',height: '150px' }} cloudName="databaseimg" publicId={this.imgUrl=='none' ? 'http://res.cloudinary.com/databaseimg/image/upload/v1634358564/b9wj5lcklxitjglymxqh.png' : this.imgUrl}></Image>
                            </label>
                            {/* Ẩn đi */}
                            <input id="profile-header-update-avatar" type="file" style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={(e) => this.profileImageChange(e)}></input>
                        </Grid>
                        <Grid item md={12}>

                            <Card 
                            >
                                
                                <Grid container md={12}>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div 
                                            className="input-label"
                                            style={{
                                                width: '116px'
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
                                            value={this.goodID}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                        style={{
                                            marginLeft: 0,
                                            paddingLeft: 0
                                        }}
                                    >
                                        <div className="input-label" style={{width: 128}}>Import Date</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="date" 
                                            style = {{width: '68%'}} 
                                            fullWidth
                                            name="importDate"
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.importDate}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Grid>
                                    
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Name</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            // class="input-val" 
                                            style = {{width: '100%'}} 
                                            fullWidth
                                            size="small"
                                            name="goodName" 
                                            variant="outlined"
                                            defaultValue={this.name}
                                            onChange={(e) => this.changeName(e)} 
                                        />
                                    </Grid>
                                    <Grid item md={3}
                                        className='input-item'
                                        style={{padding: '0px', marginLeft: '0px'}}
                                    >
                                        <div 
                                            className="input-label" 
                                            style={{width: '100px'}}
                                        >
                                            Quantity
                                        </div>
                                        <StyledTextField
                                            style = {{width: '60%'}} 
                                            fullWidth
                                            name="goodQuantity" 
                                            variant="outlined"
                                            type="number" 
                                            defaultValue={this.quantity}
                                            onChange={(e) => this.changeValue(e, 'quantity')}
                                        />
                                    </Grid>
                                    <Grid item md={3}
                                        className='input-item'
                                        style={{
                                            paddingRight: 24
                                        }}
                                    >
                                        <div 
                                            className="input-label"
                                            style={{
                                                marginLeft: 0,
                                                paddingLeft: 4
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
                                            defaultValue={this.unit}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label" style={{width: 132}}>Expired Date</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="date" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            name="expiredDate" 
                                            variant="outlined"
                                            defaultValue={this.expire} 
                                        />
                                        {/* <StyledTextField
                                            classname='input-box'
                                            style = {{width: '80%', marginLeft: '4px',marginRight:'8px'}} 
                                            fullWidth
                                            name="sellPrice" 
                                            variant="outlined"
                                            value={this.expire}
                                        /> */}
                                    </Grid>
                                    <Grid item md={6} className='input-item'>
                                        <div className="input-label" style={{width: 100}}>Currency</div>
                                        <StyledTextField
                                            // fullWidth
                                            id="currencySelector"
                                            name="currency"
                                            variant="outlined"
                                            style = {{width: '70%'}} 
                                            select

                                            SelectProps={{ native: true }}
                                            onChange={(event) => {
                                                var preChoice = this.curCurrencySelect;
                                                this.curCurrencySelect = event.target.value;
                                                if(preChoice != this.curCurrencySelect)
                                                {
                                                    if(this.curCurrencySelect == 'vnd')
                                                    {
                                                        this.sellPrice= (this.sellPrice*this.props.regulation.exchangeRate).toFixed(0)
                                                        this.importPrice= (this.props.regulation.exchangeRate*this.importPrice).toFixed(0);
                                                    }
                                                    else
                                                    {
                                                        this.sellPrice= (this.sellPrice/this.props.regulation.exchangeRate).toFixed(2);
                                                        this.importPrice= (this.importPrice/this.props.regulation.exchangeRate).toFixed(2);
                                                    }
                                                }
                                                this.setState({change: !this.state.change,});
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
                                        <div className="input-label" style={{width: 128}}>Original Price</div>
                                        <StyledTextField
                                            classname='input-box'
                                            style = {{width: '60%', marginLeft: '4px', marginRight:'8px'}} 
                                            fullWidth
                                            name="originalPrice" 
                                            variant="outlined"
                                            type="number"
                                            // onChange={(this.)}
                                            onChange={(e) => {
                                                this.importPrice = e.target.value;
                                                this.setState({
                                                    change: !this.state.change,
                                                });
                                            }}
                                            value={this.importPrice}
                                        />
                                        { this.curCurrencySelect == 'vnd' ? <div>VNĐ</div> : <div>$</div>}
                                    </Grid>
                                    <Grid item md={6}
                                        className='input-item'
                                        style={{padding: '0px', marginLeft: '0px', paddingRight: 24}}
                                    >
                                        <div 
                                            className="input-label"
                                            style={{width: '96px'}}
                                        >
                                            Sell Price
                                        </div>
                                        <StyledTextField
                                            classname='input-box'
                                            style = {{width: '80%', marginLeft: '4px',marginRight:'8px'}} 
                                            fullWidth
                                            name="sellPrice" 
                                            variant="outlined"
                                            type="number" 
                                            onChange={(e) => {
                                                this.sellPrice = e.target.value;
                                                this.setState({
                                                    change: !this.state.change,
                                                });
                                            }}
                                            value={this.sellPrice}
                                        />
                                        { this.curCurrencySelect == 'vnd' ? <div>VNĐ</div> : <div>$</div>}
                                    </Grid>
                                    
                                    <Grid item md={10}
                                        className='input-item'
                                    >
                                        <div 
                                            className="input-label"
                                            style={{width:132}}
                                        >
                                            Product Type
                                        </div>
                                        <FormControl sx={{ minWidth: 120 }}>
                                        {/* <InputLabel id="select-filled-label">Type</InputLabel> */}
                                        <Select
                                            value={this.state.type}
                                            onChange={(event) => {
                                                this.setState({type: event.target.value});
                                                if(!typeSet.includes(event.target.value))
                                                {
                                                    typeSet.push(event.target.value);
                                                }
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
                                                    <div item md={7} className='type-container'>
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
                                    {/* <Grid item md={10}
                                        className='input-item'
                                    >

                                    </Grid> */}
                                    <Grid item md={2}
                                        className='input-item'
                                    >
                                        <Button variant="contained" onClick={() => this.updateGood()}>
                                            UPDATE
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Card>
                        </Grid>
                        <Grid item sm={12} md={12} >
                            
                        </Grid>
                    </Grid> 
                        
                    
                </div>
                </Card>
                {this.props.addTypeStatus ? (
                        <div className="modal-add" style={{ zIndex: '12'}}>
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
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addTypeStatus: state.addTypeStatus,
        updateGoodStatus: state.updateGoodStatus,
        confirmStatus: state.confirmStatus,
        infoUpdate: state.infoUpdate,
        infoUser: state.infoUser,
        typeProduct: state.typeProduct,
        listProduct: state.listProduct,
        regulation: state.regulationReducer,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddTypeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_TYPE_STATUS",
            });
        },
        changeUpdateGoodStatus: () => {
            dispatch({
                type: "CHANGE_UPDATE_GOOD_STATUS",
            });
        },
        changeConfirmStatus: () => {
            dispatch({
                type: "CHANGE_CONFIRM_STATUS",
            });
        },
        setUpdateConfirm: () => {
            dispatch({
                type: "SET_CONFIRM_UPDATE_GOOD",
            }); 
        },
        updateProductToRedux: (data) => {
            dispatch({
                type: "UPDATE_PRODUCT",
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateGoodModal);

               