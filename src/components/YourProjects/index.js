import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const api = 'http://localhost:4000'

const YourProjects = ({projects,inkey}) => {
  return(<>
    <Row key={`projectheadline${inkey}`} style={{marginTop:'2rem'}}>
      <Col>
        <h2>Your Projects</h2>
      </Col>
    </Row>
    <Row key={`projectshere${inkey}`}>

    {projects?(
      (projects.length !== 0)?(
      Object.keys(projects).map((project,key) => {

      return(
            <Col key={'projects'+key+inkey} lg={6} style={{backgroundColor:'#fefefe', padding:'8px', textAlign:'left'}}>
              <Button className={'btn-block btn-primary projectOverview'} style={{textAlign:'left'}}>
                <Row>
                  <Col lg={8} className={'projectOverviewTextElements'}>
                    <h3>{projects[project].name}</h3>
                    <p>{projects[project].info}</p>
                  </Col>
                  <Col lg={4} className={'projectOverviewPrevImg align-middle'}>
                  {projects[project].files&&projects[project].files.length>=1?
                    <img src={`${api}/${project}/${projects[project].files[0].filename}`}/>:null
                    }
                  </Col>
                </Row>
              </Button>
            </Col>
          )
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
