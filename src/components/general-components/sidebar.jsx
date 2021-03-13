import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../../css/sidebar.css'

class Sidebar extends React.Component {
	render() {
		return (
			<SideNav
				onSelect={() => {
					// Add your code here
				}}
				className='myStyle'
			>
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
					</NavItem>
				</SideNav.Nav>
			</SideNav>
		)
	}
}

export default Sidebar
