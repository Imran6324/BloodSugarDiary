import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const EditNav = () => {
  return (
    <Nav
      variant="tabs"
      border="dark"
      defaultActiveKey="/profileedit"
      className="nav-borders"
    >
      <Nav.Item>
        <LinkContainer to="/profileedit" replace>
          <Nav.Link href="#" eventKey="link-1" target="__blank">
            Profile
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/profileedit/medicineedit" replace>
          <Nav.Link href="#" eventKey="link-2" target="__blank">
            Medicine
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/profileedit/carepoints" replace>
          <Nav.Link href="#" eventKey="link-3" target="__blank">
            Care Points
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/profileedit/appointment" replace>
          <Nav.Link href="#" eventKey="link-4" target="__blank">
            Appointments
          </Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
};

export default EditNav;
