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
`

const DarkBox = styled.div`
background-color: #fff;
max-width: 300px;
display: block;
word-break: break-all;

`


const DecisionInner = styled.div`
  padding: 20px;
  transform: translate(0px,40px) rotate(-45deg)
`


/**
 * Create the custom component,
 * Make sure it has the same prop signature
 */

const NodeInnerCustom = ({node,config},props) => {
  switch (node.type) {
    case 'decision':
    return (
      <DecisionOuter>
        <DecisionInner>
        <h5>{node.text}</h5>
        <p>{node.type} <i>{node.id}</i></p>
        </DecisionInner>
      </DecisionOuter>
    )
      break;

    default:
    return (
    <Outer id={node.id} pos={{x:node.position.x, y:node.position.y}}>
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


/*
NOT WORKIN AS NOT FITTING CONNECOTRS AND LINKS ANYMORE!
*/
// const NodeCustom = React.forwardRef((props, ref) => {
//   let node = props.node
//   let children = props.children
//   let otherProps = props
//   console.log(props);
//   if (node.type === 'decision') {
//     return (
//       <DecisionOuter ref={ref} {...otherProps}>
//         {children}
//       </DecisionOuter>
//     )
//   } else {
//     return (
//       <DarkBox ref={ref} {...otherProps}>
//         {children}
//       </DarkBox>
//     )
//   }
// })


const FlowChart = React.forwardRef((props,ref) => {
  let chartData = props.chartData
    return (<FlowChartWithState
              ref={ref}
              initialValue={chartData}
              config={{
              }}
              Components={{
                // Node: NodeCustom,
                NodeInner:NodeInnerCustom
              }}
              />
  )
})

export default FlowChart
