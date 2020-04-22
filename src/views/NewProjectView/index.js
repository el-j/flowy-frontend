import React, { useState, useEffect } from 'react';
import { navigate } from "hookrouter";
import styled from 'styled-components'
/*bootstrap imports */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import { DragDrop } from '@uppy/react'


import { createProject, uploadProjectData, removeProject, api } from '../../components/fetchApi'
import { loadProject, loadFiles, saveProject } from '../../components/fetchApi'
import useFetchApi from '../../components/fetchApi/useFetchApi.js'




const Outer= styled.div`
  position:absolut;
  margin-top:100px;
`

const emptyProject = (name) => {
  return ({
    name: name,
    description: '',
    id: '',
    files:[],
    projectJson:{
      offset: {
        x: 0,
        y: 0
      },
      nodes: {},
      links: {},
      selected: {},
      hovered: {}
  }})
}

const NewProjectView = (props) => {
  console.log(props)
  const myprojectName = props.projectName.slice(1)
  const apiUrl = `loadProject/:${myprojectName}`
  const apiUpload = `${api}/uploadProjectData/:${myprojectName}`
  const [newProject,setNewProject]= useState(emptyProject(myprojectName))

  const handleChange = (e) => {
    const temp = e.target.value
    console.log(e.target.id);
    switch (e.target.id) {
      case 'newProjectName':
              setNewProject({...newProject, name:temp})
        break;
      case 'newProjectDescription':
              setNewProject({...newProject, description:temp})
        break;
      case 'newProjectImages':
              setNewProject({...newProject, images:temp})
        break;
      case 'newProjectMermaid':
              setNewProject({...newProject, mermaid:temp})
        break;
      default:

    }
  }
  const uppy = Uppy({
    meta: { type: 'avatar' },
    restrictions: { maxNumberOfFiles: 1 },
    autoProceed: true
  })
  uppy.use(Tus, { endpoint: apiUpload })

  uppy.on('complete', (result) => {
    console.log(result);
    const url = result.successful[0].uploadURL
    // store.dispatch({
      //   type: 'SET_USER_AVATAR_URL',
      //   payload: { url: url }
      // })
    })

  const handleUploadFiles = () => {


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
         // setUploaded(true)
         // setCreateProgress(false)
       } ,(error) => {
               // setUploaded(false)
               // setCreateProgress(false)
             })
   }
  const handleCreateNewProject = event => {
    event.persist()
    console.log("CREATE NEW PROJECT NOW >>>> NAME:",newProject);
    createProject(newProject.name).then(result =>{
      console.log("response result",result,result.body,newProject.name,event.target.files)
      handleSubmit(event)

    } ,(error) => {
            console.log("we got error response",error);

          })
        }
        console.log(props,newProject)
  return(
    <Container>
    <Row>
      <Col lg={12}>
        <Outer>
          <Form>
            <Form.Group controlId="projectName">
            <Form.Label>Project Name</Form.Label>
              <Form.Control
                placeholder="New Project Name"
                aria-label="New Project Name"
                id="newProjectName"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                value={newProject.name}
              />
            <Form.Text className="text-muted">
            The Name of your Project
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="projectDescription">
          <Form.Label>Project Description</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="New Project Description"
              aria-label="New Project Description"
              id="newProjectDescription"
              aria-describedby="basic-addon2"
              onChange={handleChange}
              value={newProject.description}
            />
          <Form.Text className="text-muted">
          Descripe your Project with a few words.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="projectImages">
        <Form.Label>Project Images</Form.Label>
        <Button className={'btn-block'}>
        Upload Images
        </Button>
        <DragDrop
       uppy={uppy}
       locale={{
         strings: {
           // Text to show on the droppable area.
           // `%{browse}` is replaced with a link that opens the system file selection dialog.
           dropHereOr: 'Drop here or %{browse}',
           // Used as the label for the link that opens the system file selection dialog.
           browse: 'browse'
         }
       }}
     />
        <InputGroup className="mb-3" >
          <Form.Control
            placeholder="New Project Images"
            aria-label="New Project Images"
            id="newProjectImages"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={newProject.files}
          />


          <InputGroup.Append>
            <input
              placeholder="+"
              aria-label="+"
              aria-describedby="upload files"
              id="uploadImageFiles"
              onChange={handleCreateNewProject}
              type="file"
              multiple
            />
            <label htmlFor="uploadImageFiles" className={'btn btn-outline-secondary'}>+</label>
          </InputGroup.Append>
        </InputGroup>
        <Form.Text className="text-muted">
        Upload your project images
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="projectMermaid">
      <Form.Label>Project Mermaid (mmd)</Form.Label>
      <Button className={'btn-block'}>
      Upload Mermaid File
      </Button>

      <InputGroup className="mb-3" >


        <Form.Control
          placeholder="New Project Mermaid"
          aria-label="New Project Mermaid"
          id="newProjectMermaid"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={newProject.files}
        />
        <InputGroup.Append>
          <input
            placeholder="+"
            aria-label="+"
            aria-describedby="upload mmd file"
            id="uploadMmdFile"
            onChange={handleCreateNewProject}
            type="file"
          />
          <label htmlFor="uploadMmdFile" className={'btn btn-outline-secondary'}>+</label>
        </InputGroup.Append>
      </InputGroup>
      <Form.Text className="text-muted">
      The Name of your Project
      </Form.Text>
    </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
        </Form>
    </Outer>
    </Col>
    </Row>
    </Container>
  )
}

export default NewProjectView
