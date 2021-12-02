import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, InputLabel } from '@mui/material';
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import { withStyles } from '@material-ui/styles';

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

class UpdateEmployeeModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            change: false,
        }; 
        this.loadInitialData();
    }
    imgUrl = 'none';
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


    cancel = () => {
        
    }

    findIndexInListEmployee(employeeID) {
        for(var i = 0; i < this.props.listEmployee.employees.length ; i++)
        {
            if(this.props.listEmployee.employees[i]._id.employeeID == employeeID)
            {
                return i;
            }
        }
        return -1;
    }

    checkConstraint() {
        //Constraint 2: Password không được có dưới 6 ký tự
        var password = document.querySelector('input[name="password"]').value.trim();
        if(password.length == 0)
        {
            alert("Password không được rỗng");
            return false;
        }
        if(password.length < 6)
        {
            alert("Password không được có dưới 6 ký tự");
            return false;
        }
        // Constraint 3: FirstName không được trống
        var firstName =  document.querySelector('input[name="firstName"]').value.trim();
        if(firstName.length == 0)
        {
            alert('Tên riêng không được rỗng');
            return false;
        }
        // Constraint 4: lastName không được trống
        var lastName =  document.querySelector('input[name="lastName"]').value.trim();
        if(lastName.length == 0)
        {
            alert('Họ không được trống');
            return false;
        }
        // Constraint 5: Số ID card không được để trống
        var cardID= document.querySelector('input[name="cardID"]').value.trim();
        if(cardID.length == 0)
        {
            alert("Số id card không được để trống");
            return false;
        }
        // Constrain 6:Số điện thoại không được để trống và phải lớn hơn 6 ký tự
        var phoneNumber= document.querySelector('input[name="phoneNumber"]').value;
        if(phoneNumber.length == 0)
        {
            alert("Số điện thoại không được để trống");
            return false;
        }
        if(phoneNumber.length < 6)
        {
            alert("Số điện thoại không được dưới 6 ký tự");
            return false;
        }
        // Constrain 7:Địa chỉ không được để trống
        var address = document.querySelector('input[name="adress"]').value;
        if(address.length==0)
        {
            alert("Địa chỉ không được để trống");
            return false;
        }
        // Constraint 8: Ngày sinh không được để trống
        var birthDay = document.querySelector('input[name="birthDay"]').value;
        if(birthDay.length == 0)
        {
            alert("Ngày sinh không được để trống");
            return false;
        }
        // Constraint 9: Email không được để trống
        var email = document.querySelector('input[name="email"]').value.trim();
        if(email.length == 0)
        {
            alert("Email không dược để trống");
            return false;
        }
        if(email.indexOf('@')==-1 || email.indexOf('@')==email.length-1)
        {
            alert("Email không hợp lệ");
            return false;
        }
        // Constraint 10: Ngày sinh không thể lớn hơn ngày bất đầu làm
        var startDate = document.querySelector('input[name="startDate"]').value;
        if(!this.isGreater(startDate, birthDay))
        {
            alert("Ngày sinh không thể lớn hơn ngày bất đầu làm");
            return false;
        }
        // Constraint 11: Check đã up ảnh xong chưa
        if(this.finishUpImage == false)
        {
            alert("Ảnh chưa được upload xong");
            return false;
        }
        // Constraint 12: Check tuổi với cái regulation:
        if(this.props.regulation != {})
        {
            if(this.calculateOld(startDate, birthDay) < this.props.regulation.miniumEmployeeAge)
            {
                console.log("Tính tuổi",this.calculateOld(startDate, birthDay));
                alert("Nhân viên chưa đạt đủ độ tuổi cho phép (" + this.props.regulation.miniumEmployeeAge+")");
                return false;
            }
        }
        alert("Đã check hết các constraint")
        return true;
    }

    isGreater(dateString1, dateString2){
        return (new Date(dateString1).getTime() - new Date(dateString2).getTime()) > 0;
    }

    calculateOld(dateString1, dateString2)
    {
        return (new Date(dateString1).getYear() - new Date(dateString2).getYear());
    }

    async updateEmployee(){
        if(this.checkConstraint() == false) return;
        const data = {
            token: localStorage.getItem('token'),
            employee: {
                _id: {
                    employeeID: this.id,
                    storeID: this.props.infoUser.email,
                },
                managerID: this.props.infoUser.email,
                password: document.querySelector('input[name="password"]').value,
                firstName: document.querySelector('input[name="firstName"]').value,
                lastName: document.querySelector('input[name="lastName"]').value,
                phoneNumber: document.querySelector('input[name="phoneNumber"]').value,
                dateOfBirth: document.querySelector('input[name="birthDay"]').value,
                email: document.querySelector('input[name="email"]').value,
                address: document.querySelector('input[name="adress"]').value,
                cardID: document.querySelector('input[name="cardID"]').value,
                startDate: document.querySelector('input[name="startDate"]').value,
                imgUrl: this.imgUrl,
            }   
        }
        // console.log("index", this.findIndexInListEmployee(this.id));
        console.log("updateEmployee", data);
        await axios.put(`http://localhost:5000/api/employee`, data)
            .then(res => {
                console.log("Update success");
                
            })
            .catch(err => {
                console.log(err);
                this.props.changeLoginStatus();
                this.props.hideAlert();
                this.props.showAlert("Login timeout, signin again", "warning");
            })
        this.props.updateEmployeeRedux(data.employee, this.findIndexInListEmployee(this.id))
        this.props.changeUpdateEmployeeStatus();
    }

    id = "";
    password = "";
    firstName = "";
    lastName = "";
    cardID = "";
    phoneNumber = "";
    address = "";
    email = "";
    startDate = "";
    birthDay = "";


    loadInitialData() {
        var currentEmployee = this.props.currentEditEmployee.state;
        // console.log("currentEmployee", currentEmployee);
        this.id = currentEmployee._id.employeeID;
        this.password = currentEmployee.password;
        this.firstName = currentEmployee.firstName;
        this.lastName = currentEmployee.lastName;
        this.cardID = currentEmployee.cardID;
        this.phoneNumber = currentEmployee.phoneNumber;
        this.address = currentEmployee.address;
        this.email = currentEmployee.email;
        this.startDate = currentEmployee.startDate;
        this.imgUrl = currentEmployee.imgUrl;
        if(this.startDate!=null && this.startDate.indexOf('T')!=-1)
        {
            this.startDate = this.startDate.substring(0, this.startDate.indexOf('T'));
        }
        this.birthDay = currentEmployee.dateOfBirth;
        if(this.birthDay!=null && this.birthDay.indexOf('T')!=-1)
        {
            this.birthDay = this.birthDay.substring(0, this.birthDay.indexOf('T'));
        }
        this.setState({change: !this.state.change})
    }

    render() {
        return (
            <form style={{ zIndex: '10', width: '60%', justifyContent: 'center', marginTop: '80px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' , textAlign: 'center'}} title="UPDATE EMPLOYEE" />
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

                            <Card>
                                
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
                                            style = {{width: '70%'}} 
                                            fullWidth 
                                            size="small" 
                                            variant="outlined"
                                            value={this.id}
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label" style={{width: '114px'}}>Password</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="password" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.password}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>First Name</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="firstName"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.firstName}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Last Name</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="lastName"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.lastName}
                                        />
                                    </Grid>
                                    
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>ID CARD</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="number" 
                                            name="cardID" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.cardID}
                                        />
                                    </Grid>
                                    
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>PhoneNumber</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="number" 
                                            name="phoneNumber"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.phoneNumber}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Adress</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="adress" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.address}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>StartDate</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="date"
                                            name="startDate"
                                            style = {{width: '100%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.startDate}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Email</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            name="email"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.email}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>BirthDay</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="date" 
                                            // class="input-val"
                                            name="birthDay"
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                            defaultValue={this.birthDay}
                                        />
                                    </Grid>
                                    <Grid item md={9}></Grid>
                                    <Grid item md={3}
                                        className='input-item'
                                    >
                                        <Button variant="contained" onClick={() => this.updateEmployee()}>
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
            </form>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addEmployeeStatus: state.addEmployeeStatus,
        confirmStatus: state.confirmStatus,
        currentEditEmployee: state.currentEditEmployee,
        infoUser: state.infoUser,
        listEmployee: state.listEmployee,
        regulation: state.regulationReducer,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_EMPLOYEE_STATUS",
            });
        },
        changeUpdateEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_UPDATE_EMPLOYEE_STATUS",
            });
        },
        updateEmployeeRedux: (data, index) => {
            dispatch({
                type: "UPDATE_EMPLOYEE",
                data: data,
                index: index,
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployeeModal);

               