import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
/*bootstrap imports */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

// import Projects from '../../dataMocks/projects.js'
import {createProject,uploadProjectData, removeProject } from '../../tools/fetchApi'
import useFetchApi from '../../tools/fetchApi/useFetchApi.js'

import { NewProjectInput, YourProjects } from '../../components'

const Overview = (props) => {
  const { searchResults } = props;

  const history = useHistory();

  const myData = useFetchApi('getProjects')
  const [projects,setProjects] = useState()
  const [newProject,setNewProject] = useState({name:'',files:[]})
  const [isLoaded,setIsLoaded] = useState(false)
  const [uploaded,setUploaded] = useState(false)
  const [createProgress,setCreateProgress] = useState(false)

    useEffect(() => {
      if (Object.keys(searchResults).length >= 1) {
        setProjects(searchResults)
      }else {
        setProjects(myData)
      }
      setIsLoaded(true)
    },[myData,searchResults])

  const handleOpenProject = (projectName) => {
    let path = `/project/:${projectName}`;
    history.push(path);
    }

  const handleNewProject = (projectName) => {
    let path = `/newproject/:${projectName}`;
    history.push(path);
    }

  const handleChange = (e) => {
    const temp = e.target.value
    setNewProject({projectId:temp,name:temp,files:[]})
  }



  const handleCreateEmptyProject = event => {
    event.persist()
    // console.log("CREATE EMPTY PROJECT NOW >>>> NAME:",newProject);
    createProject(newProject.projectId).then(result =>{
      // console.log("response result",result,result.body,newProject.name,event.target.files)
      setIsLoaded(true)
      setCreateProgress(true)
      handleNewProject(newProject.projectId)
    } ,(error) => {
            // console.log("we got error response",error);
            setProjects([])
            setNewProject('')
            setIsLoaded(false)
      })
  }

  const handleSubmit = event => {
      event.preventDefault()
       var formData = new FormData();
       let files = event.target.files
       let name = newProject.name
       let projectId = newProject.projectId
       for (var i = 0; i < files.length; i++) {
         formData.append('file',files[i],files[i].name)
       }
       formData.append('projectName',name)
       formData.append('projectId',projectId)
       uploadProjectData(formData,projectId).then(result =>{
         setProjects(result)
         setUploaded(true)
         setCreateProgress(false)
       } ,(error) => {
               setProjects([])
               setUploaded(false)
               setCreateProgress(false)
             })
   }

  const handleRemoveProject = (projectName) => {
      removeProject(projectName).then(result =>{
      setProjects(result)
      setIsLoaded(true)
    } ,(error) => {
            setProjects([])
            setIsLoaded(false)
          })
      }

      return(
          <Container justify="center" spacing={2}>
            <Grid item xs={12} lg={10}>
              <Grid container   spacing={2}>
                <Grid item xs={12}>
                    <NewProjectInput
                      handleChange={handleChange}
                      value={newProject.name}
                      handleCreateEmptyProject={handleCreateEmptyProject}
                      handleSubmit={handleSubmit}
                      />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
               {
                 projects&&isLoaded?<YourProjects
                   key='yourprojects'
                   projects={projects}
                   openProject={handleOpenProject}
                   removeProject={handleRemoveProject}
                   />:<></>
                 }
              </Grid>
              </Grid>
          </Grid>
        </Container>
      )
    }

export default Overview
