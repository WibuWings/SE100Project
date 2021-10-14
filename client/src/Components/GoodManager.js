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

class GoodManager extends Component {
    
    handleAdd() {
        this.props.changeAddStatus();
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
                    {this.props.addStatus ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeAddStatus();}} className="modal-overlay"></div>
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
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeUpdateGoodStatus();}} className="modal-overlay"></div>
                            <UpdateGoodModal></UpdateGoodModal>
                        </div>
                    ): null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        addStatus: state.addStatus,
        confirmStatus: state.confirmStatus,
        deleteStatus: state.deleteStatus,
        updateGoodStatus: state.updateGoodStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
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
        }
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(GoodManager);
