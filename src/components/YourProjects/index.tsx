import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { projectDir } from '../../tools/fetchApi';
import { Project, Projects } from '../../types';

interface ProjectCardProps {
  project: Project;
  openProject: (projectId: string) => void;
  removeProject: (projectId: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, openProject, removeProject }) => {
  let preview = project.files.find(file => file.includes('.png'));
  
  const previewFilename = preview ? preview.replace('.png', '') : 'no_image';
  const previewType = 'png';

  return (
    <Row
      className={'projectCard'}
      style={{
        backgroundImage: previewFilename !== 'no_image' 
          ? `url(${projectDir}/${project.name}/${previewFilename}.${previewType})` 
          : undefined,
        backgroundSize: 'cover',
      }}
    >
      <Col lg={12} className={'projectOverviewTextElements'}>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </Col>
      <Col lg={6}>
        <Button
          variant="primary"
          className={'btn-block'}
          onClick={() => openProject(project.projectId)}
        >
          Open Project
        </Button>
      </Col>
      <Col lg={6}>
        <Button
          variant="danger"
          className={'btn-block'}
          onClick={() => removeProject(project.projectId)}
        >
          Delete Project
        </Button>
      </Col>
    </Row>
  );
};

interface YourProjectsProps {
  projects: Projects;
  inkey?: string;
  openProject: (projectId: string) => void;
  removeProject: (projectId: string) => void;
}

const YourProjects: React.FC<YourProjectsProps> = ({ projects, openProject, removeProject }) => {
  return (
    <Row>
      {Object.keys(projects).length !== 0 ? (
        Object.keys(projects).map((projectKey, index) => {
          return (
            <Col key={'project' + index + projects[projectKey].name} lg={6} className={'projectCardWrapper'}>
              <ProjectCard
                project={projects[projectKey]}
                openProject={openProject}
                removeProject={removeProject}
              />
            </Col>
          );
        })
      ) : (
        <Col key={'noproject'}>
          <h5>you do not have any Projects yet or there is a problem with the server connection ...</h5>
        </Col>
      )}
    </Row>
  );
};

export default YourProjects;
