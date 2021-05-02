import React from 'react';
import Button from './Button'
const Header = ({onAdd, showAdd}) => {

    return (
        <header className='header'>
            <h1>Github Release Monitor</h1>
            <Button 
            color={showAdd ? 'grey' : 'green'} 
            text={showAdd ? 'Close Form' : 'Add Repo'} 
            onClick={onAdd} />
        </header>
    )
}

export default Header
