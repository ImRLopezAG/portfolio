import colors from 'tailwindcss/colors'
import { type StateCreator, create } from 'zustand'
import { persist } from 'zustand/middleware'

export const COLOR_WEIGHT = [
	'50',
	'100',
	'200',
	'300',
	'400',
	'500',
	'600',
	'700',
	'800',
	'900',
	'950',
] as const

export type Color_Weight = (typeof COLOR_WEIGHT)[number]

interface ThemeColor {
	name: string
	primary: string
	foreground: string
	weight?: string
}

export const themeColors = (weight: Color_Weight = '600') =>
	Object.fromEntries(
		Object.entries(colors).reduce<[string, string][]>(
			(acc, [color, values]) => {
				const VALUES = '600'
				if (typeof values === 'object' && VALUES in values) {
					acc.push([color, values[weight] as string])
				}
				return acc
			},
			[],
		),
	)

export const themeSettings = {
	fontFamily: {
		inter: 'Inter',
		roboto: 'Roboto',
		montserrat: 'Montserrat',
		poppins: 'Poppins',
		'overpass-mono': 'Overpass Mono',
		'geist-sans': 'Geist',
		'geist-mono': 'Geist Mono',
	},
} as const

export type FontFamily = keyof typeof themeSettings.fontFamily
export type ContentLayout = 'full' | 'centered'

interface SettingsState {
	fontFamily: FontFamily
	themeColor: ThemeColor
	themeColors: Record<string, string>
	layout: 'vertical' | 'horizontal'
	contentLayout: ContentLayout
	sidebarLayout: 'default' | 'rtl'
	roundedCorner: number
	setThemeColor: (name: string, primary: string, foreground: string) => void
	setContentLayout: (contentLayout: ContentLayout) => void
	setFontFamily: (fontFamily: FontFamily) => void
	setRoundedCorner: (rounded: number) => void
	setColorWeight: (weight: Color_Weight) => void
	resetTheme: () => void
}

const themeColorInitialValue = {
	name: 'default',
	primary: '24 9.8% 10%',
	foreground: '60 9.1% 97.8%',
	weight: '',
}

const initialState: Omit<
	SettingsState,
	| 'setThemeColor'
	| 'setContentLayout'
	| 'setFontFamily'
	| 'setRoundedCorner'
	| 'setContentContainer'
	| 'resetTheme'
	| 'setColorWeight'
> = {
	fontFamily: 'inter',
	themeColor: themeColorInitialValue,
	layout: 'vertical',
	contentLayout: 'full',
	sidebarLayout: 'default',
	roundedCorner: 0.5,
	themeColors: themeColors(),
}

const updateCSSVariable = (property: string, value: string) => {
	document.documentElement.style.setProperty(property, value)
	if (property === 'font-family') {
		document.body.style.setProperty(property, value)
	} else if (property === 'content-layout') {
		document.documentElement.setAttribute(`data-${property}`, value)
	} else {
		document.documentElement.style.setProperty(property, value)
	}
}

const themeSettingsStore: StateCreator<SettingsState> = (set, get) => {
	const updateState = <K extends keyof SettingsState>(
		key: K,
		value: SettingsState[K],
	) => set({ [key]: value })

	const updateThemeColor = (theme: Partial<ThemeColor>) => {
		set((state) => ({
			themeColor: {
				...state.themeColor,
				...theme,
			},
		}))
	}

	return {
		...initialState,
		setThemeColor: (name, primary, foreground) => {
			updateThemeColor({
				name,
				primary,
				foreground,
			})
			updateCSSVariable('--primary', primary)
			updateCSSVariable('--primary-foreground', foreground)
		},
		setFontFamily: (fontFamily) => {
			updateState('fontFamily', fontFamily)
			updateCSSVariable('font-family', `var(--font-${fontFamily})`)
		},
		setRoundedCorner: (roundedCorner) => {
			updateState('roundedCorner', roundedCorner)
			updateCSSVariable('--radius', `${roundedCorner}rem`)
		},
		setContentLayout: (contentLayout) => {
			updateState('contentLayout', contentLayout)
			updateCSSVariable('content-layout', contentLayout)
		},
		setColorWeight: (weight) => {
			const primary = themeColors(weight)[get().themeColor.name]
			updateState('themeColors', themeColors(weight))
			updateThemeColor({ weight, primary })
			updateCSSVariable('--primary', primary)
		},
		resetTheme: () => {
			set(initialState)
			updateCSSVariable('--primary', '')
			updateCSSVariable('--primary-foreground', '')
			updateCSSVariable('font-family', '')
			updateCSSVariable('--radius', '')
			updateCSSVariable('content-layout', '')
		},
	}
}

export const useThemeSettingsStore = create(
	persist(themeSettingsStore, { name: 'theme-settings' }),
)
