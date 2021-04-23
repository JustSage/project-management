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
				<h1>Welcome!</h1>
			</>
		)
	}
}

export default Homepage
