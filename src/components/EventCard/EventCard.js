import React from "react";
import PropTypes from "prop-types";
import styles from "./EventCard.scss";

const EventCard = (props) => {
	const { event } = props;

	return (
		<div className="EventCard">
			<div className="container flex">
				<div className="eventDetails flex">
					<span className="eventDate">{event.eventDate}</span>
					<span className="hyphen">-</span>
					<span className="eventName">{event.eventName}</span>
				</div>
				<div className="actions flex">
					<button className="btn edit">Edit</button>
					<button className="btn delete">Delete</button>
				</div>
			</div>
		</div>
	);
};

EventCard.propTypes = {};

EventCard.defaultProps = {};

export default EventCard;
