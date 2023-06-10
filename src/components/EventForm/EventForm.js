import React from "react";
import PropTypes from "prop-types";
import styles from "./EventForm.module.scss";

import { db } from "../../firebase";
import ActionButton from "../ActionButton/ActionButton";
import DatePicker from "react-datepicker";
import emailjs from "emailjs-com";
import FormInput from "../FormInput/FormInput";

const EventForm = () => {
	emailjs.init("TdmGXBSlM9g0OIa13");

	const sendEmail = (eventData) => {
		const serviceId = "service_k63n2um";
		const templateId = "template_kwr4qcr";

		const templateParams = {
			event_name: "TEST EVENT",
		};

		///See sendForm
		emailjs
			.send(serviceId, templateId, templateParams)
			.then(() => {
				console.log("Email sent successfully");
			})
			.catch((error) => {
				console.error("Error occurred while sending email", error);
			});
	};

	const addEntry = async (eventData) => {
		try {
			db.collection("events").doc().set(eventData);

			try {
				sendEmail(eventData);
			} catch (error) {
				console.error("Error sending email", error);
			}
		} catch (error) {
			console.error("Error writing document", error);
		}
	};

	return (
		<div className={styles.EventForm}>
			<form>
				<FormInput label={"Event Date"}>
					<DatePicker></DatePicker>
				</FormInput>
				<FormInput label={"Event Name"}>
					<input type="text"></input>
				</FormInput>
				<FormInput
					label={
						"Event Description (please include if there is an attendance limit)"
					}
				>
					<input type="textarea"></input>
				</FormInput>
				<FormInput label={"Email"}>
					<input type="email"></input>
				</FormInput>
				<FormInput label={"Committee"}>
					<select type="text">
						<option value="Advertising">Advertising</option>
						<option value="Design">Design</option>{" "}
						<option value="Executive">Executive</option>{" "}
						<option value="Interest Exploration">Interest Exploration</option>{" "}
						<option value="Lecture">Lecture</option>{" "}
						<option value="Public Relations">Public Relations</option>{" "}
						<option value="Recreation">Recreation</option>{" "}
						<option value="Special Events">Special Events</option>{" "}
						<option value="Travel">Travel</option>
						<option value="The Arts">The Arts</option>
					</select>
				</FormInput>
				<FormInput label={"Event Start Time"}>
					<input type="time"></input>
				</FormInput>
				<FormInput label={"Event End Time"}>
					<input type="time"></input>
				</FormInput>
				<FormInput
					label={
						"Event Location (ex. Cathedral Lawn, Zoom Webinar, Zoom Meeting, etc.)"
					}
				>
					<input type="text"></input>
				</FormInput>
				<FormInput label={"Ticket Price"}>
					<input type="text"></input>
				</FormInput>
				<FormInput label={"If tickets cost money, are they refundable?"}>
					<input type="text"></input>
				</FormInput>
				<FormInput label={"Marketing Start Date"}>
					<DatePicker></DatePicker>
				</FormInput>
				<FormInput label={"Are there signups?"}>
					<input type="text"></input>
				</FormInput>
				<FormInput label={"Signups Open Date"}>
					<DatePicker></DatePicker>
				</FormInput>
				<FormInput label={"Signups Close Date"}>
					<input type="date"></input>
				</FormInput>
				<FormInput label={"Any special advertising?"}>
					<input type="textarea"></input>
				</FormInput>
				<FormInput
					label={
						"Are there any specific organizations or departments that you would like to reach out to?"
					}
				>
					<input type="textarea"></input>
				</FormInput>
				<div className="buttonSection">
					<ActionButton buttonText={"Submit"} onClick={addEntry}></ActionButton>
				</div>
			</form>
		</div>
	);
};

EventForm.propTypes = {};

EventForm.defaultProps = {};

export default EventForm;
