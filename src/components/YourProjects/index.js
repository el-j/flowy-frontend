import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const YourProjects = ({projects}) => {
  return(<>
    <Row key={'projectheadline'} style={{marginTop:'2rem'}}>
      <Col>
        <h2>Your Projects</h2>
      </Col>
    </Row>
    <Row key={'projectsHere'}>
    {projects?(
      (projects.length !== 0)?(
      projects.map((project,key) => {
      return(
        <>
            <Col key={'project'+key} lg={6} style={{backgroundColor:'#fefefe', padding:'8px', textAlign:'left'}}>
              <Button className={'btn-block btn-primary projectOverview'} style={{textAlign:'left'}}>
                <Row>
                  <Col lg={8} className={'projectOverviewTextElements'}>
                    <h3>{project.name}</h3>
                    <p>{project.info}</p>
                    
                  </Col>
                  <Col lg={4} className={'projectOverviewPrevImg align-middle'}>
                    <img src={project.previewImg}/>
                  </Col>
                </Row>
              </Button>
            </Col>
        </>)
    })):(<>
    <Col key={'noproject'}>
      <h5>you do not have any Projects yet or there is a problem with the server connection ...</h5>
    </Col>
    </>)):null
    }
    </Row>
  </>)
}

export default YourProjects
