/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import Packages from '../package-components/packages-page'
import HomeContext from '../package-components/home-context'
import Reservations from '../reservations-components/reservations'
import CustomersList from '../list-components/customer-list'
import Attractions from '../package-components/attractions'
import Car from '../package-components/car'
import Flights from '../package-components/flights'
import Hotels from '../package-components/hotels'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
	faCheckSquare,
	faCoffee,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/homepage.css'
import AdminRef from '../admin-components/admin-ref'

library.add(fab, faCheckSquare, faCoffee, faUser)

class Homepage extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		bar: 'Flights', // defatult
	}

	callBackSideNav = (data) => {
		console.log(`homepage: ${data}`)
		this.setState({ bar: data })
	}

	chooseContext = () => {
		console.log(`i am: ${this.state.bar}`)

		if (this.state.bar === '') {
			return <HomeContext />
		} else if (this.state.bar === 'Packages') {
			return <Packages />
		} else if (this.state.bar === 'Reservations') {
			return <Reservations />
		} else if (this.state.bar === 'CustomersList') {
			return <CustomersList />
		} else if (this.state.bar === 'Attractions') {
			return <Attractions />
		} else if (this.state.bar === 'Rental Cars') {
			return <Car />
		} else if (this.state.bar === 'Flights') {
			return <Flights />
		} else if (this.state.bar === 'Hotels') {
			return <Hotels />
		} else if (this.state.bar === 'Admin Referecnes') {
			return <AdminRef />
		}
	}

	render() {
		return (
			<>
				<div className='col-xs-12 hp-divs context'>{this.chooseContext()}</div>
				<h1>Welcome!</h1>
			</>
		)
	}
}

export default Homepage
