import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
/*bootstrap imports */
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

// import Projects from '../../dataMocks/projects.js'
import {createProject,uploadProjectData, removeProject } from '../../tools/fetchApi'
import useFetchApi from '../../tools/fetchApi/useFetchApi.js'

import { NewProjectInput, YourProjects, SureDialog, Spacer } from '../../components'
import { openProject, createNewProject } from './handlers'

const Overview = (props) => {
  const { searchResults } = props;

  const history = useHistory();

  const myData = useFetchApi('getProjects')
  const [projects,setProjects] = useState()
  const [removeProjectName,setRemoveProjectName] = useState()
  const [showRemoveAlert,setShowRemoveAlert] = useState(false)
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
    history.push(openProject(projectName))
  }

  const handleNewProject = (projectName) => {
    history.push(createNewProject(projectName));
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
      if (!showRemoveAlert && !removeProjectName) {
        setShowRemoveAlert(true)
        setRemoveProjectName(projectName)
      }

      console.log("here we are", projectName,removeProjectName,showRemoveAlert);
      if (removeProjectName && showRemoveAlert) {
        removeProject(projectName).then(result =>{
        setProjects(result)
        setIsLoaded(true)
        setShowRemoveAlert(false)
        setRemoveProjectName()
      } ,(error) => {
              setProjects([])
              setIsLoaded(false)
            })
      }
      else {
        setShowRemoveAlert(true)
      }
    }
      return(
          <Container justify="center" spacing={2}>
            <Spacer spacing={2}/>
            <Grid item xs={12} spacing={2}>
              <Grid container alignItems="baseline" spacing={2}>
              <Grid item xs={12} lg={12} spacing={2}>
                  <Typography variant={'p'}>Hi, welcome back to flowy</Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                  <NewProjectInput
                      handleChange={handleChange}
                      value={newProject.name}
                      handleCreateEmptyProject={handleCreateEmptyProject}
                      handleSubmit={handleSubmit}
                      />
                </Grid>
            </Grid>
            <Spacer spacing={2}/>
            <Divider />
            <Spacer spacing={2}/>
            <Grid container spacing={1}>
              <Grid item xs={12} lg={12}>
                <Typography variant={'h5'}>Your Projects:</Typography>
              </Grid>

              <Grid item xs={12} lg={12}>
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
            <SureDialog
            handleOk={handleRemoveProject}
            showAlert={showRemoveAlert}
            setShowAlert={setShowRemoveAlert}
            topic={removeProjectName}
            />
          </Grid>
        </Container>
      )
    }

export default Overview
