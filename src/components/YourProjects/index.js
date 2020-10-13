import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import { projectDir } from '../../tools/fetchApi'

const ProjectCard = ({project, key, openProject, removeProject}) => {

  let preview = project.files.find(file => {
    if(file.type === 'png') {
      return(file)
      }
  })
  // console.log(project);
  if (!preview) {
    preview = {filename:'placeholder',type:'png'}
  }
  return(<Row className={'projectCard'} style = {{
                backgroundImage: `url(${projectDir}/${project.name}/${preview.filename}.${preview.type})`,
                backgroundSize: 'cover'
              }}>
          <Col lg={12} className={'projectOverviewTextElements'}>
            <h3>{project.name}</h3>
            <p>{project.info}</p>
          </Col>
          <Col lg={6}>
            <Button variant="primary" className={'btn-block'} onClick={()=>openProject(project.projectId)}>Open Project</Button>
          </Col>
          <Col lg={6}>
            <Button variant="danger" className={'btn-block'} onClick={()=>removeProject(project.projectId)}>Delete Project</Button>
          </Col>
        </Row>
    )
}



const YourProjects = ({projects,inkey,openProject,removeProject}) => {
return(
  <Row>
  {(Object.keys(projects).length !== 0)?(
    Object.keys(projects).map((project,key) => {
        return(
          <Col key={'project'+key+project.name} lg={6} className={'projectCardWrapper'}>
            <ProjectCard project={projects[project]} openProject={openProject} removeProject={removeProject}/>
        </Col>
          )
      })):(<>
            <Col key={'noproject'}>
              <h5>you do not have any Projects yet or there is a problem with the server connection ...</h5>
            </Col>
            </>)
    }
    </Row>
    )
}

export default YourProjects
