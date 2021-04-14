/* eslint-disable react/prop-types */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../../css/sidebar.css'

const roleBars = {
	travelAgent: ['Reservations', 'Customers '],
	admin: ['Test1', 'Test2', 'Test3'],
}

class Sidebar extends React.Component {
	constructor(props) {
		super(props)
	}

	state = {
		user: ['Flights', 'Hotels', 'Rental Cars', 'Packages', 'Attractions'],
	}

	getRole = () => {
		if (sessionStorage.getItem('logged-in-role') == 'Admin')
			return (
				<NavItem
					eventKey='charts/admin'
					onClick={() => this.props.history.push('/Admin-ref')}
				>
					<NavText>Admin References</NavText>
				</NavItem>
			)
		else if (sessionStorage.getItem('logged-in-role') === 'Travel Agent') {
			const charts = roleBars.travelAgent.map((element) => {
				return (
					<NavItem
						onClick={() => {
							this.props.callBackSideNave(element)
						}}
						key={element}
						eventKey='charts/linechart'
					>
						<NavIcon>
							<i className='fa fa-fw fa-home' />
						</NavIcon>
						<NavText>{element}</NavText>
					</NavItem>
				)
			})

			return (
				<NavItem eventKey='charts'>
					<NavIcon>
						<i className='fa fa-fw fa-line-chart' id='myId' />
					</NavIcon>
					<NavText>Manage</NavText>
					{charts}
				</NavItem>
			)
		}
	}

	userBars = () => {
		const userBars = this.state.user.map((element) => {
			return (
				<NavItem
					onClick={() => {
						this.props.callBackSideNave(element)
					}}
					className='myLink'
					key={element}
					eventKey={element}
				>
					<NavIcon>
						<i className='fa fa-fw fa-home' />
					</NavIcon>
					<NavText>{element}</NavText>
				</NavItem>
			)
		})
		return userBars
	}

	render() {
		return (
			<SideNav className='myStyle'>
				<SideNav.Toggle />
				<SideNav.Nav defaultSelected='Flights'>
					{this.userBars()}
					{this.getRole()}
				</SideNav.Nav>
			</SideNav>
		)
	}
}

export default Sidebar
