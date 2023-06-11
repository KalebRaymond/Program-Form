import React from "react";
import PropTypes from "prop-types";
import styles from "./FormInput.scss";

const FormInput = (props) => (
	<div className="FormInput">
		<div className="labelContainer">
			<label>{props.label}</label>
		</div>
		<div className="inputContainer">{props.children}</div>
	</div>
);

FormInput.propTypes = {};

FormInput.defaultProps = {};

export default FormInput;
