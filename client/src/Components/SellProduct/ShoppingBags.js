import { React } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
function ShoppingBags(props) {
    const shoppingBags = useSelector(state => state.shoppingBags)
    const dispatch = useDispatch();
    const regulation = useSelector(state => state.regulationReducer)

    function raiseQuantity(name, currentQuantity, maxQuantity) {
        if (currentQuantity < maxQuantity) {
            dispatch({
                type: "RAISE_QUANTITY_SHOPPING_BAGS",
                name: name,
            })
        }
    }

    function reduceQuantity(name, quantity) {
        if (quantity > 1) {
            dispatch({
                type: "REDUCE_QUANTITY_SHOPPING_BAGS",
                name: name,
            })
        }
    }

    function deleteProduct(name) {
        dispatch({
            type: "DELETE_PRODUCT_SHOPPING_BAGS",
            name: name,
        })
    }

    return (
        <div style={{ width: '100%' }}>
            {
                (shoppingBags.length === 0) ?
                    (<div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '100px' }}>
                        <h3>Empty cart</h3>
                    </div>) : shoppingBags.map((value, key) => (
                        <Grid item className="customize-list-table" style={{ backgroundColor: 'white', alignContent: 'center', justifyContent: 'center', paddingTop: '5px', paddingBottom: '5px' }} md={12} sm={12}>
                            <Grid style={{ textAlign: 'center', alignItems: 'center', justifyItems: 'center' }} container spacing={0}>
                                <Grid item md={1} sm={1}>
                                    {key + 1}
                                </Grid>
                                <Grid item md={1} sm={1}>
                                    <IconButton onClick={() => deleteProduct(value.product.name)} aria-label="delete" size="small">
                                        <DeleteIcon style={{ color: 'red' }} />
                                    </IconButton>
                                </Grid>
                                <Grid style={{ fontSize: '0.8rem', overflow: 'hidden' }} item md={4} sm={4}>
                                    {value.product.name}
                                </Grid>
                                <Grid item md={3} sm={3}>
                                    <IconButton onClick={() => reduceQuantity(value.product.name, value.quantity)} aria-label="delete" size="small">
                                        <FiChevronLeft></FiChevronLeft>
                                    </IconButton>
                                    <input style={{ width: '35%', textAlign: 'center' }} value={value.quantity} type="text" />
                                    <IconButton onClick={() => raiseQuantity(value.product.name, value.quantity, value.product.quantity)} aria-label="delete" size="small">
                                        <FiChevronRight></FiChevronRight>
                                    </IconButton>
                                </Grid>
                                <Grid style={{ fontWeight: '700' }} item md={3} sm={3}>
                                    {regulation.currency === 'vnd' ? (value.product.sellPrice * value.quantity).toLocaleString() : ((value.product.sellPrice * value.quantity) / regulation.exchangeRate).toFixed(2).toLocaleString()}
                                </Grid>
                            </Grid>
                        </Grid>
                    ))
            }
        </div>
    );
}

export default ShoppingBags;