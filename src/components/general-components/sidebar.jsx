import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../../css/sidebar.css'
import PropTypes from 'prop-types'
class Sidebar extends React.Component {
	state = {
		my_flights: {
			x: 'Low Cost flights',
			y: 'By Airline Company',
			z: 'Flights To',
		},
		my_hotels: {
			x: 'Reccomended Hotels',
			y: 'Hotels In',
			z: 'By Stars',
		},
		my_cars: {
			x: 'Best Deals',
			y: 'By Company',
			z: 'Seach Car',
		},
	}

	render() {
		let message = this.props.name
		let x = ''
		let y = ''
		let z = ''
		let flights = false
		let hotels = false
		let cars = false

		if (message === 'flights') {
			// this.setState({ flights: true })
			flights = true
		} else if (message === 'hotels') {
			// this.setState({ hotels: true })
			hotels = true
		} else if (message === 'cars') {
			// this.setState({ cars: true })
			cars = true
		}

		if (flights) {
			x = this.state.my_flights.x
			y = this.state.my_flights.y
			z = this.state.my_flights.z
		} else if (hotels) {
			x = this.state.my_hotels.x
			y = this.state.my_hotels.y
			z = this.state.my_hotels.z
		} else if (cars) {
			x = this.state.my_cars.x
			y = this.state.my_cars.y
			z = this.state.my_cars.z
		}
		return (
			<SideNav className='myStyle'>
				<SideNav.Toggle />
				<SideNav.Nav defaultSelected='home'>
					<NavItem eventKey={x} className='myLink'>
						<NavIcon>
							<i className='fa fa-fw fa-home' style={{ fontSize: '1.75em' }} />
						</NavIcon>
						<NavText>{x}</NavText>
					</NavItem>
					<NavItem eventKey={y} className='myLink'>
						<NavIcon>
							<i className='fa fa-fw fa-home' style={{ fontSize: '1.75em' }} />
						</NavIcon>
						<NavText>{y}</NavText>
					</NavItem>
					<NavItem eventKey={z} className='myLink'>
						<NavIcon>
							<i className='fa fa-fw fa-home' style={{ fontSize: '1.75em' }} />
						</NavIcon>
						<NavText>{z}</NavText>
					</NavItem>
				</SideNav.Nav>
			</SideNav>
		)
	}
}

export default Sidebar

Sidebar.propTypes = {
	name: PropTypes.string,
}
