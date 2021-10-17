import React from 'react';
import {Card,CardHeader,Divider,CardContent,Grid,TextField,Box,Button} from '@mui/material';
import {BiPlusMedical} from 'react-icons/bi'
import { GiCancel } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux';

function ModalConfirmPassword(props) {

    const statusConfirmPassword = useSelector(state => state.statusConfirmPassword)
    const dispatch = useDispatch();

    const handleCancel = () => {
        dispatch({
            type:"CHANGE_MODAL_CONFIRM_PASSWORD_STATUS",
        })
    }

    return (
        <Card className="card-confirm-password" style={{ minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }}>
            <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Confirm password" />
            <Divider />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            fullWidth
                            label="Your password"
                            required
                            type="password"
                        />
                    </Grid>
                </Grid>
            </CardContent>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                <Button style={{ backgroundColor: 'yellowgreen' }} variant="contained" startIcon={<BiPlusMedical />}>
                    Xác nhận
                </Button>
                <Button style={{ backgroundColor: 'red' }} onClick={() => handleCancel()} variant="contained" startIcon={<GiCancel />}>
                    Hủy
                </Button>
            </Box>
        </Card>
    );
}

export default ModalConfirmPassword;