import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Image } from 'cloudinary-react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { makeStyles } from '@material-ui/styles';
import GoodImage from './goodExample.jpg';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(theme => ({
    goodTable_Cell:{
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid'
    }
}));

function GoodRow(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
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
                                {  
                                    row.imgLink == "none"
                                    ? <div style={{width: '100px', height: '100px', objectFit:'cover'}}><img src={GoodImage} style={{width: '100px', height: '100px', objectFit:'cover'}}/></div>
                                    
                                    : <div style={{width: '100px', height: '100px', objectFit:'cover'}}><Image style={{width: '100px', height: '100px', objectFit:'cover'}} cloudName="databaseimg" publicId={row.imgLink}>{row.imgLink}</Image></div>
                                }
                                
                                
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.goodTable_Cell}>Expired Day</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>Original Price</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>Good Remain</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>Product Type</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>Unit</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className={classes.goodTable_Cell} component="th" scope="row">
                                                {row.hidden.expires}
                                            </TableCell>
                                            <TableCell className={classes.goodTable_Cell}>{row.hidden.originalPrice}</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>{row.hidden.remaining}</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>{row.hidden.productType}</TableCell>
                                            <TableCell className={classes.goodTable_Cell}>{row.hidden.unit}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <div className="button-container">
                                    <Button 
                                        onClick={() => {
                                            // Truyền cái data vào trong hàm đây luôn
                                            dispatch({type: "UPDATE_GOOD_DATA", 
                                                _id: {
                                                    productID: row.id,
                                                    importDate: row.importTime,
                                                },
                                                name: row.name,
                                                imgUrl: row.imgLink,
                                                quantity: row.quantity,
                                                remain: row.quantity,
                                                unit: row.unit,
                                                importPrice: row.hidden.originalPrice,
                                                sellPrice: row.sellPrice,
                                                expires: row.hidden.expires,  
                                                unit: row.hidden.unit
                                            });
                                            console.log("Truyen link", row.imgLink);
                                            dispatch({ type: "CHANGE_UPDATE_GOOD_STATUS", });
                                        }}
                                        variant="contained"
                                    >
                                        Update
                                    </Button>
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
export default GoodRow;