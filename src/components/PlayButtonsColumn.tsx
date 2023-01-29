import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import { Phrase } from '../useWavesurfer'
import { IconButton, useTheme } from '@mui/material'
import styles from './PlayButtonsColumn.module.css'
import stylesTextarea from './Textarea.module.css'

interface Props {
	playPhrase: (regionId: string) => void
	phrases: Phrase[]
	currentPhraseNum: number
}

const PlayButtonsColumn = ({
	playPhrase,
	phrases,
	currentPhraseNum
}: Props) => {
	const theme = useTheme()
	const primaryColor = theme.palette.primary.main
	return (
		<div className={`${styles.container} ${stylesTextarea.linearBackground}`}>
			{phrases.map((elem, index) => {
				const { id } = elem
				const isActive = currentPhraseNum === index
				return (
					<div
						key={`button-${index}`}
						className={`${styles[`button-${index}`]} ${styles.button}`}
					>
						<div
							className={`${styles.num}`}
							style={
								isActive ? { color: primaryColor, fontWeight: 'bold' } : {}
							}
						>
							{index}
						</div>
						<IconButton
							key={`playbutton-${index}`}
							onClick={() => playPhrase(id)}
							size='small'
							sx={{
								padding: 0,
								margin: 0,
								color: isActive ? primaryColor : ''
							}}
						>
							{isActive ? (
								<PlayCircleFilledIcon sx={{ width: 44, height: 44 }} />
							) : (
								<PlayCircleOutlineIcon sx={{ width: 44, height: 44 }} />
							)}
						</IconButton>
					</div>
				)
			})}
		</div>
	)
}

export default PlayButtonsColumn
