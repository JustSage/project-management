import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Spring } from 'react-spring/renderprops'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../css/login.css'

class Login extends React.Component {
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
					to={{
						opacity: 1,
						marginTop: 200,
					}}
					config={{ delay: 400, duration: 1500 }}
				>
					{(props) => (
						<div style={props}>
							<div style={props2}>
								<img style={img} src='/images/avatar.png'></img>
								<h2 style={{ textAlign: 'center' }}>Sign In:</h2>
								<div style={myForm}>
									<form onSubmit={this.handleSubmit} method='get'>
										<label style={{ fontSize: '15' }}>Login: </label>
										<br></br>
										<input
											style={myInput}
											type='text'
											placeholder='Enter username or email'
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
												Log in
											</button>
										</div>
									</form>
								</div>
								<button
									style={btn_signUp}
									type='signUp'
									onClick={this.handleSignUp}
								>
									Sign Up
								</button>
							</div>
						</div>
					)}
				</Spring>
			)
	}
}

export default Login

const props2 = {
	background: 'Orange',
	margin: 'auto',
	width: '100%',
	maxWidth: '235px',
	height: '30rem',
	border: '#0101',
	padding: '10px',
	borderRadius: '50px',
	backgroundImage: 'url("images/background_orange.png")',
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
	borderStyle: 'ridge',
}

const btn = {
	display: 'block',
	marginLeft: '14px',
	marginRight: 'auto',
	width: '150px',
	background: '#ff9933',
	borderRadius: '25px',
	height: '50px',
	position: 'border',
	top: '50%',
	marginTop: '-5px',
	backgroundImage: 'url("images/background_orange.png")',
	backgroundSize: 'cover',
}

const wrapper = {
	textAlign: 'center',
}

const myInput = {
	borderRadius: '10px',
	height: '40px',
}

const btn_signUp = {
	padding: '5px',
	display: 'block',
	marginLeft: '50px',
	marginRight: 'auto',
	width: '100px',
	background: '#ff9933',
	borderRadius: '15px',
	height: '35px',
	position: 'border',
	marginTop: '10px',
	backgroundImage: 'url("images/background_orange.png")',
	backgroundSize: 'cover',
}
