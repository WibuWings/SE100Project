import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import CollapsibleTable from './TableReciept'
import { Grid, Card, CardHeader, Divider, CardContent } from '@mui/material';

function HistoryReciept(props) {

    const darkmode = useSelector(state => state.statusDarkmode)
    const dispatch = useDispatch();

    return (
        <div style={{ overflow: 'hidden' }} className="modal-history-reciept">
            <div onClick={() => { dispatch({ type: "CHANGE_HISTORY_RECIEPT_STATUS" }) }} className="modal-overlay"></div>
            <div className="history-list-receipt">
                <Card>
                    <CardHeader style={{ color: !darkmode ? '#0091ea' : 'white', backgroundColor: !darkmode ? '#efeeef' : '#455a64' }} title="History Reciept" />
                    <Divider></Divider>
                </Card>
                <div id="choses-product" style={{ margin: '30px', height: '82%', overflow: 'hidden', overflowY: 'scroll' }}>
                    <CollapsibleTable></CollapsibleTable>
                </div>
            </div>
        </div>
    );
}

export default HistoryReciept;