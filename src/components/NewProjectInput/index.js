import React from 'react';
import Grid from '@material-ui/core/Grid';

import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography'
import InputAdornment from '@material-ui/core/InputAdornment';
import AddBoxIcon from '@material-ui/icons/AddBox';

const NewProjectInput = ({handleChange,handleSubmit, value,handleCreateNewProject,handleCreateEmptyProject}) => {
  return (<Grid container spacing={2} alignItems="baseline">
        <Grid item>
        <Typography>Create a new Project:</Typography>
        </Grid>
        <Grid item xs={6}>
          <Input
            label={'New Project Name'}
            placeholder="New Project Name"
            aria-label="New Project Name"
            id="newProjectName"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={value}
            endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleCreateEmptyProject}
              >
                <AddBoxIcon size={'large'}/>
              </IconButton>
            </InputAdornment>
          }
          />

        </Grid>
      </Grid>)
}

// <form encType="multipart/form-data" method="post">
// </FormGroup>

export default NewProjectInput
