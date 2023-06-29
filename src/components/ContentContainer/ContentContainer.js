import React from "react";
import PropTypes from "prop-types";
import styles from "./ContentContainer.module.scss";

const ContentContainer = (props) => (
	<div className={styles.ContentContainer}>{props.children}</div>
);

ContentContainer.propTypes = {};

ContentContainer.defaultProps = {};

export default ContentContainer;
