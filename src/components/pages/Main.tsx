import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import AddIcon from '@mui/icons-material/Add'
import TextIcon from '@mui/icons-material/Subject'
import MenuIcon from '@mui/icons-material/Menu'
import { Stack, Fab } from '@mui/material'
import { Link } from 'react-router-dom'
import ImportExportIcon from '@mui/icons-material/ImportExport'

const markdown = `# Порядок работы 
## создаем материал 

1. заполняем id и ссылку на аудио файл 
1. заголовок -- не обязательно 
1. нажимаем "сохранить" 

## создаем титры 

1. вставляем текст в поле для текста 
1. включаем Play и когда слышим конец фразы, нажимаем + 
1. проверяем соответствие строк текста и звучанию фраз 

## меню

В меню можно: 
1. переходить в ранее созданные материалы
1. создавать новые материалы 
1. открыть страницу, где все материалы будут отображены в виде текста (json)

## текст 

Скопируйте текст и сохраните в файле. Его можно использовать в ваших приложениях. 
`

const Main = () => {
	return (
		<div style={{ padding: '1rem', marginBottom: 64 }}>
			<ReactMarkdown children={markdown} />
			<div style={{ position: 'fixed', bottom: 5, right: 5 }}>
				<Stack direction='row' spacing={1}>
					<Fab component={Link} to='/import' color='primary'>
						<ImportExportIcon />
					</Fab>
					<Fab component={Link} to='/all-text' color='primary'>
						<TextIcon />
					</Fab>
					<Fab component={Link} to='/menu' color='primary'>
						<MenuIcon />
					</Fab>
					<Fab component={Link} to='/material/000' color='primary'>
						<AddIcon />
					</Fab>
				</Stack>
			</div>
		</div>
	)
}

export default Main
