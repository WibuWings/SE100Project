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
import EmployeeTableHeader from './EmployeePartials/EmployeeTableHeader';
import USERLIST from './EmployeePartials/fakeData'

const TABLE_HEAD = [
{ id: 'name', label: 'Name', alignRight: false },
{ id: 'company', label: 'Company', alignRight: false },
{ id: 'role', label: 'Role', alignRight: false },
{ id: 'isVerified', label: 'Verified', alignRight: false },
{ id: 'status', label: 'Status', alignRight: false },
{ id: '' }
];

var selected = [];
var filterName = "";



class EmployeeManager extends Component {
    handleFilterByName(event){
        filterName = event.target.value;
    }
    render() {
        return (
            <div
                style={{height: '800px'}}
            >
                <Page 
                title="User | Minimal-UI"
                
            >
                <Container
                    style={{marginTop: 60, height: '100%'}}
                >
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="h4" gutterBottom>
                        
                    </Typography>
                    <Button
                        variant='contained'
                        startIcon={<Icon icon={plusFill} />}
                    >
                        New User
                    </Button>
                    </Stack>

                    <Card>
                    {/* <EmployeeToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        // onFilterName={this.handleFilterByName(event)}
                    /> */}

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
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
                            <TableBody>
                            {/* {filteredUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                const { id, name, role, status, company, avatarUrl, isVerified } = row;
                                const isItemSelected = selected.indexOf(name) !== -1;

                                return (
                                    <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}
                                    role="checkbox"
                                    selected={isItemSelected}
                                    aria-checked={isItemSelected}
                                    >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                        checked={isItemSelected}
                                        onChange={(event) => handleClick(event, name)}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" padding="none">
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar alt={name} src={avatarUrl} />
                                        <Typography variant="subtitle2" noWrap>
                                            {name}
                                        </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">{company}</TableCell>
                                    <TableCell align="left">{role}</TableCell>
                                    <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="left">
                                        <Label
                                        variant="ghost"
                                        color={(status === 'banned' && 'error') || 'success'}
                                        >
                                        {sentenceCase(status)}
                                        </Label>
                                    </TableCell>

                                    <TableCell align="right">
                                        <UserMoreMenu />
                                    </TableCell>
                                    </TableRow>
                                );
                                })} */}
                            {/* {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                            </TableBody>
                            {/* {isUserNotFound && (
                            <TableBody>
                                <TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                                </TableRow>
                            </TableBody>
                            )} */}
                        </Table>
                        </TableContainer>
                    </Scrollbar>

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
            </Page>
            <Page 
                title="User | Minimal-UI"
            >
                <Container
                    style={{marginTop: 60, height: '100%'}}
                >
                    <Card>
                    {/* <EmployeeToolbar
                        numSelected={selected.length}
                        filterName={filterName}
                        // onFilterName={this.handleFilterByName(event)}
                    /> */}

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
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
                            <TableBody>
                            {/* {filteredUsers
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                const { id, name, role, status, company, avatarUrl, isVerified } = row;
                                const isItemSelected = selected.indexOf(name) !== -1;

                                return (
                                    <TableRow
                                    hover
                                    key={id}
                                    tabIndex={-1}
                                    role="checkbox"
                                    selected={isItemSelected}
                                    aria-checked={isItemSelected}
                                    >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                        checked={isItemSelected}
                                        onChange={(event) => handleClick(event, name)}
                                        />
                                    </TableCell>
                                    <TableCell component="th" scope="row" padding="none">
                                        <Stack direction="row" alignItems="center" spacing={2}>
                                        <Avatar alt={name} src={avatarUrl} />
                                        <Typography variant="subtitle2" noWrap>
                                            {name}
                                        </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell align="left">{company}</TableCell>
                                    <TableCell align="left">{role}</TableCell>
                                    <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="left">
                                        <Label
                                        variant="ghost"
                                        color={(status === 'banned' && 'error') || 'success'}
                                        >
                                        {sentenceCase(status)}
                                        </Label>
                                    </TableCell>

                                    <TableCell align="right">
                                        <UserMoreMenu />
                                    </TableCell>
                                    </TableRow>
                                );
                                })} */}
                            {/* {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                                </TableRow>
                            )} */}
                            </TableBody>
                            {/* {isUserNotFound && (
                            <TableBody>
                                <TableRow>
                                <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                    <SearchNotFound searchQuery={filterName} />
                                </TableCell>
                                </TableRow>
                            </TableBody>
                            )} */}
                        </Table>
                        </TableContainer>
                    </Scrollbar>

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
            </Page>
            </div>
            
        );
    }
}

export default EmployeeManager;