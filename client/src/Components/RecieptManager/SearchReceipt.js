import React, { useState } from 'react';
import { BiSearchAlt } from 'react-icons/bi'
import { useDispatch , useSelector } from 'react-redux'

function SearchReceipt(props) {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch({
            type: "RESET_SEARCH",
        })
    }, [])

    return (
        <div className="search-customize" style={{ borderRadius: '6px', backgroundColor: 'white', justifyContent: 'center', display: 'flex', marginBottom: '10px', padding: '10px' }}>
            <BiSearchAlt style={{ fontSize: '1.6rem', marginRight: '10px', marginLeft: '10px' }}></BiSearchAlt>
            <input onChange={(e) => {dispatch({type:"CHANGE_SEARCH", object: e.target.value })}} type="text" style={{ width: '100%', outline: 'none', border: 'none' }} placeholder="Theo mã hóa đơn"></input>
        </div>
    );
}

export default SearchReceipt;