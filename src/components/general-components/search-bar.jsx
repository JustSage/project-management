import react from 'react'
import '../../css/search-bar.css'

class SearchBar extends react.Component {
	render() {
		return (
			<>
				<input
					type='search'
					placeholder='Search for packages...'
					className='search-input'
					list='cityname'
				/>
				<datalist id='cityname'>
					<option value='Athens' />
					<option value='Ashkelon' />
				</datalist>
			</>
		)
	}
}

export default SearchBar
