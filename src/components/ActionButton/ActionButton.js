import React from "react";
import PropTypes from "prop-types";
import styles from "./ActionButton.scss";

const ActionButton = (props) => (
	<button
		className={`actionButton ${props.disabled ? "disabled" : ""}`}
		type={props.type}
		onClick={props.onClick}
		disabled={props.disabled}
	>
		{props.buttonText}
	</button>
);

ActionButton.propTypes = {};

ActionButton.defaultProps = {};

export default ActionButton;
