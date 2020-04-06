import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components'


const Outer = styled.div`
  background-color:#fff;
  max-width: 300px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index:6000;
  display:block;
  word-break: break-all;
`

const Inner = styled.div`
  padding: 30px;
`

const Options = ({handleSave}) => {
  return(<Outer><Button onClick={(e)=>handleSave(e)}>Save</Button> </Outer>)
}


export default Options
