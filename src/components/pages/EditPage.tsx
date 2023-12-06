import {
	Button,
	Fab,
	Grid,
	IconButton,
	TextField,
	Typography
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PlayIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'
import SaveIcon from '@mui/icons-material/Save'
import MenuIcon from '@mui/icons-material/Menu'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Textarea from '../Textarea'
import PlayButtonsColumn from '../PlayButtonsColumn'
import useWavesurfer, { Phrase } from '../../useWavesurfer'
import { Stack } from '@mui/system'
import styles from './EditPage.module.css'
import { readMaterial, saveMaterial } from '../../api'
import { Link, useParams } from 'react-router-dom'

export class Material {
	id = '' //current id, user input recently
	localStorageId = ''
	mediaLink = ''
	title = ''
	text = ''
	textTr = ''
	phrases: Phrase[] = [{ id: '0', start: 0, end: 0 }]
}

const EditPage = () => {
	const [state, setState] = useState<Material>(new Material())

	const [phrases, setPhrases] = useState<Phrase[]>([
		{ id: '0', start: 0, end: 0 }
	])

	const { mediaLink, text, textTr } = state

	const params = useParams()

	const routerId = params?.id || '' + params?.['*']

	useEffect(() => {
		const material = readMaterial(routerId) || new Material()
		setState(material)
		setPhrases(material.phrases)
	}, [routerId])

	useEffect(() => {
		if (state.localStorageId) {
			const material = { ...state, phrases }
			saveMaterial(material)
		}
	}, [state, phrases])

	const mediaElementRef = useRef<HTMLMediaElement>(null)
	const waveformContainerRef = useRef<HTMLDivElement>(null)
	const timelineContainerRef = useRef<HTMLDivElement>(null)

	const setText = (text: string) => {
		setState(oldState => ({ ...oldState, text }))
	}

	const setTextTr = (textTr: string) => {
		setState(oldState => ({ ...oldState, textTr }))
	}

	const {
		state: { currentPhraseNum, isPlaying },
		methods: { play, playPhrase, pause, addPhraseBeforeCurrentTime }
	} = useWavesurfer({
		mediaLink,
		phrases,
		setPhrases,
		mediaElementRef,
		waveformContainerRef,
		timelineContainerRef
	})

	const handleChange = (event: ChangeEvent) => {
		const inputElement = event.target as HTMLInputElement
		const { id, value } = inputElement
		setState(oldState => ({ ...oldState, [id]: value }))
	}

	const handleSubmit = () => {
		const material = { ...state, phrases }
		saveMaterial(material)
		setState(oldState => ({ ...oldState, localStorageId: oldState.id }))
	}

	const materials = Object.keys(localStorage).sort()
	const index = materials.findIndex(elem => elem === state.id)
	const nextId = materials[index + 1]
	const prevId = materials[index - 1]

	return (
		<div>
			<Grid container spacing={1} padding={1}>
				<Grid item xs={3} md={1}>
					<TextField
						id='id'
						label='id'
						value={state.id}
						onChange={handleChange}
						sx={{ width: '50%' }}
						required
					/>
					<IconButton onClick={handleSubmit}>
						<SaveIcon />
					</IconButton>
				</Grid>
				<Grid item xs={9} md={3}>
					<TextField
						id='mediaLink'
						label='media link'
						value={state.mediaLink}
						onChange={handleChange}
						sx={{ width: '100%' }}
						required
					/>
				</Grid>
				<Grid item xs={12} md={8}>
					<TextField
						id='title'
						label='title'
						value={state.title}
						onChange={handleChange}
						sx={{ width: '100%' }}
					/>
				</Grid>
				<Grid container alignItems='center' padding={1}>
					<Grid item xs={6}>
						<Typography>
							Opened material is:{' '}
							<Typography component='span' color='primary'>
								{state.localStorageId || 'No'}
							</Typography>
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<audio src={state.mediaLink} ref={mediaElementRef} />
			<div className={styles.wavesurferContainer}>
				<div ref={waveformContainerRef} />
				<div ref={timelineContainerRef} />
			</div>

			<div className={styles.textAndPhrases}>
				<Textarea {...{ text, setText }} />
				<PlayButtonsColumn {...{ playPhrase, phrases, currentPhraseNum }} />
				<Textarea
					{...{
						text: textTr,
						setText: setTextTr,
						style: { direction: 'ltr', textAlign: 'left', fontSize: 16 }
					}}
				/>
			</div>
			<div className={styles.bottomNav}>
				<Link to={`/material/${prevId}`}>{'<'} prev </Link>
				<Link to={`/material/${nextId}`}> next {'>'}</Link>
			</div>
			{/* <pre>{JSON.stringify(phrases, null, 2)}</pre> */}
			<div className={styles.footer}>
				<Stack direction='row' spacing={1}>
					<Fab color='primary' component={Link} to='/menu'>
						<MenuIcon />
					</Fab>
					{isPlaying ? (
						<Fab onClick={pause} color='primary'>
							<PauseIcon />
						</Fab>
					) : (
						<Fab onClick={play} color='primary'>
							<PlayIcon />
						</Fab>
					)}
					<Fab onClick={addPhraseBeforeCurrentTime} color='primary'>
						<AddIcon />
					</Fab>
				</Stack>
			</div>
		</div>
	)
}

export default EditPage
