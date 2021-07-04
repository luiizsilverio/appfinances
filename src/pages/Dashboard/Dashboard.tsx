import React, { useState, useCallback } from 'react'
import { Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

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
import { useEffect } from 'react'

export type DataListProps = Transaction & {
  id: string
}

const chave = '@gofinances:transactions'

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  async function loadTransactions() {    
    const response = await AsyncStorage.getItem(chave)
    const transactions = response ? JSON.parse(response) : []

    const transFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: "currency",
          currency: "BRL"
        })

        const date = new Date(item.date)
        const dateFormatted = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(date)

        return { 
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date: dateFormatted
        }
      })

    setData(transFormatted)    
  }

  async function clearData() {
    await AsyncStorage.removeItem(chave)
  }

  useEffect(() => {
    loadTransactions()
    // clearData()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

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


  // const data: DataListProps[] = [
  //   {
  //     id: '1',
  //     title: "Desenvolvimento de site",
  //     type: 'income',
  //     amount: "R$ 12.000,00",
  //     date: "13/04/2021",
  //     category: {
  //       name: "Vendas",
  //       icon: "dollar-sign"
  //     }
  //   },
  //   {
  //     id: '2',
  //     title: "Aluguel",
  //     type: 'outcome',
  //     amount: "R$ 1.500,00",
  //     date: "20/04/2021",
  //     category: {
  //       name: "Casa",
  //       icon: "home"
  //     } 
  //   },
  //   {
  //     id: '3',
  //     title: "Outback",
  //     type: 'outcome',
  //     amount: "R$ 120,00",
  //     date: "21/04/2021",
  //     category: {
  //       name: "Alimentação",
  //       icon: "coffee"
  //     } 
  //   }
  // ]
