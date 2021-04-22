/* eslint-disable react/prop-types */
import React from 'react'
import '../../css/navbar.css'
import { Navbar, Nav, Form } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../../images/pine-apple-logo.png'
import { Link } from 'react-router-dom'
library.add(fab, faUser)

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
		this.props.history.push('/')
	}

	render() {
		return (
			<>
				<Navbar variant='dark' className='navbar navbar-custom'>
					<img src={logo} alt='' className='img_logo' />
					<Nav className='mr-auto'>
						<Nav.Link
							className='navLink'
							onClick={() => this.props.history.push('homepage')}
						>
							Home
						</Nav.Link>
						<div className='dropdown'>
							<Nav.Link className='navLink'>Features</Nav.Link>
							<div className='dropdown-content'>
								<div>
									<Link to='/flights'>Flights</Link>
									<Link to='/hotels'>Hotels</Link>
									<Link to='/car'>Rental Cars</Link>
								</div>
								<div>
									<Link to='/packages'>Packages</Link>
									<Link to='/attractions'>Attractions</Link>
									<Link to='reservations'>Reservations</Link>
								</div>
							</div>
						</div>
						<div className='dropdown'>
							<Nav.Link className='navLink'>Pricing</Nav.Link>
							<div className='dropdown-content' style={{ minWidth: '130px' }}>
								<div>
									<Link to='#'>100$-500$</Link>
									<Link to='#'>500$-1000$</Link>
									<Link to='#'>1000$-5000$</Link>
								</div>
							</div>
						</div>
						{/* <Nav.Link
							className='navLink'
							onClick={() => this.props.history.push('packages')}
						>
							Packages
						</Nav.Link> */}
					</Nav>
					<input
						type='search'
						placeholder='Search for packages...'
						className='search-input'
					></input>
					<Form inline>
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
						<button className='logout_btn' onClick={this.logoutClick}>
							Log out
						</button>
					</Form>
				</Navbar>
			</>
		)
	}
}

export default NavbarComponent
