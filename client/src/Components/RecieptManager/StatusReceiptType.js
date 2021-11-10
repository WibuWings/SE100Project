import React from 'react';
import {  Grid, Card, CardHeader, Divider, CardContent, Checkbox } from '@mui/material';
import { red, yellow, green } from '@mui/material/colors';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useSelector , useDispatch} from 'react-redux'

function StatusReceiptType(props) {
    const dispatch = useDispatch()

    const changeCheckbox = (e) => {
        if (e.target.checked) {
            dispatch({
                type: "ADD_NEW_TYPE_RECIEPT",
                typeReciept: e.target.value,
            })
        } else {
            dispatch({
                type: "DELETE_TYPE_RECIEPT",
                typeReciept: e.target.value,
            })
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item md={12} sm={12}  >
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Status" />
                    <Divider></Divider>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={12} sm={12}  >
                                <FormControlLabel
                                    value="success"
                                    onChange={(e) => changeCheckbox(e)}
                                    control={<Checkbox
                                        sx={{
                                            color: green[800],
                                            '&.Mui-checked': {
                                                color: green[600],
                                            },
                                        }} />}
                                    label="Thành công"
                                    labelPlacement="end"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={12} sm={12}  >
                                <FormControlLabel
                                    value="return"
                                    onChange={(e) => changeCheckbox(e)}
                                    control={<Checkbox
                                        sx={{
                                            color: yellow[800],
                                            '&.Mui-checked': {
                                                color: yellow[600],
                                            },
                                        }} />}
                                    label="Đổi trả"
                                    labelPlacement="end"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item md={12} sm={12}  >
                                <FormControlLabel
                                    value="delete"
                                    onChange={(e) => changeCheckbox(e)}
                                    control={<Checkbox
                                        sx={{
                                            color: red[800],
                                            '&.Mui-checked': {
                                                color: red[600],
                                            },
                                        }} />}
                                    label="Đã xóa"
                                    labelPlacement="end"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default StatusReceiptType;