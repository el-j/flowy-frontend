import React, {useState} from 'react';

import styled from 'styled-components'

import Sidebar from '../SideBar'

const Outer = styled.div`
  background-color:#fff;
  width: 350px;
  position: fixed;
  /* bottom: 20px; */

  height: 100%;
  right: 0;
  z-index:900;
`


const RightPanel = ({
  items,
  newItem,
  selected,
  handleSave,
  handleChange,
  handleAddPort,
  handleDeletePort,
  chart,
}) => {
  return(<Outer>
        <Sidebar
          items={items}
          newItem={newItem}
          selected={selected}
          handleSave={handleSave}
          handleChange={handleChange}
          handleAddPort={handleAddPort }
          handleDeletePort={handleDeletePort }
          chart={chart}
          />
    </Outer>)
}


export default RightPanel
