import { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import GoodTable from './GoodPartials/GoodTable';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchBar from './GoodPartials/SearchBar';
import {connect} from 'react-redux'
import AddTypeModal from './GoodPartials/AddTypeModal';
import '../CSS/GoodManager.css';
import ConfirmModal from './GoodPartials/ConfirmModal';
import UpdateGoodModal from './GoodPartials/UpdateGoodModal';
import EditTypeModal from './GoodPartials/EditTypeModal';

const columns = [
    { field: 'id', headerName: 'ID', width: 40 },
    { field: 'firstName', headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 130,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.getValue(params.id, 'firstName') || ''} ${
          params.getValue(params.id, 'lastName') || ''
        }`,
    },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];


class GoodManager extends Component {
    
    handleAdd() {
        this.props.changeAddTypeStatus();
        this.props.setAddTypeStatus();
    }
    handleConfirm(){
        this.props.changeConfirmStatus();
        this.props.unsetDelete();
    }
    handleConfirmDelete(){
        this.props.changeConfirmStatus();
        this.props.changeToDelete();
    }
    handleUpdateGood() {
        this.props.changeUpdateGoodStatus();
    }
    handleEditType() {
        this.props.changeEditTypeStatus();
    }
    render() {
        return (
            <div>
                Good Manager
                <div style={{ height: 600, width: '100%', overflowX: 'scroll' }}>
                    <div style={{display: 'flex'}}>
                        <Button variant="contained">
                            <NavLink style={{color: '#fff', textDecoration: 'none'}} to="/goodmanager/import">Import</NavLink>
                        </Button>
                        <SearchBar style={{height: '120px'}}/>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleAdd()} variant="contained">
                            add type
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleEditType()} variant="contained">
                            edit type
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleConfirmDelete()} variant="contained">
                            Delete
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleConfirm()} variant="contained">
                            Edit
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleUpdateGood()} variant="contained">
                            Update Good
                        </Button>

                     </div>

                    <GoodTable />

                    {/* Đây là phần modal */}
                    {this.props.addTypeStatus ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeAddTypeStatus();}} className="modal-overlay"></div>
                            <AddTypeModal></AddTypeModal>
                        </div>
                    ): null}
                    {this.props.confirmStatus ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeConfirmStatus();}} className="modal-overlay"></div>
                            <ConfirmModal></ConfirmModal>
                        </div>
                    ): null}
                    {this.props.updateGoodStatus ? (
                        <div 
                            className="modal-add"
                        >
                            <div onClick={() => {this.props.changeUpdateGoodStatus();}} className="modal-overlay"></div>
                            <UpdateGoodModal
                                style={{
                                    marginTop: 0
                                }}
                            >
                            </UpdateGoodModal>
                        </div>
                    ): null}
                     {this.props.editTypeStatus ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeEditTypeStatus();}} className="modal-overlay"></div>
                            <EditTypeModal></EditTypeModal>
                        </div>
                    ): null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addTypeStatus: state.addTypeStatus,
        confirmStatus: state.confirmStatus,
        deleteStatus: state.deleteStatus,
        updateGoodStatus: state.updateGoodStatus,
        editTypeStatus: state.editTypeStatus,
        isAddTypeStatus: state.isAddTypeStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddTypeStatus: () => {
            dispatch({
                type: "CHANGE_ADD_TYPE_STATUS",
            });
        },
        changeConfirmStatus: () => {
            dispatch({
                type: "CHANGE_CONFIRM_STATUS",
            });
        },
        changeToDelete: () => {
            dispatch({
                type: "SET_DELETE_STATUS",
            })
        },
        unsetDelete: () => {
            dispatch({
                type: "UNSET_DELETE_STATUS",
            })
        },
        changeUpdateGoodStatus: () => {
            dispatch({
                type: "CHANGE_UPDATE_GOOD_STATUS",
            })
        },
        changeEditTypeStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_TYPE_STATUS",
            })
        },
        setAddTypeStatus: () => {
            dispatch({
                type: "SET_ADD_TYPE_STATUS",
            });
        },
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(GoodManager);
