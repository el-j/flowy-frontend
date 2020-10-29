import React from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
// import CheckBox from '../CheckBox'
import Spacer from "../../components/Spacer";
import { projectDir,serverUrl,serverPort } from '../../tools/fetchApi'

const NodeCard =({nodes,handleSelected}) => {
  return Object.keys(nodes).map(node => {
    console.log(node);
    return (
      <Grid item xs={11}>
      <Button
        fullWidth
        key={node}
        id={node}
        onClick={e=>{
          console.log(nodes[node]);
          let nowSelected = {
            displayType:nodes[node].displayType,
            type:nodes[node].type,
            id: nodes[node].id
          }
          handleSelected(nowSelected)
        }}

        style= {{
          backgroundImage: nodes[node].path !== '/no_image.png'?`url(${projectDir}/${nodes[node].path})`:`url(${serverUrl}:${serverPort}${nodes[node].path})`,
          backgroundSize: 'cover',
          backgroundColor: `rgba(0,0,0,0.4)`,
          justifyContent: 'flex-start'
      }}>
      <Grid container direction="row"
  justify="flex-start"
  alignItems="flex-start">
      <Grid item xs={12}>
          <Typography variant={'h6'} align={'left'}>{node.substring(4)}: {nodes[node].name}</Typography></Grid>
          <Grid item xs={1}>
          <Typography variant={'p'} align={'left'}>{nodes[node].displayType}</Typography></Grid>
          </Grid>
        </Button>
</Grid>

    )
  })
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

const NodeListOverview = ({
project,
handleChange,
handleSelected,
handleShowHide,
showHidePanel,
handleChangeSmartRouting,
smartRouting,
}) => {

    const classes = useStyles();
  let chart = project.projectJson
  let nodeNames = Object.keys(chart.nodes)
  return(
    <>
    <Grid container justify="center"  className={classes.root}>
      <Grid item xs={11} >
        <Spacer spacing={1} />
            <TextField
              fullWidth
              label={'Project Name'}
              placeholder='Project Name'
              id="changeProjectName"
              value={project.name}
              onChange={e => handleChange(e)}
            />
      </Grid>
        <Spacer spacing={2} />
      <Grid item xs={11}>
        <TextField
          fullWidth
          rows={2}
          placeholder='Your Description of the node'
          label={"Project Description"}
          id="changeProjectDescription"
          value={project.description}
          onChange={e => handleChange(e)}
          textarea
        />
      </Grid>
      </Grid>
      <Spacer spacing={10} />
      <Grid container justify="center"  className={classes.root}>
        {Object.keys(chart.nodes).length > 0? (
            <Grid item xs={11}>
            <Typography variant={'h5'}>Nodes:  {Object.keys(chart.nodes).length}</Typography>
            </Grid>
          ):
          (<Grid item xs={11}>
            <Typography variant={'h5'}>Nodes: 0</Typography>
            <Typography variant={'p'}>begin to add Nodes to your Projects</Typography>
            </Grid>
          )
          }
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={2}>
              {Object.keys(chart.nodes).length > 0? (
                <NodeCard nodes={chart.nodes} handleSelected={handleSelected}/>):null
              }
            </Grid>
          </Grid>
        </Grid>
        </Grid>
</>
)}

export default NodeListOverview
