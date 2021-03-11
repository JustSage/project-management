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
						<Nav.Link href='#home'>Home</Nav.Link>
						<Nav.Link href='#features'>Features</Nav.Link>
						<Nav.Link href='#pricing'>Pricing</Nav.Link>
					</Nav>
					<Form inline>
						<h5 style={{ fontSize: 17, marginRight: '10px' }}>
							<FontAwesomeIcon
								icon='user'
								style={{ marginTop: 10, fontSize: 17 }}
							></FontAwesomeIcon>{' '}
							Welcome {sessionStorage.getItem('logged-in-username')}
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
