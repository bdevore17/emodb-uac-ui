import React, { Component } from "react";
import $ from "jquery";
import { Grid, FormGroup, Button, Alert, ButtonToolbar } from "react-bootstrap";
import { config } from "./Config";

import FieldGroup from "./FieldGroup";
import ConditionalFieldGroup from "./ConditionalFieldGroup";
import ManageApiKey from "./ManageApiKey";

class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.submitNewRole = this.submitNewRole.bind(this);
    this.createdRoleDetails = this.createdRoleDetails.bind(this);
    this.afterSuccessOptions = this.afterSuccessOptions.bind(this);
    this.state = {
      apiKey: "",
      group: "",
      roleId: "",
      roleName: "",
      description: "",
      permissions: []
    };
  }

  submitNewRole(e) {
    e.preventDefault();
    this.setState({ roleFormDisabled: true });
    $.ajax({
      url: `${config.emoUrl}/uac/1/role/${this.state.group}/${
        this.state.roleId
      }/`,
      contentType: "application/x.json-create-role",
      headers: {
        "X-BV-API-Key": this.props.parentApiKey || this.state.apiKey
      },
      data: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        permissions: this.state.permissions
      }),
      type: "POST",
      success: response => {
        if (response.success) {
          this.setState({ newRoleCreated: true });
        }
      },
      error: (xhr, status, err) => {
        // console.error(url, status, err.toString());
      }
    });
  }

  createdRoleDetails() {
    if (this.state.newRoleCreated) {
      return (
        <Alert bsStyle="success">
          <h4>Role Created!</h4>
          {`Group: ${this.state.group}`}
          <br />
          {`Id: ${this.state.roleId}`}
        </Alert>
      );
    }
  }

  afterSuccessOptions() {
    if (this.state.newRoleCreated) {
      return (
        <ButtonToolbar>
          <Button
            bsStyle="info"
            disabled={this.state.optionSelected}
            onClick={() =>
              this.setState({
                optionSelected: true,
                manageApiKeySelected: true
              })
            }
          >
            {`Assign this role`}
          </Button>
        </ButtonToolbar>
      );
    }
  }

  render() {
    return (
      <div>
        <Grid>
          <form onSubmit={e => this.submitNewRole(e)}>
            <fieldset disabled={this.state.roleFormDisabled}>
              <ConditionalFieldGroup
                field={this.props.parentApiKey}
                id="formControlsApiKey"
                type="password"
                label="My API Key"
                placeholder="Enter Your API Key"
                onChange={key => this.setState({ apiKey: key.target.value })}
              />
              <FieldGroup
                id="forControlsGroup"
                type="text"
                label="Role Group Name"
                placeholder="Enter Role Group Name"
                onChange={group => this.setState({ group: group.target.value })}
              />
              <FieldGroup
                id="formControlsId"
                type="text"
                label="Role ID"
                placeholder="Enter Role ID"
                onChange={roleId =>
                  this.setState({ roleId: roleId.target.value })
                }
              />
              <FieldGroup
                id="formControlsName"
                type="text"
                label="Role Name"
                placeholder="Enter Role Name"
                onChange={roleName =>
                  this.setState({ roleName: roleName.target.value })
                }
              />
              <FieldGroup
                id="formControlsDescription"
                type="text"
                label="Role Description"
                placeholder="Enter Role Description"
                onChange={description =>
                  this.setState({ description: description.target.value })
                }
              />
              <FieldGroup
                id="formControlsPermissions"
                type="text"
                componentClass="textarea"
                label="Role Permissions, Insert each permission on a new line"
                placeholder="Enter Role Permissions"
                onChange={permissions => {
                  this.setState({
                    permissions: permissions.target.value.split(/[\r\n]+/)
                  });
                }}
              />
              <FormGroup>
                <Button type="submit">Create Role</Button>
              </FormGroup>
            </fieldset>
          </form>
          {this.createdRoleDetails()}
          {this.afterSuccessOptions()}
        </Grid>
        {this.state.manageApiKeySelected ? (
          <div>
            <hr />
            <ManageApiKey
              parentApiKey={this.props.parentApiKey || this.state.apiKey}
              apiKeyId={this.props.apiKeyId}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default CreateRole;
