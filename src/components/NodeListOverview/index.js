import React from 'react';
import styled from 'styled-components'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

// import CheckBox from '../CheckBox'

import { projectDir,serverUrl,serverPort } from '../../tools/fetchApi'

const NodeCard =({nodes,handleSelected}) => {
  return Object.keys(nodes).map(node => {
    console.log(node);
    return (
      <Grid item xs={12}>
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
          backgroundColor: `rgba(0,0,0,0.4)`
      }}>
          <Typography>{node.substring(4)}: {nodes[node].name}</Typography>
          <p>{nodes[node].displayType}</p>
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
  return(   <Grid container className={classes.root} spacing={1}>
      <Grid item xs={12}>

         {
           //console.log(project)
         }
          <Grid item xs={10}>
            <Input
              placeholder='Your Node Name'
              aria-label={project.name}
              aria-describedby={project.name}
              id="changeProjectName"
              value={project.name}
              onChange={e => handleChange(e)}
            />
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <input
              rows="2"
              placeholder='Your Description of the node'
              aria-label={project.description}
              aria-describedby={project.description}
              id="changeProjectDescription"
              value={project.description}
              onChange={e => handleChange(e)}
              type='textarea'
            />
            </Grid>
          </Grid>

        {Object.keys(chart.nodes).length > 0? (
          <Grid container>
            <Grid item xs={6}>
            <h2>Nodes:  {Object.keys(chart.nodes).length}</h2>
            </Grid>
          </Grid>):
          (<Grid container><Grid item xs={4}>
            <h2>Nodes:</h2>
            </Grid>
            <Grid item xs={6}>
            <p>no Nodes in Project</p>
            </Grid></Grid>)
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
</Grid>
)}

export default NodeListOverview
