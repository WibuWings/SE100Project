import React from 'react';
import { useDispatch } from 'react-redux'
import CollapsibleTable from './TableReciept'

function HistoryReciept(props) {

    const dispatch = useDispatch();

    return (
        <div style={{overflow:'hidden'}} className="modal-history-reciept">
            <div onClick={() => { dispatch({ type: "CHANGE_HISTORY_RECIEPT_STATUS" }) }} className="modal-overlay"></div>
            <div className="history-list-receipt">
                <h1 style={{textAlign:'center'}}>History Reciept</h1>
                <div id="choses-product" style={{margin: '30px', height:'85%',overflow:'hidden', overflowY:'scroll'}}>
                    <CollapsibleTable></CollapsibleTable>
                </div>
            </div>
        </div>
    );
}

export default HistoryReciept;