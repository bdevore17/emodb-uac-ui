import React, { Component } from "react";
import $ from "jquery";
import { Grid, FormGroup, Button, Well } from "react-bootstrap";
import { config } from "./Config";

import FieldGroup from "./FieldGroup";

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
    console.log(config.emoUrl);
  }

  submitApiKeyCredentials(e) {
    // console.log("submit")
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
      },
      error: (xhr, status, err) => {
        // console.error(url, status, err.toString());
      }
    });
  }

  createdApiKeyDetails() {
    if (this.state.apiKeyCredentialsReceived) {
      return (<Well>
      {`Id: ${this.state.createdId}`}
      <br/>
      {`Key: ${this.state.createdKey}`}
      </Well>);
    }
  }

  render() {
    return (
      <Grid>
        <form onSubmit={e => this.submitApiKeyCredentials(e)}>
          <fieldset disabled={this.state.apiKeyFormDisabled}>
            <FieldGroup
              id="formControlsAPIKey"
              type="text"
              label="API Key"
              placeholder="Enter API Key"
              onChange={key => this.setState({ apiKey: key.target.value })}
            />
            <FieldGroup
              id="formControlsOwner"
              type="text"
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
    );
  }
}

export default CreateApiKey;
