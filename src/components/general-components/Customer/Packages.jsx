/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import NavbarComponent from '../navbar'
import Sidebar from '../sidebar'
import Package from './Package'
import { Container } from 'react-bootstrap'
/**
 * Packages page which appears as navbar tag, when click on the navbar button it'll be redirecting here
 * by routing. This page includes the package-components.
 */
class Packages extends Component {
	constructor(props) {
		super(props)
		this.AddPackage = this.AddPackage.bind(this)
	}

	AddPackage = () => {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent'
		)
			return (
				<h5 className='h5-packages'>
					<a href='/add-package'>Add new package!</a>
				</h5>
			)
	}

	render() {
		return (
			<>
				<NavbarComponent history={this.props.history} />

				<div className='row hp-divs'>
					<div className='col-xs-12'>
						<Sidebar history={this.props.history} />
					</div>
				</div>
				<h3 className='h-as-title'>Packages</h3>
				{this.AddPackage()}
				<Container>
					<Package />
				</Container>
			</>
		)
	}
}

export default Packages
