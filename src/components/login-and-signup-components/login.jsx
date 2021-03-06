import React from "react";

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <h1>Login page</h1>
                <form action="" method="get">
                   <input type="text" placeholder="Enter username"/>
                   <input type="password" placeholder="Enter password"/>
                   <button type="submit">Log in!</button>
                </form>
            </>
       );
}
}

export default Login;