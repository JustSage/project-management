/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import Package from './Package'
import { Container } from 'react-bootstrap'
import '../../../css/Packages.css'
// import axios from 'axios'
/**
 * Packages page which appears as navbar tag, when click on the navbar button it'll be redirecting here
 * by routing. This page includes the package-components.
 */
class Packages extends Component {
	constructor(props) {
		super(props)
		this.AddPackage = this.AddPackage.bind(this)
	}
	state = {
		location: '',
		packages: null, // will hold our elements that we will receive from the db
		term: '',
		demoPackages: [
			{
				name: 'Israel',
				description: 'Amazingly stupid country',
				url:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/234px-Flag_of_Israel.svg.png',
			},
			{
				name: 'Canada',
				description: 'Amazingly cold country',
				url: 'https://www.crwflags.com/art/countries/canada.gif',
			},
			{
				name: 'USA',
				description: 'Amazingly corrupted country',
				url:
					'http://piq.codeus.net/static/media/userpics/piq_29610_400x400.png',
			},
		],
	}

	// componentDidMount() {
	// 	little stuck here!
	// 	axios
	// 		.post(
	// 			'/packages',
	// 			{ name: this.state.term },
	// 			{ headers: { 'content-type': 'application/json' } }
	// 		)
	// 		.then((response) => {
	// 			console.log(response)
	// 		})
	// }

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

	displayPackages() {
		return this.state.demoPackages.map((pack) => {
			return (
				// eslint-disable-next-line react/jsx-key
				<Package
					name={pack.name}
					description={pack.description}
					url={pack.url}
				/>
			)
		})
	}

	render() {
		return (
			<>
				<h3 className='h-as-title'>Packages</h3>
				{this.AddPackage()}
				<Container>
					<div className='package'>
						<div className='wrraper'>
							<label className='packageLabel' htmlFor='location'>
								Choose Location:
							</label>
							<input
								value={this.state.term}
								onChange={(e) => {
									this.setState({ term: e.target.value })
									this.setState({ found: this.state.demoPackages.length })
								}}
								type='text'
								className='packageInput'
								id='location'
							/>
						</div>
						<br />
						{this.state.found != 0 ? this.displayPackages() : null}
					</div>
				</Container>
			</>
		)
	}
}

export default Packages
