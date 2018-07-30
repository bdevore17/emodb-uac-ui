import React, { Component } from "react";
import $ from "jquery";
import { Grid, FormGroup, HelpBlock, Button } from "react-bootstrap";

import FieldGroup from "./FieldGroup";

class CreateApiKey extends Component {
  constructor(props) {
    super(props);
    this.setApiKey = this.setApiKey.bind(this);
    this.state = {
      apiKey: ""
    };
  }

  setApiKey(key) {
    this.setState({ apiKey: key });
  }

  render() {
    return (
      <Grid>
        <form>
          <FieldGroup
            id="formControlsAPIKey"
            type="text"
            label="API Key"
            placeholder="Enter API Key"
            onChange={this.setApiKey}
          />
          <FormGroup>
            <Button type="submit">Submit</Button>
          </FormGroup>
        </form>
      </Grid>
    );
  }
}

export default CreateApiKey;
