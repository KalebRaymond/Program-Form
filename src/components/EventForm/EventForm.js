import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./EventForm.module.scss";

import { db } from "../../firebase";
import ActionButton from "../ActionButton/ActionButton";
import DatePicker from "react-datepicker";
import emailjs from "emailjs-com";
import FormInput from "../FormInput/FormInput";

const EventForm = () => {
	const [upcomingEvents, setUpcomingEvents] = useState([]);

	///Put this in a db service file
	const getUpcomingEventsPromise = () => {
		return db
			.collection("events")
			.get()
			.then((collection) => {
				const upcomingEvents = collection.docs.map((doc) => doc.data());
				return upcomingEvents;
			})
			.catch((error) => {
				console.log("Error fetching db events", error);
				return [];
			});
	};

	useEffect(() => {
		getUpcomingEventsPromise().then((events) => setUpcomingEvents(events));
	}, []);

	useEffect(() => {
		console.log("upcomingEvents", upcomingEvents);
	}, [upcomingEvents]);

	const defaultFormContent = {
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

	const [formContent, setFormContent] = useState(defaultFormContent);
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

	const formIsValid = () => {
		//Return false if any form fields are empty, true otherwise
		return Object.keys(formContent).reduce(
			(acc, i) => acc && formContent[i] && formContent[i] !== "",
			true
		);
	};

	const handleInputChange = (event) => {
		const inputName = event.target.name;
		const value = event.target.value;

		console.log("Input changed", {
			inputName,
			value,
		});

		setFormContent({
			...formContent,
			[inputName]: value,
		});
	};

	const handleDatePickerChange = (name, date) => {
		setFormContent({
			...formContent,
			[name]: date,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log("Event submitted", formContent);
		//addEventToDatabase(formContent);

		///Show event submitted screen
	};

	return (
		<div className={styles.EventForm}>
			<form onSubmit={handleSubmit}>
				<FormInput label={"Event Date"}>
					<DatePicker
						showPopperArrow={false}
						selected={formContent.eventDate}
						placeholderText={"Event Date"}
						isClearable
						onChange={(date) => handleDatePickerChange("eventDate", date)}
						minDate={new Date()}
					></DatePicker>
				</FormInput>
				<FormInput label={"Event Start Time"}>
					<input
						name={"startTime"}
						placeholder={"Event Start Time"}
						type="time"
						value={formContent.startTime}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Event End Time"}>
					<input
						placeholder={"Event End Time"}
						name={"endTime"}
						type="time"
						value={formContent.endTime}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Event Name"}>
					<input
						placeholder={"Event Name"}
						name={"eventName"}
						type="text"
						value={formContent.eventName}
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
						value={formContent.description}
						onChange={handleInputChange}
					></textarea>
				</FormInput>
				<FormInput label={"Email"}>
					<input
						placeholder={"Email"}
						name={"email"}
						type="email"
						value={formContent.email}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Committee"}>
					<select
						name={"committee"}
						type="text"
						value={formContent.committee}
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
						value={formContent.location}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Ticket Price"}>
					<input
						placeholder={"Ticket Price"}
						name={"ticketPrice"}
						type="text"
						value={formContent.ticketPrice}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"If tickets cost money, are they refundable?"}>
					<input
						placeholder={"Are tickets refundable?"}
						name={"ticketsRefundable"}
						type="text"
						value={formContent.ticketsRefundable}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Marketing Start Date"}>
					<DatePicker
						showPopperArrow={false}
						selected={formContent.marketingStartDate}
						placeholderText={"Marketing Start Date"}
						isClearable
						onChange={(date) =>
							handleDatePickerChange("marketingStartDate", date)
						}
						minDate={new Date()}
					></DatePicker>
				</FormInput>
				<FormInput label={"Are there signups?"}>
					<input
						placeholder={"Are there signups"}
						name={"signups"}
						type="text"
						value={formContent.signups}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Signups Open Date"}>
					<DatePicker
						showPopperArrow={false}
						selected={formContent.signupsOpenDate}
						placeholderText={"Signups Open Date"}
						isClearable
						onChange={(date) => handleDatePickerChange("signupsOpenDate", date)}
						minDate={new Date()}
					></DatePicker>
				</FormInput>
				<FormInput label={"Signups Close Date"}>
					<input
						name={"signupsCloseDate"}
						type="date"
						value={formContent.signupsCloseDate}
						onChange={handleInputChange}
					></input>
				</FormInput>
				<FormInput label={"Any special advertising?"}>
					<textarea
						placeholder={"Special Advertising"}
						name={"specialAdvertising"}
						value={formContent.specialAdvertising}
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
						value={formContent.organizations}
						onChange={handleInputChange}
					></textarea>
				</FormInput>
				<div className="buttonSection">
					<ActionButton
						type="submit"
						buttonText={"Submit"}
						disabled={!formIsValid()}
					></ActionButton>
				</div>
			</form>
		</div>
	);
};

EventForm.propTypes = {};

EventForm.defaultProps = {};

export default EventForm;
