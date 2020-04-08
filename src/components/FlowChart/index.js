import React from "react";
import { FlowChartWithState, INodeDefaultProps } from "@mrblenny/react-flow-chart";
import CustomNode from './Nodes/CustomNode'
import CustomInnerNode from './Nodes/CustomNode/CustomInnerNode'

const FlowChart = React.forwardRef((props,ref) => {
  let chartData = props.chartData
    return (<FlowChartWithState
              ref={ref}
              initialValue={chartData}
              config={{
              }}
              Components={{
                Node: CustomNode,
                NodeInner:CustomInnerNode
              }}
              />
  )
})

export default FlowChart
