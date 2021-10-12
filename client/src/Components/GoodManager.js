import { Component } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import GoodTable from './GoodPartials/GoodTable';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchBar from './GoodPartials/SearchBar';
import {connect} from 'react-redux'

class GoodManager extends Component {
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
                    </div>

                    <GoodTable />
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
