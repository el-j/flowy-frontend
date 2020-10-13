export const serverPort = 9023
export const serverUrl = 'http://localhost'
export const serverSubDir = 'projects'
export const projectDir = `${serverUrl}:${serverPort}/${serverSubDir}`
export const apiUrl = `${serverUrl}:${serverPort}/api`

function postData(url, data) {
  // Default options are marked with *
  // console.log(url,data);
return fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    body: data // body data type must match "Content-Type" header
  });

}

function saveProjectData(url, data) {
  // Default options are marked with *
  // console.log(url,data);
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

export const createProject = (newProjectName) => fetch(`${apiUrl}/createProject/:${newProjectName}`).then(res => res)
export const removeProject = (newProjectName) => fetch(`${apiUrl}/removeProject/:${newProjectName}`).then(res => res.json())

export const uploadProjectData = (incomedata,projectName) => postData(`${apiUrl}/uploadProjectData/:${projectName}`,incomedata).then(res=> res.json())
export const saveProject = (projectName,projectJson) => saveProjectData(`${apiUrl}/saveProject/:${projectName}`,projectJson).then(res=> res.json())


export const getAllFiles = (state) => fetch(`${apiUrl}/getallfiles`).then(res => res.json())

export const loadFiles = (filetype) => fetch(`${apiUrl}/loadfile/:${filetype}`).then(res => res.json())

export const loadPngs = (filetype) => fetch(`${apiUrl}/loadpngs`).then(res => res.json())

export default {
  loadFiles,
  getAllFiles,
  createProject,
  removeProject,
  uploadProjectData,
  saveProject,
  apiUrl,
  serverPort,
  serverUrl,
  projectDir
}
