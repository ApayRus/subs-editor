import { parseSubs } from 'frazy-parser'
import { readFileSync, writeFileSync } from 'fs'

const text = readFileSync('./text.txt', 'utf-8')

const timing = readFileSync('./timing.txt', 'utf-8')

const getMediaLink = (folderId, fileId) => {
	return `https://stevaicrnsmvuliefbdy.supabase.co/storage/v1/object/public/audios/${folderId}/${fileId}.mp3`
}

// https://stevaicrnsmvuliefbdy.supabase.co/storage/v1/object/public/audios/fortress/001.mp3

const mediaLinks = readFileSync('./mediaLinks.txt', 'utf-8')

const textArray = text
	.split(/^\d+?\s*$/gm)
	.map(elem => elem.replace(/\n\n/g, '\n'))
	.filter(elem => elem)

const timingArray = timing
	.split(/^\d+?\s*$/gm)
	.map(elem => elem.replace(/\n\n/g, '\n'))
	.filter(elem => elem)

const mediaLinkArray = mediaLinks.split('\n')

const startIndex = 1

const materials = mediaLinkArray.map((mediaLinkFirebase, index) => {
	const id = String(startIndex + index).padStart(3, '0')
	const text = textArray[index] || ''
	const phrases = parseSubs(timingArray[index]).map((elem, index) => {
		const { start, end } = elem
		return { start, end, id: `${index + 1}` }
	})
	const mediaLink = getMediaLink('fortress', id)
	return {
		id: `${id}`,
		localStorageId: `${id}`,
		mediaLink,
		text: text.trim(),
		phrases: [{ id: '0', start: 0, end: 0 }, ...phrases]
	}
})

writeFileSync('./output.txt', JSON.stringify(materials, null, 2), 'utf-8')
