import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import { DataListProps } from './Dashboard'

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding-bottom: 12px;
`
export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${(props) => props.theme.colors.primary};
  align-items: flex-start;
  flex-direction: row;
  justify-content: center;
`
export const Photo = styled.Image `  
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;  
`;

export const UserWrapper = styled.View `
  width: 100%;
  padding: 0 ${RFValue(24)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${RFValue(28)}px;
`;

export const UserInfo = styled.View `
  flex-direction: row;
  align-items: center;
`;

export const User = styled.View `
  margin-left: ${RFValue(17)}px;
`;

export const UserGreeting = styled.Text `
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${(props) => props.theme.fonts.regular};
`;

export const UserName = styled.Text `
  color: ${(props) => props.theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${(props) => props.theme.fonts.bold};
`;

export const Icon = styled(Feather)`
  color: ${props => props.theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`

export const LogoutButton = styled(BorderlessButton)`
  
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 }
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(17)}px;
`

export const Transactions = styled.View`
  flex: 1;  
  padding: 0 24px;
  margin-top: ${RFPercentage(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${(props) => props.theme.fonts.regular};
  margin-bottom: 10px;
`;

export const TransactionList = styled(
  FlatList as new () => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
})`
  padding-bottom: 32px;
`;