import React, { useState, useEffect } from 'react';
import { navigate } from "hookrouter";
import styled from 'styled-components'
/*bootstrap imports */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

// import Projects from '../../dataMocks/projects.js'
import {createProject,uploadProjectData, removeProject} from '../../components/fetchApi'
import useFetchApi from '../../components/fetchApi/useFetchApi.js'

import { NewProject, NewProjectDetails, YourProjects } from '../../components'

const Outer= styled.div`
position:absolut;
  margin-top:100px;
`

const Overview = (props) => {
  const myData = useFetchApi('getProjects')
  const [projects,setProjects] = useState()
  const [newProject,setNewProject] = useState({name:'',files:[]})
  const [isLoaded,setIsLoaded] = useState(false)
  const [uploaded,setUploaded] = useState(false)
  const [createProgress,setCreateProgress] = useState(false)

    useEffect(() => {
          setProjects(myData)
          setIsLoaded(true)
    },[myData])

  const handleOpenProject = (projectName) => {
    let path = `/project/:${projectName}`;
    navigate(path);
    }

  const handleChange = (e) => {
    const temp = e.target.value
    setNewProject({name:temp,files:[]})
  }

  const handleCreateNewProject = event => {
    event.persist()
    console.log("CREATE NEW PROJECT NOW >>>> NAME:",newProject);
    createProject(newProject.name).then(result =>{
      console.log("response result",result,result.body,newProject.name,event.target.files)
      setIsLoaded(true)
      setCreateProgress(true)
      handleSubmit(event)

    } ,(error) => {
            console.log("we got error response",error);
            setProjects([])
            setNewProject('')
            setIsLoaded(false)
          })
        }
        const handleCreateEmptyProject = event => {
          event.persist()
          console.log("CREATE EMPTY PROJECT NOW >>>> NAME:",newProject);
          createProject(newProject.name).then(result =>{
            console.log("response result",result,result.body,newProject.name,event.target.files)
            setIsLoaded(true)
            setCreateProgress(true)
            handleOpenProject(newProject.name)

          } ,(error) => {
                  console.log("we got error response",error);
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
       for (var i = 0; i < files.length; i++) {
         formData.append('file',files[i],files[i].name)
       }
       formData.append('projectName',name)
       uploadProjectData(formData,name).then(result =>{
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
    let response = {}
    console.log("REMOVE NEW PROJECT NOW >>>> ",projectName);
    removeProject(projectName).then(result =>{
      console.log("response result",result)
      setProjects(result)
      setIsLoaded(true)
    } ,(error) => {
            console.log("we got error response",error);
            setProjects([])
            setIsLoaded(false)
          })
      }

      return(
          <Container>

            <Row>
              <Col lg={12}>
                <Outer>
                  <NewProject
                    handleChange={handleChange}
                    value={newProject.name}
                    handleCreateNewProject={handleCreateNewProject}
                    handleCreateEmptyProject={handleCreateEmptyProject}
                    handleSubmit={handleSubmit}
                    />
                </Outer>
              </Col>

          </Row>
          <Row>
            <Col>
             {
               projects?<YourProjects
                 key='yourprojects'
                 projects={projects}
                 openProject={handleOpenProject}
                 removeProject={handleRemoveProject}
                 />:<></>
            }

            </Col>
        </Row>

        </Container>
      )
    }

export default Overview
