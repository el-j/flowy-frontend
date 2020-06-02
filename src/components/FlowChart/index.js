import React, { useEffect, useState } from "react";

import { FlowChartWithState, FlowChart, INodeDefaultProps } from "@mrblenny/react-flow-chart";
import { cloneDeep, mapValues } from 'lodash'
import CustomNode from './Nodes/CustomNode'
import CustomInnerNode from './Nodes/CustomNode/CustomInnerNode'
import CustomPort from './Nodes/CustomNode/CustomPort'

const MyFlowChart = React.forwardRef((props,ref) => {
    let chartData = cloneDeep(props.chartData)
    return (
      <div ref={ref}>
      <FlowChart
      callbacks={props.stateActions}
      Components={{
        Node: CustomNode,
        NodeInner:CustomInnerNode,
        // Port: CustomPort
      }}
      chart={chartData}
      // config={{ smartRouting: true }}
      />
      </div>
  )
})


export default MyFlowChart
