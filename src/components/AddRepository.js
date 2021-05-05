import React from 'react'
import { Octokit } from "@octokit/core";
import { useState } from 'react'



const AddRepository = ({ onAdd }) => {
    const [url, setUrl] = useState('')
    const octokit = new Octokit();

    const onSubmit = (e) => {
        e.preventDefault() // Dont submit to new page

        // PLACEHOLDER VALUES
        let title = 'Default Title'
        let owner = null
        let release_date = null
        let body = ''
        let new_release = true


        if (!url) {
            alert('Please add a url')
            return
        }

        const regex = '(https://github.com|github.com)/.*/.*/?';
        const found = url.match(regex);
        if (found === null || found.length === 0) {
            alert('Please enter a valid URL')
            return
        }

        let split_url = url.replace(/\/$/, "");
        split_url = split_url.split('/');
        title = split_url[split_url.length - 1]
        owner = split_url[split_url.length - 2]
        octokit.request('GET /repos/{owner}/{repo}/releases', {
            owner: owner,
            repo: title
        }).then(
            (response) => {
                if (response.data.length > 0) {
                    release_date = response.data[0]['published_at']
                    body = response.data[0]['body']
                }
                onAdd({ url, title, owner, release_date, body, new_release });
                setUrl('');

            }
        ).catch((error) => {
            alert(error)
            console.log(error)
        });


    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control form-control-check'>
                <label>Repository URL</label>
                <input type='text' className='search' placeholder='Add Repository by URL (ie https://github.com/lumanu/gh-release-monitor)' value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <input type='submit' value='Save Repository' className='btn btn-block' />
        </form>
    )
}

export default AddRepository