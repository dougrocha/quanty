import { DefaultTheme } from 'styled-components'

export const LightTheme: DefaultTheme = {
  base: {
    background: '#FFF',
    main: '#FFF',
    menu: '#FFF',
    accent: '#C1005A',
    content: '#FFF',
  },
  button: {
    background: '#C1005A',
  },
  hamburger: {
    color: '#202225',
  },

  text: {
    main: '#363537',
    secondary: '',
  },
}

export const DarkTheme: DefaultTheme = {
  base: {
    background: '#121212',
    main: '#202225',
    menu: '#2F3136',
    accent: '#C1005A',
    content: '#36393F',
  },
  button: {
    background: '#C1005A',
  },
  hamburger: {
    color: '#FFFFFF',
  },

  text: {
    main: 'rgba(255, 255, 255, 0.87)',
    secondary: 'rgba(255, 255, 255, 0.60)',
  },
}
