import React, { Component } from "react";
import "./App.css";
import { Navbar, Nav, NavItem } from "react-bootstrap";

import Home from "./Home";
import CreateApiKey from "./CreateApiKey";

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
        name: "Request an Api Key",
        route: "requestApiKey",
        target: Home
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
