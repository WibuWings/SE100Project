import { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import GoodTable from './GoodPartials/GoodTable';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchBar from './GoodPartials/SearchBar';
import {connect} from 'react-redux'
import AddTypeModal from './GoodPartials/AddTypeModal';
import '../css/GoodManager.css';
import ConfirmModal from './GoodPartials/ConfirmModal';
import UpdateGoodModal from './GoodPartials/UpdateGoodModal';
import EditTypeModal from './GoodPartials/EditTypeModal';
import AddGoodModal from './GoodPartials/AddGoodModal';
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
        this.props.setDeleteConfirm();
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
                <div style={{height: '100%', width: '100%', marginTop: '40px', marginBottom: '40px', paddingBottom: '40px' }}>
                    <div style={{display: 'flex'}}>
                        <Button variant="contained">
                            <Button style={{color: '#fff', textDecoration: 'none'}} onClick={() => this.props.changeStatusAddGood()}>Import</Button>
                        </Button>
                        <SearchBar style={{height: '120px'}}/>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleAdd()} variant="contained">
                            add type
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleEditType()} variant="contained">
                            edit type
                        </Button>
                        {/* <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleConfirmDelete()} variant="contained">
                            Delete
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleConfirm()} variant="contained">
                            Edit
                        </Button>
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleUpdateGood()} variant="contained">
                            Update Good
                        </Button> */}

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
                    {

                    }
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
                    {this.props.statusAddGood ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeStatusAddGood();}} className="modal-overlay"></div>
                            <AddGoodModal></AddGoodModal>
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
        statusAddGood: state.statusAddGood,
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
        setDeleteConfirm: () => {
            dispatch({
                type: "SET_CONFIRM_DELETE_GOOD",
            }); 
        },
        changeStatusAddGood: () => {
            dispatch({
                type: "CHANGE_ADD_GOOD_STATUS",
            }); 
        }
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(GoodManager);
