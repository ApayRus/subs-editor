import { Material } from '../components/pages/EditPage'
import { Phrase } from '../useWavesurfer'

export const saveMaterial = (material: Material) => {
	const { id, localStorageId } = material
	localStorage.setItem(id, JSON.stringify({ ...material, localStorageId: id }))
	if (id !== localStorageId) {
		localStorage.removeItem(localStorageId)
	}
}

export const readMaterial = (id: string) => {
	const materialString = localStorage.getItem(id)
	if (!materialString) return null
	const material = JSON.parse(materialString)
	return material as Material
}

export const localStorageToMaterials = () => {
	const materials = Object.keys(localStorage).map(key => {
		const material = readMaterial(key)
		if (!material) return new Material()

		return material
	})
	return materials
}

export const localStorageToJson = () => {
	const materials = localStorageToMaterials()
	/* const materialsExport = materials.map(material => {
		const { phrases, text } = material
		phrases.shift() // remove zero phrase
		const textArray = text.split('\n')
		const timedTextArray = phrases.map((phrase, index) => {
			const { start, end } = phrase
			const text = textArray[index]
			return `${start.toFixed(2)} ${end.toFixed(2)} ${text}`
		})
		const timedText = timedTextArray.join('\n')
		return { ...material, text: '', phrases: [], timedText }
	}) */
	return JSON.stringify(materials, null, 2)
}

export const importJsonToLocalStorage = (jsonText: string) => {
	const materials = JSON.parse(jsonText) as Material[]
	materials.forEach(material => {
		const { localStorageId } = material
		localStorage.setItem(localStorageId, JSON.stringify(material))
	})
}
