import React, { Component } from 'react';
import { Card, CardHeader, Divider, Grid, TextField, Box, CardContent, Button } from '@mui/material';
import { connect } from 'react-redux'
import { BiPlusMedical, BiEdit } from 'react-icons/bi';
import Stack from '@mui/material/Stack';
import { GiCancel } from 'react-icons/gi'
import axios from 'axios';
import AddTypeModal from './AddTypeModal';

var productTypes =[
    'food', 'detergent', 'cuisine'
];


class EditTypeModal extends Component {
    constructor(props) {
        super(props);
    }
    confirm = () => {
        // Thực hiện các lệnh xử lý tại đây
        this.props.changeConfirmStatus();
    }
    cancel = () => {
        this.props.changeConfirmStatus();
    }
    edit = () => {
        this.props.changeAddStatus();
        this.props.setEditTypeStatus();
    }

    render() {
        console.log(this.props.objectEditShift);
        return (
            <form style={{ zIndex: '10', minWidth: '500px', width: '600px', justifyContent: 'center', marginTop: '10%' }} autoComplete="off" noValidate>
                <Card>
                    <CardHeader style={{ color: 'blue', backgroundColor: '#efeeef' }} title="All Good Type" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid container item md={12} xs={12} spacing={0}>
                                {productTypes.map((type) => (
                                    <Grid item md={3} style={{border:'1px solid #333', padding: 4}}>
                                        <span>{type}</span>
                                        <BiEdit onClick={() => this.edit()}/>
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Stack spacing={3}>
                                   
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', p: 2 }}>
                        <Button style={{ backgroundColor: 'red' }} onClick={(e) => this.cancel(e)} variant="contained" startIcon={<GiCancel />}>
                            Thoát
                        </Button>
                    </Box>
                </Card>
                {this.props.addStatus ? (
                        <div className="modal-add">
                            <div onClick={() => {this.props.changeAddStatus();}} className="modal-overlay"></div>
                            <AddTypeModal></AddTypeModal>
                        </div>
                    ): null}
            </form>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        editTypeStatus: state.editTypeStatus,
        addStatus: state.addStatus,
        isAddTypeStatus: state.isAddTypeStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeEditTypeStatus: () => {
            dispatch({
                type: "CHANGE_EDIT_TYPE_STATUS",
            });
        },
        changeAddStatus: () => {
            dispatch({
                type: "CHANGE_ADD_STATUS",
            });
        },
        setEditTypeStatus: () => {
            dispatch({
                type: "SET_EDIT_TYPE_STATUS",
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTypeModal);