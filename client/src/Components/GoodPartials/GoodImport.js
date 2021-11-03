import React, { Component } from 'react';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { InputLabel, Button, Modal, Grid, Card, CardHeader} from '@mui/material';
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
// Use for save type
var productTypes =[];
var listTypeInfor = [];

var listProductInfor = [];

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

class GoodImport extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageSelect: "null",
            type:'none',
            url: 'http://res.cloudinary.com/databaseimg/image/upload/v1634117795/ubvxisehhpvnu2lbqmeg.png',
            change: false,
        }; 
        this.loadAllType(); 
        this.loadAllGood();

        this.currentDateTime = this.getCurrentDateTime();
        console.log("this.currentDateTime",this.currentDateTime);
        typeSet = [];
    }
    
    getCurrentDateTime()
    {
        var day = new Date().getDay().toString();
        if(day.length<2)
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
    imgUrl= 'none';
    dateTime= Date.now();
    currentDateTime = '2021-01-02';
    finishUpImage = true;

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

    async importGood(e) {
        // Ngăn chuyển trang
        var isContinue = this.checkConstraint();
        if(!isContinue)
        {
            e.preventDefault();
            return;
        }
        // Thêm hàng hoá
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
                importPrice: document.querySelector('input[name="originalPrice"]').value,
                sellPrice: document.querySelector('input[name="sellPrice"]').value,
                expires: document.querySelector('input[name="expiredDate"]').value,
                imgUrl: this.imgUrl,
                unit: document.querySelector('input[name="unit"]').value,
            }   
        }
        console.log(data);

        axios.post(`http://localhost:5000/api/product`, data)
            .then(res => {
                console.log("Save success");
                alert("Lưu thành công")
            })
            .catch(err => {
                alert(err);
                console.log(err);
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
        

        // console.log(data);
    }
    checkConstraint = () => {
        // Kiểm tra các constraint ở đây coi thử ổn chưa
        // Constraint 1: Check name
        var productName =  document.querySelector('input[name="goodName"]').value;
        if(productName.length == 0)
        {
            this.props.hideAlert();
            this.props.showAlert("Tên sản phẩm không được trống","warning");
            return false;
        }
        // Constraint 2: Check quantity
        if(document.querySelector('input[name="goodQuantity"]').value.length == 0)
        {
            this.props.hideAlert();
            this.props.showAlert("Số lượng sản phẩm không được trống","warning");
            return false;
        }
        else if(parseInt(document.querySelector('input[name="goodQuantity"]').value) <= 0) 
        {
            this.props.hideAlert();
            this.props.showAlert("Số lượng sản phẩm không được trống","warning");
            alert('Số lượng sản phẩm phải lớn hơn 0');
            return false;
        }
        // Constraint 3: check Unit
        if(document.querySelector('input[name="unit"]').value.length == 0)
        {
            this.props.hideAlert();
            this.props.showAlert("Số lượng sản phẩm không được trống","warning");
            alert('Đơn vị của sản phẩm không được trống');
            return false;
        }
        // Constraint 4: Check import Price
        if(document.querySelector('input[name="originalPrice"]').value.length == 0)
        {
            this.props.hideAlert();
            this.props.showAlert("Giá nhập không được trống","warning");
            return false;
        }
        else if(parseInt(document.querySelector('input[name="originalPrice"]').value) <= 0) 
        {
            this.props.hideAlert();
            this.props.showAlert('Giá nhập phải lớn hơn 0',"warning");
            return false;
        }
        // Constraint 5: check sell Price
        if(document.querySelector('input[name="sellPrice"]').value.length == 0)
        {
            this.props.hideAlert();
            this.props.showAlert("Giá bán không được trống","warning");
            return false;
        }
        else if(parseInt(document.querySelector('input[name="sellPrice"]').value) <= 0) 
        {
            this.props.hideAlert();
            this.props.showAlert('Giá bán phải lớn hơn 0',"warning");
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
            this.props.showAlert('Không thể nhập hàng hết hạn',"warning");
            return false;
        }
        // Constraint 7: Check giá gốc nhỏ hơn giá bán
        if(
            parseInt(document.querySelector('input[name="sellPrice"]').value) 
            - 
            parseInt(document.querySelector('input[name="originalPrice"]').value) <=0
            ) 
        {
            this.props.hideAlert();
            this.props.showAlert('Giá bán phải lớn hơn giá gốc',"warning");
            return false;
        }
        // Constraint 8: check xem đã  up ảnh lên xong chưa
        if(this.finishUpImage == false)
        {
            this.props.hideAlert();
            this.props.showAlert('Ảnh chưa được upload xong',"warning");
            return false;
        }
        return true;
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
        productTypes=[];
        for(var i=0 ; i< listTypeInfor.length ; i ++)
        {
            productTypes.push(listTypeInfor[i].name);
        }
        this.setState({change: true});
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
                console.log(res.data.data);
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
        if(listProductInfor.length>0)
        {
            this.generatedID = parseInt(listProductInfor[listProductInfor.length-1]._id.productID) + 1;
        } 
        else this.generatedID = 0;
        this.setState({change: false});
    }

    

    generatedID = 0;

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
        
        return(
            <div 
                style={{ 
                    height: "800px", width: '100%', overflowY: 'scroll', backgroundColor: 'rgb(221,235,255)'   
                }}
            >   
                <div className="good-import-header"></div>
                <Grid className="import-container" container spacing={2}>
                    <Grid item md={3}  
                        style={{
                            display: 'flex', 
                            justifyContent:'center', 
                            flexDirection:'column',
                            alignItems:'center',
                            paddingLeft: '30px'
                        }}
                    >   
                        <label className="profile-header__avatar" for="profile-header-update-avatar" style={{ overflow: 'hidden', marginTop: '15px ' }}>
                            <Image style={{width: '240px',height: '240px', padding: '10px' }} cloudName="databaseimg" publicId={this.imgUrl=='none' ? 'http://res.cloudinary.com/databaseimg/image/upload/v1634358564/b9wj5lcklxitjglymxqh.png' : this.imgUrl}></Image>
                        </label>
                        {/* Ẩn đi */}
                        <input id="profile-header-update-avatar" type="file" style={{ display: 'none' }} accept="image/png, image/jpeg" onChange={(e) => this.profileImageChange(e)}></input>
                    </Grid>
                    <Grid item md={9}>

                        <Card 
                            style={{
                                marginRight: '18px',
                            }}
                        >
                            <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' , textAlign: 'center'}} title="ADD GOOD" />
                            <Grid container md={12}>
                                <Grid item md={6} 
                                    className='input-item'
                                >
                                    <div 
                                        className="input-label"
                                        style={{
                                            width: '130px'
                                        }}
                                    >
                                        ID
                                    </div>
                                    <StyledTextField
                                        classname='input-box' 
                                        type="text" 
                                        // class="input-val" 
                                        style = {{width: '60%'}} 
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
                                    <div className="input-label" style={{width: 110}}>Import Date</div>
                                    <StyledTextField
                                        classname='input-box'   
                                        type="date" 
                                        style = {{width: '68%'}} 
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
                                    <div className="input-label"style={{width: '130px'}}>Name</div>
                                    <StyledTextField
                                        classname='input-box'   
                                        type="text" 
                                        // class="input-val" 
                                        style = {{width: '60%'}} 
                                        fullWidth
                                        size="small"
                                        name="goodName" 
                                        variant="outlined" 
                                    />
                                </Grid>
                                <Grid item md={4}
                                    className='input-item'
                                    style={{padding: '0px', marginLeft: '0px'}}
                                >
                                    <div 
                                        className="input-label" 
                                        style={{width: '120px'}}
                                    >
                                        Quantity
                                    </div>
                                    <StyledTextField
                                        style = {{width: '60%'}} 
                                        fullWidth
                                        name="goodQuantity" 
                                        variant="outlined"
                                        type="number"
                                    />
                                </Grid>
                                <Grid item md={2}
                                    className='input-item'
                                    style={{
                                        paddingRight: 12
                                    }}
                                >
                                    <div 
                                        className="input-label"
                                        style={{
                                            marginLeft: 0,
                                            paddingLeft: 4,
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
                                    />
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
                                    />
                                    đ
                                </Grid>
                                <Grid item md={6}
                                    className='input-item'
                                    style={{padding: '0px', marginLeft: '0px', paddingRight: 24}}
                                >
                                    <div 
                                        className="input-label"
                                        style={{width: '130px'}}
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
                                    />
                                    đ
                                </Grid>
                                <Grid item md={7} 
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
                                        defaultValue={this.currentDateTime}
                                    />
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
                                                listTypeInfor.length== 0 ? <MenuItem value={'none'}>None</MenuItem>
                                                : listTypeInfor.map((type) =>
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
                                {/* <Grid item md={10}
                                    className='input-item'
                                >

                                </Grid> */}
                                <Grid item md={2}
                                    className='input-item'
                                >
                                    <Link to="/goodmanager" className="btn btn-primary" onClick={(e) => this.importGood(e)}>
                                        IMPORT
                                    </Link>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item sm={12} md={12} >
                        
                    </Grid>
                </Grid> 
                    
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodImport);
