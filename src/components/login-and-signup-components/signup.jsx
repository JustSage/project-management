import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Redirect } from 'react-router'
import { InputGroup } from 'react-bootstrap'

class Signup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			password: '',
			username: '',
			redirect: false,
			textType: 'invalid',
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleUsername = this.handleUsername.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
	}

	handlePassword = (event) => {
		this.setState({ password: event.target.value })
	}

	handleUsername = (event) => {
		this.setState({ username: event.target.value })
	}

	handleSubmit = () => {
		event.preventDefault()
		axios
			.post(
				'/signup',
				{
					username: this.state.username,
					password: this.state.password,
				},
				{ headers: { 'content-type': 'application/json' } }
			)
			.then((response) => {
				alert(response.data.message)
				this.setState({
					redirect: true,
				})
			})
			.catch((error) => {
				console.log(error)
				alert('User not found!')
			})
	}

	render() {
		if (this.state.redirect) {
			console.log('!!!!')
			return <Redirect to='/homepage' />
		} else
			return (
				<>
					<div style={{ height: 80 }}>
						<h1>Signup page</h1>
					</div>
					<Form.Group controlId='formBasicEmail'>
						<form onSubmit={this.handleSubmit} method='get'>
							{this.state.textType == 'invalid' ? (
								<InputGroup hasValidation>
									<Form.Control type='text' required isInValid></Form.Control>
									<Form.Control.Feedback type='invalid'>
										Please choose a username.
									</Form.Control.Feedback>
								</InputGroup>
							) : (
								<InputGroup hasValidation>
									<Form.Control type='text' required isValid></Form.Control>
									<Form.Control.Feedback type='valid'>
										Please choose a username.
									</Form.Control.Feedback>
								</InputGroup>
							)}
							<div style={{ marginBottom: 5 }}>
								<Form.Control
									type='text'
									placeholder='Enter username'
									value={this.state.username}
									onChange={this.handleUsername}
									style={{ width: 200 }}
								/>
							</div>
							<div style={{ marginBottom: 5 }}>
								<Form.Control
									style={{ width: 200 }}
									type='password'
									placeholder='Enter password'
									value={this.state.password}
									onChange={this.handlePassword}
								/>
							</div>

							<div style={{ marginBottom: 5 }}>
								<Form.Control
									style={{ width: 200 }}
									type='password'
									placeholder='Confirm password'
									value={this.state.password}
									onChange={this.handlePassword}
								/>
							</div>

							<Button variant='outline-primary' type='submit'>
								Sign up!
							</Button>
						</form>
					</Form.Group>
				</>
			)
	}
}

export default Signup
