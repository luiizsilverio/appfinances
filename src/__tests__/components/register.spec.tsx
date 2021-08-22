import React from 'react'
import { render } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

// import { AuthProvider, useAuth } from '../../hooks/auth'
import { Register } from '../../screens/Register'
import theme from '../../global/styles/theme'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)

describe('Register Screen', () => {
  it('should open category modal when user clicks on button', () => {
/*
    const { getByTestId } = render(
      <Register />,
      {
        wrapper: Providers
      }
    )

    const modal = getByTestId('modal-category')
    expect(modal.props.visible).toBeFalsy()
*/
  })
})