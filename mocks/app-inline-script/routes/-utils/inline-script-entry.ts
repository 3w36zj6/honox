// Inline script example written in TypeScript.

import { STORAGE_KEY } from './constants'

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  root.dataset.theme = theme
}

const loadTheme = (): Theme => {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return Theme.Light
  return raw === Theme.Dark ? Theme.Dark : Theme.Light
}

const initTheme = () => {
  if (typeof window === 'undefined') return
  const currentTheme = loadTheme()
  applyTheme(currentTheme)
}

initTheme()
