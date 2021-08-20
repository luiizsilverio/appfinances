import React from 'react'
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

describe('Profile Screen', () => {
  test("verifica se o input com placeholder 'nome' está na tela", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText('Nome')

    expect(inputName.props.placeholder).toBeTruthy()
  })

  test('verifica se os dados do usuário foram informados', () => {
    const { getByTestId } = render(<Profile />)

    const inputName = getByTestId('input-name')
    const inputSurname = getByTestId('input-surname')

    expect(inputName.props.value).toEqual('Luiz')
    expect(inputSurname.props.value).toEqual('Oliveira')
  })

  test('verifica se renderiza o título corretamente', () => {
    const { getByTestId } = render(<Profile />)

    const textTitle = getByTestId('text-title')
    expect(textTitle.props.children).toContain('Perfil')
  })
})
