import React from "react"

import Card from "../Card"
import TextField from "../TextField"
import Link from "../Link"
import YooMoneyForm from "../YooMoneyForm"

import styles from "./index.module.scss"

const App = () => {
	return (
		<>
			<Card
				image={require("../../img/me.jpg").default}
				title={<span>Привет <img alt="wave" className={styles.inlineImage} src={require("../../img/wave.png").default} /></span>}
				className={styles.kaspi}
			>
				Меня зовут Миша. Я веду <Link href="https://t.me/FilteredInternet">канал об айти</Link>, <Link href="https://mishasaidov.com">создаю сайты</Link>, делаю Телеграм-ботов, <Link href="https://fun.mishasaidov.com">экспериментирую</Link> и <Link href="https://github.com/mikhailsdv">мэинтейню проекты на гитхабе</Link>.
				<br /><br />
				Здесь можно задонатить мне. Почему, зачем, сколько — решайте сами.
			</Card>
			<br />
			<Card
				image={require("../../img/yoomoney.png").default}
				title={<span>На ЮMoney или Яндекс.Деньги <img alt="wallet" className={styles.inlineImage} src={require("../../img/wallet.svg").default} /></span>}
				className={styles.kaspi}
			>
				<YooMoneyForm />
			</Card>
			<br />
			<Card
				image={require("../../img/qiwi.png").default}
				title={<span>На QIWI <img alt="kiwi" className={styles.inlineImage} src={require("../../img/kiwi.png").default} /></span>}
				className={styles.kaspi}
			>
				По законодательству Казахстана на данный момент невозможно повысить статус кошелька до профессионального, поэтому не факт, что вам подойдет данный способ.
				<br /><br />
				<TextField
					label="По номеру телефона:"
					allowCopy
					value="+7 700 262 25 63"
				/>
			</Card>
			<br />
			<Card
				image={require("../../img/kaspi.png").default}
				title={<span>Через Kaspi <img alt="kz" className={styles.inlineImage} src={require("../../img/kz.png").default} /></span>}
				className={styles.kaspi}
			>
				<TextField
					label="По номеру телефона:"
					allowCopy
					value="+7 700 262 25 63"
				/>
				<br />
				<TextField
					label="Или по номеру карты:"
					allowCopy
					value="5169 4971 6043 5198"
				/>
			</Card>
			<br />
			<Card
				image={require("../../img/bitcoin.png").default}
				title={<span>На биткоин-кошелек <img alt="spy" className={styles.inlineImage} src={require("../../img/spy.png").default} /></span>}
			>
				<TextField
					label="Адрес кошелька:"
					allowCopy
					value="1MDRDDBURiPEg93epMiryCdGvhEncyAbpy"
				/>
			</Card>
		</>
	)
}

export default App
