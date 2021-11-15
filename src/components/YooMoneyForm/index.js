import React, {useState} from "react";
import classnames from "classnames"
import urlqueryobject from "urlqueryobject"

import TextField from "../TextField"
import Label from "../Label"

import styles from "./index.module.scss"

const numberWithSpaces = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
const transformSum = n => `${numberWithSpaces(n).toLocaleString()} ₽`
const getHelperTextBySum = sum => {
	return [
		{
			sum: 0,
			text: "Минимум 100 ₽",
		},
		{
			sum: 100,
			text: "На такси до работы 🚕",
		},
		{
			sum: 110,
			text: "На пивасик 🍺",
		},
		{
			sum: 120,
			text: "На американо ☕",
		},
		{
			sum: 130,
			text: "На плитку шоколада 🍫",
		},
		{
			sum: 150,
			text: "На капучино ☕",
		},
		{
			sum: 180,
			text: "На шаурму 🌮",
		},
		{
			sum: 200,
			text: "На билет в кино 🎫",
		},
		{
			sum: 400,
			text: "На бензин ⛽",
		},
		{
			sum: 450,
			text: "На рекламу проектов 📣",
		},
		{
			sum: 500,
			text: "На презервативы 🍆",
		},
		{
			sum: 600,
			text: "На аренду сервера 👨‍💻",
		},
		{
			sum: 1000,
			text: "На подарок маме ❤",
		},
		{
			sum: 1500,
			text: "На оплату интернета 🌐",
		},
		{
			sum: 2000,
			text: "На оплату коммуналки 🏠",
		},
		{
			sum: 2200,
			text: "На сеанс у психолога 😪",
		},
		{
			sum: 2500,
			text: "На новые Mi Band 🕐",
		},
		{
			sum: 3000,
			text: "На курсы английского 🇬🇧",
		},
		{
			sum: 4000,
			text: "На билет до Нур-Султана ✈",
		},
		{
			sum: 4500,
			text: "На новую куртку 🧥",
		},
		{
			sum: 5000,
			text: "На курсы по электрогитаре 🎸",
		},
		{
			sum: 6000,
			text: "На новую звуковую карту 🎵",
		},
		{
			sum: 10000,
			text: "Маме на пылесос 💨",
		},
		{
			sum: 20000,
			text: "На холодильник ❄",
		},
		{
			sum: 30000,
			text: "На новый телефон 📱",
		},
		{
			sum: 40000,
			text: "На синтезатор 🎹",
		},
		{
			sum: 60000,
			text: "На новый ноут 💻",
		},
		{
			sum: 100000,
			text: "На макбук 💻",
		},
		{
			sum: 200000,
			text: "На благотворительность ❤",
		},
		{
			sum: 500000,
			text: "На новую машину 🚗",
		},
		{
			sum: 1000000,
			text: "Вы уверены? 😨",
		},
		{
			sum: 5000000,
			text: "Я не заслужил 😥",
		},
	]
		.filter(item => item.sum <= sum)
		.slice(-1)
		[0]?.text || ""
}

const YooMoneyForm = props => {
	const {className, ...rest} = props

	const params = urlqueryobject()
	const paymentTypes = [
		{
			value: "PC",
			label: "Из кошелька ЮMoney",
			image: require("../../img/wallet.svg").default,
		},
		{
			value: "AC",
			label: "С банковской карты",
			image: require("../../img/card.svg").default,
		},
		{
			value: "MC",
			label: "С баланса мобильного",
			image: require("../../img/phone.svg").default,
		},
	]

	const [comment, setComment] = useState(params.comment ? decodeURI(params.comment) : "")
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
	const canPay = (
		pureSum >= 100 && (
			["PC", "MC"].includes(payBy) ||
			(payBy === "AC" && pureSum <= 15000)
		)
	)

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
				placeholder="Минимум 100 ₽"
				value={sum}
				onChange={sumOnChange}
				required
				helperText={pureSum > 0 && getHelperTextBySum(pureSum)}
				errorText={payBy === "AC" && pureSum > 15000 ? "По карте максимум 15 000 ₽" : null}
			/>
			<br />

			<Label>Откуда переводим?</Label>
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
			<div className={styles.helper}>{paymentTypes.find(item => item.value === payBy).label}</div>
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
				disabled={!canPay}
			/>
		</form>
	)
}

export default YooMoneyForm
