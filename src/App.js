import './css/App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './components/login-and-signup-components/login'
import Homepage from './components/general-components/homepage'

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={Login} />
				<Route path='/homepage' component={Homepage} />
			</Switch>
		</Router>
	)
}

export default App
