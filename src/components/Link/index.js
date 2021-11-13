import React from "react"
import classnames from "classnames"

import styles from "./index.module.scss"

const Link = props => {
	const {underline = "always", openInNewWindow, children, className, ...rest} = props

	return (
		<a
			data-underline={underline}
			className={classnames(styles.root, className)}
			target={openInNewWindow ? "_blank" : "_self"}
			rel="noreferrer nofollow"
			{...rest}
		>{children}</a>
	);
}

export default Link