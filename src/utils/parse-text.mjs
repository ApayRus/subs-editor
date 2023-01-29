import { readFileSync, writeFileSync } from 'fs'

const text = readFileSync('./text.txt', 'utf-8')

const getMediaLink = (folderId, fileId) => {
	return `https://qxrtlbhckkgnyyukbuez.supabase.co/storage/v1/object/public/audios/${folderId}/${fileId}.mp3`
}

const textArray = text
	.split(/^\d+?\s*$/gm)
	.map(elem => elem.replace(/\n\n/g, '\n'))
	.filter(elem => elem)

const startIndex = 5

const materials = textArray.map((text, index) => {
	const id = String(startIndex + index).padStart(3, '0')
	const mediaLink = getMediaLink('book2', id)
	return {
		id,
		localStorageId: id,
		mediaLink,
		text: text.trim(),
		phrases: [{ start: 0, end: 0 }]
	}
})

writeFileSync('./output.txt', JSON.stringify(materials, null, 2), 'utf-8')
