import React from 'react'
import { render } from '@testing-library/react-native'

import { Input } from '../../components/Form/Input'
import { ThemeProvider } from 'styled-components/native'
import theme from '../../global/styles/theme'

describe('Input Component', () => {
  it('must have red border when active', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Input 
          testID="input-email"
          placeholder="E-mail"
          keyboardType="email-address"
          autoCorrect={false}
          active={true}
        />
      </ThemeProvider>
    )

    const inputComponent = getByTestId('input-email')
    
    expect(inputComponent.props.style[0].borderColor)
      .toEqual(theme.colors.attention)

    expect(inputComponent.props.style[0].borderWidth).toEqual(3)
  })

})
