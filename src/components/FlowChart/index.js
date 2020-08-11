import React, { useEffect, useState } from "react";

import { FlowChart,  LinkDefault, INodeDefaultProps } from "@mrblenny/react-flow-chart";
import { cloneDeep, mapValues } from 'lodash'
import CustomNode from './Nodes/CustomNode'
import CustomInnerNode from './Nodes/CustomNode/CustomInnerNode'
import CustomPort from './Nodes/CustomNode/CustomPort'
import CustomLink from './Nodes/CustomNode/CustomLink'
import styled from 'styled-components'


const MyFlowChart = React.forwardRef((props,ref) => {
    let chartData = cloneDeep(props.chartData)
    let smartRoutingState = props.smartRouting
    return (
      <div ref={ref} id={props.id} style={{
        display:"block",
        position:"absolute",
        top:0,
        left:0,
        bottom:0,
        right:0
      }}>
      <FlowChart
      callbacks={props.stateActions}
      Components={{
        Node: CustomNode,
        NodeInner:CustomInnerNode,
        Port: CustomPort,
        Link: CustomLink
      }}
      chart={chartData}
      config={{
        smartRouting: smartRoutingState,
        showArrowHead: true
      }}
      />
      </div>
  )
})


export default MyFlowChart
