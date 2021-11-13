import React, {useState} from "react";
import classnames from "classnames"
import urlqueryobject from "urlqueryobject"

import TextField from "../TextField"

import styles from "./index.module.scss"

const transformSum = n => `${Number(n).toLocaleString()} ₽`

const YMoneyForm = props => {
	const {className, ...rest} = props

	const params = urlqueryobject()
	const paymentTypes = [
		{
			value: "PC",
			label: "оплата из кошелька ЮMoney",
			image: require("../../img/wallet.svg").default,
		},
		{
			value: "AC",
			label: "с банковской карты",
			image: require("../../img/card.svg").default,
		},
		{
			value: "MC",
			label: "с баланса мобильного",
			image: require("../../img/phone.svg").default,
		},
	]

	const [comment, setComment] = useState(params.comment || "")
	const [sum, setSum] = useState(params.sum ? transformSum(params.sum) : "")
	const [payBy, setPayBy] = useState(paymentTypes.find(item => item.value === params.payby) ? params.payby : "PC")

	const sumOnChange = e => {
		const value = e.target.value.replace(/\D/g, "")
		if (value === "") return setSum("");
		const newValue = transformSum(value)
		setSum(newValue)

		window.requestAnimationFrame(() => {
			const cursorPosition = newValue.length - 2
			e.target.setSelectionRange(cursorPosition, cursorPosition)
		})
	}

	const pureSum = Number(sum.replace(/\D/g, ""))

	return (
		<form
			method="POST"
			action="https://yoomoney.ru/quickpay/confirm.xml"
			className={classnames(styles.root, className)}
			{...rest}
		>
			<input type="hidden" name="receiver" value="4100117319944149" />
			<input type="hidden" name="formcomment" value="Донат Мише" />
			<input type="hidden" name="short-dest" value="Донат Мише" />
			{/*<input type="hidden" name="label" value="$order_id" />*/}
			<input type="hidden" name="quickpay-form" value="donate" />
			<input type="hidden" name="targets" value="Донат Мише" />
			<input type="hidden" name="sum" value={pureSum} />
			<TextField
				label="Сумма, ₽"
				placeholder="Минимум 100₽"
				value={sum}
				onChange={sumOnChange}
				required
			/>
			<br />

			<div className={styles.label}>Откуда переводим?</div>
			<input type="hidden" name="paymentType" value={payBy} />
			<div className={styles.radio}>
				{paymentTypes.map(({value, label, image}) => <div
					key={value}
					className={styles.radioButton}
					data-active={payBy === value}
					onClick={() => setPayBy(value)}
				>
					<img alt={label} className={styles.inlineImage} src={image} />
				</div>)}
			</div>
			<br />

			<TextField
				label="Комментарий"
				name="comment"
				textarea
				placeholder="Не обязательно"
				value={comment}
				onChange={e => setComment(e.target.value)}
			/>
			<br />

			<input type="hidden" name="need-fio" value="false" />
			<input type="hidden" name="need-email" value="false" />
			<input type="hidden" name="need-phone" value="false" />
			<input type="hidden" name="need-address" value="false" />

			<input
				type="submit"
				value="Перевести"
				className={styles.submit}
				disabled={pureSum < 100}
			/>
		</form>
	)
}

export default YMoneyForm
