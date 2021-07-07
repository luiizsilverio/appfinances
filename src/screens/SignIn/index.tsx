import React, { useContext } from "react";
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
  const { user } = useAuth()

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
          />
          <SignInButton
            title="Entrar com Apple"
            svg={AppleSvg}
          />
        </FooterWrapper>
      </Footer>
    </Container>
  )
}