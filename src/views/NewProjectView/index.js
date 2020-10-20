import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components'
/*bootstrap imports */
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';

import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormGroup from '@material-ui/core/FormGroup';

import { uploadProjectData } from '../../tools/fetchApi'
// import { loadFiles, saveProject } from '../../tools/fetchApi'
// import useFetchApi from '../../tools/fetchApi/useFetchApi.js'




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
  const history = useHistory();
  const {projectName} = useParams()
  const myprojectName = projectName.slice(1)
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
      default:
        setNewProject({...newProject, name:temp, projectId:temp})
    }
  }

  const handleOpenProject = (projectName) => {
    let path = `/project/:${projectName}`;
    history.push(path);
    }

  const _handleDeleteImage = (e) => {
      // console.log(e.target.id, newProject.files, imagePreviewUpload);
      let thisone = e.target.id
      let index = imagePreviewUpload.filter(img => img.name !== thisone)

      let newTemp = Array.from(newProject.files)
      let test = newTemp.filter(file => file.name !== thisone)
      setImagePreviewUpload(index)
      setNewProject({...newProject, files: test})
      // console.log(newProject.files,imagePreviewUpload);
  }

  const _handleMmdChange = (e) => {
      e.preventDefault();
      // console.log(e.target.files[0],newProject.files);
      if (e.target.files) {
        let temp = newProject.files
        temp.push(e.target.files[0])

        setNewProject({...newProject, files: temp })
        // console.log("after we set the new files with temp",newProject, imagePreviewUpload);
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
            // console.log(file.name);
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
    <Grid container>
      <Grid item lg={12}>
        <Outer>
        <FormGroup>
            <Typography>Project Name</Typography>
              <TextareaAutosize
                placeholder="New Project Name"
                aria-label="New Project Name"
                id="newProjectName"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                value={newProject.name}
                label={'The Name of your Project'}
              />


          <Typography>Project Description</Typography>
            <TextareaAutosize
              as="textarea"
              rows="3"
              placeholder="New Project Description"
              aria-label="New Project Description"
              id="newProjectDescription"
              aria-describedby="basic-addon2"
              onChange={handleChange}
              value={newProject.description}
              label={'Descripe your Project with a few words.'}
            />



        <Typography>Project Images</Typography>

          <Input
              label={'Upload Image Files'}
              placeholder="+"
              aria-label="+"
              aria-describedby="upload files"
              id="uploadImageFiles"
              onChange={_handleImageChange}
              type="file"
              multiple
            />

      </FormGroup>
      {(imagePreviewUpload !== undefined && imagePreviewUpload.length > 0) ? <>
        <Grid container>
        {imagePreviewUpload.map((img,key) => {
        return(<Grid item lg={3} onClick={_handleDeleteImage} key={img.name}><img id={img.name} alt={img.name} style={{display:'inline-block', width: 'inherit'}} src={`${img.prev}`}/></Grid>)
        })}
        </Grid>

      </>:<>no images uploaded</>}

        <FormGroup controlId="projectMermaid">
              <Input
                  label={'Project Mermaid (mmd)'}
                placeholder="+"
                aria-label="+"
                aria-describedby="upload files"
                id="uploadMmdFile"
                onChange={_handleMmdChange}
                type="file"
              />

            {mermaidPreview ?   <TextareaAutosize
                rowsMin={3}
                placeholder="New Project Description"
                aria-label="New Project Description as mermaid"
                id="newProjectMmd"
                aria-describedby="basic-addon2"
                onChange={handleChange}
                value={mermaidPreview}
              />:null}

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </FormGroup>
    </Outer>
    </Grid>
    </Grid>

  )
}

export default NewProjectView
