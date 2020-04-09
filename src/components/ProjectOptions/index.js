import React, {useState} from 'react';

import styled from 'styled-components'

import Sidebar from '../SideBar'

const Outer = styled.div`
  background-color:#fff;
  width: 350px;
  position: fixed;
  /* bottom: 20px; */
  height: 100%;
  left: 0;
  z-index:900;
  display:block;
  word-break: break-all;
`


const Options = ({handleConfigureNode,handleSave,items,newItem}) => {
  return(<Outer>

    <Sidebar items={items} handleSave={handleSave} handleConfigureNode={handleConfigureNode} newItem={newItem}/>
    </Outer>)
}


export default Options
