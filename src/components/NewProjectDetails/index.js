import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const NewProjectDetails = ({handleRemove, handleChange, newProject, onSubmit}) => {
  // console.log(onSubmit);

  return(
    <>
    <Row style={{marginTop:'2rem'}}>
      <Col>
        <h2>New Project</h2>
      </Col>
    </Row>
    <Row>
      <Col>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={newProject.name}
          aria-label={newProject.name}
          id="newProjectName"
          aria-describedby="basic-addon2"
          readOnly
          value={newProject.name}
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" onClick={handleRemove}>-</Button>
        </InputGroup.Append>
      </InputGroup>
      </Col>
    </Row>
    <div className="mb-3 custom-file">
      <input
        placeholder="Sketch File"
        aria-label="Sketch File"
        aria-describedby="basic-addon2"
        id="newSketch"
        onChange={handleChange}
        type="file"
        multiple
      />
      <label className="custom-file-label" htmlFor="newSketch">Sketch File</label>
    </div>
    <div className="mb-3 custom-file" >
      <input
        placeholder="Mermaid File"
        aria-label="Mermaid File"
        aria-describedby="basic-addon2"
        id="newMMD"
        onChange={handleChange}
        type="file"
        className="custom-file-input"

      />
      <label className="custom-file-label" htmlFor="newMMD">Mermaid File</label>
    </div>
    <div className="mb-3 custom-file">
      <input
        placeholder="Textmanagement XML"
        aria-label="Textmanagement XML"
        aria-describedby="basic-addon2"
        id="newXML"
        onChange={handleChange}
          type="file"
      />
      <label className="custom-file-label" htmlFor="newXML">Textmanagement XML</label>
    </div>

        <Button type="submit" variant="outline-secondary" onClick={(e)=>onSubmit(e)}>Upload + Create</Button>
    </>

  )
}

export default NewProjectDetails
