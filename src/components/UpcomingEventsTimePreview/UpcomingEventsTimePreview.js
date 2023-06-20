import React from "react";
import PropTypes from "prop-types";
import styles from "./UpcomingEventsTimePreview.scss";

const UpcomingEventsTimePreview = (props) => {
	const { selectedDate, upcomingEvents } = props;

	return (
		<table className="UpcomingEventsTimePreview">
			<thead className="tableHeader">
				<tr>
					<th className="separatorBottom" colSpan="3">
						Existing Events on {selectedDate.toDateString()}
					</th>
				</tr>
			</thead>
			<tbody className="tableBody">
				{upcomingEvents.map((event) => (
					<tr key={event.eventName}>
						<td className="eventName">{event.eventName}</td>
						<td className="eventTime">
							{event.startTime} - {event.endTime}
						</td>
						<td className="eventLocation">{event.location}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default UpcomingEventsTimePreview;
