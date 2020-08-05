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
    return (
      <div ref={ref}>
      <FlowChart
      callbacks={props.stateActions}
      Components={{
        Node: CustomNode,
        NodeInner:CustomInnerNode,
        Port: CustomPort,
        Link: CustomLink
      }}
      chart={chartData}
      // config={{ smartRouting: true }}
      />
      </div>
  )
})


export default MyFlowChart
