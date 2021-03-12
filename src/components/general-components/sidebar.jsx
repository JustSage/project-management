import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'
import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import '../../css/sidebar.css'
class Sidebar extends React.Component {
	state = {
		img: (
			<img src="'https://image.freepik.com/free-vector/pineapple-logo-design-inspiration-awesome_110852-29.jpg'" />
		),
		expand: true,
	}
	render() {
		return (
			<SideNav
				// expanded={this.state.expand}
				onSelect={() => {
					// Add your code here
				}}
				className='myStyle'
			>
				<SideNav.Toggle />
				<SideNav.Nav defaultSelected='home'>
					<NavItem eventKey='home' className='myLink'>
						<NavIcon>
							<i className='fa fa-fw fa-home' style={{ fontSize: '1.75em' }} />
						</NavIcon>
						<NavText>Home</NavText>
					</NavItem>
					<NavItem eventKey='charts'>
						<NavIcon>
							<i
								className='fa fa-fw fa-line-chart'
								id='myId'
								style={{ fontSize: '1.75em' }}
							/>
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
