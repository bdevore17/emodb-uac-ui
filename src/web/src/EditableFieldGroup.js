import React, { Component } from "react";
import {
	FormGroup,
	ControlLabel,
	FormControl,
	InputGroup,
	Button
} from "react-bootstrap";

class EditableFieldGroup extends Component {
	constructor(props) {
		super(props);
		this.staticFormControl = this.staticFormControl.bind(this);
		this.editableFormControl = this.editableFormControl.bind(this);
		this.state = {
			editButtonPressed: false
		};
	}

	staticFormControl() {
		if (!this.state.editButtonPressed) {
			return (
				<InputGroup>
					<ControlLabel>{this.props.label}</ControlLabel>
					<FormControl.Static>{this.props.value}</FormControl.Static>
					<InputGroup.Button>
						<Button
							onClick={() =>
								this.setState({ editButtonPressed: true })
							}
						>
							Edit
						</Button>
					</InputGroup.Button>
				</InputGroup>
			);
		}
		return null;
	}

	editableFormControl() {
		if (this.state.editButtonPressed) {
			return (
				<InputGroup>
					<ControlLabel>{this.props.label}</ControlLabel>
					<FormControl type="text" {...this.props} />
				</InputGroup>
			);
		}
		return null;
	}

	render() {
		return (
			<div>
				<FormGroup>
					{this.staticFormControl()}
					{this.editableFormControl()}
				</FormGroup>
			</div>
		);
	}
}

export default EditableFieldGroup;
