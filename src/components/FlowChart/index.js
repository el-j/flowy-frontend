import React from "react";
import { FlowChartWithState, INodeDefaultProps } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'

// import simpleExample from './simpleExample.js'

const Outer = styled.div`
  background-color:#fff;
  max-width: 300px;
  display:block;
  word-break: break-all;
`

const Inner = styled.div`
  padding: 30px;
`

const DecisionOuter = styled.div`
  background-color:#dadada;
  width: 200px;
  height: 200px;
  display:block;
  word-break: break-all;
  transform: rotate(45deg);

  /* max-height: 200px; */
`

const DecisionInner = styled.div`
  padding: 20px;
  transform: translate(0px,40px) rotate(-45deg)
`

const NodeOuterCustom = ({node, config}) => {
  return (
    <div>
    gaga
    </div>
  )
}
/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */
const NodeInnerCustom = ({ node, config }) => {
  // console.log(node);
  switch (node.type) {
    case 'decision':
    return (
      <DecisionOuter>
        <div>
        <DecisionInner>
        <h5>{node.text}</h5>
        <p>{node.type} <i>{node.id}</i></p>
        </DecisionInner>
        </div>
      </DecisionOuter>
    )
      break;

    default:
    return (
    <Outer>
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


const FlowChart = ({chartData}) => {
  return (<FlowChartWithState initialValue={chartData} Components={{
            NodeInner: NodeInnerCustom,
            NodeOuter: NodeOuterCustom
          }} />
  )
}

export default FlowChart
