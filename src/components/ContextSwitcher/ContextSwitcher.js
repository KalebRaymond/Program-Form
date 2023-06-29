import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ContextSwitcher.module.scss";

import EventForm from "../EventForm/EventForm";
import AdminPanel from "../AdminPanel/AdminPanel";

const ContextSwitcher = () => {
	const [workflow, setWorkflow] = useState("event");

	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [upcomingEventDates, setUpcomingEventDates] = useState([]);
	const [upcomingMarketingStartDates, setUpcomingMarketingStartDates] =
		useState([]);
	const [upcomingSignupsOpenDates, setUpcomingSignupsOpenDates] = useState([]);

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
				eventDate: "06/28/2023",
				startTime: "10:00AM",
				endTime: "11:00AM",
				location: "Lawn",
			},
			{
				eventName: "Event 2",
				eventDate: "06/28/2023",
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

	return (
		<div className={styles.ContextSwitcher}>
			<button onClick={() => setWorkflow("admin")}>Admin Panel</button>
			<button onClick={() => setWorkflow("event")}>Event Panel</button>
			{workflow === "admin" ? (
				<AdminPanel upcomingEvents={upcomingEvents}></AdminPanel>
			) : (
				<EventForm
					upcomingEvents={upcomingEvents}
					upcomingEventDates={upcomingEventDates}
					upcomingMarketingStartDates={upcomingMarketingStartDates}
					upcomingSignupsOpenDates={upcomingSignupsOpenDates}
				></EventForm>
			)}
		</div>
	);
};

ContextSwitcher.propTypes = {};

ContextSwitcher.defaultProps = {};

export default ContextSwitcher;
