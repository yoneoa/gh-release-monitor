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
        let release_date = 'Default Date'
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
        octokit.request('GET /repos/{owner}/{repo}/releases', {
            owner: split_url[split_url.length - 2],
            repo: title
        }).then(
            (response) => {
            console.log(response);
            release_date = response.data[0]['published_at']
            onAdd({ url, title, release_date, new_release });
            }
        );






        // ADD FUNC to get github via SDK

        // onAdd({ url, title, release_date, new_release });

        setUrl('');
    }

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control form-control-check'>
                <label>Repository URL</label>
                <input type='text' placeholder='Add Repository by URL' value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <input type='submit' value='Save Repository' className='btn btn-block' />
        </form>
    )
}

export default AddRepository