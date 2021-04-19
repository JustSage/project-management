/* eslint-disable react/prop-types */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../../css/sidebar.css'
// import propTypes from 'prop-types'
// const roleBars = {
// 	travelAgent: ['Reservations', 'CustomersList '],
// 	admin: ['Test1', 'Test2', 'Test3'],
// }

class Sidebar extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		user: ['Flights', 'Hotels', 'Rental Cars', 'Packages', 'Attractions'],
		role: sessionStorage.getItem('logged-in-role'),
	}

	// getRole = () => {
	// 	if (sessionStorage.getItem('logged-in-role') == 'Admin'){
	// 		this.setState({user:'Admin'})
	// 	}
	// 	else if (sessionStorage.getItem('logged-in-role') == 'Travel Agent') {
	// 		this.setState({user:'Travel Agent'})
	// 	}

	// 		return (
	// 			<NavItem
	// 				eventKey='charts/admin'
	// 				onClick={() => this.props.callBackSideNav('Admin Referecnes')}
	// 			>
	// 				<NavIcon>
	// 					<i className='fa fa-fw fa-home' />
	// 				</NavIcon>
	// 				<NavText>Admin References</NavText>
	// 			</NavItem>
	// 		)
	// 	else if (sessionStorage.getItem('logged-in-role') == 'Travel Agent') {
	// 		const charts = roleBars.travelAgent.map((element) => {
	// 			return (
	// 				<NavItem
	// 					onClick={() => {
	// 						this.props.callBackSideNav(element)
	// 					}}
	// 					key={element}
	// 					eventKey='charts/linechart'
	// 				>
	// 					<NavIcon>
	// 						<i className='fa fa-fw fa-home' />
	// 					</NavIcon>
	// 					<NavText>{element}</NavText>
	// 				</NavItem>
	// 			)
	// 		})

	// 		return (
	// 			<NavItem eventKey='charts'>
	// 				<NavIcon>
	// 					<i className='fa fa-fw fa-line-chart' id='myId' />
	// 				</NavIcon>
	// 				<NavText>Manage</NavText>
	// 				<NavItem
	// 					onClick={() => {
	// 						this.props.callBackSideNav('Reservations')
	// 					}}
	// 					key='Reservations'
	// 					eventKey='charts/linechart'
	// 				>
	// 					<NavIcon>
	// 						<i className='fa fa-fw fa-home' />
	// 					</NavIcon>
	// 					<NavText>Reservations</NavText>
	// 				</NavItem>
	// 				<NavItem
	// 					onClick={() => {
	// 						this.props.callBackSideNav('CustomerList')
	// 					}}
	// 					key='CustomerList'
	// 					eventKey='charts/linechart'
	// 				>
	// 					<NavIcon>
	// 						<i className='fa fa-fw fa-home' />
	// 					</NavIcon>
	// 					<NavText>Customer List</NavText>
	// 				</NavItem>
	// 			</NavItem>
	// 		)
	// 	}
	// }

	// userBars = () => {
	// 	const userBars = this.state.user.map((element) => {
	// 		return (
	// 			<NavItem
	// 				eventKey='charts/flights'
	// 				onClick={() => {
	// 					console.log(this.props.callBackSideNav)
	// 					this.props.callBackSideNav(element)
	// 				}}
	// 				className='myLink'
	// 				key={element}
	// 			>
	// 				<NavIcon>
	// 					<i className='fa fa-fw fa-home' />
	// 				</NavIcon>
	// 				<NavText>{element}</NavText>
	// 			</NavItem>
	// 		)
	// 	})
	// 	return userBars
	// }
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
