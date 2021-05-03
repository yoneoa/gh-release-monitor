import React from 'react';
import './index.css';
import Header from './components/Header'
import Repositories from './components/Repositories'
import AddRepository from './components/AddRepository'
import { useState, useEffect } from 'react'
import { Octokit } from 'octokit';


function App() {
  const [showAddRepository, setShowAddRepository] = useState(false)
  const [repositories, setRepositories] = useState([])
  const octokit = new Octokit();

  useEffect(() => {
    const getRepositories = async () => {
      const reposFromServer = await fetchRepositories()
      setRepositories(sortRepositories(reposFromServer))
    }

    getRepositories()
  }, [])


  const sortRepositories = (items) => {
    const sorted = [...items].sort((a,b) => (b.new_release - a.new_release || (b.release_date ? new Date(b.release_date) : null) - (a.release_date ? new Date(a.release_date) : null)))
    return sorted
  }

  // Fetch repositories from db
  const fetchRepositories = async () => {
    const response = await fetch('http://localhost:3123/repositories')
    let data = await response.json()
    return data
  }

  // Fetch a single repo
  const fetchRepository = async (id) => {
    const response = await fetch(`http://localhost:3123/repositories/${id}`)
    const data = await response.json()

    return data
  }


  // Add repo to db
  const addRepository = async (repository) => {
    const response = await fetch("http://localhost:3123/repositories", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "url": repository.url,
        "title": repository.title,
        "owner": repository.owner,
        "release_date": repository.release_date,
        "body": repository.body,
        "new_release": repository.new_release
      })
    })


    const data = await response.json()
    const id = data.id
    const newRepo = { id, ...repository }
    setRepositories([...repositories, newRepo])

  }

  const toggleIsNewRelease = async (id) => {
    const repoToToggle = await fetchRepository(id)
    const updRepo = { ...repoToToggle, new_release: !repoToToggle.new_release }
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
        repository.id === id ? {...repository, new_release: data.new_release} : repository
      )
    )
  }

  const refreshRepositories = async () => {
    let updatedRepos = [...repositories]
    for (const i in repositories) {
      let repo = repositories[i];
      let oldDate = repo.release_date ? new Date(repo.release_date).toISOString() : repo.release_date;
      const id = repo.id;
      let rel = await octokit.request('GET /repos/{owner}/{repo}/releases', {
        owner: repo.owner,
        repo: repo.title
      })
      let newDate = rel.data.length > 0 ? new Date(rel.data[0]['published_at']).toISOString() : null;

      if (oldDate !== newDate || (oldDate === null && newDate !== null)) {
        // newDate = newDate.toISOString()
        await fetch(`http://localhost:3123/repositories/${repo.id}`, {
          method: "PATCH",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "new_release": true,
            "release_date": newDate
          })
        })

        repo.new_release = true;
        repo.release_date = newDate;
        updatedRepos[i] = repo;
      }
      setRepositories(
        sortRepositories(repositories).map((repository) =>
          repository.id === id ? {...repository, new_release: repo.new_release, newDate} : repository
        )
      )  
  }

  }


  // Delete repository
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
      {showAddRepository && <AddRepository onAdd={addRepository} />}
      <Repositories repositories={repositories} onDelete={deleteRepository} onToggle={toggleIsNewRelease}/>
    </div>
    
  );
}

export default App;
