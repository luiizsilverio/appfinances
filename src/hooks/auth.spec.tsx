import { renderHook, act } from '@testing-library/react-hooks'
import { AuthProvider, useAuth } from './auth'

// mockando (sobrescrevendo) o comportamento da biblioteca expo-google-app-auth
// sobrescreve a função logInAsync
jest.mock('expo-google-app-auth', () => {
  return {
    logInAsync: () => ({
      type: 'success',
      user: {
        id: 'any_id',
        email: 'luiiz.silverio@gmail.com',
        name: 'luiizsilverio',
        photo: 'empty.png'
      }
    })
  }
})

describe('Auth Hook', () => {
  it('should be able to sign in with Google', async () => {
    const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

    await act(() => result.current.signInWithGoogle())
    expect(result.current.user.name).toBe('luiizsilverio')
  })

})