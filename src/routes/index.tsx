import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes' // rotas públicas
import { AppRoutes } from './app.routes'   // rotas privadas
import { useAuth } from '../hooks/auth'

export function Routes() {
  const { user } = useAuth()
  console.log(user)

  return (
    <NavigationContainer>
      { user?.id ? <AppRoutes /> : <AuthRoutes /> }
    </NavigationContainer>
  )
}