import React from 'react';
import {useSelector, useDispatch } from 'react-redux'
// import { createSelector } from 'reselect'

function Test(props) {
    const statusLogin = useSelector(state => state.addStatus)
    const Abc = useDispatch();
    const handle = () => {
        Abc({
            type: "CHANGE_ADD_STATUS",
        })
    }

    return (
        <div>
            <div onClick={() => handle()}>{statusLogin? "true":"false"}</div>
        </div>
    );
}

export default Test;