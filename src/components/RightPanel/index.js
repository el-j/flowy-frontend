import React, {useState} from 'react';

import styled from 'styled-components'
import Button from 'react-bootstrap/Button';

import NodeInspector from '../NodeInspector'

const Outer = styled.div`
  background-color:#fff;
  max-width: 350px;
  position: fixed;
  /* bottom: 20px; */

  height: 100%;
  right: 0;
  z-index:900;
`

const UiShowHide = styled.div`
  height:100%;
  background:#dadada;
  width:16px;
  display:block;
  position: absolute;
  top:0;
  left:-16px;
  &:after{
    content: '';
    z-index:1000;
    position:absolute;
    top:50%;
    left:2px;
    width: 0px;
    height: 0px;
    -webkit-transform:rotate(180deg);
    border-style: solid;
    border-width: 6px 12px 6px 0;
    border-color: transparent #eee transparent transparent;}
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
  handleShowHideRight,
  handleChangePortLabel,
  handleSelected,
  chart,
  project,
  chartRef,
  showHidePanelRight,
  uploadRef,
  changePicture,
  createNewNode,
}) => {
  return(<Outer>
    { showHidePanelRight===true ?(
      <>

        <NodeInspector
          items={items}
          newItem={newItem}
          selected={selected}
          handleChange={handleChange}
          handleAddPort={handleAddPort }
          handleDeletePort={handleDeletePort }
          handleChangePortLabel={handleChangePortLabel}
          handleSelected={handleSelected}
          chart={chart}
          handlePrint={handlePrint}
          uploadRef={uploadRef}
          changePicture={changePicture}
          project={project}
          />
    
          <UiShowHide onClick={handleShowHideRight} />
        </>
        ):<UiShowHide onClick={handleShowHideRight}
              style={{transform:'rotate(180deg)'}}
          />
            }
    </Outer>)
}


export default RightPanel
