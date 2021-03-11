import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops'
import { Redirect } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../login-and-signup-components/sign-up.css'
//import axios from 'axios'

class signUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			password: '',
			confirmPass: '',
			confirmPassBorder: '',
			username: '',
			email: '',
			redirect: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleUsername = this.handleUsername.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
		this.handleEmail = this.handleEmail.bind(this)
	}
	handlePassword = (event) => {
		this.setState({ password: event.target.value })
	}
	handleConfirmPass = (event) => {
		this.setState({ confirmPass: event.target.value })
		let passCheck = event.target.value
		if (passCheck == this.state.password)
			// eslint-disable-next-line react/no-direct-mutation-state
			this.state.confirmPassBorder = 'lime'
		// eslint-disable-next-line react/no-direct-mutation-state
		else this.state.confirmPassBorder = 'red'
	}
	handleUsername = (event) => {
		this.setState({ username: event.target.value })
	}

	handleEmail = (event) => {
		this.setState({ email: event.target.value })
	}
	handleSubmit = () => {
		event.preventDefault()
		alert('Signed Up!')
		sessionStorage.setItem('logged-in-username', this.state.username)
		this.setState({ redirect: true })
		//This part will be out of comment when server will be connected

		// axios
		// 	.post(
		// 		'/signup',
		// 		{
		// 			username: this.state.username,
		// 			password: this.state.password,
		// 			email: this.state.email
		// 		},
		// 		{ headers: { 'content-type': 'application/json' } }
		// 	)
		// 	.then((response) => {
		// 		alert(response.data.message)
		// 		this.setState({
		// 			redirect: true,
		// 		})
		// 	})
		// 	.catch((error) => {
		// 		console.log(error)
		// 		alert('User not found!')
		// 	})
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to='/homepage' />
		} else
			return (
				<Spring
					from={{ opacity: 0, marginTop: -500 }}
					to={{ opacity: 1, marginTop: 200 }}
					config={{ delay: 400, duration: 1500 }}
				>
					{(props) => (
						<div style={props}>
							<div className='props2'>
								<img className='img' src='/images/avatar_signUp.jpg'></img>
								<h2 style={{ textAlign: 'center' }}>Sign Up:</h2>
								<div className='myForm'>
									<form onSubmit={this.handleSubmit} method='get'>
										<div style={{ display: 'flex', flexDirection: 'column' }}>
											<label style={{ fontSize: '15' }}>Username: </label>
											<input
												className='myInput'
												type='text'
												placeholder='Enter username'
												value={this.state.username}
												onChange={this.handleUsername}
												required
											/>
											<label style={{ fontSize: '15' }}>Password: </label>
											<input
												className='myInput'
												type='password'
												placeholder='Enter password'
												value={this.state.password}
												onChange={this.handlePassword}
												required
											/>
											<label style={{ fontSize: '15', width: 200 }}>
												Confirm Password:{' '}
											</label>
											<input
												style={{
													outlineColor: this.state.confirmPassBorder,
													width: '205px',
													borderRadius: '10px',
													height: '40px',
													marginLeft: '5px',
												}}
												type='password'
												placeholder='Confirm password'
												value={this.state.confirmPass}
												onChange={this.handleConfirmPass}
												required
											/>
											<label style={{ fontSize: '15' }}>Email: </label>
											<input
												className='myInput'
												type='email'
												placeholder='Enter email'
												value={this.state.email}
												onChange={this.handleEmail}
												required
											/>
											<div className='wrapper'>
												<button className='btn' type='submit'>
													Accept
												</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					)}
				</Spring>
			)
	}
}

export default signUp
