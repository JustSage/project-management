/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
	faCheckSquare,
	faCoffee,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/homepage.css'
import Ariel from '../../images/Ariel_full_stack.png'
import Yonatan from '../../images/Yonatan_CEO.png'
import David from '../../images/David_ui.png'
import SagieBalls from '../../images/Sagie_Baram_DBO.png'

library.add(fab, faCheckSquare, faCoffee, faUser)

class Homepage extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		bar: 'Flights', // defatult
	}

	render() {
		return (
			<>
				<div align='center'>
				<h1>Welcome to PineApple Travels!</h1>
				<h3 margin top>About us:</h3>
				<div style={{display:'flex'}}>
					<image src={Yonatan}/>
					<image src={Ariel}/>
					<image src={David}/>
					<image src={SagieBalls}/>
				</div>
				</div>
			</>
		)
	}
}

export default Homepage
