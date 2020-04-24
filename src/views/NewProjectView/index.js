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

import { createProject, uploadProjectData, removeProject, api } from '../../components/fetchApi'
import { loadProject, loadFiles, saveProject } from '../../components/fetchApi'
import useFetchApi from '../../components/fetchApi/useFetchApi.js'




const Outer= styled.div`
  position:absolut;
  margin-top:100px;
`

const emptyProject = (name) => {
  return ({
    projectId: name,
    name: name,
    description: '',
    mmd: '',
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
  const [uploaded,setUploaded] = useState(false)
  const [createProgress,setCreateProgress] = useState(false)
  const [imagePreviewUpload, setImagePreviewUpload] = useState([])
  const [mermaidPreview, setMermaidPreview] = useState('')

  const handleChange = (e) => {
    const temp = e.target.value
    switch (e.target.id) {
      case 'newProjectName':
              setNewProject({...newProject, name:temp, projectId:temp})
        break;
      case 'newProjectDescription':
              setNewProject({...newProject, description:temp})
        break;
      case 'newProjectMmd':
              setNewProject({...newProject, mmd:temp})
              setMermaidPreview(temp)
        break;
    }
  }

  const handleOpenProject = (projectName) => {
    let path = `/project/:${projectName}`;
    navigate(path);
    }

  const _handleDeleteImage = (e) => {
      console.log(e.target.id, newProject.files, imagePreviewUpload);
      let thisone = e.target.id
      let index = imagePreviewUpload.filter(img => img.name !== thisone)

      let newTemp = Array.from(newProject.files)
      let test = newTemp.filter(file => file.name !== thisone)
      setImagePreviewUpload(index)
      setNewProject({...newProject, files: test})
      console.log(newProject.files,imagePreviewUpload);
  }

  const _handleMmdChange = (e) => {
      e.preventDefault();
      console.log(e.target.files[0],newProject.files);
      if (e.target.files) {
        let temp = newProject.files
        temp.push(e.target.files[0])

        setNewProject({...newProject, files: temp })
        console.log("after we set the new files with temp",newProject, imagePreviewUpload);
        const reader = new FileReader();
        reader.onloadend = (content => {
          setMermaidPreview(reader.result)
        })
        // reader.addEventListener('error');
        reader.readAsText(e.target.files[0]);
      }
    }
  const _handleImageChange = (e) => {
      e.preventDefault();
      if (e.target.files) {
        let temp = newProject.files

       /* Get files in array form */
       const files = Array.from(e.target.files);
       /* Map each file to a promise that resolves to an array of image URI's */
       Promise.all(files.map(file => {
          temp.push(file)
            console.log(file.name);
           return (new Promise((resolve,reject) => {
               const reader = new FileReader();
               reader.addEventListener('load', (ev) => {
                   resolve({prev:ev.target.result, name:file.name});
               });
               reader.addEventListener('error', reject);
               reader.readAsDataURL(file);
           }));
       }))
       .then(images => {
          setNewProject({...newProject,files:temp})
           /* Once all promises are resolved, update state with image URI array */
          setImagePreviewUpload(...imagePreviewUpload, images)
       }, error => {
           console.error(error);
       });
     }
  }

  const handleSubmit = event => {
      event.preventDefault()
       var formData = new FormData();
       let files = newProject.files
       let name = newProject.name
       let projectId = newProject.projectId
       let description = newProject.description
       let mermaid = mermaidPreview
       // setNewProject({...newProject, files: files})
       for (var i = 0; i < files.length; i++) {
         formData.append('file',files[i])
         formData.append('filename',files[i].name)
       }
       formData.append('projectName',name)
       formData.append('projectId',projectId)
       formData.append('projectDescription',description)
       formData.append('projectMermaid',mermaid)
       uploadProjectData(formData,name).then(result =>{
         setUploaded(true)
         setCreateProgress(true)
         handleOpenProject(name)
       } ,(error) => {
               setUploaded(false)
               setCreateProgress(true)
             })
   }

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
        <InputGroup>
          <input
              placeholder="+"
              aria-label="+"
              aria-describedby="upload files"
              id="uploadImageFiles"
              onChange={_handleImageChange}
              type="file"
              multiple
            />
            <label
              htmlFor="uploadImageFiles"
              className={'btn-block btn btn-outline-secondary'}
              >
              Upload Image Files
            </label>
        </InputGroup>
        <Form.Text className="text-muted">
          Upload your project images
        </Form.Text>
      </Form.Group>
      {(imagePreviewUpload !== undefined && imagePreviewUpload.length > 0) ? <>
        <Row>
        {imagePreviewUpload.map((img,key) => {
        return(<Col lg={3} onClick={_handleDeleteImage} key={img.name}><img id={img.name} style={{display:'inline-block', width: 'inherit'}} src={`${img.prev}`}/></Col>)
        })}
        </Row>

      </>:<>no images uploaded</>}
      <Form.Group controlId="projectMermaid">
        <Form.Label>Project Mermaid (mmd)</Form.Label>
          <InputGroup>
            <input
              placeholder="+"
              aria-label="+"
              aria-describedby="upload files"
              id="uploadMmdFile"
              onChange={_handleMmdChange}
              type="file"
            />
            <label
              htmlFor="uploadMmdFile"
              className={'btn-block btn btn-outline-secondary'}
              >
              Project Mermaid (mmd)
            </label>
          </InputGroup>
          {console.log(mermaidPreview)}
          {mermaidPreview ?   <Form.Control
              as="textarea"
              rows="5"
              placeholder="New Project Description"
              aria-label="New Project Description"
              id="newProjectMmd"
              aria-describedby="basic-addon2"
              onChange={handleChange}
              value={mermaidPreview}
            />:null}
        <Form.Text className="text-muted">
        The Name of your Project
        </Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
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
