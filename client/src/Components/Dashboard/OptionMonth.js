import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { BiCaretDown } from 'react-icons/bi'
import { useDispatch } from 'react-redux';

const options = [
    {
        month: 'All',
        value: 0,
    },
    {
        month: 'Jan',
        value: 1,
    },
    {
        month: 'Feb',
        value: 2,
    },
    {
        month: 'Mar',
        value: 3,
    },
    {
        month: 'Apr',
        value: 4,
    },
    {
        month: 'May',
        value: 5,
    },
    {
        month: 'Jun',
        value: 6,
    },
    {
        month: 'Jul',
        value: 7,
    },
    {
        month: 'Aug',
        value: 8,
    },
    {
        month: 'Sep',
        value: 9,
    },
    {
        month: 'Oct',
        value: 10,
    },
    {
        month: 'Nov',
        value: 11,
    },
    {
        month: 'Dec',
        value: 12,
    }
];



export default function OptionMonth() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const dispatch = useDispatch()
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleClick = () => {
        console.info(`You clicked ${options[selectedIndex]}`);
    };

    const handleMenuItemClick = (event, index, option) => {
        dispatch({
            type: "MONTH_SELECT_DASHBOARD",
            typeDashboard: option,
          })
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    React.useEffect(() => {
        dispatch({
            type: "RESET_MONTH_SELECT_DASHBOARD"
        })
    }, [])

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick}>{options[selectedIndex].month}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <BiCaretDown />
                </Button>
            </ButtonGroup>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((item, index) => (
                                        <MenuItem
                                            key={item.value}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index, item.value)}
                                        >
                                            {item.month}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}
