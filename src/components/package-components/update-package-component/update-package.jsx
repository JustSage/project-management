import React, { Component } from 'react'
import { Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Package from '../package'
import PropTypes from 'prop-types'
export default class UpdatePackage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			data: undefined,
			package: null,
		}
		axios
			.get('/packages')
			.then((response) => {
				this.setState({
					data: response.data,
				})
			})
			.catch((error) => {
				alert(error)
			})
	}

	packagesNames = () => {
		const names = this.state.data.map((pkg) => {
			return (
				<option
					onClick={() => {
						this.setState({ package: pkg })
					}}
					key={pkg.name}
				>
					{pkg.name}
				</option>
			)
		})
		return names
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
		} else {
			return (
				<>
					<Form>
						<Form.Group>
							<Form.Label>Please choose a Package:</Form.Label>
							<Form.Control as='select'>{this.packagesNames()}</Form.Control>
						</Form.Group>
					</Form>
					<div className='d-flex flex-row flex-wrap my-flex-container'>
						<div className='p-2 my-flex-item'>
							<Package
								name={this.package.name}
								description={this.package.description}
								url={this.package.url}
								quantity={this.package.quantity}
								price={this.package.price}
								history={this.props.history}
								key={this.package.description}
							/>
						</div>
					</div>
				</>
			)
		}
	}
}

UpdatePackage.propTypes = {
	history: PropTypes.string,
}
