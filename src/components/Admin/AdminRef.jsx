/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import NavbarComponent from '../general-components/navbar'
import Sidebar from '../general-components/sidebar'
import { Button, Form, Container } from 'react-bootstrap'
import '../../css/Admin.css'
class AdminRef extends Component {
	constructor(props) {
		super(props)
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
				<h3>Admin</h3>
				<Container>
					<Form className='admin-form'>
						<Form.Group controlId='exampleForm.ControlInput1'>
							<Form.Control placeholder='Enter username here' />
						</Form.Group>
						<Form.Group controlId='exampleForm.ControlSelect2'>
							<Form.Label>Select new role:</Form.Label>
							<Form.Control as='select' multiple>
								<option>Admin</option>
								<option>customer</option>
								<option>Travel Agent</option>
							</Form.Control>
						</Form.Group>
						<Button>Submit!</Button>
					</Form>
				</Container>
			</>
		)
	}
}

export default AdminRef
