import React, {useState} from 'react';
import styled from 'styled-components'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const StyledNodeListItem = styled.div`
  border-radius: 4px;
  min-height: 48px;
  margin-left: 1rem;
  margin-top: 0.25rem;
  margin-right: 0rem;
  margin-bottom: 0.25rem;
  background: #dadada;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0.35rem 1rem;
  overflow: hidden;
  transition: all 0.5s;
  &:after {
    border-radius: 4px;
    margin-left: 2rem;
    margin-top: 0.25rem;
    margin-right: 1rem;
    margin-bottom: 0.25rem;
    content: '';
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 1;
    background-color:#000;

  }
  &:hover {
    transition: all 0.5s;
    opacity: 0.8
  }
`

const ProjectRowTitle = styled.div`
  margin-left: 1rem;
  margin-right: 0;
  margin-top: 66px;
  padding-right: 3rem;
`


const StyledNodeListRow = styled.div`
    overflow-y: auto;
    white-space: nowrap;
    max-height: 77vh;
    overflow-x: hidden;
    margin-right: 0px;
`

const ProjectRow = styled.div`
  margin-left: 1rem;
  margin-right: 0;
  margin-top: 0.5rem;
  padding-right: 3rem;
`
const StyledH6 = styled.h6`
z-index:10;
  word-break: break-word;
  overflow: hidden;
  white-space: pre-wrap;
  color: #fff;
  font-weight: 700;
`

const StyledP = styled.p`
  z-index:10;
  color: #fff;

  `


const StyledInputDescription = styled.textarea`
  width: inherit;
  border: none;
  font-size: 1rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #dadada;
`
const StyledInputTitle = styled.input`
  width: inherit;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #dadada;
  font-size: 1.5rem;
`

const Outer = styled.div`
  background-color:#fff;
  width: 350px;
  position: fixed;
  /* bottom: 20px; */

  height: 100%;
  left: 0;
  z-index:900;
`


const LeftPanel = ({
project,
chart,
handleChange,
handleSelected
}) => {
  return(<Outer>
    <Row>
     {
       //console.log(project)
     }
      <ProjectRowTitle as={Col} lg={12}>
        <StyledInputTitle
          placeholder='Your Node Name'
          aria-label={project.name}
          aria-describedby={project.name}
          id="changeProjectName"
          value={project.name}
          onChange={e => handleChange(e)}
        />
      </ProjectRowTitle>
    </Row>
    <Row>
      <ProjectRow as={Col} lg={12}>
          <StyledInputDescription
          rows="2"
          placeholder='Your Description of the node'
          aria-label={project.description}
          aria-describedby={project.description}
          id="changeProjectDescription"
          value={project.description}
          onChange={e => handleChange(e)}
          type='textarea'
        />
      </ProjectRow>
    </Row>
    {Object.keys(chart.nodes).length > 0? (
      <Row>
      <ProjectRow as={Col} lg={6}>
      <h5>Nodes:</h5>
      </ProjectRow>
      <ProjectRow as={Col} lg={4}>
      <p>Total: {Object.keys(chart.nodes).length}</p>
      </ProjectRow>
      </Row>):
      (<Row><ProjectRow as={Col} lg={4}>
        <h5>Nodes:</h5>
        </ProjectRow>
        <ProjectRow as={Col} lg={6}>
        <p>no Nodes in Project</p>
        </ProjectRow></Row>)
      }
    <StyledNodeListRow as={Row}>
      {Object.keys(chart.nodes).length > 0? (
        Object.keys(chart.nodes).map(node => {
          // console.log(node);
          return (
            <Col lg={12} className='align-self-center'>
              <StyledNodeListItem
              id={node}
              onClick={e=>{
                let nowSelected = {
                  type:chart.nodes[node].type,
                  id: node
                }
                handleSelected(nowSelected)
              }}
              style= {{
                backgroundImage: `url(${chart.nodes[node].path})`,
                backgroundSize: 'cover',
            }}>
                <StyledH6> {chart.nodes[node].name}</StyledH6>
                <StyledP className='figure-caption'>  {chart.nodes[node].text}</StyledP>
              </StyledNodeListItem>
            </Col>
          )

        })):null

      }
    </StyledNodeListRow>



    </Outer>)
}


export default LeftPanel
