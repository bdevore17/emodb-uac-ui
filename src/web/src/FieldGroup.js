import React, { Component } from "react";
import {
	FormGroup,
	ControlLabel,
	FormControl,
	HelpBlock
} from "react-bootstrap";

class FieldGroup extends Component {
	constructor({id, label, help, ...props}) {
		super(props);
		this.id = id;
		this.label = label;
		this.help = help;
	}

	render() {
		return (
			<FormGroup controlId={this.id}>
				<ControlLabel>{this.label}</ControlLabel>
				<FormControl {... this.props} />
				{this.help && <HelpBlock>{this.help}</HelpBlock>}
			</FormGroup>
		);
	}
}

export default FieldGroup;
