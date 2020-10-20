import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteIcon from '@material-ui/icons/Delete';

import { projectDir } from '../../tools/fetchApi'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const ProjectCard = ({project, key, openProject, removeProject}) => {

  const classes = useStyles();

  let preview = project.files.find(file => {
    if(file.type === 'png') {
      return(file)
      }
  })
  // console.log(project);
  if (!preview) {
    preview = {filename:'no_image',type:'png'}
  }
  return(<Grid container justify="center" className={'projectCard'} style = {{
                backgroundImage: preview.filename!=='no_image'?`url(${projectDir}/${project.name}/${preview.filename}.${preview.type})`:null,
                backgroundSize: 'cover',
              }}>
          <Grid item xs={12} className={'projectOverviewTextElements'}>
            <h3>{project.name}</h3>
            <p>{project.info}</p>
          </Grid>

            <Button  variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<LaunchIcon />}
               onClick={()=>openProject(project.projectId)}>Open Project</Button>

            <Button variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={()=>removeProject(project.projectId)}>Delete Project</Button>

        </Grid>
    )
}



const YourProjects = ({projects,inkey,openProject,removeProject}) => {
return(

    <>
    <Grid container justify="center" xs={12} spacing={4}>
  {(Object.keys(projects).length !== 0)?(
    Object.keys(projects).map((project,key) => {
        return(
          <Grid item key={'project'+key+project.name} xs={12} lg={6} className={'projectCardWrapper'}>
            <ProjectCard project={projects[project]} openProject={openProject} removeProject={removeProject}/>
        </Grid>
          )
      })):(<>
            <Grid item key={'noproject'}>
              <h5>you do not have any Projects yet or there is a problem with the server connection ...</h5>
            </Grid>
            </>)
    }</Grid>

    </>
    )
}

export default YourProjects
