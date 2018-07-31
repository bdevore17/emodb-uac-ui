import React, { Component } from "react";
import $ from "jquery";
import { Grid, FormGroup, Button, Well } from "react-bootstrap";
import { config } from "./Config";

import FieldGroup from "./FieldGroup";

class CreateRole extends Component {
  constructor(props) {
    super(props);
    this.submitNewRole = this.submitNewRole.bind(this);
    this.createdRoleDetails = this.createdRoleDetails.bind(this);
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
      url: `${config.emoUrl}/uac/1/role/${this.state.group}/${this.state.roleId}/`,
      contentType: "application/x.json-create-role",
      headers: {
        "X-BV-API-Key": this.state.apiKey
      },
      data: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        permissions: this.state.permissions
      }),
      type: "POST",
      success: response => {
        if (response.success) {
          this.setState({ apiKeyCredentialsReceived: true });
        }
      },
      error: (xhr, status, err) => {
        // console.error(url, status, err.toString());
      }
    });
  }

  createdRoleDetails() {
    if (this.state.apiKeyCredentialsReceived) {
      return (
        <Well>
          {`Group: ${this.state.group}`}
          <br />
          {`Id: ${this.state.roleId}`}
        </Well>
      );
    }
  }

  render() {
    return (
      <Grid>
        <form onSubmit={e => this.submitNewRole(e)}>
          <fieldset disabled={this.state.roleFormDisabled}>
            <FieldGroup
              id="formControlsAPIKey"
              type="password"
              label="Parent API Key"
              placeholder="Enter Parent API Key"
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
      </Grid>
    );
  }
}

export default CreateRole;
