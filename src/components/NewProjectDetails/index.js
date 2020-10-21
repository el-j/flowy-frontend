import React from 'react';
import Grid from '@material-ui/core/Grid';

import Input from '@material-ui/core/Input';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const NewProjectDetails = ({handleRemove, handleChange, newProject, onSubmit}) => {
  // console.log(onSubmit);

  return(
    <>
    <Grid container style={{marginTop:'2rem'}}>
      <Grid item>
        <Typography variant={'h2'}>New Project</Typography>
      </Grid>
    </Grid>
    <Grid container>
      <Grid item>
        <Input
          placeholder={newProject.name}
          aria-label={newProject.name}
          id="newProjectName"
          aria-describedby="basic-addon2"
          readOnly
          value={newProject.name}
        />

          <Button variant="outline-secondary" onClick={handleRemove}>-</Button>


      </Grid>
    </Grid>
    <Grid item className="mb-3 custom-file">
      <Input
        placeholder="Sketch File"
        aria-label="Sketch File"
        aria-describedby="basic-addon2"
        id="newSketch"
        onChange={handleChange}
        type="file"
        multiple
        label="Sketch File"
      />

    </Grid>
    <Grid className="mb-3 custom-file" >
      <Input
        placeholder="Mermaid File"
        aria-label="Mermaid File"
        aria-describedby="basic-addon2"
        id="newMMD"
        onChange={handleChange}
        type="file"
        className="custom-file-input"
        label="Mermaid File"
      />

    </Grid>
    <Grid className="mb-3 custom-file">
      <Input
        placeholder="Textmanagement XML"
        aria-label="Textmanagement XML"
        aria-describedby="basic-addon2"
        id="newXML"
        onChange={handleChange}
          type="file"
          label="Textmanagement XML"
      />
    </Grid>
        <Button type="submit" variant="outline-secondary" onClick={(e)=>onSubmit(e)}>Upload + Create</Button>
    </>

  )
}

export default NewProjectDetails
