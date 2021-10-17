import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import { Container, Grid } from '@mui/material';
import { ComponentToPrint } from './ComponentToPrint';
import '../../CSS/SellProduct.css'
import Tabs from './Tabs'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

class SellProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
        }
    }


    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        })
    };

    bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    render() {
        return (
            <div className="sell-product" style={{}}>

                <Container maxWidth="xl">
                    <Grid container spacing={2}>
                        <Grid item md={8} sm={4}  >
                            <div style={{ marginTop: '20px', backgroundColor: 'beige', height: 'calc(100vh - 40px)', overflow: 'scroll', overflowX: 'hidden' }}>
                                <div style={{ overflow: 'hidden' }}>
                                    <Tabs></Tabs>
                                </div>
                                <Container maxWidth="xl">
                                    <Grid container spacing={2}>
                                        <Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                        <Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                        <Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                        <Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                        <Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid><Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid><Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid><Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid><Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid><Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid><Grid item md={3} sm={3}>
                                            <Card>
                                                <CardContent>
                                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                                        Word of the Day
                                                    </Typography>
                                                    <Typography variant="h5" component="div">
                                                        be{this.bull}nev{this.bull}o{this.bull}lent
                                                    </Typography>
                                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                        adjective
                                                    </Typography>
                                                    <Typography variant="body2">
                                                        well meaning and kindly.
                                                        <br />
                                                        {'"a benevolent smile"'}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small">Learn More</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    </Grid>
                                </Container>
                            </div>
                        </Grid>
                        <Grid item md={4} sm={4} >
                            <div style={{ marginTop: '20px', backgroundColor: 'beige', height: 'calc(100vh - 40px)', overflow: 'hidden', overflowX: 'hidden' }}>
                                <ReactToPrint
                                    trigger={() => {
                                        return <a href="#">Print this out!</a>;
                                    }}
                                    content={() => this.componentRef}
                                />
                                <div style={{ display: 'none' }}>
                                    <ComponentToPrint ref={el => (this.componentRef = el)} />
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

export default SellProduct;