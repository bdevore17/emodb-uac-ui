import React, { Component } from "react";
import FieldGroup from "./FieldGroup";

class ConditionalFieldGroup extends Component {
	render() {
		if (!this.props.field) {
			return <FieldGroup {...this.props} />;
		}
		return null;
	}
}

export default ConditionalFieldGroup;
