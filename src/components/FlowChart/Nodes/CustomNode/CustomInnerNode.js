import React from "react";
import { FlowChartWithState, INodeDefaultProps } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'

const Outer = styled.div`
   background-color:#fff;
  max-width: 300px;
  display:block;
  word-break: break-all;
`

const Inner = styled.div`
  padding: 30px;
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
  switch (node.type) {
    case 'decision':
    return (
        <DecisionWrapper>
          <DecisionInner>
          <h5>{node.text}</h5>
          <p>{node.type} <i>{node.id}</i></p>
          </DecisionInner>
        </DecisionWrapper>
    )
      break;

    default:
    return (
    <Outer id={node.id} >
      <div style={{display:'block', width: '100%'}}>
      <img src={node.path} style={{width: 'inherit'}} />
      </div>
      <Inner>
      <h5>{node.name}</h5>
      <p>{node.type} <i>{node.id}</i></p>
      </Inner>
    </Outer>
    )
  }

}

export default CustomInnerNode
