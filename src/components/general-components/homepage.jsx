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
				<p>
					Our travel agency offers vacations to destinations all around the world!<br/>
					You can reach us through our mail: TravelAgency@travelAgecny.com<br/>
					Or through our phone: 123-456789
				</p>
				</div>
			</>
		)
	}
}

export default Homepage
