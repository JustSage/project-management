/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import '../../css/Package.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Package from './package'
// import { Container } from 'react-bootstrap'
import axios from 'axios'

/**
 * Packages page which appears as navbar tag, when click on the navbar button it'll be redirecting here
 * by routing. This page includes the package-components.
 */
class Reccomendations extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: undefined,
		}

		axios
			.get('/package-by-rating')
			.then((response) => {
				this.setState({
					data: response.data,
				})
			})
			.catch((error) => {
				alert(error.response.data.message)
			})
	}
	componentDidMount() {}

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
					<div className='d-flex flex-row flex-wrap my-flex-container'>
						{this.state.data.map((pkg) => {
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

export default Reccomendations
