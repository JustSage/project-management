/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { Button, Container } from 'react-bootstrap'
import '../../../css/deletePackage.css'
export default class DeletePackage extends Component {
	render() {
		return (
			<>
				<Container className='delete-conatiner'>
					<h3 className='delete-package-title'>
						Please confirm delete package {this.props.match.params.name} by
						click on the button:
					</h3>
				</Container>
				<Button className='delete-package-button' onClick={this.handleSubmit}>
					Delete
				</Button>
			</>
		)
	}
}
