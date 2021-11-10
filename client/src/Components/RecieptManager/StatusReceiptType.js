import React from 'react';
import { Container, Grid, Button, Card, CardHeader, Divider, CardContent, Checkbox } from '@mui/material';
import { pink } from '@mui/material/colors';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function StatusReceiptType(props) {
    return (
        <Grid container spacing={2}>
            <Grid item md={12} sm={12}  >
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Status" />
                    <Divider></Divider>
                    <CardContent>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox
                                defaultChecked
                                label="Thành công"
                                sx={{
                                    color: pink[800],
                                    '&.Mui-checked': {
                                        color: pink[600],
                                    },
                                }} />}
                            label="End"
                            labelPlacement="end"
                        />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default StatusReceiptType;