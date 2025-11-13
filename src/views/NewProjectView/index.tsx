import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
/*bootstrap imports */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { uploadProjectData } from '../../tools/fetchApi';

const Outer = styled.div`
  position: absolute;
  margin-top: 100px;
`;

interface ImagePreview {
  prev: string | ArrayBuffer | null;
  name: string;
}

const emptyProject = (name: string) => {
  return {
    projectId: name,
    name: name,
    description: '',
    mmd: '',
    id: '',
    files: [] as File[],
    projectJson: {
      offset: {
        x: 0,
        y: 0
      },
      nodes: {},
      links: {},
      selected: {},
      hovered: {}
    }
  };
};

const NewProjectView: React.FC = () => {
  const navigate = useNavigate();
  const { projectName } = useParams<{ projectName: string }>();
  const myprojectName = projectName?.slice(1) || '';
  const [newProject, setNewProject] = useState(emptyProject(myprojectName));
  const [_uploaded, setUploaded] = useState(false);
  const [_createProgress, setCreateProgress] = useState(false);
  const [imagePreviewUpload, setImagePreviewUpload] = useState<ImagePreview[]>([]);
  const [mermaidPreview, setMermaidPreview] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const temp = e.target.value;
    switch (e.target.id) {
      case 'newProjectName':
        setNewProject({ ...newProject, name: temp, projectId: temp });
        break;
      case 'newProjectDescription':
        setNewProject({ ...newProject, description: temp });
        break;
      case 'newProjectMmd':
        setNewProject({ ...newProject, mmd: temp });
        setMermaidPreview(temp);
        break;
      default:
        setNewProject({ ...newProject, name: temp, projectId: temp });
    }
  };

  const handleOpenProject = (projectName: string) => {
    const path = `/project/:${projectName}`;
    navigate(path);
  };

  const _handleDeleteImage = (e: React.MouseEvent<HTMLImageElement>) => {
    const thisone = e.currentTarget.id;
    const index = imagePreviewUpload.filter(img => img.name !== thisone);

    const newTemp = Array.from(newProject.files);
    const test = newTemp.filter(file => file.name !== thisone);
    setImagePreviewUpload(index);
    setNewProject({ ...newProject, files: test });
  };

  const _handleMmdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const temp = [...newProject.files, e.target.files[0]];

      setNewProject({ ...newProject, files: temp });
      const reader = new FileReader();
      reader.onloadend = () => {
        setMermaidPreview(reader.result as string);
      };
      reader.readAsText(e.target.files[0]);
    }
  };

  const _handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const temp = [...newProject.files];

      /* Get files in array form */
      const files = Array.from(e.target.files);
      /* Map each file to a promise that resolves to an array of image URI's */
      Promise.all(
        files.map(file => {
          temp.push(file);
          return new Promise<ImagePreview>((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener('load', (ev) => {
              resolve({ prev: ev.target?.result || null, name: file.name });
            });
            reader.addEventListener('error', reject);
            reader.readAsDataURL(file);
          });
        })
      ).then(
        images => {
          setNewProject({ ...newProject, files: temp });
          /* Once all promises are resolved, update state with image URI array */
          setImagePreviewUpload([...imagePreviewUpload, ...images]);
        },
        error => {
          console.error(error);
        }
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formData = new FormData();
    const files = newProject.files;
    const { name, projectId, description } = newProject;
    const mermaid = mermaidPreview;

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i]);
      formData.append('filename', files[i].name);
    }
    formData.append('projectName', name);
    formData.append('projectId', projectId);
    formData.append('projectDescription', description);
    formData.append('projectMermaid', mermaid);
    uploadProjectData(formData, name).then(
      _result => {
        setUploaded(true);
        setCreateProgress(true);
        handleOpenProject(name);
      },
      error => {
        console.error('Error uploading project:', error);
        setUploaded(false);
        setCreateProgress(true);
      }
    );
  };

  return (
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
                <Form.Text className="text-muted">The Name of your Project</Form.Text>
              </Form.Group>

              <Form.Group controlId="projectDescription">
                <Form.Label>Project Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="New Project Description"
                  aria-label="New Project Description"
                  id="newProjectDescription"
                  aria-describedby="basic-addon2"
                  onChange={handleChange}
                  value={newProject.description}
                />
                <Form.Text className="text-muted">Describe your Project with a few words.</Form.Text>
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
                  <label htmlFor="uploadImageFiles" className={'btn-block btn btn-outline-secondary'}>
                    Upload Image Files
                  </label>
                </InputGroup>
                <Form.Text className="text-muted">Upload your project images</Form.Text>
              </Form.Group>
              {imagePreviewUpload !== undefined && imagePreviewUpload.length > 0 ? (
                <>
                  <Row>
                    {imagePreviewUpload.map((img, key) => {
                      return (
                        <Col lg={3} onClick={() => {}} key={img.name}>
                          <img
                            id={img.name}
                            alt={img.name}
                            style={{ display: 'inline-block', width: 'inherit', cursor: 'pointer' }}
                            src={`${img.prev}`}
                            onClick={_handleDeleteImage}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </>
              ) : (
                <>no images uploaded</>
              )}
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
                  <label htmlFor="uploadMmdFile" className={'btn-block btn btn-outline-secondary'}>
                    Project Mermaid (mmd)
                  </label>
                </InputGroup>
                {mermaidPreview ? (
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="New Project Description"
                    aria-label="New Project Description"
                    id="newProjectMmd"
                    aria-describedby="basic-addon2"
                    onChange={handleChange}
                    value={mermaidPreview}
                  />
                ) : null}
                <Form.Text className="text-muted">The Name of your Project</Form.Text>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Outer>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProjectView;
