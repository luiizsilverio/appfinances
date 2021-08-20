import React from 'react'
import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

test('verifica se o input está na tela', () => {
  render(<Profile />);
})