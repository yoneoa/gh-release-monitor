import React from 'react';
import './index.css';
import Header from './components/Header'
import Repositories from './components/Repositories'
// import AddRepository from './components/AddRepository' // No Longer used 
import Search from './components/Search'
import { useState, useEffect } from 'react'
import { Octokit } from 'octokit';


function App() {
  const [showAddRepository, setShowAddRepository] = useState(false)
  const [repositories, setRepositories] = useState([])
  const octokit = new Octokit();

  // On page load, grab repos from our DB
  useEffect(() => {
    const getRepositories = async () => {
      const reposFromServer = await fetchRepositories()
      setRepositories(sortRepositories(reposFromServer))
    }
    getRepositories()
  }, [])


  // Helper function to sort our list of repositories, this is to propagate new releases to the top on page load/ refresh
  const sortRepositories = (items) => {
    const sorted = [...items].sort((a, b) => (b.new_release - a.new_release || (b.release_date ? new Date(b.release_date) : null) - (a.release_date ? new Date(a.release_date) : null)))
    return sorted
  }

  // Fetch repositories from db
  const fetchRepositories = async () => {
    const response = await fetch('http://localhost:3123/repositories')
    let data = await response.json()
    return data
  }

  // Fetch a single repo (NOT USED)
  // const fetchRepository = async (id) => {
  //   const response = await fetch(`http://localhost:3123/repositories/${id}`)
  //   const data = await response.json()

  //   return data
  // }


  // Add repo to db
  const addRepository = async (repository) => {
    const response = await fetch("http://localhost:3123/repositories", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "url": repository.url,
        "title": repository.title,
        "owner": repository.owner,
        "release_date": repository.release_date ? new Date(repository.release_date) : null,
        "body": repository.body,
        "new_release": repository.new_release
      })
    })


    const data = await response.json()
    const id = data.id
    const newRepo = { id, ...repository }
    setRepositories([...repositories, newRepo])

  }

  // Toggle's green highlight to notify user's of a new release
  const toggleIsNewRelease = async (id) => {
    const response = await fetch(`http://localhost:3123/repositories/${id}`, {
      method: "PATCH",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "new_release": false
      })
    })
    const data = response.json()
    setRepositories(
      repositories.map((repository) =>
        repository.id === id ? { ...repository, new_release: data.new_release } : repository
      )
    )
  }

  // Refreshes the state of the repositories via the refresh button / page reload
  const refreshRepositories = async () => {
    let updatedRepos = [...repositories]
    for (const i in updatedRepos) {
      let repo = updatedRepos[i];
      let oldDate = repo.release_date ? new Date(repo.release_date) : repo.release_date; // The date of the previous release
      const id = repo.id; // The repository's unique id
      /* We get the releases via octokit */
      let rel = await octokit.request('GET /repos/{owner}/{repo}/releases', {
        owner: repo.owner,
        repo: repo.title
      })
      let newDate = rel.data.length > 0 ? new Date(rel.data[0]['published_at']) : null; // Date from the new release

      if ((oldDate === null && newDate !== null) || ((oldDate !== null && newDate !== null) && oldDate.valueOf() !== newDate.valueOf())) {
        /* We then update the repository in our database via API*/
        await fetch(`http://localhost:3123/repositories/${repo.id}`, {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "new_release": true,
            "release_date": newDate,
            "body": rel.data[0]['body']
          })
        })

        repo.new_release = true;
        repo.release_date = newDate;
        updatedRepos[i] = repo;
      }
      setRepositories(
        sortRepositories(updatedRepos).map((repository) =>
          repository.id === id ? { ...repository, new_release: repo.new_release, newDate } : repository
        )
      )
    }

  }


  // Delete repository from database and filter out of browser view
  const deleteRepository = async (id) => {
    await fetch(`http://localhost:3123/repositories/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    setRepositories(repositories.filter((repository) => repository.id !== id))
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddRepository(!showAddRepository)} showAdd={showAddRepository} onRefresh={refreshRepositories} />
      <Search onAdd={addRepository} />
      {/* {showAddRepository && <AddRepository onAdd={addRepository} />} */}
      <Repositories repositories={repositories} onDelete={deleteRepository} onToggle={toggleIsNewRelease} />
    </div>

  );
}

export default App;
