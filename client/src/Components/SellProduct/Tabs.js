import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector , useDispatch} from 'react-redux';

export default function IconLabelTabs() {
    const [value, setValue] = React.useState(0);
    const typeProduct = useSelector(state => state.typeProduct)
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        var index;
        if (newValue === 0) {
            index = 'all'
        } else {
            typeProduct.map((value ,key) => {
                 if (key === newValue - 1) {
                    index = value._id.typeID
                }
                return true;
            })
        }
            dispatch({
            type: "UPDATE_TYPE_CHOOSE",
            typeProductID: index,
        })
    };
    return (
        <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
        >
            <Tab  label="Tất cả" />
            {typeProduct 
                ?typeProduct.map(value => (
                    <Tab  label={value.name} />))
                :(null)
            }
        </Tabs>
    );
}
