import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button, InputLabel } from '@mui/material';
import { connect } from 'react-redux'
import { Image } from 'cloudinary-react';
import axios from 'axios';
import '../../css/GoodManager.css';
import { withStyles } from '@material-ui/styles';

var productTypes =[
    'food', 'detergent', 'cuisine'
];

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

var listUsers = [];

class AddEmployeeModal extends Component {

    genID = 0;
    imgUrl = 'none';

    constructor(props) {
        super(props);
        
        this.state = {
            change: false,
        };
        listUsers = [];
        this.getAllEmployee(); 
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

    async getAllEmployee () {
        var result = [];
        const data = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": this.props.infoUser.email,
            }   
        }
        await axios.get(`http://localhost:5000/api/employee/`, {
            params: {...data}
        })
            .then(res => {
                result = res.data.data;
            })
            .catch(err => {
                // console.log(err);
                this.props.hideAlert();
				this.props.showAlert("Something happened, restart and try again","warning");
            })
        listUsers = [];
        for(var i = 0; i < result.length; i++)
        {
            listUsers.push(result[i]);
        }
        this.props.getEmployee(listUsers);
        if(listUsers.length > 0)
        {
            this.genID = parseInt(listUsers[listUsers.length - 1]._id.employeeID) + 1;
            console.log(this.genID);
        }
        this.setState({change: !this.state.change});
    }

    isGreater(dateString1, dateString2){
        return (new Date(dateString1).getTime() - new Date(dateString2).getTime()) > 0;
    }

    calculateOld(dateString1, dateString2)
    {
        return (new Date(dateString1).getYear() - new Date(dateString2).getYear());
    }

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

    checkConstraint() {
        // Constraint 1: ID trống hoặc bị trùng
        var id  = document.querySelector('input[name="ID"]').value;
        if( id.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Can't let the id blanked","warning");
            return false;
        }
        for(var i = 0; i < this.props.listEmployee.employees.length ; i++)
        {
            if(this.props.listEmployee.employees[i]._id.employeeID == id)
            {
                this.props.hideAlert();
			    this.props.showAlert("ID duplicated","warning");
                return false;
            }
        }
        // Trùng ID sa thải
        for(var i = 0; i < this.props.listSackedEmployee.employees.length ; i++)
        {
            if(this.props.listSackedEmployee.employees[i]._id.employeeID == id)
            {
                this.props.hideAlert();
			    this.props.showAlert("ID duplicated","warning");
                return false;
            }
        }

        //Constraint 2: Password không được có dưới 6 ký tự
        var password = document.querySelector('input[name="password"]').value.trim();
        if(password.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Password can't be left blanked","warning");
            return false;
        }
        if(password.length < 6)
        {
            this.props.hideAlert();
			this.props.showAlert("Password can't be less than 6 character","warning");
            return false;
        }
        // Constraint 3: FirstName không được trống
        var firstName =  document.querySelector('input[name="firstName"]').value.trim();
        if(firstName.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("The firstname can't be left blanked","warning");
            return false;
        }
        // Constraint 4: lastName không được trống
        var lastName =  document.querySelector('input[name="lastName"]').value.trim();
        if(lastName.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("The lastname can't be left blanked","warning");
            return false;
        }
        // Constraint 5: Số ID card không được để trống
        var cardID= document.querySelector('input[name="cardID"]').value.trim();
        if(cardID.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("ID card can't be left blanked","warning");
            return false;
        }
        // Constrain 6:Số điện thoại không được để trống và phải lớn hơn 6 ký tự
        var phoneNumber= document.querySelector('input[name="phoneNumber"]').value;
        if(phoneNumber.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Phonenumber can't be left blanked","warning");
            return false;
        }
        if(phoneNumber.length < 6)
        {
            this.props.hideAlert();
			this.props.showAlert("Phonenumber can't be less than 6 character","warning");
            return false;
        }
        // Constrain 7:Địa chỉ không được để trống
        var address = document.querySelector('input[name="adress"]').value;
        if(address.length==0)
        {
            this.props.hideAlert();
			this.props.showAlert("Address can't be left blanked","warning");
            return false;
        }
        // Constraint 8: Ngày sinh không được để trống
        var birthDay = document.querySelector('input[name="birthDay"]').value;
        if(birthDay.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Birthday can't be left blanked","warning");
            return false;
        }
        // Constraint 9: Email không được để trống
        var email = document.querySelector('input[name="email"]').value.trim();
        if(email.length == 0)
        {
            this.props.hideAlert();
			this.props.showAlert("Email can't be left blanked","warning");
            return false;
        }
        if(email.indexOf('@')==-1 || email.indexOf('@')==email.length-1)
        {
            this.props.hideAlert();
			this.props.showAlert("Email is invalid","warning");
            return false;
        }
        // Constraint 10: Ngày sinh không thể lớn hơn ngày bất đầu làm
        var startDate = document.querySelector('input[name="startDate"]').value;
        if(!this.isGreater(startDate, birthDay))
        {
            this.props.hideAlert();
			this.props.showAlert("Birthday can't be greater than the startday","warning");
            return false;
        }
        // Constraint 11: Check đã up ảnh xong chưa
        if(this.finishUpImage == false)
        {
            this.props.hideAlert();
			this.props.showAlert("The picture is not uploaded yet","warning");
            return false;
        }
        // Constraint 12: Check tuổi với cái regulation:
        if(this.props.regulation != {})
        {
            if(this.calculateOld(startDate, birthDay) < this.props.regulation.miniumEmployeeAge)
            {
                console.log("Tính tuổi",this.calculateOld(startDate, birthDay));
                this.props.hideAlert();
			    this.props.showAlert("Employee is not old enough ("+ this.props.regulation.miniumEmployeeAge+")","warning");
                return false;
            }
        }
        return true;
    }
    // Thêm nhân viên
    async addEmployeeToDatabase()
    {
        var isAddOK = true;
        const data = {
            token: localStorage.getItem('token'),
            employee: {
                _id: {
                    employeeID: document.querySelector('input[name="ID"]').value,
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
                // endDate: "2021-11-31T00:00:00.000Z",
                imgUrl: this.imgUrl,
            }   
        }
        console.log(data);
        await axios.post(`http://localhost:5000/api/employee`, data)
            .then(res => {
                console.log("Save success");
                this.props.hideAlert();
				this.props.showAlert("Add employee success","success");
            })
            .catch(err => {
                this.props.hideAlert();
				this.props.showAlert(err.response.data.message,"warning");
                isAddOK = false;
            })
        // Thêm vào redux
        if(isAddOK)
        {
            this.props.addEmployee(data.employee);
            this.props.changeAddEmployeeStatus();
        }
            
        
    }

    cancel = () => {
        this.props.changeAddEmployeeStatus();
    }

    addEmployee = () => {
        if(this.checkConstraint()==false) return;
        this.addEmployeeToDatabase();
        
    }
    render() {
        return (
            <form style={{ zIndex: '10', width: '60%', justifyContent: 'center', marginTop: '80px'}} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: !this.props.statusDarkmode? '#0091ea' :'white', backgroundColor: !this.props.statusDarkmode? '#efeeef' :'#455a64'}} title="ADD EMPLOYEE" />
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
                                            name='ID'
                                            style = {{width: '70%'}} 
                                            fullWidth 
                                            size="small" 
                                            variant="outlined"  
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
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Start Date</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="date"
                                            name="startDate"
                                            defaultValue={this.getCurrentDateTime()}
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
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
                                        />
                                    </Grid>
                                    <Grid item sm={12} md={12} >
                                        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                                            <Button variant="contained" style={{margin: 12}} onClick={() => this.addEmployee()}>
                                                Add
                                            </Button>
                                        </div>
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
        infoUser: state.infoUser,
        listEmployee: state.listEmployee,
        listSackedEmployee: state.listSackedEmployee,
        regulation: state.regulationReducer,
        statusDarkmode: state.statusDarkmode,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddEmployeeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_EMPLOYEE_STATUS",
            });
        },
        getEmployee: (data) => {
            dispatch({
                type: "GET_EMPLOYEE",
                employees: data,
            });
        },
        addEmployee: (data) => {
            dispatch({
                type: "ADD_EMPLOYEE",
                employees: data,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddEmployeeModal);

               