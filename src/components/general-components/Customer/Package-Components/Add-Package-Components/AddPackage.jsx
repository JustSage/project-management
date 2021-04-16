/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import NavbarComponent from '../../../navbar'
import Sidebar from '../../../sidebar'
import axios from 'axios'
import { Form, Col, Row } from 'react-bootstrap'
import '../../../../../css/addPackage.css'

class AddPackage extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		if (
			sessionStorage.getItem('logged-in-role') == 'Admin' ||
			sessionStorage.getItem('logged-in-role') == 'Travel Agent'
		) {
			return (
				<>
					<NavbarComponent history={this.props.history} />

					<div className='row hp-divs'>
						<div className='col-xs-12'>
							<Sidebar history={this.props.history} />
						</div>
					</div>
					<h3>AddPackage</h3>
					<Form className='add-package-form'>
						<Form.Group>
							<Form.Label>Email</Form.Label>
							<Form.Control
								plaintext
								readOnly
								defaultValue='email@example.com'
							/>
						</Form.Group>

						<Form.Group>
							<Form.Label>Password</Form.Label>
							<Form.Control type='password' placeholder='Password' />
						</Form.Group>
					</Form>
				</>
			)
		} else {
			return (
				<>
					<h2>
						You have no permission to visit this page, please{' '}
						<a href='/'>Log-in</a>
					</h2>
				</>
			)
		}
	}
}

export default AddPackage
