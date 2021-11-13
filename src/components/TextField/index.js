import React, {useState, useCallback} from "react"
import classnames from "classnames"
import '@material/react-material-icon/index.scss';
import MaterialIcon from '@material/react-material-icon';
import copy from 'copy-to-clipboard';

import styles from "./index.module.scss"

const TextField = props => {
	const {required, allowCopy, value, onChange = () => {}, label, textarea, className, ...rest} = props

	const InputElem = textarea ? "textarea" : "input"

	const [isCopied, setIsCopied] = useState(false)

	const copyToken = useCallback(() => {
		if (copy(value)) {
			setIsCopied(true)
		}
		else {
			alert("Ну удалось скопировать текст. Попробуйте вручную.")
		}
	}, [value])

	return (
		<div className={styles.root}>
			{label && <div className={styles.label}>{label}{required && <sup className={styles.required}> *</sup>}</div>}
			<div className={styles.wrapper}>
				<InputElem
					value={value}
					onChange={onChange}
					className={classnames(styles.input, className)}
					data-textarea={InputElem === "textarea"}
					{...rest}
				/>
				{allowCopy && <div
					className={styles.copy}
					onClick={copyToken}
				>
					<div className={styles.area}>
						<MaterialIcon
							icon={isCopied ? "check" : "content_copy"}
							data-copied={isCopied}
						/>
					</div>
				</div>}
			</div>
		</div>
	)
}

export default TextField
