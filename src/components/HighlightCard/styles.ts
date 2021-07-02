import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

interface TypeProps {
  type: 'in' | 'out' | 'total'
}

export const Container = styled.View<TypeProps>`
  background-color: ${(props) => 
    props.type === 'total' 
      ? props.theme.colors.secondary
      : props.theme.colors.shape      
  };

  width: ${RFValue(300)}px;
  border-radius: 5px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: 16px;
`

export const Header  = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title  = styled.Text<TypeProps>`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  color: ${(props) => 
    props.type === 'total' 
      ? props.theme.colors.shape
      : props.theme.colors.text_dark      
  };
`

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${(props) => props.type === 'in' && css`
    color: ${({ theme }) => theme.colors.success};
  ` };
  ${(props) => props.type === 'out' && css`
    color: ${({ theme }) => theme.colors.attention};
  ` };
  ${(props) => props.type === 'total' && css`
    color: ${({ theme }) => theme.colors.shape};
  ` };
`

export const Main  = styled.View`
`

export const Amount  = styled.Text<TypeProps>`
  font-family: ${props => props.theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  margin-top: 38px;

  color: ${(props) => 
    props.type === 'total' 
      ? props.theme.colors.shape
      : props.theme.colors.text_dark      
  };
`

export const LastTransaction  = styled.Text<TypeProps>`
  font-family: ${props => props.theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  color: ${(props) => 
    props.type === 'total' 
      ? props.theme.colors.shape
      : props.theme.colors.text
  };
`

