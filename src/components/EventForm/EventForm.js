import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./EventForm.module.scss";

import { db } from "../../firebase";
import ActionButton from "../ActionButton/ActionButton";
import DatePicker from "react-datepicker";
import emailjs from "emailjs-com";
import FormInput from "../FormInput/FormInput";
import { Controller, useForm } from "react-hook-form";

const EventForm = () => {
	emailjs.init("TdmGXBSlM9g0OIa13");

	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [upcomingEventDates, setUpcomingEventDates] = useState([]);
	const [upcomingMarketingStartDates, setUpcomingMarketingStartDates] =
		useState([]);
	const [upcomingSignupsOpenDates, setUpcomingSignupsOpenDates] = useState([]);

	const {
		control,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		console.log("Form submitted", data);
		// event.preventDefault();

		// const serializedFormContent = formContent;

		// serializedFormContent.eventDate =
		// 	serializedFormContent.eventDate.toDateString();
		// serializedFormContent.marketingStartDate =
		// 	serializedFormContent.marketingStartDate.toDateString();
		// serializedFormContent.signupsOpenDate =
		// 	serializedFormContent.signupsOpenDate.toDateString();
		// serializedFormContent.signupsCloseDate = new Date(
		// 	serializedFormContent.signupsCloseDate
		// ).toDateString();

		// console.log("Event submitted", serializedFormContent);
		// addEventToDatabase(serializedFormContent);

		///Show event submitted screen
	};

	///Put this in a db service file
	/*
	const getUpcomingEventsPromise = () => {
		return db
			.collection("events")
			.get()
			.then((collection) => {
				const events = collection.docs.map((doc) => doc.data());
				return events;
			})
			.catch((error) => {
				console.log("Error fetching db events", error);
				return [];
			});
	};

	useEffect(() => {
		getUpcomingEventsPromise().then((events) => {
			setUpcomingEvents(events);
			setUpcomingEventDates(events.map((event) => new Date(event.eventDate)));
			setUpcomingMarketingStartDates(
				events.map((event) => new Date(event.marketingStartDate))
			);
			setUpcomingSignupsOpenDates(
				events.map((event) => new Date(event.signupsOpenDate))
			);
		});
	}, []);
	*/

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
			//Add event data to a new document in the firestore
			db.collection("events").doc().set(eventData);

			try {
				//sendEmail(eventData);
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

	return (
		<div className={styles.EventForm}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInput label={"Event Date"}>
					<Controller
						control={control}
						name="eventDate"
						rules={{ required: true }}
						render={({ field }) => (
							<DatePicker
								showPopperArrow={false}
								selected={field.value || ""}
								placeholderText={"Event Date"}
								highlightDates={[
									{ "react-datepicker__day--highlighted": upcomingEventDates },
								]}
								isClearable
								onChange={(date) => field.onChange(date)}
								minDate={new Date()}
							></DatePicker>
						)}
					></Controller>
				</FormInput>
				<FormInput label={"Event Start Time"} error={errors.startTime}>
					<input
						placeholder={"Event Start Time"}
						type="time"
						{...register("startTime", { required: true })}
					></input>
				</FormInput>
				<FormInput label={"Event End Time"} error={errors.endTime}>
					<input
						placeholder={"Event End Time"}
						type="time"
						{...register("endTime", { required: true })}
					></input>
				</FormInput>
				<FormInput label={"Event Name"} error={errors.eventName}>
					<input
						placeholder={"Event Name"}
						type="text"
						{...register("eventName", { required: true })}
					></input>
				</FormInput>
				<FormInput
					label={
						"Event Description (please include if there is an attendance limit)"
					}
					error={errors.eventDescription}
				>
					<textarea
						placeholder={"Event Description"}
						{...register("description", { required: true })}
					></textarea>
				</FormInput>
				<FormInput label={"Email"} error={errors.email}>
					<input
						placeholder={"Email"}
						type="email"
						{...register("email", { required: true })}
					></input>
				</FormInput>
				<FormInput label={"Committee"} error={errors.committee}>
					<select
						name={"committee"}
						{...register("committee", { required: true })}
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
					error={errors.eventLocation}
				>
					<input
						placeholder={"Event Location"}
						type="text"
						{...register("description", { required: true })}
					></input>
				</FormInput>
				<FormInput label={"Ticket Price"} error={errors.ticketPrice}>
					<input
						placeholder={"Ticket Price"}
						type="text"
						{...register("ticketPrice", { required: true })}
					></input>
				</FormInput>
				<FormInput
					label={"If tickets cost money, are they refundable?"}
					error={errors.ticketsRefundable}
				>
					<fieldset className="radioGroup">
						<div className="radioInput">
							<input
								type="radio"
								id="ticketsRefundableYes"
								value="Yes"
								{...register("ticketsRefundable", { required: true })}
							></input>
							<label htmlFor="ticketsRefundableYes">Yes</label>
						</div>
						<div className="radioInput">
							<input
								type="radio"
								id="ticketsRefundableNo"
								value="No"
								{...register("ticketsRefundable", { required: true })}
							></input>
							<label htmlFor="ticketsRefundableNo">No</label>
						</div>
					</fieldset>
				</FormInput>
				<FormInput label={"Marketing Start Date"}>
					<Controller
						control={control}
						name="marketingStartDate"
						rules={{ required: true }}
						render={({ field }) => (
							<DatePicker
								showPopperArrow={false}
								selected={field.value || ""}
								placeholderText={"Marketing Start Date"}
								highlightDates={[
									{
										"react-datepicker__day--highlighted":
											upcomingMarketingStartDates,
									},
								]}
								isClearable
								onChange={(date) => field.onChange(date)}
								minDate={new Date()}
							></DatePicker>
						)}
					></Controller>
				</FormInput>
				<FormInput label={"Are there signups?"} error={errors.signups}>
					<fieldset className="radioGroup">
						<div className="radioInput">
							<input
								type="radio"
								id="signupsYes"
								value="Yes"
								{...register("signups", { required: true })}
							></input>
							<label htmlFor="signupsYes">Yes</label>
						</div>
						<div className="radioInput">
							<input
								type="radio"
								id="signupsNo"
								value="No"
								{...register("signups", { required: true })}
							></input>
							<label htmlFor="signupsNo">No</label>
						</div>
					</fieldset>
				</FormInput>
				<FormInput label={"Signups Open Date"}>
					<Controller
						control={control}
						name="signupsOpenDate"
						rules={{ required: true }}
						render={({ field }) => (
							<DatePicker
								showPopperArrow={false}
								selected={field.value || ""}
								placeholderText={"Signups Open Date"}
								isClearable
								highlightDates={[
									{
										"react-datepicker__day--highlighted":
											upcomingSignupsOpenDates,
									},
								]}
								onChange={(date) => field.onChange(date)}
								minDate={new Date()}
							></DatePicker>
						)}
					></Controller>
				</FormInput>
				<FormInput label={"Signups Close Date"} error={errors.signupsCloseDate}>
					<input
						type="date"
						{...register("signupsCloseDate", { required: false })}
					></input>
				</FormInput>
				<FormInput
					label={"Any special advertising?"}
					error={errors.specialAdvertising}
				>
					<textarea
						placeholder={"Special Advertising"}
						{...register("specialAdvertising", { required: false })}
					></textarea>
				</FormInput>
				<FormInput
					label={
						"Are there any specific organizations or departments that you would like to reach out to?"
					}
					error={errors.organizations}
				>
					<textarea
						placeholder={"Organizations"}
						{...register("organizations", { required: false })}
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
