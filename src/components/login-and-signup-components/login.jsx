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
			.then(() => {
				// saves a cookie during session
				sessionStorage.setItem('logged-in-username', this.state.username)
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
			return <Redirect to='/SignUp' />
		}
		if (this.state.redirect) {
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
							<div className='props2'>
								<img className='img' src='/images/avatar.png'></img>
								<h2 style={{ textAlign: 'center' }}>Log In:</h2>
								<div className='myForm'>
									<form onSubmit={this.handleSubmit} method='get'>
										<label>Username: </label>
										<br></br>
										<input
											className='myInput'
											type='text'
											placeholder='Enter username or email'
											value={this.state.username}
											onChange={this.handleUsername}
											required
										/>
										<br />
										<br />
										<label>Password:</label>
										<br></br>
										<input
											className='myInput'
											type='password'
											placeholder='Enter password'
											value={this.state.password}
											onChange={this.handlePassword}
											required
										/>
										<br />
										<br />
										<div className='wrapper'>
											<button className='btn' type='submit'>
												Log in
											</button>
										</div>
									</form>
								</div>
								<button
									className='btn_signUp'
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
