/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import axios from 'axios'
import React, { Component } from 'react'
import { Button, Container } from 'react-bootstrap'
import '../../css/deletePackage.css'

/**
 * Component showing simple UI for package deletion.
 */
export default class DeletePackage extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	/**
	 * Handle to submission of delete request.
	 */
	handleSubmit = () => {
		axios
			.get(`/delete-package/${this.props.match.params.name}`)
			.then((response) => {
				alert(response.data.message)
				this.props.history.push(`/packages/${null}`)
			})
			.catch((error) => {
				alert(error)
			})
	}

	render() {
		return (
			<>
				<Container className='delete-conatiner'>
					<h5 className='delete-package-title'>
						Please confirm delete package {this.props.match.params.name} by
						click on the button:
					</h5>
					<Button className='delete-package-button' onClick={this.handleSubmit}>
						Delete
					</Button>
				</Container>
			</>
		)
	}
}
