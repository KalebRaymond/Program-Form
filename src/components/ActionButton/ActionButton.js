import React from "react";
import PropTypes from "prop-types";
import styles from "./ActionButton.module.scss";

const ActionButton = (props) => (
	<button onClick={props.onClick}>{props.buttonText}</button>
);

ActionButton.propTypes = {};

ActionButton.defaultProps = {};

export default ActionButton;
