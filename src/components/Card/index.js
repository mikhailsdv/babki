import React, {useState, useEffect} from "react"
import classnames from "classnames"
import FastAverageColor from "fast-average-color"

import styles from "./index.module.scss"

const Card = props => {
	const {children, image, title, className, ...rest} = props

	const [avgImageColor, setAvgImageColor] = useState("rgba(0, 0, 0, 0)")

	useEffect(() => {
		;(async () => {
			const fac = new FastAverageColor()
			const color = await fac.getColorAsync(image, {algorithm: "simple"})
			setAvgImageColor(color.rgb)
		})()
	}, [image])

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<div
					className={classnames(styles.card, className)}
					style={{border: `3px solid ${avgImageColor}`}}
					{...rest}
				>
					<div className={styles.title}>{title}</div>
					{children}
				</div>
				<div className={styles.image} style={{"boxShadow": `0px 8px 10px -2px ${avgImageColor}`}}>
					<img src={image} alt="logo" />
				</div>
			</div>
		</div>
	)
}

export default Card
