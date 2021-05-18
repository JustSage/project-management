import react from 'react'
import '../../css/search-bar.css'
import axios from 'axios'
// import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faSearch)

class SearchBar extends react.Component {
	constructor(props) {
		super(props)
		this.state = {
			data: undefined,
			chosenPkg: undefined,
		}
	}

	componentDidMount() {
		axios
			.get('/packages')
			.then((response) => {
				this.setState({
					data: response.data,
				})
			})
			.catch((error) => {
				console.log(error.response.data.message)
				alert(error.response.data.message)
			})
	}

	onPkgClick = (event) => {
		console.log(`package name: ${event.target.value}`)
		this.setState({
			chosenPkg: event.target.value,
		})
	}
	handleSubmit = () => {
		console.log('blat')
		return <a href={`/packages/${this.state.chosenPkg}`} />
	}

	render() {
		if (this.state.data === undefined) {
			return (
				<div className='text-center'>
					<div className='spinner-border' role='status'>
						<span className='sr-only'>Loading...</span>
					</div>
				</div>
			)
		} else {
			return (
				<>
					<input
						type='search'
						placeholder='Search for packages...'
						className='search-input'
						list='cityname'
						onChange={this.onPkgClick}
					/>
					<datalist id='cityname'>
						{this.state.data.map((pkg) => {
							return (
								<div key={pkg.description}>
									<option value={pkg.name}>{pkg.price}</option>
								</div>
							)
						})}
					</datalist>
					<a href={`/packages/${this.state.chosenPkg}`}>
						<FontAwesomeIcon
							className='glass'
							size='lg'
							icon='search'
							onClick={this.handleSubmit}
						/>
					</a>
				</>
			)
		}
	}
}

export default SearchBar
