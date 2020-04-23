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

const AddNode = (props) => {
  // console.log(props);

  return(<>
    <SidebarItem
    itemRef={props.itemRef}
    handleConfigureNode={props.onClick}
    node={props.node}
    />

    </>)
}

const Sidebar = ({items, itemRef, handleSave,handleConfigureNode,newItem, selected}) => {
  // console.log(selected)
  return(<StyledSidebar>
    <Inner>
      <p>Save the current working State</p>
      <Button className={'btn-block'} onClick={(e)=>handleSave(e)}>Save</Button>
    </Inner>

     {selected.type
        ? <Message>
            <div>Type: {selected.type}</div>
            <div>ID: {selected.id}</div>
            <br/>
            {/*
              We can re-use the onDeleteKey action. This will delete whatever is selected.
              Otherwise, we have access to the state here so we can do whatever we want.
            */}

          </Message>
        : <Message>Click on a Node, Port or Link</Message> }


     <AddNode
     onClick={handleConfigureNode}
     node={{...newItem}}
     itemRef={itemRef}
     />

   </StyledSidebar>)}

   // <TreeView items={items} />

   export default Sidebar
