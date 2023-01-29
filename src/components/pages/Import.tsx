import { Button, Fab, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { importJsonToLocalStorage } from '../../api'
import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home'

const Import = () => {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleImport = () => {
		if (textareaRef.current) {
			importJsonToLocalStorage(textareaRef.current.value)
		}
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				overflow: 'scroll'
			}}
		>
			<textarea
				id='jsonImport'
				style={{ width: '95%', margin: 10, height: '80vh' }}
				ref={textareaRef}
			></textarea>
			<Button variant='outlined' onClick={handleImport}>
				Import
			</Button>
			<div style={{ position: 'fixed', bottom: 5, right: 5 }}>
				<Stack direction='row' spacing={1}>
					<Fab component={Link} to='/menu' color='primary'>
						<MenuIcon />
					</Fab>
					<Fab component={Link} to='/' color='primary'>
						<HomeIcon />
					</Fab>
				</Stack>
			</div>
		</div>
	)
}

export default Import
