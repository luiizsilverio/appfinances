import React from 'react'
import { Text, View } from 'react-native'

import { 
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title
} from './styles'

import { HighlightCard } from '../../components/HighlightCard/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard/TransactionCard'

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo 
              source={{uri: 'https://github.com/luiizsilverio.png'}} 
              />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Luiz</UserName>
            </User>
          </UserInfo>

          <Icon name="power" />
        </UserWrapper>
      </Header>      
    
      <HighlightCards>        
        <HighlightCard 
          title="Entradas" 
          type="in"
          amount="R$ 17.400,00" 
          lastTransaction="Última entrada dia 30 de abril"
        />
        <HighlightCard 
          title="Saídas" 
          type="out"
          amount="R$ 1.259,00" 
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard 
          title="Total" 
          type="total"
          amount="R$ 16.141,00" 
          lastTransaction="01 a 16 de abril"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>

        <TransactionCard />
        
      </Transactions>
    </Container>
  )
}
