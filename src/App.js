import { Octokit } from "@octokit/core";
import React from 'react';
import './index.css';
import Header from './components/Header'
import Repositories from './components/Repositories'
import AddRepository from './components/AddRepository'
import { useState } from 'react'


// const octokit = new Octokit();

// octokit.request('GET /repos/{owner}/{repo}/releases', {
//   owner: 'microsoft',
//   repo: 'vscode'
// }).then(
//   (response) => {
//     console.log(response);
//   }
// );


function App() {
  const [showAddRepository, setShowAddRepository] = useState(false)
  const [repositories, setRepositories] = useState([
    {
      id: 1,
      url: "https://github.com/bradtraversy/react-crash-2021",
      title: "Test Repo 1",
      release_date: "Jan 1, 2021",
      new_release: false
    },

    {
      id: 2,
      url: "https://github.com/siljanoskam/react-task-manager-app",
      title: "Test Repo 2",
      release_date: "Jan 1, 2021",
      new_release: true
    },

    {
      id: 3,
      url: "https://github.com/yoneoa/ankidecks",
      title: "Test Repo 3",
      release_date: "Jan 3, 2021",
      new_release: false
    },
  ])



  // Add repo
  const addRepository =  (repository) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newRepo = {id, ...repository}
    console.log(repository)
    setRepositories([...repositories, newRepo])
  }
  
  // Delete repository
  const deleteRepository = (id) => {
    console.log("Repo Deleted. ID: ", id)
  }

  return (
    <div className="container">
      <Header onAdd={() => setShowAddRepository(!showAddRepository)} showAdd={showAddRepository}/>
      {showAddRepository && <AddRepository onAdd={addRepository}/>}
      <Repositories repositories={repositories} onDelete={deleteRepository}/>
    </div>
  );
}

export default App;
