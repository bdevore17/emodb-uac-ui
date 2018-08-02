import React, { Component } from "react";
import {
  Grid,
  FormGroup,
  Button,
  Alert,
  ButtonToolbar,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import { config } from "./Config";

import FieldGroup from "./FieldGroup";
import ConditionalFieldGroup from "./ConditionalFieldGroup";
import UAC_Client from "./UAC_Client";
import EditableFieldGroup from "./EditableFieldGroup";

class ManageApiKey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keysObtained: props.parentApiKey && props.apiKeyId,
      parentApiKey: props.parentApiKey || "",
      apiKeyId: props.apiKeyId || ""
    };
    this.credentialForm = this.credentialForm.bind(this);
    this.obtainKeyDetails = this.obtainKeyDetails.bind(this);
    this.apiKeyDetailsDisplay = this.apiKeyDetailsDisplay.bind(this);
  }

  componentDidMount() {
    if (this.state.keysObtained) {
      this.obtainKeyDetails();
    }
  }

  submitApiKeyCredentials(e) {
    e.preventDefault();
    this.setState({ keysObtained: true, apiKeyFormDisabled: true });
    this.obtainKeyDetails();
  }

  obtainKeyDetails() {
    if (!this.state.keyDetailsObtained) {
      UAC_Client.readApiKey({
        parentKey: this.state.parentApiKey,
        id: this.state.apiKeyId,
        onComplete: apiKeyDetails =>
          this.setState({
            apiKeyDetails: apiKeyDetails,
            keyDetailsObtained: true
          })
      });
    }
  }

  apiKeyDetailsDisplay() {
    if (this.state.keyDetailsObtained) {
      return (
        <div>
          <hr />
          <form>
            <fieldset disabled={this.state.mangeApiKeyFormDisabled}>
              <FormGroup>
                <ControlLabel>API Key ID</ControlLabel>
                <FormControl.Static>
                  {this.state.apiKeyDetails.id}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Masked Key</ControlLabel>
                <FormControl.Static>
                  {this.state.apiKeyDetails.maskedKey}
                </FormControl.Static>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Date Issued</ControlLabel>
                <FormControl.Static>
                  {new Date(
                    Date.parse(this.state.apiKeyDetails.issued)
                  ).toLocaleString()}
                </FormControl.Static>
              </FormGroup>
              <EditableFieldGroup
                id="formControlsApiKeyOwner"
                type="email"
                label="API Key Owner Email"
                placeholder="Enter Api Key Owner Email"
                value={this.state.apiKeyDetails.owner}
                onChange={owner => this.setState({ apiKeyDetails: {...this.state.apiKeyDetails, owner: owner.target.value }})}
              />
              <EditableFieldGroup
                id="formControlsApiDescription"
                type="text"
                label="API Key Description"
                placeholder="Enter Api Key Description"
                value={this.state.apiKeyDetails.description}
                onChange={description => this.setState({ apiKeyDetails: {...this.state.apiKeyDetails, description: description.target.value }})}
              />
            </fieldset>
          </form>
        </div>
      );
    }
  }

  credentialForm() {
    return (
      <div>
        <form onSubmit={e => this.submitApiKeyCredentials(e)}>
          <fieldset disabled={this.state.apiKeyFormDisabled}>
            <ConditionalFieldGroup
              field={this.props.parentApiKey}
              id="formControlsApiKey"
              type="password"
              label="My API Key"
              placeholder="Enter Your API Key"
              onChange={key =>
                this.setState({ parentApiKey: key.target.value })
              }
            />

            <ConditionalFieldGroup
              field={this.props.apiKeyId}
              id="formControlsApiKeyId"
              type="text"
              label="API Key ID to manage"
              placeholder="Enter Your API Key"
              onChange={key => this.setState({ apiKeyId: key.target.value })}
            />
            {!this.props.apiKeyId || !this.props.parentApiKey ? (
              <FormGroup>
                <Button type="submit">Submit</Button>
              </FormGroup>
            ) : null}
          </fieldset>
        </form>
        {this.apiKeyDetailsDisplay()}
      </div>
    );
  }

  render() {
    return <Grid>{this.credentialForm()}</Grid>;
  }
}

export default ManageApiKey;
