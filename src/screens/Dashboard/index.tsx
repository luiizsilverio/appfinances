import React, { useState, useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
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
  LogoutButton,
  LoadContainer
} from './styles'

import { HighlightCard } from '../../components/HighlightCard/HighlightCard'
import { TransactionCard, Transaction } from '../../components/TransactionCard/TransactionCard'
import { useAuth } from '../../hooks/auth'

export type DataListProps = Transaction & {
  id: string
}

type CardProps = {
  amount: string
  lastTransaction: string
}

type CardData = {
  entradas: CardProps
  saidas: CardProps
  total: CardProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [cards, setCards] = useState<CardData>({} as CardData)

  const { signOut, user } = useAuth()
  const userKey = `@gofinances:transactions_user:${user.id}`

  function getLastTransactionDate( 
    lista: DataListProps[],
    type: 'income' | 'outcome' ) 
  {
    const listaFiltrada = lista
      .filter(item => item.type === type)

    const lastTransaction = new Date(
      Math.max.apply(Math, listaFiltrada
      .map(item => new Date(item.date).getTime())))
    
    if (listaFiltrada.length === 0) 
        return "(não tem)"

    return lastTransaction.toLocaleDateString('pt-BR', {      
      day: '2-digit',
      month: 'long',      
    })
  }

  async function loadTransactions() {    
    const response = await AsyncStorage.getItem(userKey)
    const transactions = response ? JSON.parse(response) : []

    let totEntradas = 0
    let totSaidas = 0

    const transFormatted: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'income') {
          totEntradas += Number(item.amount)
        } else {
          totSaidas += Number(item.amount)
        }

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

    setTransactions(transFormatted)   
    
    const ultIncome   = getLastTransactionDate(transactions, 'income')
    const ultOutcome  = getLastTransactionDate(transactions, 'outcome')
    const lastIncome  = `dia ${ultIncome}`
    const lastOutcome = `dia ${ultOutcome}`
    const interval    = `01 a ${ultOutcome ? ultOutcome : ultIncome}`

    setCards({
      entradas: { amount: totEntradas
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL' 
        }),
        lastTransaction: `Última entrada ${lastIncome}`
      },
      saidas: { amount: totSaidas
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL' 
        }),
        lastTransaction: `Última entrada ${lastOutcome}`
      },
      total: { amount: (totEntradas - totSaidas)
        .toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL' 
        }),
        lastTransaction: interval
      }
    })

    setIsLoading(false)
  }

  async function clearData() {
    await AsyncStorage.removeItem(userKey)
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
    {
      isLoading ? 
        <LoadContainer>
          <ActivityIndicator size="large" color="lightgrey" /> 
        </LoadContainer>
      :
      <>
        <Header>
          <UserWrapper>
            <UserInfo>
              <Photo 
                source={{ uri: user.photo }} 
                />
              <User>
                <UserGreeting>Olá,</UserGreeting>
                <UserName>{ user.name }</UserName>
              </User>
            </UserInfo>

            <LogoutButton onPress={ signOut }>
              <Icon name="power" />
            </LogoutButton>
          </UserWrapper>
        </Header>      
      
        <HighlightCards>        
          <HighlightCard 
            title="Entradas" 
            type="in"
            amount={ cards.entradas.amount } 
            lastTransaction={cards.entradas.lastTransaction}

          />
          <HighlightCard 
            title="Saídas" 
            type="out"
            amount={ cards.saidas.amount }
            lastTransaction={cards.saidas.lastTransaction}
          />
          <HighlightCard 
            title="Total" 
            type="total"
            amount={ cards.total.amount }
            lastTransaction={cards.total.lastTransaction}
          />
        </HighlightCards>

        <Transactions>
          <Title>Listagem</Title>

          <TransactionList 
            data={transactions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TransactionCard data={ item } />
            )}          
          />
          
        </Transactions>
      </>
    }
    </Container>
  )
}
