import React, { Component } from "react";
import "./App.css";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import Home from "./Home";
import CreateApiKey from "./CreateApiKey";
import CreateRole from "./CreateRole";
import ManageApiKey from "./ManageApiKey";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.options = [
      {
        name: "Create an Api Key",
        route: "createApiKey",
        target: CreateApiKey
      },
      {
        name: "Create a Role",
        route: "createRole",
        target: CreateRole
      },
      {
        name: "Manage an Api Key",
        route: "manageApiKey",
        target: ManageApiKey
      }
    ];
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Navbar inverse>
              <Navbar.Header>
                <LinkContainer to="/">
                  <Navbar.Brand>Emodb User Access Control</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>
                  {this.options.map((option, index) => {
                    return (
                      <LinkContainer to={"/" + option.route} key={index}>
                        <NavItem eventKey={index}>{option.name}</NavItem>
                      </LinkContainer>
                    );
                  })}
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Route exact path="/" component={Home} />
            {this.options.map((option, key) => (
              <Route
                exact
                key={key}
                path={"/" + option.route}
                component={option.target}
              />
            ))}
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
