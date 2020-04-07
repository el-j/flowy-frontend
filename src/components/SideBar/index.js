import React, {useState} from 'react';
import styled from 'styled-components'
import SidebarItem from './SidebarItem'
import Button from 'react-bootstrap/Button';

import TreeView from '../TreeView'

const StyledSidebar = styled.div`
  width: 350px;
  background: white;
  position:absolute;
  display: block;
  overflow-y: scroll;
  overflow-x: hidden;
  right: -15px;
  top:0;
  height: 100%;
`

const Inner = styled.div`
  padding: 30px;
  margin-top:56px;
  display:block;
  left:0;
  background: #fafafa;
`

const Message = styled.div`
margin: 10px;
padding: 10px;
background: rgba(0,0,0,0.05);
`

const Sidebar = ({items, handleSave}) => {
  return(<StyledSidebar>
    <Inner>
      <p>Save the current working State</p>
      <Button className={'btn-block'}onClick={(e)=>handleSave(e)}>Save</Button>
    </Inner>
     <Message>
       no message here
     </Message>

   </StyledSidebar>)}

   // <TreeView items={items} />

   export default Sidebar
