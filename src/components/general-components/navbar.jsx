import React from 'react'
import { Navbar, Nav, Button, Form } from 'react-bootstrap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'bootstrap/dist/css/bootstrap.min.css'

library.add(fab, faUser)

class NavbarComponent extends React.Component {
	render() {
		return (
			<>
				<Navbar bg='warning' variant='dark'>
					<Navbar.Brand href='#home'>Navbar</Navbar.Brand>
					<Nav className='mr-auto'>
						<Nav.Link href='#home'>Home</Nav.Link>
						<Nav.Link href='#features'>Features</Nav.Link>
						<Nav.Link href='#pricing'>Pricing</Nav.Link>
					</Nav>
					<Form inline>
						<h5>
							<FontAwesomeIcon
								icon='user'
								style={{ marginTop: 10 }}
							></FontAwesomeIcon>{' '}
							Welcome {sessionStorage.getItem('logged-in-username')}
						</h5>
						<Button
							variant='danger'
							size='sm'
							style={{
								marginLeft: 15,
								marginTop: 5,
								marginRight: 3,
								fontWeight: 'bold',
							}}
							onClick={() => this.logoutClick()}
						>
							Log out
						</Button>
					</Form>
				</Navbar>
			</>
		)
	}
}

export default NavbarComponent
