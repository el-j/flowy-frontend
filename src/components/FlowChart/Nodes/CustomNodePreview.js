import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CustomNode from './CustomNode'
import CustomInnerNode from './CustomNode/CustomInnerNode'
import CustomPort from './CustomNode/CustomPort'


const CustomNodePreview = React.forwardRef((props, ref) =>{
let thisnode = props.thisnode
return (<>
  <CustomNode node={{...thisnode}} ref={ref} style={{position:'relative'}}>
  <Row className="justify-content-center">
      {
      Object.keys(thisnode.ports).filter((port,key) => {
        if (thisnode.ports[port].type === 'input') {
          return (
            <Col lg="1" key={key} style={{transform:'translate(-25%,10px)'}}>
              <CustomPort port={{...thisnode.ports[port]}} isDefault={'true'}/>
            </Col>
            )}})
      }
  </Row>
  <CustomInnerNode type='screen' node={{...thisnode}} />
  <Row className="justify-content-center">
    {
    Object.keys(thisnode.ports).filter((port,key) => {
      if (thisnode.ports[port].type === 'output') {
        return (
          <Col lg="1" key={key} style={{transform:'translate(-25%,-10px)'}}>
            <CustomPort port={{...thisnode.ports[port]}} isDefault={'true'}/>
          </Col>)
        }})
    }
  </Row>
  </CustomNode>
  </>
)
})


export default CustomNodePreview
