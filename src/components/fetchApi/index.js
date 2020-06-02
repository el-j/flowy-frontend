import React from "react";

export const api = 'http://localhost:9023/api'

function postData(url, data) {
  // Default options are marked with *
  console.log(url,data);
return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: data // body data type must match "Content-Type" header
  });

}

function saveProjectData(url, data) {
  // Default options are marked with *
  console.log(url,data);
  return fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    // mode: '*cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'omit', // include, *same-origin, omit
    // enctype:"multipart/form-data",
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *client
  // return await response.json(); // parses JSON response into native JavaScript objects
  // console.log("this is the response from post files",data);

}

export const createProject = (newProjectName) => fetch(`${api}/createProject/:${newProjectName}`).then(res => res)
export const removeProject = (newProjectName) => fetch(`${api}/removeProject/:${newProjectName}`).then(res => res.json())

export const uploadProjectData = (incomedata,projectName) => postData(`${api}/uploadProjectData/:${projectName}`,incomedata).then(res=> res.json())
export const saveProject = (projectName,projectJson) => saveProjectData(`${api}/saveProject/:${projectName}`,projectJson).then(res=> res.json())


export const getAllFiles = (state) => fetch(`${api}/getallfiles`).then(res => res.json())

export const loadFiles = (filetype) => fetch(`${api}/loadfile/:${filetype}`).then(res => res.json())

export const loadPngs = (filetype) => fetch(`${api}/loadpngs`).then(res => res.json())

export default {
  loadFiles,
  getAllFiles,
  createProject,
  removeProject,
  uploadProjectData,
  saveProject
}
