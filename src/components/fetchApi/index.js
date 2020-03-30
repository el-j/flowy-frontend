import React from "react";

export const api = 'http://localhost:4000/api'

// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}


export const getProjectsFromApi = () => fetch(`${api}/getProjects`).then(res => res.json())

export const createProject = (newProjectName) => fetch(`${api}/createProject/:${newProjectName}`).then(res => res)
export const removeProject = (newProjectName) => fetch(`${api}/removeProject/:${newProjectName}`).then(res => res)

export const uploadProjectData = (data) => postData(`${api}/uploadProjectData/:${data.name}`,data).then((res)=> {console.log(res)})




export const getFiles = (state) => fetch(`${api}/reload`).then(res => res.json())
export const getAllFiles = (state) => fetch(`${api}/getallfiles`).then(res => res.json())

export const loadFiles = (filetype) => fetch(`${api}/loadfile/:${filetype}`).then(res => res.json())

export const loadPngs = (filetype) => fetch(`${api}/loadpngs`).then(res => res.json())

export default {
  getFiles,
  loadFiles,
  getAllFiles,
  getProjectsFromApi,
  createProject,
  removeProject,
  uploadProjectData
}
