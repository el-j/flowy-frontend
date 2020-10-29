import React, {useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import styled from "styled-components";
/*bootstrap imports */
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

import Container from "@material-ui/core/Container";

import Input from "@material-ui/core/Input";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import { uploadProjectData, removeProject } from "../../tools/fetchApi";
// import { loadFiles, saveProject } from '../../tools/fetchApi'
// import useFetchApi from '../../tools/fetchApi/useFetchApi.js'
import Spacer from "../../components/Spacer";
import { emptyProject } from "../../models";

const NewProjectView = props => {
  const history = useHistory();
  const {projectName} = useParams();
  const myprojectName = projectName.slice(1);
  const [newProject, setNewProject] = useState(emptyProject(myprojectName));
  const [uploaded, setUploaded] = useState(false);
  const [createProgress, setCreateProgress] = useState(false);
  const [imagePreviewUpload, setImagePreviewUpload] = useState([]);
  const [mermaidPreview, setMermaidPreview] = useState("");

  const handleChange = e => {
    const temp = e.target.value;
    switch (e.target.id) {
      case "newProjectName":
        setNewProject({...newProject, name: temp, projectId: temp});
        break;
      case "newProjectDescription":
        setNewProject({...newProject, description: temp});
        break;
      case "newProjectMmd":
        setNewProject({...newProject, mmd: temp});
        setMermaidPreview(temp);
        break;
      default:
        setNewProject({...newProject, name: temp, projectId: temp});
    }
  };

  const handleOpenProject = projectName => {
    let path = `/project/:${projectName}`;
    history.push(path);
  };

  const handleCancel = (projectName) => {
    removeProject(projectName).then(result =>{
      let path = `/`;
      history.push(path);
  } ,(error) => {})
  }

  const _handleDeleteImage = e => {
    let thisone = e.target.id;
    let index = imagePreviewUpload.filter(img => img.name !== thisone);
    let newTemp = Array.from(newProject.files);
    let test = newTemp.filter(file => file.name !== thisone);
    setImagePreviewUpload(index);
    setNewProject({...newProject, files: test});
  };

  const _handleMmdChange = e => {
    e.preventDefault();
    if (e.target.files) {
      let temp = newProject.files;
      temp.push(e.target.files[0]);
      setNewProject({...newProject, files: temp});
      const reader = new FileReader();
      reader.onloadend = content => {
        setMermaidPreview(reader.result);
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  const _handleImageChange = e => {
    e.preventDefault();
    if (e.target.files) {
      let temp = newProject.files;

      /* Get files in array form */
      const files = Array.from(e.target.files);
      /* Map each file to a promise that resolves to an array of image URI's */
      Promise.all(
        files.map(file => {
          temp.push(file);
          // console.log(file.name);
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener("load", ev => {
              resolve({prev: ev.target.result, name: file.name});
            });
            reader.addEventListener("error", reject);
            reader.readAsDataURL(file);
          });
        })
      ).then(
        images => {
          setNewProject({...newProject, files: temp});
          /* Once all promises are resolved, update state with image URI array */
          setImagePreviewUpload(...imagePreviewUpload, images);
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    var formData = new FormData();
    let files = newProject.files;
    let name = newProject.name;
    let projectId = newProject.projectId;
    let description = newProject.description;
    let mermaid = mermaidPreview;
    // setNewProject({...newProject, files: files})
    for (var i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
      formData.append("filename", files[i].name);
    }
    formData.append("projectName", name);
    formData.append("projectId", projectId);
    formData.append("projectDescription", description);
    formData.append("projectMermaid", mermaid);
    uploadProjectData(formData, name).then(
      result => {
        setUploaded(true);
        setCreateProgress(true);
        handleOpenProject(name);
      },
      error => {
        setUploaded(false);
        setCreateProgress(true);
      }
    );
  };

  return (
    <Container justify="center" spacing={2}>
      <Spacer spacing={2} />
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Typography variant={"h5"}>
              Create Project: {newProject.name}
            </Typography>
            <Spacer spacing={2} />
            <TextField
              fullWidth
              placeholder="Project Name"
              label="Project Name"
              id="newProjectName"
              aria-describedby="basic-addon2"
              onChange={handleChange}
              value={newProject.name}
              label={"Project Name"}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TextField
              id="newProjectDescription"
              label={"Project Description"}
              multiline
              rows={3}
              fullWidth
              placeholder="My Project shows ..."
              onChange={handleChange}
              value={newProject.description ? newProject.description : null}
            />
          </Grid>
        </Grid>
        <Spacer spacing={2} />
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={12} lg={5}>
                <Typography variant={"h5"}>Project Images</Typography>
              </Grid>
              <Grid item xs={12} lg={8}>
                <input
                  accept="image/*"
                  label={"Upload Image Files"}
                  placeholder="+"
                  aria-label="+"
                  aria-describedby="upload files"
                  id="uploadImageFiles"
                  onChange={_handleImageChange}
                  type="file"
                  multiple
                />
                <label htmlFor="uploadImageFiles">
                  <Button
                    variant={"outlined"}
                    color={"primary"}
                    fullWidth
                    component="span"
                  >
                    + upload Pictures
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Spacer spacing={2} />
            <Grid container>
              <Grid item lg={12}>
                {imagePreviewUpload !== undefined &&
                imagePreviewUpload.length > 0 ? (
                  <>
                    <Grid container justify="left" spacing={2}>
                      {imagePreviewUpload.map((img, key) => {
                        return (
                          <Grid
                            item
                            lg={3}
                            onClick={_handleDeleteImage}
                            key={img.name}
                          >
                            <img
                              id={img.name}
                              alt={img.name}
                              style={{
                                display: "inline-block",
                                width: "100%",
                                border: "solid 1px #dadada"
                              }}
                              src={`${img.prev}`}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </>
                ) : (
                  <Grid item lg={3}>
                    <Typography variant={"h7"}>no images uploaded</Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            lg={10}
            container
            spacing={2}
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Button
              color="error"
              variant={"contained"}
              type="submit"
              id={"cancel"}
              onClick={()=>handleCancel(newProject.name)}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              variant={"contained"}
              type="submit"
              onClick={handleSubmit}
            >
              Create Project
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

// <FormGroup controlId="projectMermaid">
//       <Input
//           label={'Project Mermaid (mmd)'}
//         placeholder="+"
//         aria-label="+"
//         aria-describedby="upload files"
//         id="uploadMmdFile"
//         onChange={_handleMmdChange}
//         type="file"
//       />
//
//     {mermaidPreview ?   <TextareaAutosize
//         rowsMin={3}
//         placeholder="New Project Description"
//         aria-label="New Project Description as mermaid"
//         id="newProjectMmd"
//         aria-describedby="basic-addon2"
//         onChange={handleChange}
//         value={mermaidPreview}
//       />:null}
// </FormGroup>
export default NewProjectView;
