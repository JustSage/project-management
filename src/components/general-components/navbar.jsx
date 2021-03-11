/* eslint-disable react/prop-types */
import React from 'react'
import '../../css/navbar.css'
import { Navbar, Nav, Form } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../../images/pineApple_logo.png'
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
		this.props.history.push('/')
	}

	render() {
		return (
			<>
				<Navbar variant='dark' className='navbar navbar-custom'>
					<img src={logo} alt='' className='img_logo' />
					<Nav className='mr-auto'>
						<Nav.Link className='navLink' href='#home'>
							Home
						</Nav.Link>
						<Nav.Link className='navLink' href='#features'>
							Features
						</Nav.Link>
						<Nav.Link className='navLink' href='#pricing'>
							Pricing
						</Nav.Link>
					</Nav>
					<Form inline>
						<h5>
							<FontAwesomeIcon
								icon='user'
								style={{ marginTop: 10, fontSize: 17 }}
							></FontAwesomeIcon>{' '}
							<span style={{ fontSize: '14px', opacity: '0.7' }}>Welcome </span>
							<span
								style={{ fontSize: '14px', opacity: '0.9', color: '#A52A2A' }}
							>
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
