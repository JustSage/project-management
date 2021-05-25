/* eslint-disable react/prop-types */
import React from 'react'
import '../../css/navbar.css'
import { Navbar, Nav, Form } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser, faCog, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../../images/pine-apple-logo.png'
import { Link } from 'react-router-dom'
import SearchBar from './search-bar'
import Notification from '../inbox-components/messages-notification'

library.add(fab, faUser, faCog, faEnvelope)

class NavbarComponent extends React.Component {
	constructor(props) {
		super(props)

		this.logoutClick = this.logoutClick.bind(this)
	}

	logoutClick = () => {
		/*
		 * Removes user session after logging out and redirects to login-page ('/')
		 */
		sessionStorage.removeItem('logged-in-username')
		sessionStorage.removeItem('logged-in-role')
		sessionStorage.removeItem('logged-in-email')
		window.location.replace('/')
	}

	render() {
		return (
			<>
				<Navbar variant='dark' className='navbar navbar-custom'>
					<Link to='./homepage'>
						<img src={logo} alt='' className='img_logo' />
					</Link>
					<Nav className='mr-auto'>
						<Link to='/homepage' className='navLink nav-link'>
							Home
						</Link>

						<div className='dropdown'>
							<Nav.Link className='navLink'>Features</Nav.Link>
							<div
								className='dropdown-content'
								style={{ minWidth: '160px', right: '3%' }}
							>
								<div>
									<Link to='/reccomendations'>Reccomendations</Link>
									<Link to={{ pathname: `packages/${null}` }}>Packages</Link>
								</div>
							</div>
						</div>
						<Link className='navLink nav-link contact' to='/contact-us'>
							Contact Us!
						</Link>

						<div className='searchBar'>
							<SearchBar />
						</div>
					</Nav>

					<Form className='navbar-nav text-right'>
						<div className='user-menu'>
							<h5 className='h5-nav'>
								<FontAwesomeIcon
									className='user-icon'
									icon='user'
								></FontAwesomeIcon>{' '}
								<span className='welcome'>Welcome </span>
								<span className='user-name'>
									{sessionStorage.getItem('logged-in-username')}
								</span>
							</h5>
						</div>
						{/* <Link to='/inbox'>
							<FontAwesomeIcon
								className='envelope'
								icon='envelope'
								data-toggle='tooltip'
								title='Inbox'
							></FontAwesomeIcon>
						</Link> */}
						<Link to='/inbox'>
							<Notification />
						</Link>
						<div className='dropdown'>
							<FontAwesomeIcon className='cog' icon='cog'></FontAwesomeIcon>
							<div
								className='dropdown-content-cog'
								style={{ minWidth: '160px', right: '3%' }}
							>
								<div>
									{sessionStorage.getItem('logged-in-role') == 'Admin' ? (
										<>
											<Link to='/admin-ref'>Admin Settings</Link>
											<Link to='/customer-list'>Customer List</Link>
											<Link to='/orders-list'>Reservations</Link>
										</>
									) : (
										<>
											<Link to='/customer-info'>Personal Info</Link>
											<Link to='/customer-reservations'>Reservations</Link>
										</>
									)}
									{/* <Link to='/customer-info'>Personal Info</Link>
									<Link to='/customer-reservations'>Reservations</Link>
									<Link to='admin-ref'>Admin Settings</Link> */}
									<Link to='#' onClick={this.logoutClick}>
										Log Out
									</Link>
								</div>
							</div>
						</div>
						{/* <button className='logout_btn' onClick={this.logoutClick}>
							Log out
						</button> */}
					</Form>
				</Navbar>
			</>
		)
	}
}

export default NavbarComponent
