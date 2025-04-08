'use server'
import { cookies } from 'next/headers'
const THEME_COOKIE = 'theme'

export async function getServerTheme() {
  const cookieStore = await cookies()
  const theme = cookieStore.get(THEME_COOKIE)?.value ?? 'system'
  if (theme === 'system') {
    cookieStore.set(THEME_COOKIE, 'system')
  }
  return theme
}
export async function setServerTheme(theme: string) {
  const cookieStore = await cookies()
  cookieStore.set(THEME_COOKIE, theme)
}
