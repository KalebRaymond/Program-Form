import React from "react";
import PropTypes from "prop-types";
import styles from "./ActionButton.scss";

const ActionButton = (props) => (
	<button className="actionButton" type={props.type} onClick={props.onClick}>
		{props.buttonText}
	</button>
);

ActionButton.propTypes = {};

ActionButton.defaultProps = {};

export default ActionButton;
