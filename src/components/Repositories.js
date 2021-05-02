import React from 'react'
import PropTypes from 'prop-types'
import Repository from './Repository'

const Repositories = ({ repositories, onDelete }) => {
    return (
        <>
            {repositories.map((repo) => (
                <Repository key={repo.id} repository={repo} onDelete={onDelete} />
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
