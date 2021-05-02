import React from 'react'
import {FaTimes} from 'react-icons/fa' 

const Repository = ({id, repository, onDelete}) => {
    return (
        <div className='repository'>
            <h3>{repository.title} <FaTimes onClick={() => onDelete(repository.id)}/></h3>
            <h4>{ repository.release_date }</h4>
        </div>
    )
}

export default Repository