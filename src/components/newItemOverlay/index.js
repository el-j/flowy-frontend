import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import CustomNodePreview from '../FlowChart/Nodes/CustomNodePreview'

import styled from 'styled-components'

const StyledNodePreviewRow = styled.div`
  /* background-color:#dfdfdf; */
  min-height:200px;
  padding: 1rem 0;
`

const StyledPortList = styled.div`
  padding: 4px 1rem;

`

const StyledNodePreviewCol = styled.div`
    background: #dadada;
    width: inherit;
`


const PortList = ({port,key,handleDeletePort}) => (
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



const NewItemOverlay = ({handleChange,value,submit,show,handleClose,handleDeletePort, node,itemRef,handleAdd}) => {
  const [thisnode,setThisnode] = useState({})
  useEffect(() => {
    setThisnode(node)
  },[node])

    return(
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Configure New Node</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          {(Object.keys(thisnode).length > 0)?(

            <StyledNodePreviewRow as={Row} className="justify-content-center">
            <Col lg={{span: 3}}>
            <Row><Col lg={4}>
            <h6>Inputs</h6></Col><Col >
            <Button id={'addInput'} style={{height:'2rem', lineHeight:'1rem'}} className={'btn-block'} onClick={handleAdd}>
            +
            </Button>
            </Col></Row>
            {
            Object.keys(thisnode.ports).map((port,key) => {
              if (thisnode.ports[port].type === 'input') {
                return (
                  <PortList key={port+key+'i'} port={port} handleDeletePort={handleDeletePort}/>
                  )}})
            }


            </Col>
            <StyledNodePreviewCol as={Col} lg={5}  className="text-center">
              <CustomNodePreview thisnode={thisnode} ref={itemRef}/>
            </StyledNodePreviewCol>
            <Col lg={{span: 3}}>
            <Row><Col lg={4}>
            <h6>Outputs</h6></Col><Col >
            <Button id={'addOutput'} style={{height:'2rem', lineHeight:'1rem'}} className={'btn-block'} onClick={handleAdd}>
            +
            </Button>
            </Col></Row>
            {
            Object.keys(thisnode.ports).map((port,key) => {
              if (thisnode.ports[port].type === 'output') {
                return (
                  <PortList key={port+key+'o'} port={port} handleDeletePort={handleDeletePort}/>
                  )}})
            }

            </Col>
          </StyledNodePreviewRow>
          )
            :null}

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
  </Modal>)
}


export default NewItemOverlay
