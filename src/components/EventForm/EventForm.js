import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./EventForm.module.scss";

import { db } from "../../firebase";
import ActionButton from "../ActionButton/ActionButton";
import DatePicker from "react-datepicker";
import emailjs from "emailjs-com";
import FormInput from "../FormInput/FormInput";
import { Controller, useForm } from "react-hook-form";
import UpcomimgEventsTimePreview from "../UpcomingEventsTimePreview/UpcomingEventsTimePreview";

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
		reset,
		watch,
		formState: { errors },
	} = useForm();

	const ticketsValue = watch("tickets");
	const signupsValue = watch("signups");
	const eventDateValue = watch("eventDate");

	const onSubmit = (data, event) => {
		event.preventDefault();

		const serializedData = data;

		if (serializedData.eventDate) {
			serializedData.eventDate = serializedData.eventDate.toDateString();
		}

		if (serializedData.marketingStartDate) {
			serializedData.marketingStartDate =
				serializedData.marketingStartDate.toDateString();
		}

		if (serializedData.signupsOpenDate) {
			serializedData.signupsOpenDate =
				serializedData.signupsOpenDate.toDateString();
		}

		if (serializedData.signupsCloseDate) {
			serializedData.signupsCloseDate = new Date(
				serializedData.signupsCloseDate
			).toDateString();
		}

		console.log("Form submitted", serializedData);
		reset();

		// addEventToDatabase(serializedData);

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
		const testEvents = [
			{
				eventName:
					"Event with reaaaaaalllllyyyyyyyyyyyyyyyy loooooooooooooooong name",
				eventDate: "06/24/2023",
				startTime: "10:00AM",
				endTime: "11:00AM",
				location: "Lawn",
			},
			{
				eventName: "Event 2",
				eventDate: "06/24/2023",
				startTime: "11:00AM",
				endTime: "11:00AM",
				location: "Assembly Room",
			},
			{
				eventName: "Event 3",
				eventDate: "06/24/2023",
				startTime: "04:00PM",
				endTime: "6:00PM",
				location: "Cathedral of Learning",
			},
		];

		setUpcomingEvents(testEvents);
		setUpcomingEventDates(testEvents.map((event) => new Date(event.eventDate)));
	}, []);

	useEffect(() => {
		console.log("upcomingEvents", upcomingEvents);
	}, [upcomingEvents]);

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

	return (
		<div className={styles.EventForm}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<FormInput label={"Event Date"}>
					<Controller
						control={control}
						name="eventDate"
						rules={{
							required: { value: true, message: "This field is required" },
						}}
						render={({ field }) => (
							<div className="dateAndTimeContainer">
								<div className="datePickerContainer">
									<DatePicker
										className="input"
										showPopperArrow={false}
										selected={field.value || ""}
										placeholderText={"Event Date"}
										highlightDates={[
											{
												"react-datepicker__day--highlighted":
													upcomingEventDates,
											},
										]}
										isClearable
										onChange={(date) => field.onChange(date)}
										minDate={new Date()}
									></DatePicker>
								</div>
								{eventDateValue && (
									<UpcomimgEventsTimePreview
										selectedDate={eventDateValue}
										upcomingEvents={upcomingEvents}
									></UpcomimgEventsTimePreview>
								)}
							</div>
						)}
					></Controller>
				</FormInput>

				<FormInput label={"Event Start Time"} error={errors.startTime}>
					<input
						className="input"
						placeholder={"Event Start Time"}
						type="time"
						{...register("startTime", {
							required: { value: true, message: "This field is required" },
						})}
					></input>
				</FormInput>

				<FormInput label={"Event End Time"} error={errors.endTime}>
					<input
						className="input"
						placeholder={"Event End Time"}
						type="time"
						{...register("endTime", {
							required: { value: true, message: "This field is required" },
						})}
					></input>
				</FormInput>

				<FormInput label={"Event Name"} error={errors.eventName}>
					<input
						className="input"
						placeholder={"Event Name"}
						type="text"
						{...register("eventName", {
							required: { value: true, message: "This field is required" },
						})}
					></input>
				</FormInput>

				<FormInput
					label={
						"Event Description (please include if there is an attendance limit)"
					}
					error={errors.eventDescription}
				>
					<textarea
						className="textarea"
						placeholder={"Event Description"}
						{...register("description", {
							required: { value: true, message: "This field is required" },
						})}
					></textarea>
				</FormInput>

				<FormInput label={"Email"} error={errors.email}>
					<input
						className="input"
						placeholder={"Email"}
						type="email"
						{...register("email", {
							required: { value: true, message: "This field is required" },
						})}
					></input>
				</FormInput>

				<FormInput label={"Committee"} error={errors.committee}>
					<select
						className="select"
						name={"committee"}
						{...register("committee", {
							required: { value: true, message: "This field is required" },
						})}
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
						className="input"
						placeholder={"Event Location"}
						type="text"
						{...register("eventLocation", {
							required: { value: true, message: "This field is required" },
						})}
					></input>
				</FormInput>

				<FormInput label={"Are there tickets?"} error={errors.tickets}>
					<fieldset className="radioGroup">
						<div className="radioInput">
							<input
								className="radio"
								type="radio"
								id="ticketsYes"
								value="Yes"
								{...register("tickets", {
									required: { value: true, message: "This field is required" },
								})}
							></input>
							<label className="radioLabel" htmlFor="ticketsYes">
								Yes
							</label>
						</div>
						<div className="radioInput">
							<input
								className="radio"
								type="radio"
								id="ticketsNo"
								value="No"
								{...register("tickets", {
									required: { value: true, message: "This field is required" },
								})}
							></input>
							<label className="radioLabel" htmlFor="ticketsNo">
								No
							</label>
						</div>
					</fieldset>
				</FormInput>

				{ticketsValue === "Yes" && (
					<>
						<FormInput label={"Ticket Price"} error={errors.ticketPrice}>
							<input
								className="input"
								placeholder={"Ticket Price"}
								type="text"
								{...register("ticketPrice", {
									required: { value: true, message: "This field is required" },
								})}
							></input>
						</FormInput>

						<FormInput
							label={"If tickets cost money, are they refundable?"}
							error={errors.ticketsRefundable}
						>
							<fieldset className="radioGroup">
								<div className="radioInput">
									<input
										className="radio"
										type="radio"
										id="ticketsRefundableYes"
										value="Yes"
										{...register("ticketsRefundable", {
											required: {
												value: true,
												message: "This field is required",
											},
										})}
									></input>
									<label className="radioLabel" htmlFor="ticketsRefundableYes">
										Yes
									</label>
								</div>
								<div className="radioInput">
									<input
										className="radio"
										type="radio"
										id="ticketsRefundableNo"
										value="No"
										{...register("ticketsRefundable", {
											required: {
												value: true,
												message: "This field is required",
											},
										})}
									></input>
									<label className="radioLabel" htmlFor="ticketsRefundableNo">
										No
									</label>
								</div>
							</fieldset>
						</FormInput>
					</>
				)}

				<FormInput label={"Marketing Start Date"}>
					<Controller
						control={control}
						name="marketingStartDate"
						rules={{
							required: { value: true, message: "This field is required" },
						}}
						render={({ field }) => (
							<DatePicker
								className="input"
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
								className="radio"
								type="radio"
								id="signupsYes"
								value="Yes"
								{...register("signups", {
									required: { value: true, message: "This field is required" },
								})}
							></input>
							<label className="radioLabel" htmlFor="signupsYes">
								Yes
							</label>
						</div>
						<div className="radioInput">
							<input
								className="radio"
								type="radio"
								id="signupsNo"
								value="No"
								{...register("signups", {
									required: { value: true, message: "This field is required" },
								})}
							></input>
							<label className="radioLabel" htmlFor="signupsNo">
								No
							</label>
						</div>
					</fieldset>
				</FormInput>

				{signupsValue === "Yes" && (
					<>
						<FormInput label={"Signups Open Date"}>
							<Controller
								control={control}
								name="signupsOpenDate"
								rules={{
									required: { value: true, message: "This field is required" },
								}}
								render={({ field }) => (
									<DatePicker
										className="input"
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

						<FormInput
							label={"Signups Close Date"}
							error={errors.signupsCloseDate}
						>
							<input
								className="input"
								type="date"
								{...register("signupsCloseDate", { required: false })}
							></input>
						</FormInput>
					</>
				)}

				<FormInput
					label={"Any special advertising?"}
					error={errors.specialAdvertising}
				>
					<textarea
						className="textarea"
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
						className="textarea"
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
