import React from "react";
import { FlowChartWithState, INodeDefaultProps } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

const Outer = styled.div`
   background-color:#fff;
  max-width: 300px;
  display:block;
  word-break: break-all;
`

const Inner = styled.div`
  padding: 30px;
`

const DecisionWrapper = styled.div`
  transform: rotate(45deg);
  background: #dadada;
  width: 200px;
  height: 200px;
`

const DecisionInner = styled.div`
  transform: translate(20px,40px) rotate(-45deg);
  text-align: center;
  width:180px;
  height: 140px;

`

const CustomInnerNodeEdit = ({node,config,handleChange,handlePictureChange},props) => {
  switch (node.displayType) {
    case 'decision':
    return (
        <DecisionWrapper>
          <DecisionInner>
          <h5>{node.text}</h5>
          <p>{node.type} <i>{node.id}</i></p>
          </DecisionInner>
        </DecisionWrapper>
    )
      break;

    case 'point':
    return (
        <DecisionWrapper>
          <DecisionInner>
          <h5>{node.text}</h5>
          ITS A POINT
          </DecisionInner>
        </DecisionWrapper>
    )
      break;
    default:
    return (

    <Outer id={node.id} >
      <Inner>
      <Form.Group>
        <Form.Row>
          <Col>
          <InputGroup>
            <input
              placeholder="+"
              aria-label="+"
              aria-describedby="upload files"
              id="changeNodeImage"
              onChange={e => handleChange(e,node.id)}
              type="file"
            />
            <label
              htmlFor="changeNodeImage"
              className={'btn-block btn btn-outline-secondary'}
              >
          Change Image
            </label>
          </InputGroup>

          </Col>
        </Form.Row>
      </Form.Group>
        <Form.Group controlId='changeNodeName'>
          <Form.Row>
            <Col>
              <Form.Control
              size="sm"
              type="text"
              placeholder="Node Name"
              value={node.name}
              onChange={e => handleChange(e,node.id)}
            />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group controlId='changeNodeDescription'>
          <Form.Row>
            <Col>
              <Form.Control
              size="sm"
              type="text"
              placeholder="description"
              value={node.text}
              onChange={e => handleChange(e,node.id)}
               />
            </Col>
          </Form.Row>
        </Form.Group>


      <i><p>NodeType: {node.type} NodeId: {node.id}</p></i>

      </Inner>
    </Outer>
    )
  }

}

export default CustomInnerNodeEdit
