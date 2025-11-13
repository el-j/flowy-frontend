import { Project } from '../../types';

export const serverPort = 9023;
export const serverUrl = 'http://localhost';
export const serverSubDir = 'projects';
export const projectDir = `${serverUrl}:${serverPort}/${serverSubDir}`;
export const apiUrl = `${serverUrl}:${serverPort}/api`;

function postData(url: string, data: FormData): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    body: data
  });
}

function saveProjectData(url: string, data: Project): Promise<Response> {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
}

export const createProject = (newProjectName: string): Promise<Response> => 
  fetch(`${apiUrl}/createProject/:${newProjectName}`).then(res => res);

export const removeProject = (newProjectName: string): Promise<any> => 
  fetch(`${apiUrl}/removeProject/:${newProjectName}`).then(res => res.json());

export const uploadProjectData = (incomedata: FormData, projectName: string): Promise<any> => 
  postData(`${apiUrl}/uploadProjectData/:${projectName}`, incomedata).then(res => res.json());

export const saveProject = (projectName: string, projectJson: Project): Promise<Project> => 
  saveProjectData(`${apiUrl}/saveProject/:${projectName}`, projectJson).then(res => res.json());


export const getAllFiles = (): Promise<any> => 
  fetch(`${apiUrl}/getallfiles`).then(res => res.json());

export const loadFiles = (filetype: string): Promise<any> => 
  fetch(`${apiUrl}/loadfile/:${filetype}`).then(res => res.json());

export const loadPngs = (): Promise<any> => 
  fetch(`${apiUrl}/loadpngs`).then(res => res.json());

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
};
