import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            username: '',
            redirect: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUsername = this.handleUsername.bind(this)
        this.handlePassword = this.handlePassword.bind(this)
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value})
    }

    handleUsername = (event) => {
        this.setState({username: event.target.value})
    }

    handleSubmit = () => {
        event.preventDefault()
        axios.get(`/login/${this.state.username}`, {
        })
        .then((response) => {
            alert(response.data.message)
            this.setState({
                redirect: true
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
            return <Redirect to='/homepage'/>
        }
        else return (
            <>
                <h1>Login page</h1>
                <form onSubmit={this.handleSubmit} method='get'>
                   <input type='text' placeholder='Enter username' value={this.state.username} onChange={this.handleUsername}/>
                   <br/><br/>
                   <input type='password' placeholder='Enter password' value={this.state.password} onChange={this.handlePassword}/>
                   <br/><br/>
                   <button type='submit'>Log in!</button>
                </form>
            </>
       )
}
}

export default Login
