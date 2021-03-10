import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops'
import { Redirect } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
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
							<div style={props2}>
								<img style={img} src='/images/avatar_signUp.jpg'></img>
								<h2 style={{ textAlign: 'center' }}>Sign Up:</h2>
								<div style={myForm}>
									<form onSubmit={this.handleSubmit} method='get'>
										<div style={{ display: 'flex', flexDirection: 'column' }}>
											<label style={{ fontSize: '15' }}>Username: </label>
											<input
												style={myInput}
												type='text'
												placeholder='Enter username'
												value={this.state.username}
												onChange={this.handleUsername}
												required
											/>
											<label style={{ fontSize: '15' }}>Password: </label>
											<input
												style={myInput}
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
												style={myInput}
												type='email'
												placeholder='Enter email'
												value={this.state.email}
												onChange={this.handleEmail}
												required
											/>
											<div style={wrapper}>
												<button style={btn} type='submit'>
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
const props2 = {
	background: '#ff99ff',
	margin: 'auto',
	width: '100%',
	maxWidth: '235px',
	height: '33rem',
	border: '#0101',
	borderRadius: '50px',
	backgroundImage: 'url("images/background.jpg")',
	backgroundSize: 'cover',
}

const myForm = {
	maxWidth: '30%',
	width: '100%',
	padding: '10px',
}

const img = {
	display: 'block',
	marginLeft: 'auto',
	marginRight: 'auto',
	width: '50%',
	borderRadius: '50%',
	borderStyle: 'outset',
}

const btn = {
	display: 'block',
	marginLeft: '28px',
	marginRight: 'auto',
	width: '150px',
	background: '#ff99b3',
	borderRadius: '25px',
	height: '50px',
	position: 'border',
	top: '50%',
	marginTop: '15px',
	backgroundImage: 'url("images/background_orange.png")',
	backgroundSize: 'cover',
}

const wrapper = {
	textAlign: 'center',
}

const myInput = {
	borderRadius: '10px',
	height: '40px',
	width: '205px',
	marginLeft: '5px',
}

export default signUp
