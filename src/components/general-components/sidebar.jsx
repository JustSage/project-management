/* eslint-disable react/prop-types */
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../../css/sidebar.css'
class Sidebar extends React.Component {
	constructor(props) {
		super(props)

		this.isAdmin = this.isAdmin.bind(this)
	}

	isAdmin = () => {
		if (sessionStorage.getItem('logged-in-role') == 'Admin')
			return (
				<NavItem
					eventKey='charts/admin'
					onClick={() => this.props.history.push('/Admin-ref')}
				>
					<NavText>Admin References</NavText>
				</NavItem>
			)
	}

	render() {
		return (
			<SideNav className='myStyle'>
				<SideNav.Toggle />
				<SideNav.Nav defaultSelected='home'>
					<NavItem eventKey='home' className='myLink'>
						<NavIcon>
							<i className='fa fa-fw fa-home' />
						</NavIcon>
						<NavText>Home</NavText>
					</NavItem>
					<NavItem eventKey='charts'>
						<NavIcon>
							<i className='fa fa-fw fa-line-chart' id='myId' />
						</NavIcon>
						<NavText>Charts</NavText>
						<NavItem eventKey='charts/linechart'>
							<NavText>Line Chart</NavText>
						</NavItem>
						<NavItem eventKey='charts/barchart'>
							<NavText>Bar Chart</NavText>
						</NavItem>
						{this.isAdmin()}
					</NavItem>
				</SideNav.Nav>
			</SideNav>
		)
	}
}

export default Sidebar
