import React, {useState} from 'react';
import styled from 'styled-components'
import SidebarItem from './SidebarItem'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CustomNodePreviewEdit from '../FlowChart/Nodes/CustomNodePreviewEdit'
import { apiUrl, serverUrl, serverPort } from '../../tools/fetchApi'
// import TreeView from '../TreeView'

const StyledNodePreviewRow = styled.div`
  padding: 16px;
`

const StyledInputDescription = styled.textarea`
  width: inherit;
  border: none;
  font-size: 1rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #dadada;
`
const StyledInputTitle = styled.input`
  width: inherit;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #dadada;
  font-size: 1.5rem;
`

const PictureRow = styled.div`
  /* margin-top:56px; */
  position: relative;
`

const PictureRowTitle = styled.div`
  margin-left: 1rem;
  margin-right: 0;
  margin-top: 0.5rem;
  padding-right: 3rem;

`

const StyledPortList = styled.div`
  padding: 4px 1rem;

`

const StyledNodePreviewCol = styled.div`
    background: #dadada;
    width: inherit;

`


const StyledSidebar = styled.div`
  /* width: 350px;
  background: white;
  position:absolute;
  display: block; */
  /* overflow-y: scroll; */
  overflow-x: hidden;
  /* top:0;
  height: 100%; */
`

const Inner = styled.div`
  padding: 30px;

  display:block;
  left:0;
  background: #fafafa;
`

const Message = styled.div`
margin-top:56px;
margin-bottom: 10px;
padding: 10px;
background: rgba(0,0,0,0.05);
`
const PortList = ({thisnode,type,handleDeletePort}) => (
Object.keys(thisnode.ports).map((port,key) => {
  if (thisnode.ports[port].type === type) {
    return (
      <PortListItem key={port+key+'o'} port={port} handleDeletePort={handleDeletePort}/>
      )}})
)
const PortListItem = ({port,key,handleDeletePort}) => (
  <StyledPortList >
  <Row key={port+key} style={{borderBottom:'2px solid #ddd', padding: '0.4rem', backgroundColor:'#eee'}}>
    <Col lg="9">
    {port}
    </Col>
    <Col lg="3">
    <Button
      variant={'outline-danger'}
      style={{padding:0, height: '1rem',width: '1rem', lineHeight:'0.4rem'}} size={'sm'} type={'outlined'}
      onClick={()=>handleDeletePort(port)}
      >
      -
      </Button>
      </Col>
  </Row>
  </StyledPortList>
)
const AddNode = (props) => (
    <SidebarItem
    itemRef={props.itemRef}
    handleConfigureNode={props.onClick}
    node={props.node}
    />)

const Sidebar = ({
  items,
  handleSave,
  newItem,
  selected,
  handleAddPort,
  handleDeletePort,
  handleChange
      }) => {
  // console.log(selected)
  return(<StyledSidebar>

        {(Object.keys(newItem).length > 0 && Object.keys(selected).length > 0)?(
          <>
          {
            // console.log(newItem, selected)
          }

          {selected.type === 'node' ? (<>
        <PictureRow>
          <img src={`${serverUrl}:${serverPort}/${newItem.path}`} style={{
            width: '100%'
          }}/>
        </PictureRow>
        <Row>
          <PictureRowTitle as={Col} lg={12}>
            <p>{newItem.id}</p>
          </PictureRowTitle>
        </Row>
        <Row>
          <PictureRowTitle as={Col} lg={12}>
            <StyledInputTitle
              placeholder='Your Node Name'
              aria-label={newItem.name}
              aria-describedby={newItem.name}
              id="changeNodeName"
              value={newItem.name}
              onChange={e => handleChange(e,newItem.id)}
            />
          </PictureRowTitle>
        </Row>


        <Row>
          <PictureRowTitle as={Col} lg={12}>
              <StyledInputDescription
              rows="2"
              placeholder='Your Description of the node'
              aria-label={newItem.text}
              aria-describedby={newItem.text}
              id="changeNodeDescription"
              value={newItem.text}
              onChange={e => handleChange(e,newItem.id)}
              type='textarea'
            />
          </PictureRowTitle>
        </Row>
        </>):<h1>Decicsion</h1>}
        <StyledNodePreviewRow as={Row}>
          <Col lg={{span: 3}}>
              <h6>Inputs</h6>
           </Col>
           <Col lg={{span: 9}}>
              <Button
                  id={'addInput'}
                  style={{height:'2rem', lineHeight:'1rem'}}
                  className={'btn-block'}
                  onClick={handleAddPort}>
                  Add Input +
              </Button>
            </Col>
            <Col lg={{span: 12}}>
              <PortList
                  thisnode={newItem}
                  type='input'
                  handleDeletePort={handleDeletePort}
                />
            </Col>
            </StyledNodePreviewRow>
            <StyledNodePreviewRow as={Row}>
          <Col lg={{span: 3}}>
                <h6>Outputs</h6>
          </Col>
          <Col lg={{span: 9}}>
                <Button
                    id={'addOutput'}
                    style={{height:'2rem', lineHeight:'1rem'}}
                    className={'btn-block'}
                    onClick={handleAddPort}
                    >
                    Add Output +
                    </Button>
          </Col>
          <Col lg={{span: 12}}>
                <PortList
                  thisnode={newItem}
                  type='output'
                  handleDeletePort={handleDeletePort}
                  />
          </Col>
        </StyledNodePreviewRow></>
        )
          : <>
              {
                // console.log(newItem, selected)
              }
              <PictureRow>
              <img src={newItem.path} style={{
                width: '100%'
              }}/>
              </PictureRow>
              <Row>
                <PictureRowTitle as={Col} lg={12}>
                    <StyledInputDescription
                    rows="1"
                    placeholder='_NewNodeId'
                    aria-label={newItem.id}
                    aria-describedby={newItem.id}
                    id="changeNodeId"
                    value={newItem.id}
                    onChange={e => handleChange(e,newItem.id)}
                    type='text'
                  />
                </PictureRowTitle>
              </Row>
            <Row>
              <PictureRowTitle as={Col} lg={12}>
                <StyledInputTitle
                  placeholder='Your Node Name'
                  aria-label={newItem.name}
                  aria-describedby={newItem.name}
                  id="changeNodeName"
                  value={newItem.name}
                  onChange={e => handleChange(e,newItem.id)}

                />



              </PictureRowTitle>
            </Row>
            <Row>
              <PictureRowTitle as={Col} lg={12}>
                  <StyledInputDescription
                  rows="2"
                  placeholder='Your Description of the node'
                  aria-label={newItem.text}
                  aria-describedby={newItem.text}
                  id="changeNodeDescription"
                  value={newItem.text}
                  onChange={e => handleChange(e,newItem.id)}
                  type='textarea'
                />
              </PictureRowTitle>
            </Row>


          <Message>Click on a Node, Port or Link</Message></>}
     {
     //   <AddNode
     // onClick={handleConfigureNode}
     // node={{...newItem}}
     // itemRef={itemRef}
     // />
   }



   </StyledSidebar>)}

   // <TreeView items={items} />

   export default Sidebar
