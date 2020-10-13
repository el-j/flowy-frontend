import React from 'react';
import styled from 'styled-components'

import Button from 'react-bootstrap/Button';


const Inner = styled.div`
  padding: 20px 10px;
  display:block;
  left:0;
  `
const Outer = styled.div`
  top: 2rem;
  position: fixed;
  left: 0;
  z-index:900;
`
const OuterBottom = styled.div`
  bottom: 0.25rem;
  position: fixed;
  right: 375px;
  z-index:900;
`


const LeftPanel = ({
createNewNode,
handleSave,
handlePrint
}) => {
  return(<>
    <Outer>
      <Inner>
        <Button id="addNewNode" className={'btn-block btn-node-add btn-md'} onClick={(e)=>createNewNode(e)}>+</Button>
        <Button id="addNewDecisionNode" className={'btn-block btn-decision-add btn-md'} onClick={(e)=>createNewNode(e)}></Button>
        <Button id="addNewPointNode" className={'btn-block btn-point-add btn-md'} onClick={(e)=>createNewNode(e)}>+</Button>
      </Inner>
    </Outer>
    <OuterBottom>
    <Inner>
      <Button className={'btn-block'} onClick={(e)=>handleSave(e)}>Save</Button>
    </Inner>
    </OuterBottom>
  { /*
    <Inner>
      <p>Print the current working State</p>
      <Button className={'btn-block'} onClick={handlePrint}>Print</Button>
   </Inner>
   */}

    </>)
}


export default LeftPanel
