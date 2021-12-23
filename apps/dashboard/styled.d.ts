// import original module declarations
import 'styled-components'

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    base: {
      background: string
      main: string
      menu: string
      accent: string
      content: string
    }
    button: { background: string }

    text: { main: string; secondary: string }
    hamburger?: { color: string }
  }
}
