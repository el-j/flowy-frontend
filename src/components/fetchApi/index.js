import React from "react";

export const api = 'http://localhost:4000/api'

function postData(url, data) {
  // Default options are marked with *
return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: data // body data type must match "Content-Type" header
  });
    // mode: '*cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'omit', // include, *same-origin, omit
    // enctype:"multipart/form-data",
    // headers: {
    //   // 'Content-Type': 'application/json',
    //    'Content-Type': 'multipart/form-data'
    //   // 'Content-Type': 'application/x-www-form-urlencoded',
    // },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *client
  // return await response.json(); // parses JSON response into native JavaScript objects
  // console.log("this is the response from post files",data);

}


export const getProjectsFromApi = () => fetch(`${api}/getProjects`).then(res => res.json())

export const createProject = (newProjectName) => fetch(`${api}/createProject/:${newProjectName}`).then(res => res)
export const removeProject = (newProjectName) => fetch(`${api}/removeProject/:${newProjectName}`).then(res => res.json())

export const uploadProjectData = (incomedata,projectName) => postData(`${api}/uploadProjectData/:${projectName}`,incomedata).then(res=> res.json())


export const loadProject = (projectname) => fetch(`${api}/loadProject/:${projectname}`).then(res => res.json())
export const getAllFiles = (state) => fetch(`${api}/getallfiles`).then(res => res.json())

export const loadFiles = (filetype) => fetch(`${api}/loadfile/:${filetype}`).then(res => res.json())

export const loadPngs = (filetype) => fetch(`${api}/loadpngs`).then(res => res.json())

export default {
  loadProject,
  loadFiles,
  getAllFiles,
  getProjectsFromApi,
  createProject,
  removeProject,
  uploadProjectData
}
