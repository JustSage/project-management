/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Package from './Package'
// import { Container } from 'react-bootstrap'
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
				<h3 className='h-as-title'>Packages</h3>
				{this.AddPackage()}
				<Package />
			</>
		)
	}
}

export default Packages
