import React from 'react'
import { useState } from 'react'
import { Octokit } from "@octokit/core";


function SearchEntry({repo, onAdd, clearSearch}) {
    const [onHover, setOnHover] = useState(false);
    const octokit = new Octokit();

    const onClickHandle = (e) => {
        e.preventDefault() // Dont submit to new page

        // PLACEHOLDER VALUES
        let url = repo.html_url
        let title = repo.name
        let owner = repo.owner.login
        let release_date = null
        let body = ''
        let new_release = true
        
        octokit.request('GET /repos/{owner}/{repo}/releases', {
            owner: repo.owner.login,
            repo: repo.name
        }).then(
            (response) => {
            if (response.data.length > 0) {
                release_date = response.data[0]['published_at']
                body = response.data[0]['body']
            }
            onAdd({ url, title, owner, release_date, body, new_release});
            clearSearch()
            console.log(response)

            }
        ).catch((error) =>{
            alert(error)
            console.log(error)
        });
    }



    return (
        <div className='repository' style={onHover ? {backgroundColor:"darkGrey"} : {}} onMouseEnter={() => setOnHover(true) } onMouseLeave={() => setOnHover(false) }>
            <h4>Name: {repo.name}</h4>
            <h4>Author: {repo.owner.login}</h4>
            <h4>Push Date: {new Date(repo.pushed_at).toLocaleString()}</h4>
            <button className='searchbtn' onClick={(e) => onClickHandle(e)} >ADD</button>
        </div>
    )
}

export default SearchEntry
