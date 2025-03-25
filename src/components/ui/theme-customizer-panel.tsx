'use client'
import {
	COLOR_WEIGHT,
	type Color_Weight,
	type FontFamily,
	themeSettings,
	useThemeSettingsStore,
} from '@stores/theme-store'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { Label } from '@ui/label'
import { RadioGroup, RadioGroupItem } from '@ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui/select'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@ui/sheet'
import { Slider } from '@ui/slider'
import { useTheme } from 'next-themes'

export function ThemeCustomizerPanel() {
	const { theme, setTheme } = useTheme()
	const {
		themeColor,
		themeColors,
		setThemeColor,
		resetTheme,
		fontFamily,
		setFontFamily,
		roundedCorner,
		setRoundedCorner,
		setColorWeight,
	} = useThemeSettingsStore((state) => state)

	function resetThemeHandle() {
		resetTheme()
		setTheme('system')
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					size='icon'
					className='fixed right-6 bottom-6 z-50 animate-spin rounded-full border shadow lg:right-10 lg:bottom-10 lg:size-14'
				>
					<Icon name='Settings' className='!size-6' />
					<span className='sr-only'>Open theme customizer</span>
				</Button>
			</SheetTrigger>
			<SheetContent className='flex flex-col overflow-auto'>
				<SheetHeader>
					<SheetTitle>Customize Theme</SheetTitle>
				</SheetHeader>
				<div className='grow'>
					<div className='grid gap-4 space-y-4 py-6'>
						{/*Theme color*/}
						<section className='flex flex-row gap-2'>
							<div className='flex flex-col gap-4'>
								<Label>Theme color</Label>
								<Select
									value={String(
										themeColor.name === 'default' ? '' : themeColor.name,
									)}
									onValueChange={(value: string) =>
										setThemeColor(value, themeColors[value], '60 9.1% 97.8%')
									}
								>
									<SelectTrigger className='col-span-3'>
										<SelectValue placeholder='Select color' />
									</SelectTrigger>
									<SelectContent>
										{Object.keys(themeColors).map((key) => {
											return (
												<SelectItem key={key} value={key}>
													<div className='flex items-center gap-3 capitalize'>
														<span
															className='inline-block h-4 w-4 rounded-full'
															style={{
																backgroundColor: themeColors[key],
															}}
														/>
														{key}
													</div>
												</SelectItem>
											)
										})}
									</SelectContent>
								</Select>
							</div>
							<div className='flex flex-col gap-4'>
								<Label>Color weight</Label>
								<Select
									value={themeColor.weight ?? ''}
									onValueChange={(value: Color_Weight) => setColorWeight(value)}
								>
									<SelectTrigger className='col-span-3'>
										<SelectValue placeholder='Select color weight' />
									</SelectTrigger>
									<SelectContent>
										{COLOR_WEIGHT.map((key) => {
											return (
												<SelectItem key={key} value={key}>
													<div className='flex items-center gap-3 capitalize'>
														{key}
													</div>
												</SelectItem>
											)
										})}
									</SelectContent>
								</Select>
							</div>
						</section>

						{/*Font family*/}
						<div className='flex flex-col gap-4'>
							<Label>Font family</Label>
							<Select
								value={fontFamily}
								onValueChange={(value: FontFamily) => setFontFamily(value)}
							>
								<SelectTrigger className='col-span-3'>
									<SelectValue placeholder='Select font' />
								</SelectTrigger>
								<SelectContent>
									{Object.keys(themeSettings.fontFamily).map((key) => {
										const item = themeSettings.fontFamily[key as FontFamily]
										return (
											<SelectItem key={key} value={key}>
												{item}
											</SelectItem>
										)
									})}
								</SelectContent>
							</Select>
						</div>

						{/*Corner softness*/}
						<div className='flex flex-col gap-4'>
							<Label htmlFor='roundedCorner'>Corner softness</Label>
							<Slider
								id='roundedCorner'
								min={0}
								max={1.5}
								step={0.3}
								value={[roundedCorner]}
								onValueChange={([value]) => setRoundedCorner(value)}
								className='col-span-3'
							/>
						</div>

						{/*Dark/Light*/}
						<div>
							<RadioGroup
								value={theme}
								onValueChange={(value) => setTheme(value)}
								className='grid grid-cols-2 gap-4'
							>
								<div>
									<RadioGroupItem
										value='light'
										id='light'
										className='peer sr-only'
										aria-label='light'
									/>
									<Label
										htmlFor='light'
										className='peer-data-[state=checked]:!border-gray-500 flex cursor-pointer flex-col items-center justify-between rounded-md border border-border p-1'
									>
										<div className='w-full items-center rounded'>
											<div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
												<div className='space-y-2 rounded-md bg-white p-2 shadow-sm'>
													<div className='h-2 w-[80px] rounded-md bg-[#ecedef]' />
													<div className='h-2 w-[100px] rounded-md bg-[#ecedef]' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-[#ecedef]' />
													<div className='h-2 w-[100px] rounded-md bg-[#ecedef]' />
												</div>
											</div>
										</div>
										<span className='block w-full p-2 text-center font-normal'>
											Light
										</span>
									</Label>
								</div>
								<div>
									<RadioGroupItem
										value='dark'
										id='dark'
										className='peer sr-only'
										aria-label='dark'
									/>
									<Label
										htmlFor='dark'
										className='peer-data-[state=checked]:!border-gray-500 flex cursor-pointer flex-col items-center justify-between rounded-md border border-border p-1'
									>
										<div className='w-full items-center rounded'>
											<div className='space-y-2 rounded-sm bg-slate-950 p-2'>
												<div className='space-y-2 rounded-md bg-slate-800 p-2 shadow-sm'>
													<div className='h-2 w-[80px] rounded-md bg-slate-400' />
													<div className='h-2 w-[100px] rounded-md bg-slate-400' />
												</div>
												<div className='flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm'>
													<div className='h-4 w-4 rounded-full bg-slate-400' />
													<div className='h-2 w-[100px] rounded-md bg-slate-400' />
												</div>
											</div>
										</div>
										<span className='block w-full p-2 text-center font-normal'>
											Dark
										</span>
									</Label>
								</div>
							</RadioGroup>
						</div>
					</div>
				</div>
				<Button
					variant='destructive'
					className='w-full'
					onClick={resetThemeHandle}
				>
					Reset to Default
				</Button>
			</SheetContent>
		</Sheet>
	)
}
