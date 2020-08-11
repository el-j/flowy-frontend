import React from "react";
import { FlowChartWithState, INodeDefaultProps } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'
import { createProject, uploadProjectData, removeProject, apiUrl, projectDir, serverUrl, serverPort } from '../../../../tools/fetchApi'


const Outer = styled.div`
   background-color:#fff;
  max-width: 500px;
  display:block;
  word-break: break-all;
`

const Inner = styled.div`
  padding: 30px;
`

const PointWrapper = styled.div`
  background: #fff;
  border: 4px solid #dadada;
  width: 200px;
  height: 200px;
  border-radius: 100%;
`

const PointInner = styled.div`
  transform: translate(5px,40px);
  text-align: center;
  width:180px;
  height: 140px;

`
const DecisionWrapper = styled.div`
  transform: rotate(45deg);
  background: #dadada;
  width: 200px;
  height: 200px;
`

const DecisionInner = styled.div`
  transform: translate(20px,40px) rotate(-45deg);
  text-align: center;
  width:180px;
  height: 140px;

`

const CustomInnerNode = ({node,config},props) => {
  // console.log(node.path)
  let thisProjectDir = projectDir
  let thisPicUrl = `${thisProjectDir}/${node.path}`
  if (node.path === "/no_image.png") {
    thisProjectDir = `${serverUrl}:${serverPort}`
    thisPicUrl = `${thisProjectDir}${node.path}`
    // console.log(thisProjectDir);
  }
  switch (node.displayType) {
    case 'decision':
    return (
        <DecisionWrapper>
          <DecisionInner>
          <h5>{node.name}</h5>
          <p>{node.text}</p>
          <p className="figure-caption text-center" style={{padding: '4px',
          margin: 0,
          transform: 'translate(20px,10px )',
          position: 'absolute',
          zIndex: 1000}}><i >Display Type: {node.displayType}<br /> NodeId: {node.id}</i></p>
          </DecisionInner>
        </DecisionWrapper>
    )
      break;

      case 'point':
      return (
          <PointWrapper>
            <PointInner>
            <h5>{node.name}</h5>
            <p>{node.text}</p>
            <p className="figure-caption text-center" style={{padding: '4px',
            margin: 0,
            transform: 'translate(40px,10px )',
            position: 'absolute',
            zIndex: 1000}}><i >Display Type: {node.displayType}<br /> NodeId: {node.id}</i></p>
            </PointInner>
          </PointWrapper>
      )
        break;

    default:
    return (
    <Outer id={node.id} >
      <div style={{display:'block', width: '100%'}}>
      <img src={`${thisPicUrl}`} style={{width: 'inherit'}} />
      </div>
      <Inner>
      <h5>{node.name}</h5>
      <p>{node.text}</p>

      </Inner>
      <p className="figure-caption" style={{padding: '4px',
      margin: 0,
      transform: 'translateY(10px)',
      position: 'absolute',
      zIndex: 1000}}><i >Display Type: {node.displayType}<br /> NodeId: {node.id}</i></p>
    </Outer>
    )
  }

}

export default CustomInnerNode
