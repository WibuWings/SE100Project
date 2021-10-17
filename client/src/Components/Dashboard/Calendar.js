import * as React from 'react';
import TextField from '@mui/material/TextField';
import StaticDateRangePicker from '@mui/lab/StaticDateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';

export default function StaticDateRangePickerDemo() {
    const [value, setValue] = React.useState([new Date(2021, 2, 2), new Date(2021, 2, 5)]);
    const [date, setDate] = React.useState(new Date(2021, 4, 2))

    const value1 = [
        { date: '2021/01/11', count:2 },
        { date: '2021/04/12', count:2 },
        { date: '2021/05/01', count:5 },
        { date: '2021/05/02', count:5 },
        { date: '2021/05/03', count:1 },
        { date: '2021/05/04', count:11 },
        { date: '2021/05/08', count:32 },
      ];

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDateRangePicker
                displayStaticWrapperAs="desktop"
                value={value}
                onChange={(date) => {
                    setDate(date);
                }}
                renderInput={(startProps, endProps) => (
                    <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 2 }}> to </Box>
                        <TextField {...endProps} />
                    </React.Fragment>
                )}
                calendars={4}
                disableAutoMonthSwitching={true}
            />
        </LocalizationProvider>
    );
}
