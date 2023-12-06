import { CSSProperties, ChangeEvent, useEffect, useState } from 'react'
import styles from './Textarea.module.css'

interface Props {
	text: string
	setText: (text: string) => void
	style?: CSSProperties
}

const Textarea: React.FC<Props> = ({ text = '', setText, style }) => {
	const [state, setState] = useState({ rows: 1 })

	const extraEndRows = 0

	useEffect(() => {
		textToState(text)
	}, [text])

	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const {
			target: { value }
		} = event
		textToState(value)
	}

	const textToState = (text: string) => {
		const rows = text.split('\n').length + extraEndRows
		setText(text)
		setState(oldState => ({ ...oldState, rows }))
	}

	return (
		<div className={styles.container}>
			<textarea
				className={`${styles.linearBackground} ${styles.textarea}`}
				onChange={handleChange}
				rows={state.rows}
				value={text}
				placeholder='enter text here'
				style={style}
			/>
		</div>
	)
}

export default Textarea
