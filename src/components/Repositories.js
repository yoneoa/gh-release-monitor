import React from 'react'
import Repository from './Repository'

const Repositories = ({ repositories, onDelete, onToggle}) => {    
    return (
        <>
            {repositories.map((repo) => (
                <Repository key={repo.id} repository={repo} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}


// Repository.defaultProps = {
//     text: ''
// }

// Repository.propTypes = {
//     onClick: PropTypes.func,
//     color: PropTypes.string,
//     text: PropTypes.string,
//     title: PropTypes.string
// }

export default Repositories
