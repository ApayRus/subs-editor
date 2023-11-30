import { readFileSync, writeFileSync } from 'fs'

const inputText = readFileSync('./input.json', 'utf-8')
const materials = JSON.parse(inputText).sort((a, b) => {
	return a.id.localeCompare(b.id)
})

const jsonToOneTextFile = () => {
	const textArray = materials.map(elem => {
		const { id, text, phrases } = elem
		const textArray = text.split('\n')
		phrases.shift()
		const textWithTimings = phrases.map((elem, index) => {
			const { start, end } = elem
			const text = textArray[index]
			return `${start.toFixed(2)}\t${end.toFixed(2)}\t${text}`
		})
		return `\n${id}\n\n${textWithTimings.join('\n')}`
	})

	writeFileSync('./output.txt', textArray.join('\n'), 'utf-8')
}

const jsonToMultipleTextFiles = () => {
	materials.forEach(elem => {
		const { id, text, phrases } = elem
		const textArray = text.split('\n')
		phrases.shift()

		const textWithTimings = phrases
			.map((elem, index) => {
				const { start, end } = elem
				const text = textArray[index]
				return `${start.toFixed(2)}\t${end.toFixed(2)}\t${text}`
			})
			.join('\n')
		writeFileSync(`./output/${id}.txt`, textWithTimings, 'utf-8')

		// return `\n${id}\n\n${textWithTimings.join('\n')}`
	})
}

jsonToOneTextFile()
