import React, { 
  createContext, 
  ReactNode, 
  useContext 
} from "react";

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextData {
  user: User
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const user = {
    id: '123',
    name: 'Luiiz Oliveira',
    email: 'luiiz.silverio@gmail.com'
  }

  return (
    <AuthContext.Provider value={{ user }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
