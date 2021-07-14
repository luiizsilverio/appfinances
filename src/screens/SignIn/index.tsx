import React, { useState } from "react";
import { ActivityIndicator, Alert } from "react-native"
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'

import { SignInButton } from '../../components/SignInButton'
import { useAuth } from "../../hooks/auth"

import { 
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper
} from './styles'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)

  const { signInWithGoogle, signInWithApple } = useAuth()

  async function handleSignInGoogle() {
    try {
      setIsLoading(true)
      
      return await signInWithGoogle()

    } catch (err) {
      console.error(err)
      Alert.alert('Não foi possível conectar na conta Google')    
    
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSignInApple() {
    try {
      setIsLoading(true)
      
      return await signInWithApple()

    } catch (err) {
      console.error(err)
      Alert.alert('Não foi possível conectar na conta Apple')
   
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas {'\n'}
            finaças de forma {'\n'}
            muito simples
          </Title>          
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInGoogle}
          />
          <SignInButton
            title="Entrar com Apple"
            svg={AppleSvg}
            onPress={handleSignInApple}
          />
        </FooterWrapper>

        {
          isLoading && 
            <ActivityIndicator 
              color="lightgrey" 
              size="large" 
              style={{ marginTop: 18 }}
            />
        }

      </Footer>
    </Container>
  )
}