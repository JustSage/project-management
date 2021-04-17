import './css/App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login-and-signup-components/login'
import Homepage from './components/general-components/homepage'
import SignUp from './components/login-and-signup-components/sign-up'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import Packages from './components/general-components/Packages'
import AddPackage from './components/general-components/Customer/Package-Components/Add-Package-Components/AddPackage'
import Flights from './components/general-components/Customer/Flights'
library.add(fab, faCheckSquare, faCoffee)

class App extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<>
				<div className='bg'>
					<Router>
						<Switch>
							<Route exact path='/' component={Login} />
							<Route path='/login' component={Login} />
							<Route path='/signUp' component={SignUp} />
							<Route path='/homepage' component={Homepage} />
							<Route path='/flights' component={Flights} />
							<Route path='/packages' component={Packages} />
							<Route path='/add-package' component={AddPackage} />
						</Switch>
					</Router>
				</div>
			</>
		)
	}
}

export default App
