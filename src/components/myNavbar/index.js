import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';


const MyNavbar = () => (
<>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Navbar</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">MerMaidProject</Nav.Link>
      <Nav.Link href="/textIdToScreen">Textid To Screen</Nav.Link>
      <Nav.Link href="/FlowChart">FlowChart</Nav.Link>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-info">Search</Button>
    </Form>
  </Navbar>
</>
)

export default MyNavbar
