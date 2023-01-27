# GitHub Release Monitor

A tool to keep track of releases made by GitHub repos.   This repository contains an example setup that can be used to create an app.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How To Install and Run

### `npm install`

This will install necessary dependencies, which now include (alongside original dependencies):
- json-server
- react-icons
- react-markdown
- remark-gfm

### `npm run server`

This will deploy the "backend" server, which is what we use to store information regarding the repositories. 
I decided to go the json-server route because it was a simple way to emulate interaction with a backend via REST. 

### `npm start`

In another terminal, run `npm start` to start the react server. 
Open [http://localhost:3006](http://localhost:3006) to view it in the browser.


Thanks!