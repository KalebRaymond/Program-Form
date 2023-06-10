import React from "react";
import PropTypes from "prop-types";
import styles from "./FormInput.module.scss";

const FormInput = (props) => (
	<div className={styles.FormInput}>
		<label>{props.label}</label>
		{props.children}
	</div>
);

FormInput.propTypes = {};

FormInput.defaultProps = {};

export default FormInput;
