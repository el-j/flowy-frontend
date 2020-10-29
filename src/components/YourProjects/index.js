import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

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
  return(<Grid container className={'projectCard'} style = {{
                backgroundImage: preview.filename!=='no_image'?`url(${projectDir}/${project.name}/${preview.filename}.${preview.type})`:null,
                backgroundSize: 'cover',
              }}
              // onClick={()=>openProject(project.projectId)}
              >
          <Grid item xs={12} className={'projectOverviewTextElements'}>
            <Typography variant={'h4'}>{project.name}</Typography>
            <Typography variant={'p'}>{project.description}</Typography>
          </Grid>
          <Button variant="contained"
            color="secondary"
            className={classes.button}
            startIcon={<DeleteIcon />}
            onClick={()=>removeProject(project.projectId)}>Delete Project</Button>

          <Button  variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<LaunchIcon />}
             onClick={()=>openProject(project.projectId)}>Open Project</Button>


        </Grid>
    )
}



const YourProjects = ({projects,inkey,openProject,removeProject}) => {
return(

    <>
    <Grid container xs={12} spacing={1}>
  {(Object.keys(projects).length !== 0)?(
    Object.keys(projects).map((project,key) => {
        return(
          <Grid item key={'project'+key+project.name} xs={12} sm={6} md={6} lg={4} className={'projectCardWrapper'}>
            <ProjectCard project={projects[project]} openProject={openProject} removeProject={removeProject}/>
        </Grid>
          )
      })):(<>
            <Grid item key={'noproject'}>
              <Typography variante={'h5'}>you do not have any Projects yet or there is a problem with the server connection ...</Typography>
            </Grid>
            </>)
    }</Grid>

    </>
    )
}

export default YourProjects
