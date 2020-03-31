import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const NewProject = ({handleChange,handleSubmit, value,handleCreateNewProject}) => {
  return (
      <>
      <Row style={{marginTop:'2rem'}}>
        <Col>
          <h2>New Project</h2>
        </Col>
      </Row>
      <Row>
        <Col>
        <InputGroup className="mb-3" >
          <FormControl
            placeholder="New Project Name"
            aria-label="New Project Name"
            id="newProjectName"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            value={value}
          />
          <InputGroup.Append>
            <input
              placeholder="+"
              aria-label="+"
              aria-describedby="upload files"
              id="uploadFiles"
              onChange={handleCreateNewProject}
              type="file"
              multiple
            />
            <label htmlFor="uploadFiles" className={'btn btn-outline-secondary'}>+</label>

          </InputGroup.Append>
        </InputGroup>
        </Col>
      </Row>
    </>)
}
// <form encType="multipart/form-data" method="post">
// </form>

export default NewProject
