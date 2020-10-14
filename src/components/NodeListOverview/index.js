import React from 'react';
import styled from 'styled-components'

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// import CheckBox from '../CheckBox'

import { projectDir,serverUrl,serverPort } from '../../tools/fetchApi'

const StyledNodeListItem = styled.div`
  border-radius: 4px;
  // min-height: 16px;a
  margin-left: 1rem;
  margin-top: 0.25rem;
  margin-right: 0rem;
  margin-bottom: 0.25rem;
  background: #dadada;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
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
    background-color: #aab;

  }
  &:hover {
    transition: all 0.5s;
    opacity: 0.8
  }
`

const ProjectRowTitle = styled.div`
  margin-left: 1rem;
  margin-right: 0;
  margin-top: 1rem;
  padding-right: 3rem;
`


const StyledNodeListRow = styled.div`
    overflow-y: auto;
    white-space: nowrap;
    max-height: 80vh;
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
  color: #333;
  font-weight: 700;
  margin: 0;
`

const StyledP = styled.p`
  z-index:10;
  color: #333;

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

const NodeListOverview = ({
project,
handleChange,
handleSelected,
handleShowHide,
showHidePanel,
handleChangeSmartRouting,
smartRouting,
}) => {
  let chart = project.projectJson
  let nodeNames = Object.keys(chart.nodes)
  return(<>

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
        <Col lg={12} key={node} className='align-self-center'>
          <StyledNodeListItem
          id={node}
          onClick={e=>{
            console.log(chart.nodes[node]);
            let nowSelected = {
              displayType:chart.nodes[node].displayType,
              type:chart.nodes[node].type,
              id: chart.nodes[node].id
            }
            handleSelected(nowSelected)
          }}
          style= {{
            // backgroundImage: chart.nodes[node].path !== '/no_image.png'?`url(${projectDir}/${chart.nodes[node].path})`:`url(${serverUrl}:${serverPort}${chart.nodes[node].path})`,
            backgroundSize: 'cover',
        }}>
            <StyledH6>{node.substring(4)}: {chart.nodes[node].name}</StyledH6>
            <StyledP>{chart.nodes[node].displayType.toUpperCase()}</StyledP>
          </StyledNodeListItem>
        </Col>
      )
    })):null
  }
</StyledNodeListRow></>
)}

export default NodeListOverview
