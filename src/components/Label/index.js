import React from "react"
import classnames from "classnames"

import styles from "./index.module.scss"

const Label = props => {
	const {children, className, ...rest} = props

	return (
		<div
			className={classnames(styles.root, className)}
			{...rest}
		>{children}</div>
	);
}

export default Label
