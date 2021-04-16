/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import NavbarComponent from '../../../navbar'
import Sidebar from '../../../sidebar'
import axios from 'axios'

class AddPackage extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		if (
			sessionStorage.getItem('role') == 'Admin' ||
			sessionStorage.getItem('role') == 'Travel Agent'
		) {
			return (
				<>
					<NavbarComponent history={this.props.history} />

					<div className='row hp-divs'>
						<div className='col-xs-12'>
							<Sidebar history={this.props.history} />
						</div>
					</div>
					<h3>AddPackage</h3>
				</>
			)
		} else {
			return (
				<>
					<h2>
						You have no permission to visit this page, please{' '}
						<a href='/'>Log-in</a>
					</h2>
				</>
			)
		}
	}
}

export default AddPackage
