import React from 'react';
import Grid from '@material-ui/core/Grid';

import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

const NewProjectInput = ({handleChange,handleSubmit, value,handleCreateNewProject,handleCreateEmptyProject}) => {
  return (
      <Grid container>
      <Grid container>
        <Grid item xs={10} >
          <h2>New Project</h2>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={10}>
          <Input
            label={'New Project Name'}
            placeholder="New Project Name"
            aria-label="New Project Name"
            id="newProjectName"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={value}
          />
          <Button onClick={handleCreateEmptyProject}  className={'btn btn-outline-secondary'}>+</Button>
        </Grid>
      </Grid>
    </Grid>)
}

// <form encType="multipart/form-data" method="post">
// </FormGroup>

export default NewProjectInput
