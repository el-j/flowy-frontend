import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import CustomNodePreviewEdit from '../FlowChart/Nodes/CustomNodePreviewEdit'

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



const NewItemOverlay = ({handleChange,value,submit,show,handleClose,handleDeletePort, node,itemRef,handleAdd }) => {
  // const [thisnode,setThisnode] = useState(node)
  // const [showModal, setShowModal] = useState(show)
    // useEffect(() => {
    //   console.log(selected.type);
    //   if (selected.type) {
    //       console.log('we have selected', selected.id);
    //       let thisSelectedNode = Object.keys(chart.nodes).filter(node => {
    //         if (node === selected.id) {
    //           return node
    //         }
    //       })
    //       console.log("the selected node",chart.nodes[thisSelectedNode[0]]);
    //       setThisnode(chart.nodes[thisSelectedNode[0]])
    //
    //   }else {
    //     console.log("NOTHING SELECTED:",node);
    //     setThisnode(node)
    //   }
    // },[node])

    // useEffect(() => {
    //   setShowModal(show)
    // },[show])

    return(
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Configure New Node </Modal.Title>

        <Dropdown style={{marginLeft: '1rem'}}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            NodeType: {node.type}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Default Node</Dropdown.Item>
            <Dropdown.Item>Decision</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Header>
      <Modal.Body>
          {(Object.keys(node).length > 0)?(

          <StyledNodePreviewRow as={Row} className="justify-content-center">
            <Col lg={{span: 3}}>
              <Row>
                <Col lg={4}>
                  <h6>Inputs</h6></Col>
                <Col >
                  <Button
                    id={'addInput'}
                    style={{height:'2rem', lineHeight:'1rem'}}
                    className={'btn-block'}
                    onClick={handleAdd}>
                    +
                  </Button>
                </Col>
              </Row>
              <PortList
                  thisnode={node}
                  type='input'
                  handleDeletePort={handleDeletePort}
                />
            </Col>
            <StyledNodePreviewCol as={Col} lg={5}  className="text-center">
              <CustomNodePreviewEdit thisnode={node} ref={itemRef} handleChange={handleChange}/>
            </StyledNodePreviewCol>
            <Col lg={{span: 3}}>
              <Row>
                <Col lg={4}>
                  <h6>Outputs</h6>
                </Col>
                <Col >
                  <Button
                  id={'addOutput'}
                  style={{height:'2rem', lineHeight:'1rem'}}
                  className={'btn-block'}
                  onClick={handleAdd}>
                  +
                  </Button>
                </Col>
              </Row>
              <PortList
                thisnode={node}
                type='output'
                handleDeletePort={handleDeletePort}
                />
            </Col>
          </StyledNodePreviewRow>
          )
            :null}

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
  </Modal>)
}


export default NewItemOverlay
