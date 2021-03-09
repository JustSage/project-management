import React, { Component } from 'react'
import { Spring } from 'react-spring/renderprops'
import { Redirect } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

export default class signUp extends Component {
	constructor(props) {
		super(props)
		this.state = {
			password: '',
			username: '',
			redirect: false,
			signUp_redirect: false,
		}

		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleUsername = this.handleUsername.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
		this.handleSignUp = this.handleSignUp.bind(this)
	}
	handlePassword = (event) => {
		this.setState({ password: event.target.value })
	}

	handleUsername = (event) => {
		this.setState({ username: event.target.value })
	}
	handleSignUp = () => {
		this.setState({ signUp_redirect: true })
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
		if (this.state.signUp_redirect) {
			console.log('!!!!')
			return <Redirect to='/SignUp' />
		}
		if (this.state.redirect) {
			console.log('!!!!')
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
										<label style={{ fontSize: '15' }}>Login: </label>
										<br></br>
										<input
											style={myInput}
											type='text'
											placeholder='Enter username'
											value={this.state.username}
											onChange={this.handleUsername}
										/>
										<br />
										<br />
										<label style={{ fontSize: '15' }}>Password: </label>
										<br></br>
										<input
											style={myInput}
											type='password'
											placeholder='Enter password'
											value={this.state.password}
											onChange={this.handlePassword}
										/>
										<br />
										<br />
										<div style={wrapper}>
											<button style={btn} type='submit'>
												Accept
											</button>
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
	height: '30rem',
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
}
