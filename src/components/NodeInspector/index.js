import React from 'react';
import styled from 'styled-components'
// import NodeInspectorItem from './NodeInspectorItem'
import NodeListOverview from '../NodeListOverview'

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
// import Dropdown from 'react-bootstrap/Dropdown';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import CustomNodePreviewEdit from '../FlowChart/Nodes/CustomNodePreviewEdit'
import {
  projectDir,
  serverUrl,
  serverPort
} from '../../tools/fetchApi'
// import TreeView from '../TreeView'

const StyledNodePreviewRow = styled.div `
  padding: 16px;
`

const StyledInputDescription = styled.textarea `
  width: inherit;
  border: none;
  font-size: 1rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #dadada;
`
const StyledInputTitle = styled.input `
  width: inherit;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #dadada;
  font-size: 1.5rem;
`

const PictureRow = styled.div `
  /* margin-top:56px; */
  position: relative;
`

const PictureRowTitle = styled.div `
  margin-left: 1rem;
  margin-right: 0;
  margin-top: 0.5rem;
  padding-right: 3rem;

`

const StyledPortList = styled.div `
  padding: 4px 1rem;

`

const StyledNodeInspector = styled.div `
  /* width: 350px;
  background: white;
  position:absolute;
  display: block; */
  /* overflow-y: scroll; */
  overflow-x: hidden;
  /* top:0;
  height: 100%; */
`


const PortList = ({
  thisnode,
  type,
  handleDeletePort,
  handleChangePortLabel,
  label
}) => (
  Object.keys(thisnode.ports).map((port, key) => {
    if (thisnode.ports[port].type === type) {
      return ( <
        PortListItem key = {
          port + key + 'o'
        }
        port = {
          port
        }
        handleChangePortLabel = {
          handleChangePortLabel
        }
        label = {
          thisnode.ports[port].properties.value
        }
        handleDeletePort = {
          handleDeletePort
        }
        />
      )
    }
  })
)

const PortListItem = ({
  port,
  key,
  handleDeletePort,
  label,
  handleChangePortLabel
}) => ( <
  StyledPortList >
  <
  Row key = {
    port + key
  }
  style = {
    {
      borderBottom: '2px solid #ddd',
      padding: '0.4rem',
      backgroundColor: '#eee'
    }
  } >
  <
  Col lg = "3" > {
    port
  } <
  /Col> <
  Col lg = "6" >  <
  input rows = "2"
  placeholder = 'The Link Label'
  aria-label = {
    label
  }
  aria-describedby = {
    label
  }
  id ={`changePortLabel${port}`}
  value={label}
  onChange = {
    (e) => handleChangePortLabel(e,port)
  }

  >

  <
  /input> <
  /Col> <
  Col lg = "3" >
  <
  Button variant = {
    'outline-danger'
  }
  style = {
    {
      padding: 0,
      height: '1rem',
      width: '1rem',
      lineHeight: '0.4rem'
    }
  }
  size = {
    'sm'
  }
  type = {
    'outlined'
  }
  onClick = {
    () => handleDeletePort(port)
  } >
  -
  <
  /Button> <
  /Col> <
  /Row> <
  /StyledPortList>
)

    const NodeInspector = ({
        items,
        handleSave,
        newItem,
        selected,
        handleAddPort,
        handleDeletePort,
        handleChange,
        handleShowHide,
        showHidePanel,
        uploadRef,
        changePicture,
        handleChangePortLabel,
        project,
        chart,
        handleSelected,
        handleChangeSmartRouting,
        smartRouting
      }) => {
        // console.log(selected)
        return ( < StyledNodeInspector >

            {
              (Object.keys(newItem).length > 0 && Object.keys(selected).length > 0) ? ( <
                > {
                  // console.log(newItem, selected)
                }

                {
                  selected.type === 'node' ? ( < >
                      <
                      PictureRow id = "changeNodeImage"
                      onClick = {
                        handleChange
                      } >
                      <
                      input type = "file"
                      id = "picctureChange"
                      ref = {
                        uploadRef
                      }
                      style = {
                        {
                          display: "none"
                        }
                      }
                      onChange = {
                        changePicture
                      }
                      /> <
                      img
                      alt={`${newItem.name}`}
                      src = {
                        newItem.path === '/no_image.png' ? `${serverUrl}:${serverPort}${newItem.path}` : `${projectDir}/${newItem.path}`
                      }
                      style = {
                        {
                          width: '100%'
                        }
                      }
                      /> <
                      /PictureRow> <
                      Row >
                      <
                      PictureRowTitle as = {
                        Col
                      }
                      lg = {
                        12
                      } >
                      <
                      p > {
                        newItem.id
                      } < /p> <
                      /PictureRowTitle> <
                      /Row> <
                      Row >
                      <
                      PictureRowTitle as = {
                        Col
                      }
                      lg = {
                        12
                      } >
                      <
                      StyledInputTitle placeholder = 'Your Node Name'
                      aria-label = {
                        newItem.name
                      }
                      aria-describedby = {
                        newItem.name
                      }
                      id = "changeNodeName"
                      value = {
                        newItem.name
                      }
                      onChange = {
                        e => handleChange(e, newItem.id)
                      }
                      /> <
                      /PictureRowTitle> <
                      /Row>


                      <
                      Row >
                      <
                      PictureRowTitle as = {
                        Col
                      }
                      lg = {
                        12
                      } >
                      <
                      StyledInputDescription rows = "2"
                      placeholder = 'Your Description of the node'
                      aria-label = {
                        newItem.text
                      }
                      aria-describedby = {
                        newItem.text
                      }
                      id = "changeNodeDescription"
                      value = {
                        newItem.text
                      }
                      onChange = {
                        e => handleChange(e, newItem.id)
                      }
                      type = 'textarea' /
                      >
                      <
                      /PictureRowTitle> <
                      /Row> <
                      />):
                      ( < h1 > Decicsion < /h1>)
                      }

                      <
                      StyledNodePreviewRow as = {
                        Row
                      } >
                      <
                      Col lg = {
                        {
                          span: 3
                        }
                      } >
                      <
                      h6 > Inputs < /h6> <
                      /Col> <
                      Col lg = {
                        {
                          span: 9
                        }
                      } >
                      <
                      Button id = {
                        'addInput'
                      }
                      style = {
                        {
                          height: '2rem',
                          lineHeight: '1rem'
                        }
                      }
                      className = {
                        'btn-block'
                      }
                      onClick = {
                        handleAddPort
                      } >
                      Add Input +
                      <
                      /Button> <
                      /Col> <
                      Col lg = {
                        {
                          span: 12
                        }
                      } >
                      <
                      PortList thisnode = {
                        newItem
                      }
                      handleChangePortLabel={handleChangePortLabel}
                      type = 'input'
                      handleDeletePort = {
                        handleDeletePort
                      }
                      /> <
                      /Col> <
                      /StyledNodePreviewRow> <
                      StyledNodePreviewRow as = {
                        Row
                      } >
                      <
                      Col lg = {
                        {
                          span: 3
                        }
                      } >
                      <
                      h6 > Outputs < /h6> <
                      /Col> <
                      Col lg = {
                        {
                          span: 9
                        }
                      } >
                      <
                      Button id = {
                        'addOutput'
                      }
                      style = {
                        {
                          height: '2rem',
                          lineHeight: '1rem'
                        }
                      }
                      className = {
                        'btn-block'
                      }
                      onClick = {
                        handleAddPort
                      } >
                      Add Output +
                      <
                      /Button> <
                      /Col> <
                      Col lg = {
                        {
                          span: 12
                        }
                      } >
                      <
                      PortList thisnode = {
                        newItem
                      }
                      handleChangePortLabel={handleChangePortLabel}
                      type = 'output'
                      handleDeletePort = {
                        handleDeletePort
                      }
                      /> <
                      /Col> <
                      /StyledNodePreviewRow></ >
                    ):(<NodeListOverview
                      project={project}
                      chart={chart}
                      handleChange={handleChange}
                      handleSelected={handleSelected}
                      handleShowHide={handleShowHide}
                      showHidePanel={showHidePanel}
                      handleChangeSmartRouting={handleChangeSmartRouting}
                      smartRouting={smartRouting}
                      />)}

                </StyledNodeInspector>
)}
                // <TreeView items={items} />

                export default NodeInspector
