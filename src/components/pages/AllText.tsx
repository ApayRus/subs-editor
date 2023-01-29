import { useEffect } from 'react'
import { localStorageToJson } from '../../api'
import MenuIcon from '@mui/icons-material/Menu'
import { Stack, Fab } from '@mui/material'
import { Link } from 'react-router-dom'

const AllText = () => {
	useEffect(() => {}, [])
	return (
		<div>
			<pre>{localStorageToJson()}</pre>
			<div style={{ position: 'fixed', bottom: 5, right: 5 }}>
				<Stack direction='row' spacing={1}>
					<Fab color='primary' component={Link} to='/menu'>
						<MenuIcon />
					</Fab>
				</Stack>
			</div>
		</div>
	)
}

export default AllText
