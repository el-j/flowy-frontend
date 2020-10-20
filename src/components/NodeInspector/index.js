import React from 'react';
import styled from 'styled-components'
// import NodeInspectorItem from './NodeInspectorItem'
import NodeListOverview from '../NodeListOverview'

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

// import Dropdown from '@material-ui/core'Dropdown';
// import FormGroup from '@material-ui/core/FormGroup';
// import Input from '@material-ui/core/Input';
// import CustomNodePreviewEdit from '../FlowChart/Nodes/CustomNodePreviewEdit'
import {
  projectDir,
  serverUrl,
  serverPort
} from '../../tools/fetchApi'
// import TreeView from '../TreeView'

const StyledNodePreviewGrid = styled.div `
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

const PictureGrid = styled.div `
  /* margin-top:56px; */
  position: relative;
`

const PictureGridTitle = styled.div `
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
  <Grid container key = {
    port + key
  }
  style = {
    {
      borderBottom: '2px solid #ddd',
      padding: '0.4rem',
      backgroundGridor: '#eee'
    }
  } >
  <Grid lg = "3" > {port} </Grid> <
  Grid lg = "6" >  <
  input Grids = "2"
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
  /Grid> <
  Grid lg = "3" >
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
  /Grid> </Grid> <
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
                      PictureGrid id = "changeNodeImage"
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
                      /PictureGrid> <Grid container >
                      <
                      PictureGridTitle as = {
                        Grid
                      }
                      lg = {
                        12
                      } >
                      <
                      p > {
                        newItem.id
                      } < /p> <
                      /PictureGridTitle> <
                      /Grid> <Grid container  >
                      <
                      PictureGridTitle as = {
                        Grid
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
                      /PictureGridTitle> </Grid>


                      <Grid>
                      <
                      PictureGridTitle as = {
                        Grid
                      }
                      lg = {
                        12
                      } >
                      <
                      StyledInputDescription Grids = "2"
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
                      /PictureGridTitle> </Grid> <
                      />):
                      ( < h1 > Decicsion < /h1>)
                      }

                      <
                      StyledNodePreviewGrid as = {Grid} >
                      <
                      Grid lg = {
                        {
                          span: 3
                        }
                      } >
                      <
                      h6 > Inputs < /h6> <
                      /Grid> <
                      Grid lg = {
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
                      /Grid> <
                      Grid lg = {
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
                      /Grid> <
                      /StyledNodePreviewGrid> <StyledNodePreviewGrid as={Grid} >
                      <
                      Grid lg = {
                        {
                          span: 3
                        }
                      } >
                      <
                      h6 > Outputs < /h6> <
                      /Grid> <
                      Grid lg = {
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
                      /Grid> <
                      Grid lg = {
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
                      /Grid> <
                      /StyledNodePreviewGrid></ >
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
