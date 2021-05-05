import React from 'react';
// import Button from './Button'
import { FaSyncAlt } from "react-icons/fa";


const Header = ({ onAdd, showAdd, onRefresh }) => {

    return (
        <header className='header'>
            <h1 style={{ paddingRight: "20px" }}>Github Release Monitor</h1>
            {/* <Button 
            color={showAdd ? 'grey' : 'green'} 
            text={showAdd ? 'Close Form' : 'Add Repo'} 
            onClick={onAdd} /> */}
            <button
                className='btn'
                onClick={onRefresh}
                color={showAdd ? 'grey' : 'green'}>
                <FaSyncAlt />
            </button>
        </header>
    )
}

export default Header
