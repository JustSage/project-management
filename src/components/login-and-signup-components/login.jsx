import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			password: '',
			username: '',
			redirect: false,
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
				'/login',
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
						<h1>Login page</h1>
					</div>
					<Form.Group controlId='formBasicEmail'>
						<form onSubmit={this.handleSubmit} method='get'>
							<Form.Control
								type='text'
								placeholder='Enter username'
								value={this.state.username}
								onChange={this.handleUsername}
								style={{ width: 200 }}
							/>
							<br />
							<br />
							<Form.Control
								style={{ width: 200 }}
								type='password'
								placeholder='Enter password'
								value={this.state.password}
								onChange={this.handlePassword}
							/>
							<br />
							<br />
							<Button variant='outline-primary' type='submit'>
								Log in!
							</Button>
						</form>
					</Form.Group>
				</>
			)
	}
}

export default Login
