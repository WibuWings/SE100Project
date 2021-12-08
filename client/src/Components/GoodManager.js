import { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import GoodTable from './GoodPartials/GoodTable';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchBar from './GoodPartials/SearchBar';
import {connect} from 'react-redux'
import AddTypeModal from './GoodPartials/AddTypeModal';
import '../css/GoodManager.css';
import ConfirmModal from './GoodPartials/ConfirmModal';
import UpdateGoodModal from './GoodPartials/UpdateGoodModal';
import EditTypeModal from './GoodPartials/EditTypeModal';
import AddGoodModal from './GoodPartials/AddGoodModal';
import axios from 'axios';
import UpdateTypeModal from './GoodPartials/UpdateTypeModal';
import XLSX from 'xlsx';
import excelLogo from './GoodPartials/excelLogo.png';
import { inputAdornmentClasses } from '@material-ui/core';


class GoodManager extends Component {
    constructor(props) {
        super(props);
        this.loadAllType(); 
        this.loadAllGood();
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
        // console.log("joinTypeInfor", joinTypeInfor);

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
        }
        this.props.getProductToReducer(listProductInfor);
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
        this.props.getProductType(result);
    }
    handleAdd() {
        this.props.changeAddTypeStatus();
        this.props.setAddTypeStatus();
    }
    handleConfirm(){
        this.props.changeConfirmStatus();
        this.props.unsetDelete();
    }
    handleConfirmDelete(){
        this.props.changeConfirmStatus();
        this.props.setDeleteConfirm();
    }
    handleUpdateGood() {
        this.props.changeUpdateGoodStatus();
    }
    handleEditType() {
        this.props.changeEditTypeStatus();
    }

    componentWillMount() {
        document.title = 'Product Manager'
    }   

    uploadExcel(e){
        e.preventDefault();
        var f;
        try {
            // console.log("e", e.target.files[0]);
            f = e.target.files[0];
        }
        catch(e) {
            console.log(e);
            return;
        } 

        var name = f.name;
        const reader = new FileReader();
        var dataExcel;
        // Chỗ này đọc file excel gì đó, giờ xử lý cái data lấy ra thôi
        reader.onload = (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, {type:'binary'});
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_csv(ws, {header:1});
            // console.log("data", data);
            dataExcel = data;
            this.handleExcelData(dataExcel);
        };
        reader.readAsBinaryString(f);
        // Reset tên file mỗi khi đọc
        document.querySelector('#upload-excel').value = '';

        
    }

    handleExcelData(excelData) {
        // chia các cột theo row
        var rows = excelData.split('\n');
        console.log("Nội dung file", rows);
        if(rows.length  <= 2)
        {
            alert("File không hợp lệ do chưa có thông tin về hàng header và dữ liệu ở đó")
            return false;
        }
        // Xử lý các thông tin ở trưởng header
        var rowSample=
            ["Product ID","Name","Quantity","Unit","Expired Date",
            "Currency","Original Price","SellPrice","ProductType"];
        var rowSplit = rows[0].split(',');
        if(rowSample.length != rowSplit.length)
        {
            alert("Header bị lỗi, header khác với sample hoặc có dữ liệu trồi ra bên ngoài của bảng");
            return false;
        }
        for(var i = 0 ; i < rowSample.length ; i++)
        {
            if(rowSample[i] != rowSplit[i]) {
                alert("Header bị lỗi, header khác với sample");
                return false;
            }
        }
        var columnName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
        var allRows = [];
        // Xử lý lần lượt các dữ liệu ở từng ô.
        for(var i2 = 1; i2 < rows.length - 1; i2++)
        {
            var dataRows = rows[i2].split(',');
            if(dataRows.length < 9)
            {
                alert("Hàng thứ " + (i2+1) + " trong file excel chứa sản phẩm bị thiếu dữ liệu");
                return false;
            }

            if(dataRows.length > 9)
            {
                alert("Hàng thứ " + (i2+1) + " trong file excel chứa sản phẩm bị dư dữ liệu hoặc có ô dư dấu phẩy");
                return false;
            }
            for(var j = 0; j < dataRows.length; j++)
            {
                if(dataRows[j]=='')
                {
                    alert("Hàng thứ " + (i2+1) + " cột " + columnName[j] + " trong file excel chứa sản phẩm bị thiếu dữ liệu");
                    return false;
                }
            }
            // Lấy dữ liệu đã có tạo thành object và bắt đầu check xong constraint
            var newRow = {
                name: dataRows[1],
                quantity: dataRows[2],
                unit: dataRows[3],
                expiredDate: dataRows[4],
                currency: dataRows[5],
                originalPrice: dataRows[6],
                sellPrice: dataRows[7],
                productTypeName: dataRows[8]
            }
            // Check các constraint và quy định ở đây trước khi add vào listObject
            if(this.checkConstraintOfExcelObject(newRow, i2) == false) return false;
            if(this.checkRegulationOfExcelObject(newRow, i2) == false) return false;
            allRows.push(newRow);
            
        } 
        
        console.log("Tất cả dữ liệu", allRows);
        // Xử lý sau khi đã lấy được các excel Object
        this.addProductsFromExcel(allRows);
    }

    checkAllNumber(stringToCheck)
    {
        var number=[1,2,3,4,5,6,7,8,9,0];
        for(var i = 0; i < stringToCheck.length ; i++)
        {
            var isFound = false;
            for(var j = 0; j < number.length ;j++)
            {
                if(number[j]==stringToCheck[i])
                {
                    isFound = true;
                    break;
                }
            }
            if(!isFound) return false; 
        }
        return true;
    }

    checkAllDoubleNumber(stringToCheck) {
        var number=['1','2','3','4','5','6','7','8','9','0','.'];
        for(var i = 0; i < stringToCheck.length ; i++)
        {
            var isFound = false;
            for(var j = 0; j < number.length ;j++)
            {
                if(number[j]==stringToCheck[i])
                {
                    isFound = true;
                    break;
                }
            }
            if(!isFound) return false; 
        }
        return true;
    }

    isLeafYear(year) {
        if(year % 400 == 0) return true;
        if(year % 100 == 0) return false;
        if(year % 4 == 0) return true;
        else return false;
    }

    toDateString(dateStringToConvert)
    {
        var days = dateStringToConvert.split('/');
        if(days.length !=3) return "";
        // Check một số cái điều kiện về tháng
        if(!this.checkAllNumber(days[0]) || parseInt(days[0]) > 12 || parseInt(days[0]) < 1 )
        {
            return "";
        } 
        // Check một số điều kiện về năm
        if(!this.checkAllNumber(days[2]) || parseInt(days[2]) <= 0 )
        {
            return "";
        }
        // Check các điều kiện về ngày 
        var dayInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if(parseInt(days[0]) < 1 || parseInt(days[0]) > 31)
        {
            return "";
        }
        var dayOfCurrrentMonth = dayInMonth[parseInt(days[0])];
        if(parseInt(days[0]) == 2)
        {
            if(this.isLeafYear(parseInt(days[2])))
            {
                dayOfCurrrentMonth = 29;
            }
        }
        if(parseInt(days[0]) > dayOfCurrrentMonth)
        {
            return "";
        }
        // Này là trường hợp lý tưởng nhất luôn rồi
        return '20' + days[2] + '-' + days[0] + '-' + days[1]; 
    }

    checkConstraintOfExcelObject(newRow, index) {
        // check quantity
        try {
            if(parseInt(newRow.quantity) <= 0 || this.checkAllNumber(newRow.quantity)==false)
            {
                alert("Số lượng sản phẩm ở hàng "+ (index + 1) +" không hợp lệ");
                return false;
            }
        }
        catch(e)
        {
            alert("Số lượng sản phẩm ở hàng "+ (index + 1) +" không hợp lệ");
            return false;
        }

        try {
            if(parseFloat(newRow.originalPrice) <= 0 || this.checkAllDoubleNumber(newRow.originalPrice)==false)
            {
                alert("Giá nhập hàng ở hàng "+ (index + 1) +" không hợp lệ");
                return false;
            }

        }
        catch (e){
            alert("Giá nhập hàng ở hàng "+ (index+1) +" không hợp lệ");
            return false;
        }

        try {
            if(parseFloat(newRow.sellPrice) <= 0 || this.checkAllDoubleNumber(newRow.sellPrice)==false)
            {
                alert("Giá bán ở hàng "+ (index + 1) +" không hợp lệ");
                return false;
            }

        }
        catch (e){
            alert("Giá bán ở hàng "+ (index+1) +" không hợp lệ");
            return false;
        }

        try {
            if(this.toDateString(newRow.expiredDate)=="")
            {
                alert("Ngày hết hạn ở hàng "+ (index+1) +" không hợp lệ");
                return false;
            }
        }
        catch(e)
        {
            alert("Ngày hết hạn ở hàng "+ (index+1) +" không hợp lệ");
            return false;
        }
        // Check ngày hết hạn lớn hơn ngày nhập là ngày hiện tại
        try{
            // console.log("In thử ngày hiện tại", new Date().getTime())
            if(new Date().getTime() - new Date(this.toDateString(newRow.expiredDate)).getTime() >=0)
            {
                alert("Ngày nhập hàng ở hàng "+ (index+1) +" không thể lớn hơn hoặc bằng ngày hết hạn");
                return false;
            }
        }
        catch(e) {
            alert("Ngày nhập hàng ở hàng "+ (index+1) +" không thể lớn hơn hoặc bằng ngày hết hạn");
            return false;
        }
        // Check giá gốc phải nhỏ hơn giá bán
        if ( parseFloat(newRow.sellPrice) - parseFloat(newRow.originalPrice) <=0.0) 
        {
            alert('Giá bán ở hàng ' + (index+1) +' phải lớn hơn giá gốc');
            return false;
        }
        // Check cái đơn vị tiền
        if ( newRow.currency != '$' && newRow.currency !='VNĐ') 
        {
            alert('Đơn vị tiền tệ của hàng '  + (index+1) + ' bị sai (chỉ có thể là "$" hoặc "VNĐ")');
            return false;
        }
        // Check xong hết các constraint;
        return true;
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

    getCurrentDateTimeString()
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

    checkRegulationOfExcelObject(newRow, index) {
        if(this.props.regulation == {}) return true;
        try {
            if(
                this.props.regulation.minExpiredProduct > 
                this.calculateDay(this.toDateString(newRow.expiredDate), this.getCurrentDateTimeString())
            )
            {
                alert('Ngày nhập và ngày hết hạn ở hàng '  + (index+1) 
                + ' phải cách nhau ít nhất ' +this.props.regulation.minExpiredProduct + ' ngày');
                return false;
            }
        }
        catch(e){
            alert("Đã có lỗi xảy ra trong việc check quy định của ngày hết hạn và ngày nhập");
            return false;
        }
        return true;
    }

    // Thêm các sản phẩm vào cơ sở dữ liệu:
    addProductsFromExcel(excelObject){ 
        var allTypes = [];
        var allProducts = [];
        var allJoins = [];
        // ID bắt đầu đánh ở đây:
        var genIDProductStart = 0;
        var listProductInfor = this.props.listProduct.state;
        if(listProductInfor.length > 0)
        {
            genIDProductStart = parseInt(listProductInfor[listProductInfor.length-1]._id.productID) + 1;
        } 
        
        var currentgenIDTypeStart = 0;
        var listTypeInfor = this.props.typeProduct;
        console.log("listTypeInfor", listTypeInfor);
        if(listTypeInfor.length>0)
        {
            currentgenIDTypeStart = parseInt(listTypeInfor[listTypeInfor.length-1]._id.typeID) + 1;
        } 

        var excecuteListType = [];
        // Chạy từng cái object để tạo cái product, cái type và cái join
        for(var i = 0; i < excelObject.length; i++)
        {
            // Tách riêng từng cái product
            var currentProduct = {
                _id: {
                    productID: genIDProductStart + i,
                    importDate: this.getCurrentDateTimeString(),
                    storeID: this.props.infoUser.email,
                },
                name: excelObject[i].name,
                quantity: excelObject[i].quantity,
                remain: excelObject[i].quantity,
                importPrice: (excelObject[i].currency == 'VNĐ') ?
                    excelObject[i].originalPrice :
                    excelObject[i].originalPrice * this.props.regulation.exchangeRate,
                sellPrice: (excelObject[i].currency == 'VNĐ') ?
                    excelObject[i].sellPrice :
                    excelObject[i].sellPrice * this.props.regulation.exchangeRate,
                expires: this.toDateString(excelObject[i].expiredDate),
                imgUrl: 'none',
                unit: excelObject[i].unit,
            }
            allProducts.push(currentProduct);
            // Tách riêng từng cái type của cái currentProduct
            var currentTypes = excelObject[i].productTypeName.split(' || ');
            // console.log("currentTypes", currentTypes)

            // Tìm kiếm các cái trong listTypeInfor và trong cái executeListType
            
            for(var k = 0; k < currentTypes.length ; k ++)
            {
                var indexFound = -1;
                // Tìm kiếm trong các loại có sẵn
                for(var j = 0 ; j < listTypeInfor.length; j++)
                {
                    if(currentTypes[k] == listTypeInfor[j].name)
                    {
                        indexFound = listTypeInfor[j]._id.typeID;
                        break;
                    }
                }
                if(indexFound != -1)
                {
                    // Tạo một cái object join để thêm vào cái có sẵn
                    var currentproductJoinType = {
                        _id : {
                            productID: genIDProductStart + i,
                            typeID: indexFound, 
                            importDate: this.getCurrentDateTimeString(),
                            storeID: this.props.infoUser.email,
                        }
                    }
                    allJoins.push(currentproductJoinType);
                }
                else 
                {
                    var indexExecFound = -1;
                    for(var l =0 ; l < excecuteListType.length ; l++)
                    {
                        if(currentTypes[k] == excecuteListType[l].name)
                        {
                            indexExecFound = excecuteListType[l]._id.typeID;
                        }
                    }
                    if(indexExecFound != -1)
                    {
                        var currentproductJoinType = {
                            _id : {
                                productID: genIDProductStart + i,
                                typeID: indexExecFound, 
                                importDate: this.getCurrentDateTimeString(),
                                storeID: this.props.infoUser.email,
                            }
                        }
                        allJoins.push(currentproductJoinType);
                    }
                    // Nếu như không tìm thấy trong cả hai cái thì phải thêm thôi
                    else 
                    {
                        // Thêm các cái mình sẽ add vào csdl ở đây
                        var newTypeToAdd = {
                            _id:{
                                typeID: currentgenIDTypeStart,
                                storeID: this.props.infoUser.email,
                            },
                            name: currentTypes[k],
                        }
                        allTypes.push(newTypeToAdd);
                        
                        // Sau đó sẽ thêm vào cái cái join ở đây
                        var currentproductJoinType = {
                            _id : {
                                productID: genIDProductStart + i,
                                typeID: currentgenIDTypeStart, 
                                importDate: this.getCurrentDateTimeString(),
                                storeID: this.props.infoUser.email,
                            }
                        }
                        allJoins.push(currentproductJoinType);

                        // Cộng thêm để lấy ID cho các cái sau này
                        currentgenIDTypeStart ++;
                    }
                }
            }
            
        }
        console.log("allProducts", allProducts);
        console.log("allTypes", allTypes);
        console.log("allJoins", allJoins);
        // var allTypes = [];
        // var allProducts = [];
        // var allJoins = [];

        // Lấy được ok rồi, giờ thì thêm từng cái vào cơ sở dữ liệu thôi
        // Thêm thử tất cả sản phẩm vào csdl xem sao 
        
    }

    render() {
        return (
            <div>
                <div id="scroll-bar"style={{height: '100%', width: '100%', marginTop: '40px', marginBottom: '40px', paddingBottom: '40px' }}>
                    <div style={{display: 'flex'}}>
                        <Button variant="contained">
                            <Button style={{color: '#fff', textDecoration: 'none'}} onClick={() => this.props.changeStatusAddGood()}>Import</Button>
                        </Button>
                        <SearchBar style={{height: '120px'}}/>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleAdd()} variant="contained">
                            add type
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleEditType()} variant="contained">
                            edit type
                        </Button>
                        <label style={{backgroundColor: '#31be7d', padding: '4px 8px',borderRadius: 4, lineHeight: 2.2, color:'#fff'}} for="upload-excel">
                            <img src={excelLogo} width={25} height={25} style={{marginRight: 4}}></img>
                            Load Excel
                        </label>
                        <input 
                            id="upload-excel" type="file" style={{display: 'none'}} 
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" 
                            onChange={(e) => this.uploadExcel(e)}
                        ></input>
                        {/* <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleConfirmDelete()} variant="contained">
                            Delete
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleConfirm()} variant="contained">
                            Edit
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleUpdateGood()} variant="contained">
                            Update Good
                        </Button> */}

                     </div>

                    <GoodTable />

                    {/* Đây là phần modal */}

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
                    {this.props.updateGoodStatus ? (
                        <div 
                            className="modal-add"
                        >
                            <div onClick={() => {this.props.changeUpdateGoodStatus();}} className="modal-overlay"></div>
                            <UpdateGoodModal
                                style={{
                                    marginTop: 0
                                }}
                            >
                            </UpdateGoodModal>
                        </div>
                    ): null}
                     {this.props.editTypeStatus ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeEditTypeStatus();}} className="modal-overlay"></div>
                            <EditTypeModal></EditTypeModal>
                        </div>
                    ): null}
                    {this.props.editTypeStatus ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeEditTypeStatus();}} className="modal-overlay"></div>
                            <EditTypeModal></EditTypeModal>
                        </div>
                    ): null}
                    {this.props.statusAddGood ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeStatusAddGood();}} className="modal-overlay"></div>
                            <AddGoodModal></AddGoodModal>
                        </div>
                    ): null}
                    {this.props.statusUpdateType ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeStatusUpdateType();}} className="modal-overlay"></div>
                            <UpdateTypeModal></UpdateTypeModal>
                        </div>
                    ): null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addTypeStatus: state.addTypeStatus,
        confirmStatus: state.confirmStatus,
        deleteStatus: state.deleteStatus,
        updateGoodStatus: state.updateGoodStatus,
        editTypeStatus: state.editTypeStatus,
        isAddTypeStatus: state.isAddTypeStatus,
        statusAddGood: state.statusAddGood,
        infoUser: state.infoUser,
        statusUpdateType: state.statusUpdateType,
        typeProduct: state.typeProduct,
        regulation: state.regulationReducer,
        listProduct: state.listProduct,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddTypeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_TYPE_STATUS",
            });
        },
        changeConfirmStatus: () => {
            dispatch({
                type: "CHANGE_CONFIRM_STATUS",
            });
        },
        unsetDelete: () => {
            dispatch({
                type: "UNSET_DELETE_STATUS",
            })
        },
        changeUpdateGoodStatus: () => {
            dispatch({
                type: "CHANGE_UPDATE_GOOD_STATUS",
            })
        },
        changeEditTypeStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_TYPE_STATUS",
            })
        },
        setAddTypeStatus: () => {
            dispatch({
                type: "SET_ADD_TYPE_STATUS",
            });
        },
        setDeleteConfirm: () => {
            dispatch({
                type: "SET_CONFIRM_DELETE_GOOD",
            }); 
        },
        changeStatusAddGood: () => {
            dispatch({
                type: "CHANGE_ADD_GOOD_STATUS",
            }); 
        },
        getProductType: (data) => {
            dispatch({
                type: "GET_PRODUCT_TYPE",
                data: data
            });
        },
        changeStatusUpdateType: () => {
            dispatch({
                type: "CHANGE_UPDATE_TYPE_STATUS",
            }); 
        },
        getProductToReducer: (data) => {
            dispatch({
                type: "GET_PRODUCT_AND_TYPE",
                data: data
            });
        },
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(GoodManager);
