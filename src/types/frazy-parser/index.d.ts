declare module 'frazy-parser' {
	export function formatSecondsToTime(time: number): string
	export function findCurrentPhraseNum(phrases: Phrase[], time: number): number
	export function parseSubs(text: string, extractVoices = true): Phrase[]
	// export function parseVtt(
	// 	text: string
	// ): Array<Info | Chapter | Phrase | Comment>
	// export function parseChapters(text: string): Chapter[]
}
