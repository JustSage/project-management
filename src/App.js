/* eslint-disable no-undef */
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
import CustomerList from './components/list-components/customer-list'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import Packages from './components/package-components/packages-page'
import AddPackage from './components/package-components/add-package'
import OrdersList from './components/orders-components/orders-list'
import requireAuth from './components/login-and-signup-components/auth'
import NotAuth from './components/login-and-signup-components/notAuth'
import NavbarComponent from './components/general-components/navbar'
import MakeOrder from './components/orders-components/make-order'
import UpdatePackage from './components/package-components/update-package'
import DeletePackage from './components/package-components/delete-package'
import AdminRef from './components/admin-components/admin-ref'
import CustomeReservations from './components/reservations-components/customer-reservations'
import Reccomendations from './components/package-components/reccomendations'
import ContactUs from './components/contact-component/contact-us'
import Inbox from './components/inbox-components/inbox'
import SendTo from './components/inbox-components/reply'

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
									path='/customer-reservations'
									render={() =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<CustomeReservations />
										)
									}
								/>

								<Route
									path='/packages/:search'
									render={(props) =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<Packages {...props} />
										)
									}
								/>
								<Route
									path='/add-package'
									render={(props) =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<AddPackage {...props} />
										)
									}
								/>
								<Route
									path='/reccomendations'
									render={(props) =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<Reccomendations {...props} />
										)
									}
								/>
								<Route
									path='/customer-list'
									render={() =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<CustomerList />
										)
									}
								/>
								<Route
									path='/update-package/:destination/:description/:price/:quantity/:dates/:url'
									render={(props) =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<UpdatePackage {...props} />
										)
									}
								/>
								<Route
									path='/delete-package/:name'
									render={(props) =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<DeletePackage {...props} />
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
								<Route
									path='/admin-ref'
									render={() =>
										!requireAuth() ? <Redirect to='/not-auth' /> : <AdminRef />
									}
								/>
								<Route
									path='/make-order/:destination/:price/:description/:quantity/:dates'
									render={(props) =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<MakeOrder {...props} />
										)
									}
								/>
								<Route
									path='/contact-us/'
									render={() =>
										!requireAuth() ? <Redirect to='/not-auth' /> : <ContactUs />
									}
								/>
								<Route
									path='/reply/:SourceEmail/:Subject'
									render={(props) =>
										!requireAuth() ? (
											<Redirect to='/not-auth' />
										) : (
											<SendTo {...props} />
										)
									}
								/>
								<Route
									path='/inbox'
									render={() =>
										!requireAuth() ? <Redirect to='/not-auth' /> : <Inbox />
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
