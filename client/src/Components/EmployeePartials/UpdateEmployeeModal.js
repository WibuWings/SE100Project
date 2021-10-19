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
import { withStyles } from '@material-ui/styles';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
import { AiFillPlusCircle} from "react-icons/ai";
import CancelIcon from '@mui/icons-material/Cancel';

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

class UpdateEmployeeModal extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            goodID : "",
            change: false,
            imageSelect: "null",
            type:'none',
            url: 'http://res.cloudinary.com/databaseimg/image/upload/v1634117795/ubvxisehhpvnu2lbqmeg.png',
        }; 
    }
    

    cancel = () => {
        this.props.changeAddEmployeeStatus();
    }

    addEmployee = () => {
        this.props.changeAddEmployeeStatus();
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
                                            readOnly={true}
                                            disabled={true}
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>First Name</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            // class="input-val" 
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
                                            // class="input-val" 
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
                                            type="text" 
                                            // class="input-val" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label" style={{width: '114px'}}>Old</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            // class="input-val" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Gender</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            // class="input-val" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={6} 
                                        className='input-item'
                                    >
                                        <div className="input-label"style={{width: '114px'}}>Province</div>
                                        <StyledTextField
                                            classname='input-box'   
                                            type="text" 
                                            // class="input-val" 
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
                                            type="text" 
                                            // class="input-val" 
                                            style = {{width: '100%'}} 
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
                                            // class="input-val" 
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
                                            type="text" 
                                            // class="input-val" 
                                            style = {{width: '70%'}} 
                                            fullWidth
                                            size="small"
                                            variant="outlined"
                                        />
                                    </Grid>
                                    <Grid item md={9}></Grid>
                                    <Grid item md={3}
                                        className='input-item'
                                    >
                                        <Button variant="contained" onClick={() => this.props.changeUpdateEmployeeStatus()}>
                                            UPDATE employee
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmployeeModal);

               