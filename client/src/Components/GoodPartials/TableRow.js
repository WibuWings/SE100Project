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
import axios from 'axios';

const useStyles = makeStyles(theme => ({
    goodTable_Cell:{
        borderWidth: '1px',
        borderColor: '#ccc',
        borderStyle: 'solid',
        height: 4
    }
}));



function GoodRow(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const dispatch = useDispatch();
    const deleteProduct = async () =>
    {
        // Xoá sản phẩm
        const data = {
            token: localStorage.getItem('token'),
            products:
            [
                {
                    productID: row.id,
                    importDate: row.importTime,
                    storeID: row.storeID,
                }
            ]
            
        }
        axios.delete(`http://localhost:5000/api/product`,{data: data})
            .then(res => {
                alert("delete product success");
            })
            .catch(err => {
                alert(err);
            })
        
        // Get hết các cái join của sản phẩm
        var allJoinMatch = [];
        const data1 = {
            token: localStorage.getItem('token'),
            filter: {
                "_id.storeID": row.storeID,
                "_id.productID": row.id,
            }   
        }
        await axios.get(`http://localhost:5000/api/product/join`, 
        {
            params: {...data1}
        })
            .then(res => {
                allJoinMatch = res.data.data;
            })
            .catch(err => {
                console.log(err);
                alert(err);
            })
        console.log(allJoinMatch);
        // Xoá các join liên quan đến sản phẩm
        var allProductJoin = [];
        for(var i = 0 ; i < allJoinMatch.length; i++)
        {
            allProductJoin.push({
                productID: row.id,
                typeID: allJoinMatch[i]._id.typeID,
                importDate: allJoinMatch[i]._id.importDate,
                storeID: row.storeID,
            });
        }
        const dataJoin = {
            token: localStorage.getItem('token'),
            productJoinTypes: allProductJoin,      
        }

        console.log(dataJoin);

        await axios.delete(`http://localhost:5000/api/product/join`,{data: dataJoin})
            .then(res => {
                console.log("delete join success");
            })
            .catch(err => {
                alert(err);
            })

        // Tạm thời
        // window.location.reload();
    }
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell className={classes.goodTable_Cell} component="th" scope="row">{row.index}</TableCell>
                <TableCell className={classes.goodTable_Cell} component="th" scope="row">{row.id}</TableCell>
                <TableCell className={classes.goodTable_Cell} component="th" scope="row">{row.name}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">{row.quantity}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">{row.sellPrice}</TableCell>
                <TableCell className={classes.goodTable_Cell} align="right">
                    {/* {row.importTime == null ? '' : row.importTime.substring(0,row.importTime.indexOf('T'))} */}
                    {row.importTime == null ? '': row.importTime.substring(0,row.importTime.indexOf('T'))}
                </TableCell>
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
                                
                                
                                <Table>
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
                                                {/* {row.hidden.expires == null ? '': row.hidden.expires.substring(0,row.hidden.expires.indexOf('T'))} */}
                                                {row.hidden.expires == null ? '': row.hidden.expires.substring(0,row.hidden.expires.indexOf('T'))}
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
                                            dispatch({ type: "CHANGE_UPDATE_GOOD_STATUS", });
                                        }}
                                        variant="contained"
                                    >
                                        Update
                                    </Button>
                                    <Button 
                                        variant="contained"
                                        onClick={deleteProduct}
                                    >
                                        Delete
                                        
                                    </Button>
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