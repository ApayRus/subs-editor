import {
	Fab,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import TextIcon from '@mui/icons-material/Subject'
import HomeIcon from '@mui/icons-material/Home'
import { useEffect, useState } from 'react'
import { localStorageToMaterials } from '../../api'
import { Link } from 'react-router-dom'

interface MaterialTitle {
	id: string
	title?: string
}

const Menu = () => {
	const [list, setList] = useState<MaterialTitle[]>([])
	useEffect(() => {
		const materials = localStorageToMaterials()

		const materialTitles: MaterialTitle[] = materials.map(material => {
			const { localStorageId: id, title } = material
			return { id, title }
		})

		const menuItems = materialTitles.sort((a, b) => a.id.localeCompare(b.id))
		setList(menuItems)
	}, [])

	return (
		<div>
			<List>
				{list.map(elem => {
					const { id, title } = elem
					return (
						<ListItem sx={{ margin: 0, padding: 0 }}>
							<ListItemButton
								component={Link}
								to={`/material/${id}`}
								sx={{ margin: 0, padding: 0, paddingInline: 5 }}
							>
								<ListItemText>{`${id} ${title || ''}`}</ListItemText>
							</ListItemButton>
						</ListItem>
					)
				})}
			</List>
			<div style={{ position: 'fixed', bottom: 5, right: 5 }}>
				<Stack direction='row' spacing={1}>
					<Fab component={Link} to='/' color='primary'>
						<HomeIcon />
					</Fab>
					<Fab component={Link} to='/all-text' color='primary'>
						<TextIcon />
					</Fab>
					<Fab component={Link} to='/material/000' color='primary'>
						<AddIcon />
					</Fab>
				</Stack>
			</div>
		</div>
	)
}

export default Menu
