import './css/App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login-and-signup-components/login'
import Homepage from './components/general-components/homepage'
import SignUp from './components/login-and-signup-components/sign-up'
import AdminRef from './components/Admin/AdminRef'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faCheckSquare, faCoffee)

class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<>
				<div className='bg'>
					<Router>
						<Switch>
							<Route exact path='/' component={Login} />
							<Route path='/login' component={Login} />
							<Route path='/signUp' component={SignUp} />
							<Route path='/homepage' component={Homepage} />
							<Route path='/Admin-ref' component={AdminRef} />
						</Switch>
					</Router>
				</div>
			</>
		)
	}
}

export default App
