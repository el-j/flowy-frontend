import React, {useState} from 'react';

import styled from 'styled-components'

import Sidebar from '../SideBar'

const Outer = styled.div`
  background-color:#fff;
  max-width: 300px;
  position: fixed;
  /* bottom: 20px; */
  height: 100%;
  right: 0px;
  z-index:6000;
  display:block;
  word-break: break-all;
`


const Options = ({handleSave,items}) => {
  return(<Outer>

    <Sidebar items={items} handleSave={handleSave}/>
    </Outer>)
}


export default Options
