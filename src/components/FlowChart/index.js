import React from "react";

import { FlowChartWithState, INodeDefaultProps } from "@mrblenny/react-flow-chart";
import { cloneDeep, mapValues } from 'lodash'
import CustomNode from './Nodes/CustomNode'
import CustomInnerNode from './Nodes/CustomNode/CustomInnerNode'
import CustomPort from './Nodes/CustomNode/CustomPort'

const FlowChart = React.forwardRef((props,ref) => {
  let chartData = cloneDeep(props.chartData)
    return (<FlowChartWithState
      ref={ref}
      Components={{
        Node: CustomNode,
        NodeInner:CustomInnerNode,
        // Port: CustomPort
      }}
      // config={{ smartRouting: true }}
      initialValue={chartData}
              />
  )
})


export default FlowChart
