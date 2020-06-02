import React, {useState} from 'react';

import styled from 'styled-components'
import Button from 'react-bootstrap/Button';

import Sidebar from '../SideBar'

const Outer = styled.div`
  background-color:#fff;
  width: 350px;
  position: fixed;
  /* bottom: 20px; */

  height: 100%;
  right: 0;
  z-index:900;
`

const Inner = styled.div`
  padding: 30px;

  display:block;
  left:0;
  background: #fafafa;
`
const RightPanel = ({
  items,
  newItem,
  selected,
  handleSave,
  handleChange,
  handleAddPort,
  handleDeletePort,
  handlePrint,
  chart,
  chartRef
}) => {
  return(<Outer>

        <Sidebar
          items={items}
          newItem={newItem}
          selected={selected}
          handleChange={handleChange}
          handleAddPort={handleAddPort }
          handleDeletePort={handleDeletePort }
          chart={chart}
          handlePrint={handlePrint}
          />
          <Inner>
            <p>Save the current working State</p>
            <Button className={'btn-block'} onClick={(e)=>handleSave(e)}>Save</Button>
          </Inner>

          <Inner>
            <p>Print the current working State</p>
            <Button className={'btn-block'} onClick={handlePrint}>Print</Button>
          </Inner>

    </Outer>)
}


export default RightPanel
