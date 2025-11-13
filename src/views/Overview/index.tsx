import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
/*bootstrap imports */
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { createProject, uploadProjectData, removeProject } from '../../tools/fetchApi';
import useFetchApi from '../../tools/fetchApi/useFetchApi';

import { NewProjectInput, YourProjects } from '../../components';
import { Projects, SearchResults } from '../../types';

const Outer = styled.div`
  position: absolute;
  margin-top: 100px;
`;

interface OverviewProps {
  searchResults: SearchResults;
}

interface NewProjectState {
  name: string;
  projectId: string;
  files: string[];
}

const Overview: React.FC<OverviewProps> = ({ searchResults }) => {
  const navigate = useNavigate();

  const myData = useFetchApi<Projects>('getProjects');
  const [projects, setProjects] = useState<Projects>({});
  const [newProject, setNewProject] = useState<NewProjectState>({ name: '', projectId: '', files: [] });
  const [isLoaded, setIsLoaded] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [createProgress, setCreateProgress] = useState(false);

  useEffect(() => {
    if (Object.keys(searchResults).length >= 1) {
      setProjects(searchResults);
    } else if (myData && typeof myData !== 'boolean') {
      setProjects(myData);
    }
    setIsLoaded(true);
  }, [myData, searchResults]);

  const handleOpenProject = (projectName: string) => {
    const path = `/project/:${projectName}`;
    navigate(path);
  };

  const handleNewProject = (projectName: string) => {
    const path = `/newproject/:${projectName}`;
    navigate(path);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const temp = e.target.value;
    setNewProject({ projectId: temp, name: temp, files: [] });
  };

  const handleCreateEmptyProject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    createProject(newProject.projectId).then(
      (result) => {
        setIsLoaded(true);
        setCreateProgress(true);
        handleNewProject(newProject.projectId);
      },
      (error) => {
        console.error('Error creating project:', error);
        setProjects({});
        setNewProject({ name: '', projectId: '', files: [] });
        setIsLoaded(false);
      }
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const filesInput = target.files as FileList;
    const formData = new FormData();
    const files = filesInput;
    const { name, projectId } = newProject;

    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }
    formData.append('projectName', name);
    formData.append('projectId', projectId);

    uploadProjectData(formData, projectId).then(
      (result) => {
        setProjects(result);
        setUploaded(true);
        setCreateProgress(false);
      },
      (error) => {
        console.error('Error uploading project data:', error);
        setProjects({});
        setUploaded(false);
        setCreateProgress(false);
      }
    );
  };

  const handleRemoveProject = (projectName: string) => {
    removeProject(projectName).then(
      (result) => {
        setProjects(result);
        setIsLoaded(true);
      },
      (error) => {
        console.error('Error removing project:', error);
        setProjects({});
        setIsLoaded(false);
      }
    );
  };

  return (
    <Container>
      <Row>
        <Col lg={12}>
          <Outer>
            <NewProjectInput
              handleChange={handleChange}
              value={newProject.name}
              handleCreateEmptyProject={handleCreateEmptyProject}
              handleSubmit={handleSubmit}
            />
          </Outer>
        </Col>
      </Row>
      <Row>
        <Col>
          {projects && isLoaded ? (
            <YourProjects
              key="yourprojects"
              projects={projects}
              openProject={handleOpenProject}
              removeProject={handleRemoveProject}
            />
          ) : (
            <></>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Overview;
