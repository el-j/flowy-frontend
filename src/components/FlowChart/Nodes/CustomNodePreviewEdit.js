import React, {useState, useEffect} from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CustomNode from './CustomNode'
import CustomInnerNodeEdit from './CustomNode/CustomInnerNodeEdit'
import CustomPort from './CustomNode/CustomPort'


const Placeholder = () => (<Col lg="1" key={'nokey'} style={{transform:'translate(-25%,10px)'}}>
    <div style={{width:'1px',height:'24px'}}></div>
    </Col>)

const CustomNodePreviewEdit = React.forwardRef((props, ref) =>{
let thisnode = props.thisnode
// console.log(thisnode)
return (<>
  <CustomNode node={{...thisnode}} ref={ref} style={{position:'relative'}}>
  <Row className="justify-content-center">
      {
      Object.keys(thisnode.ports).length > 0 ? (
        Object.keys(thisnode.ports).map((port,key) => {
          if (thisnode.ports[port].type === 'input') {
            return (
              <Col lg="1" key={key} style={{transform:'translate(-25%,10px)'}}>
                <CustomPort port={{...thisnode.ports[port]}} isDefault={'true'}/>
              </Col>
              )}
              // else if (thisnode.ports[port].type !== 'input'){
              // return <Placeholder />
              // }
            })
        ):(null)
      }
  </Row>
  <Row className="justify-content-center">
  <CustomInnerNodeEdit type='screen' node={{...thisnode}} handleChange={props.handleChange} />
  </Row>
  <Row className="justify-content-center">
    {
    Object.keys(thisnode.ports).length > 0 ? (
      Object.keys(thisnode.ports).map((port,key) => {
        if (thisnode.ports[port].type === 'output') {
          return (
            <Col lg="1" key={key} style={{transform:'translate(-25%,-10px)'}}>
              <CustomPort port={{...thisnode.ports[port]}} isDefault={'true'}/>
            </Col>)
          }
          // else {
          //   return <Placeholder />
          // }
        })
      ):(null)
    }
  </Row>
  </CustomNode>
  </>
)
})


export default CustomNodePreviewEdit
