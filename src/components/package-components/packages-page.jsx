/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import '../../css/Package.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Package from './package'
// import { Container } from 'react-bootstrap'
import axios from 'axios'
import { Link } from 'react-router-dom'
/**
 * Packages page which appears as navbar tag, when click on the navbar button it'll be redirecting here
 * by routing. This page includes the package-components.
 */
class Packages extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: undefined,
		}
		this.AddPackage = this.AddPackage.bind(this)

		axios
			.get('/packages')
			.then((response) => {
				this.setState({
					data: response.data,
				})
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}

	AddPackage = () => {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent'
		)
			return (
				<h5 className='h5-packages'>
					<Link to='/add-package' className='add-new-package-link'>
						Add new package!
					</Link>
				</h5>
			)
	}
	handleLocation = (event) => {
		event.preventDefault()
		this.setState({ location: event.target.value })
	}

	render() {
		if (this.state.data === undefined) {
			return <div>loading...</div>
		} else
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
					<div className='d-flex flex-row flex-wrap my-flex-container'>
						{this.state.data.map((pkg) => {
							return (
								<div className='p-2 my-flex-item'>
									<Package
										name={pkg.name}
										description={pkg.description}
										url={pkg.url}
										quantity={pkg.quantity}
										price={pkg.price}
										history={this.props.history}
									/>
								</div>
							)
						})}
					</div>
					{/* <Container className='cards-container'>
						{this.state.data.map((pkg) => {
							return (
								<Package
									name={pkg.name}
									description={pkg.description}
									url={pkg.url}
									quantity={pkg.quantity}
									price={pkg.price}
									history={this.props.history}
								/>
							)
						})}
					</Container> */}
				</>
			)
	}
}

export default Packages

// at this part we can make a search in the DB to look for a match -> if we found a match -> add to packages .
// after we finished with the db check, we need to pass the info we got to the <Card /> component:

// like this: <Card: locationName= {} context = {} image = {} />

// after this we will map our elements and display them as jsx.
