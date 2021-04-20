/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import Sidebar from './sidebar'
import NavbarComponent from './navbar'
import Packages from './Customer/Packages'
import HomeContext from './Customer/HomeContext'
import Reservations from './TravelAgent/Reservations'
import CustomersList from './TravelAgent/CustomersList'
import Attractions from './Customer/Attractions'
import Car from './Customer/Car'
import Flights from './Customer/Flights'
import Hotels from './Customer/Hotels'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
	faCheckSquare,
	faCoffee,
	faUser,
} from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/homepage.css'
import AdminRef from '../Admin/AdminRef'

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
					<NavbarComponent history={this.props.history} />
					<div className='row hp-divs'>
						<div className='col-xs-12'>
							<Sidebar
								callBackSideNav={this.callBackSideNav}
								history={this.props.history}
							/>
						</div>
					</div>
					<div style={{ marginTop: '10%' }} className='col-xs-12 hp-divs context'>
						{this.chooseContext()}
					</div>
				</>
			)}
	}

export default Homepage
