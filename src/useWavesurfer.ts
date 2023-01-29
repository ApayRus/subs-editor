import { RefObject, useEffect, useRef, useState } from 'react'
import RegionsPlugin from 'wavesurfer.js/src/plugin/regions'
import TimelinePlugin from 'wavesurfer.js/src/plugin/timeline'
import WaveSurfer from 'wavesurfer.js'
import { findCurrentPhraseNum } from 'frazy-parser'

export interface Phrase {
	id: string
	start: number
	end: number
}

interface State {
	currentPhraseNum: number
	isReady: boolean
	isPlaying: boolean
}

interface Props {
	mediaLink: string
	mediaElementRef: RefObject<HTMLMediaElement>
	waveformContainerRef: RefObject<HTMLDivElement>
	timelineContainerRef: RefObject<HTMLDivElement>
	currentPhraseNum?: number
	phrases: Phrase[]
	setPhrases: React.Dispatch<React.SetStateAction<Phrase[]>>
}

function useWavesurfer({
	mediaLink,
	mediaElementRef,
	waveformContainerRef,
	timelineContainerRef,
	currentPhraseNum = 0,
	phrases,
	setPhrases
}: Props) {
	const [state, setState] = useState<State>({
		currentPhraseNum,
		isReady: false,
		isPlaying: false
	})

	const wavesurferRef = useRef<any>(null)

	const getPhrases = () => {
		let phrases: Phrase[] = []
		setPhrases(state => {
			phrases = [...state]
			return state
		})
		return phrases
	}

	const updatePhrase = (region: Phrase) => {
		const { id, start, end } = region
		const phrase = { id, start, end }

		setPhrases(oldPhrases => {
			const phrases = updatePhrases(phrase, oldPhrases)
			return phrases
		})
	}

	const addPhraseBeforeCurrentTime = () => {
		if (wavesurferRef.current) {
			const id = (Math.random() + 1).toString(36).substring(7)
			const start = 0
			const end: number = wavesurferRef.current.getCurrentTime()
			const region: Phrase = { id, start, end }
			setPhrases(oldPhrases => {
				region.start = oldPhrases[oldPhrases.length - 1].end + 0.1
				wavesurferRef.current.addRegion(region)
				const phrases = updatePhrases(region, oldPhrases)
				return phrases
			})
		}
	}

	const playPhrase = (regionId: string) => {
		if (wavesurferRef.current) {
			wavesurferRef.current.regions.list[regionId].play()
		}
	}

	const play = () => {
		if (wavesurferRef.current) {
			wavesurferRef.current.play()
		}
	}

	const pause = () => {
		if (wavesurferRef.current) {
			wavesurferRef.current.pause()
		}
	}

	useEffect(() => {
		if (mediaLink) {
			const wavesurfer = WaveSurfer.create({
				container: waveformContainerRef.current!,
				waveColor: '#A8DBA8',
				progressColor: '#3B8686',
				backend: 'MediaElement',
				normalize: true,
				autoCenter: true,
				minPxPerSec: 50,
				height: 50,
				scrollParent: true,
				plugins: [
					RegionsPlugin.create({
						// regionsMinLength: 2,
						regions: phrases,
						//@ts-ignore
						dragSelection: true,
						// contentEditable: true,
						removeButton: true
					}),
					TimelinePlugin.create({
						container: timelineContainerRef.current!
					})
				]
			})

			wavesurfer.load(mediaElementRef.current!)

			wavesurferRef.current = wavesurfer

			wavesurferRef.current.on('ready', () => {
				setState(oldState => ({ ...oldState, isReady: true }))
			})
			console.log(wavesurfer)
		}
		return () => {
			if (wavesurferRef.current) {
				wavesurferRef.current.destroy()
			}
		}
	}, [mediaLink])

	const updateCurrentPhraseNum = (delta = 0) => {
		const currentTime: number = wavesurferRef.current.getCurrentTime() + delta

		setState(oldState => {
			const phrases = getPhrases()
			const currentPhraseNum = findCurrentPhraseNum(phrases, currentTime)
			return { ...oldState, currentPhraseNum }
		})
	}

	useEffect(() => {
		// wavesurfer events

		if (wavesurferRef.current && state.isReady) {
			const wavesurfer = wavesurferRef.current

			//@ts-ignore
			wavesurfer.on('region-click', (region, event) => {
				event.stopPropagation()
				region.play()
			})
			//@ts-ignore
			wavesurfer.on('region-dblclick', (region, event) => {
				event.stopPropagation()
				region.remove()
			})
			//@ts-ignore
			wavesurfer.on('region-removed', (region, event) => {
				setPhrases(oldPhrases => {
					return oldPhrases.filter(elem => elem.id !== region.id)
				})
			})

			//@ts-ignore
			wavesurfer.on('region-update-end', (region: Phrase, event) => {
				updatePhrase(region)
			})

			wavesurfer.on('region-in', (/* region: Phrase */) => {
				updateCurrentPhraseNum()
			})

			wavesurfer.on('region-out', (/* region: Phrase */) => {
				updateCurrentPhraseNum()
			})

			wavesurfer.on('seek', (/* region: Phrase */) => {
				updateCurrentPhraseNum()
			})

			wavesurfer.on('play', (/* region: Phrase */) => {
				setState(oldState => ({ ...oldState, isPlaying: true }))
			})

			wavesurfer.on('pause', (/* region: Phrase */) => {
				setState(oldState => ({ ...oldState, isPlaying: false }))
			})

			wavesurfer.on('finish', (/* region: Phrase */) => {
				setState(oldState => ({ ...oldState, isPlaying: false }))
			})
		}
	}, [state.isReady])

	const methods = {
		play,
		playPhrase,
		pause,
		addPhraseBeforeCurrentTime
	}

	return { state, wavesurferRef, methods }
}

function updatePhrases(phrase: Phrase, phrases: Phrase[]) {
	const phrasesExcept1 = phrases.filter(elem => elem.id !== phrase.id)
	const newPhrases = [...phrasesExcept1, phrase].sort(
		(a, b) => a.start - b.start
	)
	return newPhrases
}

export default useWavesurfer
