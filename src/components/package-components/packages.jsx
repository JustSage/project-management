/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import '../../css/Package.css'
// import Card from './Package-Components/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
// import Package from './package'
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
	handleLocation = (event) => {
		event.preventDefault()
		this.setState({ location: event.target.value })

		// at this part we can make a search in the DB to look for a match -> if we found a match -> add to packages .
		// after we finished with the db check, we need to pass the info we got to the <Card /> component:

		// like this: <Card: locationName= {} context = {} image = {} />

		// after this we will map our elements and display them as jsx.
	}

	render() {
		return (
			<>
				<h3 className='h-as-title'>Packages</h3>
				{this.AddPackage()}
				<div className='package'>
					<div className='wrraper'>
						<label className='packageLabel' htmlFor='location'>
							Choose Location:
						</label>
						<input
							onChange={this.handleLocation}
							className='packageInput'
							id='location'
						/>
					</div>
					<br />
				</div>
			</>
		)
	}
}

export default Packages
