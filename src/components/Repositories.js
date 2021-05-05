import React from 'react'
import Repository from './Repository'

const Repositories = ({ repositories, onDelete, onToggle}) => {    
    return (
        <div style={{justifyContent:"center"}}>
            <h3 style={{textAlign:"middle", margin:"20px"}}>{repositories.length > 0 ? "" : "You are not watching any repositories. Use the search bar above to add a repository."}</h3>
            
            {repositories.map((repo) => (
                <Repository key={repo.id} repository={repo} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </div>
    )
}

export default Repositories
