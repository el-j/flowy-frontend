import React from "react";
import { Navbar, NavbarBrand, Form, Button, Input } from 'reactstrap';
import styled from 'styled-components';
import { NavbarProps } from '../../types';

const Fixit = styled.div`
  position: fixed;
  max-width: 350px;
  z-index: 1000;
  opacity: 0.5;
`;

const MyNavbar: React.FC<NavbarProps> = ({ handleSearch, projectName }) => {
  if (projectName) {
    return (
      <Fixit>
        <Navbar dark>
          <NavbarBrand href="/" className="mr-auto">
            {projectName}
          </NavbarBrand>
        </Navbar>
      </Fixit>
    );
  }
  
  return (
    <div>
      <Navbar dark expand="lg">
        <NavbarBrand href="/">flowy</NavbarBrand>
        <Form inline>
          <Input 
            type="search" 
            placeholder="Search" 
            id="searchBar" 
            className="mr-lg-2" 
            onChange={handleSearch}
          />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default MyNavbar;
