import React from 'react'
import { useState, useEffect } from 'react'
import { Octokit } from 'octokit';
import SearchEntry from './SearchEntry'

const Search = ({ onAdd }) => {
    const octokit = new Octokit();

    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // const [showResults, SetShowResults] = useState(false);

    const clearSearch = () => {
        setQuery("")
        setSearchResults([])
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => handleGetRepositories(query), 500);
        return () => clearTimeout(timeOutId);
    }, [query]);

    const getRepositories = (searchTerm) => {
        octokit.request('GET /search/repositories', {
            q: searchTerm,
            sort: 'created'
        }).then(
            (response) => {
                setSearchResults(Object.values(response["data"]["items"]).slice(0, 6))
            }
        ).catch((error) => {
            console.log(error)
        });

    }

    const handleGetRepositories = (searchTerm) => {
        if (query.length > 0) {
            getRepositories(searchTerm)
        }

    }



    return (
        <>
            <input
                type="text"
                value={query}
                onChange={event => setQuery(event.target.value)}
                className='search'
                placeholder="Search For Repositories (ie 'gh-repository-validator')"
            />

            {searchResults.map((repo) => (
                <SearchEntry key={repo.id} repo={repo} onAdd={onAdd} clearSearch={clearSearch} />
            ))}
        </>
    );
}

export default Search
