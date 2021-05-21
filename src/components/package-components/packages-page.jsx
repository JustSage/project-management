/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import '../../css/Package.css'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import Package from './package'
// import { Container } from 'react-bootstrap'
import axios from 'axios'

/**
 * Packages page which appears as navbar tag, when click on the navbar button it'll be redirecting here
 * by routing. This page includes the package-components.
 */
class Packages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: undefined,
			location:
				sessionStorage.getItem('search-value') == undefined
					? ''
					: sessionStorage.getItem('search-value'),
		}

		axios
			.get('/packages')
			.then((response) => {
				this.setState({
					data: response.data,
				})
			})
			.catch((error) => {
				console.log(error.message)
				alert(error.message)
			})
	}

	componentDidMount() {
		sessionStorage.setItem('search-value', '')
	}

	AddPackage = () => {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent'
		)
			return (
				<h5 className='h5-packages'>
					<a href='/add-package' className='add-package-href'>
						<Button className='anp-btn'>Add new package!</Button>
					</a>
				</h5>
			)
	}

	handleLocation = (event) => {
		event.preventDefault()
		this.setState({ location: event.target.value })
	}

	render() {
		if (this.state.data === undefined) {
			return (
				<div className='text-center'>
					<div className='spinner-border' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			)
		} else
			return (
				<>
					<div className='package'>
						<div className='wrraper'>
							<label className='packageLabel' htmlFor='location'>
								Choose Location:
							</label>
							<input
								onChange={this.handleLocation}
								className='packageInput'
								id='location'
								value={this.state.location}
							/>
						</div>
						<br />
						{this.AddPackage()}
					</div>
					<div className='d-flex flex-row flex-wrap my-flex-container'>
						{this.state.data
							.filter((pkg) => pkg.name.includes(this.state.location))
							.map((pkg) => {
								if (pkg.quantity > 0) {
									return (
										<div className='p-2 my-flex-item' key={pkg.description}>
											<Package
												name={pkg.name}
												description={pkg.description}
												url={pkg.url}
												quantity={pkg.quantity}
												price={pkg.price}
												updated={pkg.updated}
												rating={pkg.rating}
												dates={pkg.packageDates}
												history={this.props.history}
												key={pkg.description}
											/>
										</div>
									)
								} else {
									return null
								}
							})}
					</div>
				</>
			)
	}
}

export default Packages
