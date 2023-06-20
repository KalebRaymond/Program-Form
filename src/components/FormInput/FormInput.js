import React from "react";
import PropTypes from "prop-types";
import styles from "./FormInput.scss";

const FormInput = (props) => (
	<div className="FormInput">
		<div className="labelContainer">
			<label>{props.label}</label>
		</div>
		<div className={`inputContainer ${props.error ? "hasError" : ""}`}>
			{props.children}
		</div>
		{props.error && (
			<div className="errorContainer">
				<span className="error">{props.error.message}</span>
			</div>
		)}
	</div>
);

FormInput.propTypes = {};

FormInput.defaultProps = {};

export default FormInput;
