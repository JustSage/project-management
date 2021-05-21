import react from 'react'
import '../../css/search-bar.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
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
			SearchInput: '',
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

	handleSubmit = (event) => {
		this.setState({
			SearchInput: event.target.value,
		})
		sessionStorage.setItem('search-value', event.target.value)
	}

	handleClick = () => {
		this.setState({
			SearchInput: '',
		})
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
						onChange={this.handleSubmit}
						value={this.state.SearchInput}
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
					<Link
						to={{
							pathname: `/packages/${null}`,
						}}
					>
						<FontAwesomeIcon
							className='glass'
							size='lg'
							icon='search'
							onClick={this.handleClick}
						/>
					</Link>
				</>
			)
		}
	}
}

export default SearchBar
