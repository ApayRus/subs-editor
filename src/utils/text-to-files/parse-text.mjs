import { readFileSync, writeFileSync } from 'fs'

const text = readFileSync('./text.txt', 'utf-8')

const textArray = text
	.split(/^\d+?\s*$/gm)
	.map(elem => elem.replace(/\n\n/g, '\n'))
	.filter(elem => elem)

const startIndex = 5

textArray.forEach((text, index) => {
	const id = String(startIndex + index).padStart(3, '0')
	writeFileSync(`./output/${id}.txt`, text.trim(), 'utf-8')
})
