/* eslint-disable react/prop-types */
import './css/App.css'
import React from 'react'
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom'
import Login from './components/login-and-signup-components/login'
import Homepage from './components/general-components/homepage'
import SignUp from './components/login-and-signup-components/sign-up'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import Packages from './components/general-components/Customer/Packages'
import AddPackage from './components/general-components/Customer/Package-Components/Add-Package-Components/AddPackage'
import Flights from './components/general-components/Customer/Flights'
import OrdersList from './components/orders-components/orders-list'
import requireAuth from './components/login-and-signup-components/auth'
import NotAuth from './components/login-and-signup-components/notAuth'
import NavbarComponent from './components/general-components/navbar'
library.add(fab, faCheckSquare, faCoffee)

/**
 * App compnent includes the routing to the pages of the web
 */
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
							<Route exact path='/' render={() => <Redirect to='/login' />} />
							<Route path='/login' component={Login} />
							<Route path='/signUp' component={SignUp} />
							<Route path='/not-auth' component={NotAuth} />
							<>
								<NavbarComponent history={this.props.history} />
								<Route
									path='/homepage'
									render={() =>
										!requireAuth() ? <Redirect to='/not-auth' /> : <Homepage />
									}
								/>
								<Route
									path='/flights'
									render={() =>
										!requireAuth() ? <Redirect to='/not-auth' /> : <Flights />
									}
								/>
								<Route
									path='/packages'
									render={() =>
										!requireAuth() ? <Redirect to='/not-auth' /> : <Packages />
									}
								/>
								<Route
									path='/add-package'
									render={() =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<AddPackage />
										)
									}
								/>
								<Route
									path='/orders-list'
									render={() =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<OrdersList />
										)
									}
								/>
							</>
						</Switch>
					</Router>
				</div>
			</>
		)
	}
}

export default App
