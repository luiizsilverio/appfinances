import 'styled-components'
import theme from './theme'

// Sobrescreve to theme padrão
declare module 'styled-components' {
  type ThemeType = typeof theme

  export interface DefaultTheme extends ThemeType {}
}