import $ from "jquery";
import { config } from "./Config";

class UAC_Client {
	constructor() {
		this.emoUrl = config.emoUrl;
	}

	updateApiKey({
		parentKey,
		id,
		unassignRoles,
		assignRoles,
		owner,
		onUpdate
	}) {
		let data = {};
		if (owner) {
			data.owner = owner;
		}

		if (unassignRoles) {
			data.unassignRoles = unassignRoles;
		}

		if (assignRoles) {
			data.assignRoles = assignRoles;
		}

		$.ajax({
			url: `${this.emoUrl}/uac/1/api-key/${id}`,
			contentType: "application/x.json-update-api-key",
			headers: {
				"X-BV-API-Key": parentKey
			},
			data: JSON.stringify(data),
			type: "PUT",
			success: response => {
				if (onUpdate) {
					onUpdate();
				}
			},
			error: (xhr, status, err) => {
				console.error(xhr);
				console.error(err);
				// console.error(url, status, err.toString());
			}
		});
	}

	readRole({ parentKey, group, id, onComplete }) {
		$.ajax({
			url: `${this.emoUrl}/uac/1/role/${group}/${id}`,
			headers: {
				"X-BV-API-Key": parentKey
			},
			type: "GET",
			success: role => {
				if (onComplete) {
					onComplete(role);
				}
			},
			error: (xhr, status, err) => {
				console.error(xhr);
				console.error(err);
				// console.error(url, status, err.toString());
			}
		});
	}

	readApiKey({ parentKey, id, onComplete }) {
		$.ajax({
			url: `${this.emoUrl}/uac/1/api-key/${id}`,
			headers: {
				"X-BV-API-Key": parentKey
			},
			type: "GET",
			success: keyDetails => {
				if (onComplete) {
					onComplete(keyDetails);
				}
			},
			error: (xhr, status, err) => {
				console.error(xhr);
				console.error(err);
				// console.error(url, status, err.toString());
			}
		});
	}
}

export default new UAC_Client();
