import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'

import { 
  Container,
  Header,
  TitleWrapper,
  Title
} from './styles'

export function SignIn() {
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg 
            width={RFValue(200)}
            height={RFValue(200)}
          />
9:19
          <Title>Controle suas finaças de forma muito simples</Title>
        </TitleWrapper>
      </Header>
    </Container>
  )
}