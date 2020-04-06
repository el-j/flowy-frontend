import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const api = 'http://localhost:4000'

const YourProjects = ({projects,inkey,openProject,removeProject}) => {
  return(<>
    <Row key={`projectheadline${inkey}`} style={{marginTop:'2rem'}}>
      <Col>
        <h2>Your Projects</h2>
      </Col>
    </Row>
    <Row key={`projectshere${inkey}`}>
    {projects?(
      (Object.keys(projects).length !== 0)?(
        Object.keys(projects).map((project,key) => {
        let preview = projects[project].files.find(file => {
              if(file.type === 'png') {
              return(file)
              }
        })
        return(
            <Col key={'projects'+key+inkey} lg={6} style={{backgroundColor:'#fefefe', padding:'8px', textAlign:'left'}}>
              <Button variant="custom" className={'btn-block btn-primary projectOverview'} onClick={()=>openProject(projects[project].name)} style={{textAlign:'left'}}>
                <Row>
                  <Col lg={8} className={'projectOverviewTextElements'}>
                    <h3>{projects[project].name}</h3>
                    <p>{projects[project].info}</p>
                  </Col>
                  <Col lg={4} className={'projectOverviewPrevImg align-middle'}>
                  <img src={`${api}/${project}/${preview.filename}.${preview.type}`}/>

                  </Col>
                </Row>
                <Button variant="danger" onClick={()=>removeProject(projects[project].name)} style={{textAlign:'left'}}>Delete Project</Button>
              </Button>
            </Col>
          )
      })):(<>
            <Col key={'noproject'}>
              <h5>you do not have any Projects yet or there is a problem with the server connection ...</h5>
            </Col>
            </>)
          ):null
    }
    </Row>
  </>)
}

export default YourProjects
