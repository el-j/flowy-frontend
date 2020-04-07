import React, {useState} from 'react';
import styled from 'styled-components'
import SidebarItem from './SidebarItem'
import Button from 'react-bootstrap/Button';

const StyledSidebar = styled.div`
  width: 300px;
  background: white;
  position:absolute;
  display: block;
  overflow-y: scroll;
  right:0;
  top:0;
  max-height: 100%;
`

const Inner = styled.div`
  padding: 30px;
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
       Drag and drop these items onto the canvas.
     </Message>
     {Object.keys(items).map((item,key) => {
       console.log(items[item].id,item,key)
      return(
        <SidebarItem
         name={items[item].name}
         type={items[item].type}
         ports={items[item].ports}
         properties={ {
           custom: 'property',
         }}
       />)
     })}

   </StyledSidebar>)}

   export default Sidebar
