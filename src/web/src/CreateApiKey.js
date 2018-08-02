import React, { Component } from "react";
import $ from "jquery";
import { Grid, FormGroup, Button, ButtonToolbar, Alert } from "react-bootstrap";
import { config } from "./Config";

import FieldGroup from "./FieldGroup";
import ConditionalFieldGroup from "./ConditionalFieldGroup";
import CreateRole from "./CreateRole";

class CreateApiKey extends Component {
  constructor(props) {
    super(props);
    this.submitApiKeyCredentials = this.submitApiKeyCredentials.bind(this);
    this.createdApiKeyDetails = this.createdApiKeyDetails.bind(this);
    this.state = {
      apiKey: "",
      owner: "",
      description: ""
    };
  }

  submitApiKeyCredentials(e) {
    e.preventDefault();
    this.setState({ apiKeyFormDisabled: true });
    $.ajax({
      url: `${config.emoUrl}/uac/1/api-key/`,
      contentType: "application/x.json-create-api-key",
      headers: {
        "X-BV-API-Key": this.state.apiKey
      },
      data: JSON.stringify({
        owner: this.state.owner,
        description: this.state.description
      }),
      type: "POST",
      success: response => {
        this.setState({
          apiKeyCredentialsReceived: true,
          createdId: response.id,
          createdKey: response.key
        });
        if (this.props.onCreation) {
          this.props.onCreation(response.id, response.key);
        }
      },
      error: (xhr, status, err) => {
        console.error(xhr);
        console.error(err);
        // console.error(url, status, err.toString());
      }
    });
  }

  createdApiKeyDetails() {
    if (this.state.apiKeyCredentialsReceived) {
      return (
        <div>
          <Alert bsStyle="success">
            <h4>Save these now! This is the last time to view them!</h4>
            {`Id: ${this.state.createdId}`}
            <br />
            {`Key: ${this.state.createdKey}`}
          </Alert>
          <ButtonToolbar>
            <Button
              bsStyle="info"
              disabled={this.state.optionSelected}
              onClick={() =>
                this.setState({ optionSelected: true, createNewRole: true })
              }
            >
              Create New Role
            </Button>
            <Button bsStyle="info" disabled={this.state.optionSelected}>
              Assign Existing Roles
            </Button>
          </ButtonToolbar>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <form onSubmit={e => this.submitApiKeyCredentials(e)}>
            <fieldset disabled={this.state.apiKeyFormDisabled}>
              <ConditionalFieldGroup
                field={this.props.parentApiKey}
                id="formControlsApiKey"
                type="password"
                label="My API Key"
                placeholder="Enter Your API Key"
                onChange={key => this.setState({ apiKey: key.target.value })}
              />
              <FieldGroup
                id="formControlsOwner"
                type="email"
                label="Key Owner"
                placeholder="Enter Owner Email"
                onChange={owner => this.setState({ owner: owner.target.value })}
              />
              <FieldGroup
                id="formControlsDescription"
                type="text"
                label="Key Description"
                placeholder="Enter Key Description"
                onChange={description =>
                  this.setState({ description: description.target.value })
                }
              />
              <FormGroup>
                <Button type="submit">Create Api Key</Button>
              </FormGroup>
            </fieldset>
          </form>
          {this.createdApiKeyDetails()}
        </Grid>
        {this.state.createNewRole ? (
          <div>
            <hr />
            <CreateRole
              parentApiKey={this.state.apiKey}
              apiKeyId={this.state.createdId}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default CreateApiKey;
