import React from "react";
import { INodeDefaultProps } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'


const DecisionOuter = styled.div`
position: absolute;
border-radius: 4px;
min-width: 200px;

`
const DarkBox = styled.div`
  position: absolute;
 border-radius: 4px;
 min-width: 200px;
`

const CustomNode = React.forwardRef((props, ref) => {
  let node = props.node
  let children = props.children
  let otherProps = props
  // console.log("our custom node Props are:",props);
  if (node.type === 'decision') {
    return (
      <DecisionOuter ref={ref} {...otherProps}>
        {children}
      </DecisionOuter>
    )
  } else {
    return (
      <DarkBox ref={ref} {...otherProps}>
        {children}
      </DarkBox>
    )
  }
})

export default CustomNode
