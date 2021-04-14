/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { Component } from 'react'
import Sidebar from './sidebar'
import NavbarComponent from './navbar'
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
		bar: '',
	}

	callBackSideNave = (data) => {
		this.setState({ bar: data })
		console.log(this.state.bar)
	}

	render() {
		if (sessionStorage.getItem('logged-in-username')) {
			return (
				<>
					<NavbarComponent history={this.props.history} />
					<div className='container'>
						<div className='row hp-divs'>
							<div className='col-xs-12'>
								<Sidebar
									callBackSideNave={this.callBackSideNave}
									history={this.props.history}
								/>
							</div>
						</div>
						<div style={{ marginTop: '10%' }} className='col-xs-12 hp-divs context'>
							<h3>Home Page</h3>
						</div>
					</div>
				</>
			)
		} else {
			return (
				<>
					<h2>
						You have no permission to visit this page, please <a href='/'>Log-in</a>
					</h2>
				</>
			)
		}
	}
}

export default Homepage
