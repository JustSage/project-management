import React from 'react'
import { Navbar, Nav, Button, Form, FormControl } from 'react-bootstrap'
import '../../css/navbar.css'
class NavbarComponent extends React.Component {
	render() {
		return (
			<>
				<Navbar bg='dark' variant='dark' className='navbar navbar-custom'>
					<Navbar.Brand href='#home'>Navbar</Navbar.Brand>
					<Nav className='mr-auto'>
						<Nav.Link href='#home'>Home</Nav.Link>
						<Nav.Link href='#features'>Features</Nav.Link>
						<Nav.Link href='#pricing'>Pricing</Nav.Link>
					</Nav>
					<Form inline>
						<FormControl type='text' placeholder='Search' className='mr-sm-2' />
						<Button variant='outline-info'>Search</Button>
					</Form>
				</Navbar>
			</>
		)
	}
}

export default NavbarComponent
