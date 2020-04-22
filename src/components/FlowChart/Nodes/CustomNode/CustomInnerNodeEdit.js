import React from "react";
import { FlowChartWithState, INodeDefaultProps } from "@mrblenny/react-flow-chart";
import styled from 'styled-components'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
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

const CustomInnerNode = ({node,config},props) => {
  switch (node.type) {
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

    default:
    return (
    <Outer id={node.id} >
      <Inner>
      <Form.Group>
        <Form.Row>
          <Col>
            <Form.Control size="sm" type="text" placeholder="Node Name" type={'file'} value={node.name} />
            <Button block>Add Image</Button>
          </Col>
        </Form.Row>
      </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Control size="sm" type="text" placeholder="Node Name" value={node.name} />
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Control size="sm" type="text" placeholder="description" value={node.description} />
            </Col>
          </Form.Row>
        </Form.Group>


      <i><p>NodeType: {node.type} NodeId: {node.id}</p></i>

      </Inner>
    </Outer>
    )
  }

}

export default CustomInnerNode
