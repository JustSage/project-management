import React from "react";
// import axios from "axios";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "",
            username: ""
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    handlePassword = (event) => {
        this.setState({password: event.target.value});
    }

    handleUsername = (event) => {
        this.setState({username: event.target.value});
    }

    handleSubmit = () => {
        alert(this.state.username);
    }

    render() {
        return (
            <>
                <h1>Login page</h1>
                <form onSubmit={this.handleSubmit} method="get">
                   <input type="text" placeholder="Enter username" value={this.state.username} onChange={this.handleUsername}/>
                   <br/><br/>
                   <input type="password" placeholder="Enter password" value={this.state.password} onChange={this.handlePassword}/>
                   <br/><br/>
                   <button type="submit">Log in!</button>
                </form>
            </>
       );
}
}

export default Login;