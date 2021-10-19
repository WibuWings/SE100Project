import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector , useDispatch} from 'react-redux';
import { BiAddToQueue } from 'react-icons/bi';

export default function IconLabelTabs() {
    const [value, setValue] = React.useState(0);
    const typeProduct = useSelector(state => state.typeProduct)
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
        var index;
        if ( newValue === 0 ) {
            index = 'all'
        } else {
            typeProduct.map((value ,key) => {
                 if (key === newValue - 1) {
                    index = value.type
                   
                }
            })
        }

        dispatch({
            type: "UPDATE_TYPE_CHOOSE",
            typeProduct: index,
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
            {typeProduct.map(value => (
                <Tab  label={value.name} />
            ))}
        </Tabs>
    );
}
