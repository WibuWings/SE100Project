import { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import GoodTable from './GoodPartials/GoodTable';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchBar from './GoodPartials/SearchBar';
import {connect} from 'react-redux'
import AddTypeModal from './GoodPartials/AddTypeModal';
import '../CSS/GoodManager.css'
class GoodManager extends Component {

    handleAdd(){
        this.props.changeAddStatus();
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
                        <Button variant="text" onClick={() => this.handleAdd()}>
                            Add Type
                        </Button>  
                        <Button style={{ backgroundColor: 'yellowgreen' }} onClick={() => this.handleAdd()} variant="contained">
                            add
                        </Button>
                    </div>

                    <GoodTable />
                    {/* <div className="modal-add">
                        <div onClick={() => {this.props.changeAddStatus();}} className="modal-overlay"></div>
                        <AddTypeModal></AddTypeModal>
                    </div> */}
                    {this.props.addStatus ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeAddStatus();}} className="modal-overlay"></div>
                            <AddTypeModal></AddTypeModal>
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
        editShiftStatus: state.editShiftStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
            });
        },
        changeEditShiftStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_SHIFT_STATUS",
            })
        }
    }
}
export default connect(mapStateToProps , mapDispatchToProps)(GoodManager);
