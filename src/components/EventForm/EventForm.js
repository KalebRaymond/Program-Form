import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./EventForm.module.scss";

import { db } from "../../firebase";
import ActionButton from "../ActionButton/ActionButton";
import DatePicker from "react-datepicker";
import emailjs from "emailjs-com";
import FormInput from "../FormInput/FormInput";

const EventForm = () => {
	const defaultFormState = {
		eventDate: "",
		startTime: "",
		endTime: "",
		eventName: "",
		description: "",
		email: "",
		committee: "Advertising",
		location: "",
		ticketPrice: "",
		ticketsRefundable: "",
		marketingStartDate: "",
		signups: "",
		signupsOpenDate: "",
		signupsCloseDate: "",
		specialAdvertising: "",
		organizations: "",
	};
	const [formState, setFormState] = useState(defaultFormState);
	emailjs.init("TdmGXBSlM9g0OIa13");

	const sendEmail = (eventData) => {
		const serviceId = "service_k63n2um";
		const templateId = "template_kwr4qcr";

		///See sendForm
		emailjs
			.send(serviceId, templateId, eventData)
			.then(() => {
				console.log("Email sent successfully");
			})
			.catch((error) => {
				console.error("Error occurred while sending email", error);
			});
	};

	const addEventToDatabase = async (eventData) => {
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

	const handleInputChange = (event) => {
		const inputName = event.target.name;
		const value = event.target.value;

		console.log("Input changed", { inputName, value });

		setFormState({
			...formState,
			[inputName]: value,
		});
	};

	const handleDatePickerChange = (name, date) => {
		console.log("Datepicker changed", { name, date });
		setFormState({
			...formState,
			[name]: date,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Event submitted", formState);
		//addEventToDatabase(formState);

		///Show event submitted screen
	};

	return (
		<div className={styles.EventForm}>
			<form onSubmit={handleSubmit}>
				<FormInput label={"Event Date"}>
					<DatePicker
						selected={formState.eventDate}
						placeholderText={"Event Date"}
						isClearable
						onChange={(date) => handleDatePickerChange("eventDate", date)}
					></DatePicker>
				</FormInput>
				<FormInput label={"Event Start Time"}>
					<input
						name={"startTime"}
						placeholder={"Event Start Time"}
						type="time"
						value={formState.startTime}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Event End Time"}>
					<input
						placeholder={"Event End Time"}
						name={"endTime"}
						type="time"
						value={formState.endTime}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Event Name"}>
					<input
						placeholder={"Event Name"}
						name={"eventName"}
						type="text"
						value={formState.eventName}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput
					label={
						"Event Description (please include if there is an attendance limit)"
					}
				>
					<textarea
						placeholder={"Event Description"}
						name={"description"}
						value={formState.description}
						onChange={handleInputChange}
					></textarea>
				</FormInput>
				<FormInput label={"Email"}>
					<input
						placeholder={"Email"}
						name={"email"}
						type="email"
						value={formState.email}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Committee"}>
					<select
						name={"committee"}
						type="text"
						value={formState.committee}
						onChange={handleInputChange}
					>
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
				<FormInput
					label={
						"Event Location (ex. Cathedral Lawn, Zoom Webinar, Zoom Meeting, etc.)"
					}
				>
					<input
						placeholder={"Event Location"}
						name={"location"}
						type="text"
						value={formState.location}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Ticket Price"}>
					<input
						placeholder={"Ticket Price"}
						name={"ticketPrice"}
						type="text"
						value={formState.ticketPrice}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"If tickets cost money, are they refundable?"}>
					<input
						placeholder={"Are tickets refundable?"}
						name={"ticketsRefundable"}
						type="text"
						value={formState.ticketsRefundable}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Marketing Start Date"}>
					<DatePicker
						selected={formState.marketingStartDate}
						placeholderText={"Marketing Start Date"}
						isClearable
						onChange={(date) =>
							handleDatePickerChange("marketingStartDate", date)
						}
					></DatePicker>
				</FormInput>
				<FormInput label={"Are there signups?"}>
					<input
						placeholder={"Are there signups"}
						name={"signups"}
						type="text"
						value={formState.signups}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Signups Open Date"}>
					<DatePicker
						selected={formState.signupsOpenDate}
						placeholderText={"Signups Open Date"}
						isClearable
						onChange={(date) => handleDatePickerChange("signupsOpenDate", date)}
					></DatePicker>
				</FormInput>
				<FormInput label={"Signups Close Date"}>
					<input
						name={"signupsCloseDate"}
						type="date"
						value={formState.signupsCloseDate}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Any special advertising?"}>
					<textarea
						placeholder={"Special Advertising"}
						name={"specialAdvertising"}
						value={formState.specialAdvertising}
						onChange={handleInputChange}
					></textarea>
				</FormInput>
				<FormInput
					label={
						"Are there any specific organizations or departments that you would like to reach out to?"
					}
				>
					<textarea
						placeholder={"Organizations"}
						name={"organizations"}
						value={formState.organizations}
						onChange={handleInputChange}
					></textarea>
				</FormInput>
				<div className="buttonSection">
					<ActionButton type="submit" buttonText={"Submit"}></ActionButton>
				</div>
			</form>
		</div>
	);
};

EventForm.propTypes = {};

EventForm.defaultProps = {};

export default EventForm;
