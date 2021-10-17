import React from 'react';
import {useSelector, useDispatch } from 'react-redux'
// import { createSelector } from 'reselect'

function Test(props) {
    const statusLogin = useSelector(state => state.addStatus)
    const darkmode = useSelector(state => state.statusDarkmode)
    const Abc = useDispatch();
    
    const handle = () => {
        console.log(darkmode);
        Abc({
            type: "CHANGE_DARKMODE",
        })
    }

    return (
        <div>
            <div onClick={() => handle()}>{darkmode? "true":"false"}</div>
        </div>
    );
}

export default Test;