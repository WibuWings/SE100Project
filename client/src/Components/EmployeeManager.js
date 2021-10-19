import React, { Component } from 'react';
import Page from './EmployeePartials/Page';
import Label from './EmployeePartials/Label';
import Scrollbar from './EmployeePartials/Scrollbar';
import SearchNotFound from './EmployeePartials/SearchNotFound';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import plusFill from '@iconify/icons-eva/plus-fill';
import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
import EmployeeToolbar from './EmployeePartials/EmployeeToolbar';
import EmployeeMoreMenu from './EmployeePartials/EmployeeMoreMenu';
import EmployeeTableHeader from './EmployeePartials/EmployeeTableHeader';
import USERLIST from './EmployeePartials/fakeData'

const TABLE_HEAD = [
    { id: 'ID', label: 'ID', alignRight: false },
    { id: 'firstName', label: 'Name', alignRight: false },
    { id: 'lastName', label: 'Last Name', alignRight: false },
    { id: 'old', label: 'Old', alignRight: false },
    { id: 'gender', label: 'Gender', alignRight: false },
    { id: 'province', label: 'Province', alignRight: false },
    { id: 'phoneNumber', label: 'Phone', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'adress', label: 'Adress', alignRight: false },
    { id: '' }
];

var selected = [];
var filterName = "";
var filteredUsers = USERLIST;
var page = 5;
var rowsPerPage = 5;
class EmployeeManager extends Component {
    handleFilterByName(event){
        filterName = event.target.value;
    }
    render() {
        return (
            <div
                style={{height:'800px', overflowY: 'auto'}}
            >
                <Container
                    style={{marginTop: 60}}
                >
                    <Button
                        variant='contained'
                        startIcon={<Icon icon={plusFill} />}
                    >
                        New User
                    </Button>

                    <Card>
                    {/* <EmployeeToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        // onFilterName={this.handleFilterByName(event)}
                    /> */}
                    <TableContainer>
                        <Table>
                            <EmployeeTableHeader
                                // order={order}
                                // orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={USERLIST.length}
                                numSelected={selected.length}
                                // onRequestSort={handleRequestSort}
                                // onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody
                                style={{height: '400px', width: '100%'}}
                            >
                            {
                                filteredUsers
                                .map((row) => {
                                    
                                const { id, firstName, lastName, gender, province,email, adress, old, phone, avatarUrl, isVerified } = row;
                                const isItemSelected = selected.indexOf(firstName) !== -1;

                                return (
                                    <TableRow
                                        hover
                                        key={id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        // selected={isItemSelected}
                                        // aria-checked={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                            checked={isItemSelected}
                                            // onChange={(event) => handleClick(event, name)}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{id}</TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar alt={firstName} src={avatarUrl} />
                                            <Typography variant="subtitle2" noWrap>
                                                {firstName}
                                            </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="left">{lastName}</TableCell>  
                                        <TableCell align="left">{old}</TableCell>
                                        <TableCell align="left">{gender}</TableCell>
                                        <TableCell align="left">{province}</TableCell>
                                        <TableCell align="left">{phone}</TableCell>
                                        <TableCell align="left">{email}</TableCell>
                                        <TableCell align="left">{adress}</TableCell>
                                        <TableCell align="right">
                                            <EmployeeMoreMenu />
                                        </TableCell>
                                    </TableRow>
                                );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={USERLIST.length}
                        // rowsPerPage={rowsPerPage}
                        // page={page}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </Card>
                </Container>
                <Container
                    style={{marginTop: 60}}
                    style={{
                        marginBottom: 220
                    }}
                >
                    <Card>
                    {/* <EmployeeToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        // onFilterName={this.handleFilterByName(event)}
                    /> */}
                    <TableContainer>
                    <Table>
                        <EmployeeTableHeader
                            // order={order}
                            // orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            // rowCount={USERLIST.length}
                            // numSelected={selected.length}
                            // onRequestSort={handleRequestSort}
                            // onSelectAllClick={handleSelectAllClick}
                        />
                        <TableBody
                            style={{height: '400px'}}
                        >
                        {
                                filteredUsers
                                .map((row) => {
                                    
                                const { id, firstName, lastName, gender, province,email, adress, old, phone, avatarUrl, isVerified } = row;
                                const isItemSelected = selected.indexOf(firstName) !== -1;

                                return (
                                    <TableRow
                                        hover
                                        key={id}
                                        tabIndex={-1}
                                        role="checkbox"
                                        // selected={isItemSelected}
                                        // aria-checked={isItemSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                            checked={isItemSelected}
                                            // onChange={(event) => handleClick(event, name)}
                                            />
                                        </TableCell>
                                        <TableCell align="left">{id}</TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            <Stack direction="row" alignItems="center" spacing={2}>
                                            <Avatar alt={firstName} src={avatarUrl} />
                                            <Typography variant="subtitle2" noWrap>
                                                {firstName}
                                            </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="left">{lastName}</TableCell>  
                                        <TableCell align="left">{old}</TableCell>
                                        <TableCell align="left">{gender}</TableCell>
                                        <TableCell align="left">{province}</TableCell>
                                        <TableCell align="left">{phone}</TableCell>
                                        <TableCell align="left">{email}</TableCell>
                                        <TableCell align="left">{adress}</TableCell>
                                        <TableCell align="right">
                                            <EmployeeMoreMenu />
                                        </TableCell>
                                    </TableRow>
                                );
                                })}
                        </TableBody>
                    </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={USERLIST.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        // onPageChange={handleChangePage}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
                        
                    />
                    </Card>
                </Container>
            </div>
            
        );
    }
}

export default EmployeeManager;