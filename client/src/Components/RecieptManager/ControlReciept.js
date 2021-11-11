import React from 'react';
import { Grid, Card, CardHeader, Divider, CardContent, Checkbox, Button } from '@mui/material';
import { red, blue } from '@mui/material/colors';
import { CgDanger } from 'react-icons/cg'
import { useSelector, useDispatch } from 'react-redux'

function ControlReciept(props) {
    const dispatch = useDispatch()


    React.useEffect(() => {
       
    })

    return (
        <Grid container spacing={2}>
            <Grid item md={12} sm={12}  >
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="Control" />
                    <Divider></Divider>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item md={12} sm={12}  >
                                <Button style={{ width: '100%', backgroundColor: blue[600], color: 'white' }} size='medium'>Select All</Button>
                            </Grid>
                            <Grid item md={12} sm={12}  >
                                <Button style={{ width: '100%', backgroundColor: red[400], color: 'white' }} size='medium'>
                                    <CgDanger style={{ fontSize: '1.6rem', paddingRight: '5px' }}></CgDanger>
                                    Delete Selected
                                </Button>
                            </Grid>
                            <Grid item md={12} sm={12}  >
                                <Button style={{ width: '100%', backgroundColor: red[400], color: 'white' }} size='medium'>
                                    <CgDanger style={{ fontSize: '1.6rem', paddingRight: '5px' }}></CgDanger>
                                    Delete deleted invoice
                                </Button>
                            </Grid>
                            <Grid item md={12} sm={12}  >
                                <Button style={{ width: '100%', backgroundColor: red[600], color: 'white' }} size='medium'>
                                    <CgDanger style={{ fontSize: '1.6rem', paddingRight: '5px' }}></CgDanger>
                                    Delete All
                                </Button>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default ControlReciept;