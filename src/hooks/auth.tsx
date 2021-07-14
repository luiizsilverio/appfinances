import React, { 
  createContext, 
  ReactNode, 
  useContext,
  useState,
  useEffect
} from "react";

import * as Google from 'expo-google-app-auth'
import * as AppleAuthentication from 'expo-apple-authentication'

import AsyncStorage from '@react-native-async-storage/async-storage'

type User = {
  id: string
  name: string
  email: string
  photo?: string
}

interface AuthContextData {
  user: User
  userLoading: boolean
  signInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
  signOut(): Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

const userKey = '@gofinances:user'
const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [userLoading, setUserLoading] = useState(true)

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
        await AsyncStorage.setItem(userKey, JSON.stringify(userLogged))
      }

    } catch (err) {
      throw new Error(err)
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,  
          AppleAuthentication.AppleAuthenticationScope.EMAIL  
        ]
      })

      // a API da Apple não retorna a foto do usuário
      // a exclamação informa ao typescript que eu tenho certeza
      // que a propriedade do objeto existe
      // ui-avatars retorna um avatar com as iniciais
      if (credential) {
        const name = credential.fullName!.givenName!
        const photo = `https://ui-avatars.com/api/?name=${ name }&length=1`
        
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo
        }       
        
        setUser(userLogged)
        await AsyncStorage.setItem(userKey, JSON.stringify(userLogged))
      }

    } catch (err) {
      throw new Error(err)
    }
  }

  async function signOut() {
    setUser({} as User)
    await AsyncStorage.removeItem(userKey)
  }

  useEffect(() => {
    async function loadUserData() {
      const userStored = await AsyncStorage.getItem(userKey)

      if (userStored) {
        const userLogged = JSON.parse(userStored) as User
        setUser(userLogged)
      }

      setUserLoading(false)
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ 
      user, 
      userLoading,
      signInWithGoogle, 
      signInWithApple, 
      signOut 
    }}>

      { children }
      
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
