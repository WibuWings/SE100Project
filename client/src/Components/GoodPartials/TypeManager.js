import React from 'react';
import { Grid, Card, CardHeader, Divider, CardContent } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { IoIosAdd } from "react-icons/io";
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
function TypeManager(props) {
    const dispatch = useDispatch()
    const darkmode = useSelector(state => state.statusDarkmode)

    const handleEditType = () => {
        dispatch({
            type: "CHANGE_EDIT_TYPE_STATUS",
        });
    }

    const handleAdd = () => {
        dispatch({
            type: "SET_ADD_TYPE_STATUS",
        });
        dispatch({
            type: "CHANGE_ADD_TYPE_STATUS",
        });
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={12} sm={12}  >
                <Card>
                    <CardHeader style={{ height: 56, color: !darkmode ? '#0091ea' :'white', backgroundColor: !darkmode ? '#efeeef' :'#455a64'}} title="Type Manager" />
                    <Divider></Divider>
                    <CardContent>
                        <Grid container spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <Grid item md={6} sm={12}>
                                    <Button style={{ backgroundColor: 'yellowgreen', width:'100%' }} onClick={() => handleAdd()} variant="contained">
                                        <BiPlusMedical color={'white'} size={16} style={{marginRight: 4}}/>
                                        add type
                                    </Button>
                                </Grid>
                                <Grid item md={6} sm={12}>
                                    <Button style={{ backgroundColor: 'yellowgreen', width:'100%' }} onClick={() => handleEditType()} variant="contained">
                                        All types
                                    </Button>
                                </Grid>
                            </LocalizationProvider>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default TypeManager;