import React, { 
  createContext, 
  ReactNode, 
  useContext,
  useState
} from "react";

import * as Google from 'expo-google-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextData {
  user: User
  signInWithGoogle(): Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        iosClientId: '661783608724-v0hbe2uf2t7v4kb9v8o9inh3hfiaq7h2.apps.googleusercontent.com',
        androidClientId: '661783608724-g3ger0mgg1p3v7td4aagnvrkq6ac1j42.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        }       
        
        setUser(userLogged)
        await AsyncStorage.setItem('@gofinances:user', JSON.stringify(userLogged))
      }

    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
