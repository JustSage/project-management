import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops'
import { Redirect } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/sign-up.css'
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
		if (passCheck == this.state.password) {
			this.setStage({ confirmPassBorder: 'lime' })
		} else {
			this.setState({ confirmPassBorder: 'red' })
		}
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
							<div className='signup-frame'>
								<img className='signup-img'></img>
								<h2 className='header'>Sign Up:</h2>
								<div className='myForm'>
									<form onSubmit={this.handleSubmit} method='get'>
										<div className='innerForm'>
											<label className='labels'>Username: </label>
											<input
												className='myInput'
												type='text'
												placeholder='Enter username'
												value={this.state.username}
												onChange={this.handleUsername}
												required
											/>
											<label className='labels'>Password: </label>
											<input
												className='myInput'
												type='password'
												placeholder='Enter password'
												value={this.state.password}
												onChange={this.handlePassword}
												required
											/>
											<label className='labelsConfirm'>
												Confirm Password:{' '}
											</label>
											<input
												className='myInput'
												type='password'
												placeholder='Confirm password'
												value={this.state.confirmPass}
												onChange={this.handleConfirmPass}
												required
											/>
											<label className='labels'>Email: </label>
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
											<div className='already-user'>
												Already a user?
												<br></br>
												<a className='login-link' href='/'>
													Log in now!
												</a>
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
