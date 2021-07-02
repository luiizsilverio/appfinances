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
  Title,
  TransactionList,
  LogoutButton
} from './styles'

import { HighlightCard } from '../../components/HighlightCard/HighlightCard'
import { TransactionCard, Transaction } from '../../components/TransactionCard/TransactionCard'

export type DataListProps = Transaction & {
  id: string
}

export function Dashboard() {
  
  const data: DataListProps[] = [
    {
      id: '1',
      title: "Desenvolvimento de site",
      type: 'income',
      amount: "R$ 12.000,00",
      date: "13/04/2021",
      category: {
        name: "Vendas",
        icon: "dollar-sign"
      }
    },
    {
      id: '2',
      title: "Aluguel",
      type: 'outcome',
      amount: "R$ 1.500,00",
      date: "20/04/2021",
      category: {
        name: "Casa",
        icon: "home"
      } 
    },
    {
      id: '3',
      title: "Outback",
      type: 'outcome',
      amount: "R$ 120,00",
      date: "21/04/2021",
      category: {
        name: "Alimentação",
        icon: "coffee"
      } 
    }
  ]

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

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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

        <TransactionList 
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TransactionCard data={ item } />
          )}          
        />
        
      </Transactions>
    </Container>
  )
}
function getBottomSpace(): string | number | undefined {
  throw new Error('Function not implemented.')
}

