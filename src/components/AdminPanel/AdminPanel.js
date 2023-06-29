import React from "react";
import PropTypes from "prop-types";
import styles from "./AdminPanel.scss";
import ContentContainer from "../ContentContainer/ContentContainer";
import EventCard from "../EventCard/EventCard";

const AdminPanel = (props) => {
	const { upcomingEvents } = props;

	const renderEventCards = () => {
		return (
			<ul className="eventList">
				{upcomingEvents.map((event) => (
					<li className="eventCardContainer" key={event.eventName}>
						<EventCard event={event}></EventCard>
					</li>
				))}
			</ul>
		);
	};

	return (
		<div className="AdminPanel">
			<ContentContainer>
				<div className="events">{renderEventCards()}</div>
			</ContentContainer>
		</div>
	);
};

AdminPanel.propTypes = {};

AdminPanel.defaultProps = {};

export default AdminPanel;
