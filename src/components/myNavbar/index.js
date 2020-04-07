import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {A} from 'hookrouter';

const Fixit = styled.div`
  position:fixed;
  width: 100%;
  z-index:10000;
`


const MyNavbar = () => (
  <Fixit>
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="/">Navbar</Navbar.Brand>
      <Nav className="mr-auto">
        <A href="/">Overview</A>
        <A href="/project/:projectName">Load Project</A>

      </Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-info">Search</Button>
      </Form>
    </Navbar>
  </Fixit>
)

export default MyNavbar
