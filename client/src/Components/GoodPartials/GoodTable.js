import * as React from 'react';
import { Component } from 'react';
// import Image from "material-ui-image";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/styles';
import { height } from '@mui/system';
import GoodImage from './goodExample.jpg';



function createData(index, id, name, quantity, originalPrice, sellPrice, importTime, productType) {
    return {
        index,
        id,
        name,
        quantity,
        sellPrice,
        importTime,
        hidden: [
            {
                date: '2020-01-05',
                remaining: 100,
                originalPrice: originalPrice,
                productType: productType,
            }
        ],
    };
}

const useStyles = makeStyles(theme => ({
    goodTable_Cell:{
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid'
    }
}));

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell className={classes.goodTable_Cell} component="th" scope="row">{row.index}</TableCell>
                <TableCell className={classes.goodTable_Cell} component="th" scope="row">{row.id}</TableCell>
                <TableCell className={classes.goodTable_Cell} component="th" scope="row">{row.name}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">{row.quantity}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">{row.sellPrice}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">{row.importTime}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? (<KeyboardArrowUpIcon />) : (<KeyboardArrowDownIcon />)}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell className={classes.goodTable_Cell} style={{ padding: 0}} colSpan={8}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Other information
                            </Typography>
                            <div style={{display: 'flex'}}>
                                <img src={GoodImage} style={{width: '100px', height: '100px', objectFit:'cover'}}/>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.goodTable_Cell}>Expired Day</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>Original Price</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>Good Remain</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>Product Type</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.hidden.map((hiddenRow) => (
                                            <TableRow key={hiddenRow.date}>
                                                <TableCell className={classes.goodTable_Cell} component="th" scope="row">
                                                    {hiddenRow.date}
                                                </TableCell>
                                                <TableCell className={classes.goodTable_Cell}>{hiddenRow.originalPrice}</TableCell>
                                                <TableCell className={classes.goodTable_Cell}>{hiddenRow.remaining}</TableCell>
                                                <TableCell className={classes.goodTable_Cell}>{hiddenRow.productType}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div className="button-contianer">
                                    <Button variant="contained">Update</Button>
                                    <Button variant="contained">Delete</Button>
                                </div>
                                
                            </div>
                            
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}


const rows = [
    createData(1,10001,'Frozen yoghurt', 159, 20, 24, '1/1/2021','food'),
    createData(2,10002,'Ice cream sandwich', 237, 27, 37, '2/2/2021', 'food'),
    createData(3,10003,'Eclair', 262, 16, 24, '3/3/2021', 'food'),
    createData(4,10004,'Cupcake', 305, 47, 67, '4/4/2021', 'cuisine'),
    createData(5,10005,'Gingerbread', 356, 26, 49, '31/1/2021', 'cuisine'),
    createData(1,10001,'Frozen yoghurt', 159, 20, 24, '1/1/2021','cuisine'),
    createData(2,10002,'Ice cream sandwich', 237, 27, 37, '2/2/2021', 'food'),
    createData(3,10003,'Eclair', 262, 16, 24, '3/3/2021', 'food'),
    createData(4,10004,'Cupcake', 305, 47, 67, '4/4/2021', 'detergent'),
    createData(5,10005,'Gingerbread', 356, 26, 49, '31/1/2021', 'detergent'),
    createData(1,10001,'Frozen yoghurt', 159, 20, 24, '1/1/2021','detergent'),
    createData(2,10002,'Ice cream sandwich', 237, 27, 37, '2/2/2021', 'food'),
    createData(3,10003,'Eclair', 262, 16, 24, '3/3/2021', 'food'),
    createData(4,10004,'Cupcake', 305, 47, 67, '4/4/2021', 'food'),
    createData(5,10005,'Gingerbread', 356, 26, 49, '31/1/2021', 'food'),
];
const styles = theme =>  ({
    goodTable: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid'
    },
    goodTable_Cell: {                                     
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid',
        height: '40px',
    } 
})
class GoodTable extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className={classes.goodTable} aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell className={classes.goodTable_Cell} align="center">Index</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">ID</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">GoodName</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">Quantity</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">Sell Price</TableCell>
                                <TableCell className={classes.goodTable_Cell} align="center">ImportTime</TableCell>
                                <TableCell className={classes.goodTable_Cell}/>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(GoodTable);
