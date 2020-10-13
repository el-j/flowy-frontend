import React from "react";
import { Navbar, Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';
// import {A} from 'hookrouter';

const Fixit = styled.div`
  position:fixed;
  max-width: 350px;
  z-index:1000;
  opacity: 0.5;
`


const MyNavbar = ({name}) => {
  if (name) {
    return(<Fixit>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="/">{name}</Navbar.Brand>
      </Navbar>
    </Fixit>  )
  }
  return (<Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">flowy</Navbar.Brand>
      <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-info">Search</Button>
      </Form>

    </Navbar>)
}

export default MyNavbar
