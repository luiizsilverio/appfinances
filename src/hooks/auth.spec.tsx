import { renderHook, act } from '@testing-library/react-hooks'
import { mocked } from 'ts-jest/utils'
import { logInAsync } from 'expo-google-app-auth'
import { AuthProvider, useAuth } from './auth'

// mockando (sobrescrevendo) o comportamento da biblioteca expo-google-app-auth
// sobrescreve a função logInAsync
jest.mock('expo-google-app-auth')

describe('Auth Hook', () => {
  it('should be able to sign in with Google', async () => {
    const googleMocked = mocked(logInAsync as any)
    
    googleMocked.mockReturnValue({
      type: 'success',
      user: {
        id: 'any_id',
        email: 'luiiz.silverio@gmail.com',
        name: 'luiizsilverio',
        photo: 'empty.png'
      }
    })

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    })

    await act(() => result.current.signInWithGoogle())
    expect(result.current.user.name).toBe('luiizsilverio')
  })

  it('should not connect if user cancel authentication', async () => {   
    const googleMocked = mocked(logInAsync as any)
    
    googleMocked.mockReturnValueOnce({
      type: 'cancel'      
    })

    const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider
      })

    await act(() => result.current.signInWithGoogle())
    expect(result.current.user).not.toHaveProperty('id')
  })

})