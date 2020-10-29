import React from "react";
import styled from "styled-components";
// import NodeInspectorItem from './NodeInspectorItem'
import NodeListOverview from "../NodeListOverview";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";

import Spacer from "../Spacer";
// import Dropdown from '@material-ui/core'Dropdown';
// import FormGroup from '@material-ui/core/FormGroup';
// import CustomNodePreviewEdit from '../FlowChart/Nodes/CustomNodePreviewEdit'
import {projectDir, serverUrl, serverPort} from "../../tools/fetchApi";

// import TreeView from '../TreeView'

const StyledInputDescription = styled.textarea`
  width: inherit;
  border: none;
  font-size: 1rem;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #dadada;
`;
const StyledInputTitle = styled(Input)`
  width: inherit;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid #dadada;
  font-size: 1.5rem;
`;

const PictureGrid = styled.div`
  /* margin-top:56px; */
  position: relative;
`;

const PictureGridTitle = styled(Grid)`
  /* margin-left: 1rem;
  margin-right: 0;
  margin-top: 0.5rem;
  padding-right: 3rem; */
`;

const StyledPortList = styled.div`
  padding: 4px 1rem;
`;

const StyledNodeInspector = styled(Grid)`
  /* width: 350px;
  background: white;
  position:absolute;
  display: block; */
  /* overflow-y: scroll; */
  overflow-x: hidden;
  /* top:0;
  height: 100%; */
`;

const PortList = ({
  thisnode,
  type,
  handleDeletePort,
  handleChangePortLabel,
  label
}) =>
  Object.keys(thisnode.ports).map((port, key) => {
    if (thisnode.ports[port].type === type) {
      return (
        <PortListItem
          key={port + key + "o"}
          port={port}
          handleChangePortLabel={handleChangePortLabel}
          label={thisnode.ports[port].properties.value}
          handleDeletePort={handleDeletePort}
        />
      );
    }
  });

const PortListItem = ({
  port,
  key,
  handleDeletePort,
  label,
  handleChangePortLabel
}) => (
  <Grid container>
    <Grid
      item
      xs={12}
      key={port + key}
      style={{
        borderBottom: "2px solid #ddd",
        padding: "0.4rem",
        backgroundGridor: "#eee"
      }}
    >
      <Grid lg="3"> {port} </Grid>
      <Grid lg="6">
        <Input
          Grids="2"
          placeholder="The Link Label"
          aria-label={label}
          aria-describedby={label}
          id={`changePortLabel${port}`}
          value={label}
          onChange={e => handleChangePortLabel(e, port)}
        />
      </Grid>
      <Grid lg="3">
        <Button
          variant={"outline-danger"}
          style={{
            padding: 0,
            height: "1rem",
            width: "1rem",
            lineHeight: "0.4rem"
          }}
          size={"sm"}
          type={"outlined"}
          onClick={() => handleDeletePort(port)}
        >
          -
        </Button>
      </Grid>
    </Grid>
  </Grid>
);

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
  return (
    <StyledNodeInspector container justify="center" spacing={2}>

      {Object.keys(newItem).length > 0 && Object.keys(selected).length > 0 ? (
        <>
          {selected.type === "node" ? (
            <>
              <Grid item id="changeNodeImage" onClick={handleChange}>
                <Input
                  type="file"
                  id="picctureChange"
                  ref={uploadRef}
                  style={{
                    display: "none"
                  }}
                  onChange={changePicture}
                />
                <img
                  alt={`${newItem.name}`}
                  src={
                    newItem.path === "/no_image.png"
                      ? `${serverUrl}:${serverPort}${newItem.path}`
                      : `${projectDir}/${newItem.path}`
                  }
                  style={{
                    width: "100%"
                  }}
                />
              </Grid>

                <Grid item xs={11}>
                  <p> {newItem.id} </p>

                  <TextField
                    fullWidth
                    value={newItem.name}
                    label="Node Name"
                    id="changeNodeName"
                    value={newItem.name}
                    onChange={e => handleChange(e, newItem.id)}
                  />
                  <Spacer spacing={2} />
                  <TextField
                    fullWidth
                    placeholder="Your Description of the node"
                    label={"Node Description"}
                    id="changeNodeDescription"
                    value={newItem.text}
                    onChange={e => handleChange(e, newItem.id)}
                    multiline
                    rowsMax={4}
                  />
                </Grid>

            </>
            ) : (<><Typography variant={"h2"}> Decicsion </Typography></>)}
            <>
              <Grid container item xs={11}>
                <Grid item xs={7}>
                  <Typography variant={"h6"}> Inputs </Typography>
                </Grid>
                <Grid
                  item
                  xs={5}
                >
                  <Button
                    fullWidth
                    id={"addInput"}
                    style={{
                      height: "2rem",
                      lineHeight: "1rem"
                    }}
                    variant={'outlined'}
                    color={'primary'}
                    className={"btn-block"}
                    onClick={handleAddPort}
                  >
                  Add Input +
                </Button>
              </Grid>
            </Grid>
            <Grid container item xs={11}>
                <PortList
                  thisnode={newItem}
                  handleChangePortLabel={handleChangePortLabel}
                  type="input"
                  handleDeletePort={handleDeletePort}
                />
            </Grid>
            <Grid container>
              <Grid lg={3} >
                <Typography variant={"h6"}> Outputs </Typography>
              </Grid>
              <Grid lg={9} >
                <Button
                  id={"addOutput"}
                  style={{
                    height: "2rem",
                    lineHeight: "1rem"
                  }}
                  className={"btn-block"}
                  onClick={handleAddPort}
                >
                  Add Output +
                </Button>
              </Grid>
              <Grid lg={12}>
                <PortList
                  thisnode={newItem}
                  handleChangePortLabel={handleChangePortLabel}
                  type="output"
                  handleDeletePort={handleDeletePort}
                />
              </Grid>
            </Grid>

        </>
          </>
      ) : (
        <NodeListOverview
          project={project}
          chart={chart}
          handleChange={handleChange}
          handleSelected={handleSelected}
          handleShowHide={handleShowHide}
          showHidePanel={showHidePanel}
          handleChangeSmartRouting={handleChangeSmartRouting}
          smartRouting={smartRouting}
        />
      )}
    
    </StyledNodeInspector>
  );
};
// <TreeView items={items} />

export default NodeInspector;
