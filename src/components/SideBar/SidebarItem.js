import React, {useState} from 'react';
import { INode, REACT_FLOW_CHART } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'


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

const SidebarItem = ({ name,type, ports, properties }) => {
  return (
    <Outer
      draggable={true}
      onDragStart={ (event) => {
        event.dataTransfer.setData(REACT_FLOW_CHART, JSON.stringify({ type, ports, properties }))
      } }
    >
    <Inner>
      <h6>{name}</h6>
      <p>{type}</p>
      </Inner>
    </Outer>
  )
}

export default SidebarItem
