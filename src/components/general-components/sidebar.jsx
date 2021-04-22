/* eslint-disable react/prop-types */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../../css/sidebar.css'
// import propTypes from 'prop-types'

class Sidebar extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		user: ['Flights', 'Hotels', 'Rental Cars', 'Packages', 'Attractions'],
		role: sessionStorage.getItem('logged-in-role'),
	}

	render() {
		return (
			<SideNav className='myStyle'>
				<SideNav.Toggle />
				<SideNav.Nav defaultSelected='Flights'>
					<NavItem
						eventKey='charts/flights'
						onClick={() => {
							this.props.callBackSideNav('Flights')
						}}
						className='myLink'
						key={'Flights'}
					>
						<NavIcon>
							<i className='fa fa-fw fa-home' />
						</NavIcon>
						<NavText>Flights</NavText>
					</NavItem>
					<NavItem
						eventKey='charts/Hotels'
						onClick={() => {
							this.props.callBackSideNav('Hotels')
						}}
						className='myLink'
						key={'Hotels'}
					>
						<NavIcon>
							<i className='fa fa-fw fa-home' />
						</NavIcon>
						<NavText>Hotels</NavText>
					</NavItem>
					<NavItem
						eventKey='charts/Rental-Cars'
						onClick={() => {
							this.props.callBackSideNav('Rental Cars')
						}}
						className='myLink'
						key='Rental Cars'
					>
						<NavIcon>
							<i className='fa fa-fw fa-home' />
						</NavIcon>
						<NavText>Rental Cars</NavText>
					</NavItem>
					<NavItem
						eventKey='charts/Packages'
						onClick={() => {
							this.props.callBackSideNav('Packages')
						}}
						className='myLink'
						key='Packages'
					>
						<NavIcon>
							<i className='fa fa-fw fa-home' />
						</NavIcon>
						<NavText>Packages</NavText>
					</NavItem>
					<NavItem
						eventKey='charts/Attractions'
						onClick={() => {
							this.props.callBackSideNav('Attractions')
						}}
						className='myLink'
						key='Attractions'
					>
						<NavIcon>
							<i className='fa fa-fw fa-home' />
						</NavIcon>
						<NavText>Attractions</NavText>
					</NavItem>
					{this.state.role === 'Admin' ? (
						<NavItem
							eventKey='charts/admin'
							onClick={() => this.props.callBackSideNav('Admin Referecnes')}
						>
							<NavIcon>
								<i className='fa fa-fw fa-home' />
							</NavIcon>
							<NavText>Admin References</NavText>
						</NavItem>
					) : null}
					{this.state.role === 'Travel Agent' ? (
						<NavItem eventKey='charts'>
							<NavIcon>
								<i className='fa fa-fw fa-line-chart' id='myId' />
							</NavIcon>
							<NavText>Manage</NavText>
							<NavItem
								onClick={() => {
									this.props.callBackSideNav('Reservations')
								}}
								key='Reservations'
								eventKey='charts/linechart'
							>
								<NavIcon>
									<i className='fa fa-fw fa-home' />
								</NavIcon>
								<NavText>Reservations</NavText>
							</NavItem>
							<NavItem
								onClick={() => {
									this.props.callBackSideNav('CustomersList')
								}}
								key='CustomerList'
								eventKey='charts/linechart'
							>
								<NavIcon>
									<i className='fa fa-fw fa-home' />
								</NavIcon>
								<NavText>Customer List</NavText>
							</NavItem>
						</NavItem>
					) : null}
				</SideNav.Nav>
			</SideNav>
		)
	}
}

export default Sidebar

// Sidebar.propTypes = {
// 	callBackSideNav: propTypes.func,
// }
