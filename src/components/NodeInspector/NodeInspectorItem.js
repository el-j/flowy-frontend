import React, {useState} from 'react';
import { INode, REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'
import CustomNodePreview from '../FlowChart/Nodes/CustomNodePreview'

const Outer = styled.div`
  margin: 0.25rem 0.5rem ;
  padding: 0.25rem 0.5rem;
  background: #dadada;
  cursor: move;
  border-radius: 1rem;
`
const Inner = styled.div`
  padding: 0.5rem;
  background: #dadada;
  cursor: move;
`

export interface ISidebarItemProps {
  type: string,
  ports: INode.ports,
  properties?: any,
  name: string
}

const NodeInspectorItem = ({ node,itemRef,handleConfigureNode, }) => {
  let type = node.type
  let ports = node.ports
  let properties = node.properties


  return (
    <Outer
      onClick={handleConfigureNode}
      draggable={true}
      onDragStart={ (event) => {
        event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({ type, ports, properties }))
      } }
    >
    <CustomNodePreview thisnode={node} ref={itemRef}/>

    </Outer>
  )
}

export default NodeInspectorItem
