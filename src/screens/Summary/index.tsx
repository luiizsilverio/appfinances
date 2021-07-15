import React, { useEffect, useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native'
import { VictoryPie } from 'victory-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { useFocusEffect } from '@react-navigation/native'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { addMonths, subMonths, format } from 'date-fns'
import { ptBR } from 'date-fns/locale';

import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories'
import { useAuth } from '../../hooks/auth'

import { 
  Container,
  Header, 
  Title,
  Content,
  ChartContainer,
  MonthSelect,
  MonthButton,
  MonthIcon,
  Month,
  LoadContainer
} from './styles'

interface TransactionData {  
  type: 'income' | 'outcome'
  name: string
  amount: string
  category: string  
  date: string
}

interface CategoryData {
  key: string
  name: string
  total: number
  totalFormatted: string
  color: string
  percent: number
  percentFormatted: string
}

export function Summary() {
  const [totCategories, setTotCategories] = useState<CategoryData[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)

  const { user } = useAuth()
  const userKey = `@gofinances:transactions_user:${user.id}`

  function handleDateChange(action: 'next' | 'prev') {
    let newDate
    if (action === 'next') {
      newDate = addMonths(selectedDate, 1)
    } else {
      newDate = subMonths(selectedDate, 1)      
    }

    setSelectedDate(newDate)
  }

  async function loadData() {
    setIsLoading(true)
    
    const response = await AsyncStorage.getItem(userKey)
    const respFormatted = response ? JSON.parse(response) : []

    const saidas = respFormatted
    .filter((item: TransactionData) => {
      const vdata = new Date(item.date)
      return item.type === 'outcome' &&
        vdata.getMonth() === selectedDate.getMonth() &&
        vdata.getFullYear() === selectedDate.getFullYear()
    })

    const totSaidas = saidas.reduce((acc: number, item: TransactionData) => {
      return acc + Number(item.amount)
    }, 0)
    
    const totalCategory: CategoryData[] = []
    
    categories.forEach(category => {
      let soma = 0
      saidas.forEach((item: TransactionData) => {
        if (item.category === category.key) {
            soma += Number(item.amount)
        }
      })

      if (soma !== 0) {
        const totalFormatted = soma.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = (soma / totSaidas * 100)
        const percentFormatted = `${percent.toFixed(0)}%`

        totalCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: soma,
          totalFormatted,
          percent,
          percentFormatted
        })
      }
    })

    setTotCategories(totalCategory)
    setIsLoading(false)
  }
    
  useFocusEffect(useCallback(() => {
    loadData()
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

    {
      isLoading ? 
        <LoadContainer>
          <ActivityIndicator size="large" color="lightblue" /> 
        </LoadContainer>
      :   
      <Content	  
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: useBottomTabBarHeight()
        }}          
      >  

        <MonthSelect>
          <MonthButton onPress={() => handleDateChange('prev')}>
            <MonthIcon name="chevron-left" />
          </MonthButton>

          <Month>
            { format(selectedDate, 'MMMM yyyy', {locale: ptBR}) }
          </Month>

          <MonthButton onPress={() => handleDateChange('next')}>
            <MonthIcon name="chevron-right" />
          </MonthButton>
        </MonthSelect>

        <ChartContainer>
          <VictoryPie
            data={totCategories}
            x="percentFormatted"
            y="total"
            colorScale={totCategories.map(category => category.color)}
            labelRadius={50}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: 'white'
              }
            }}
          />
        </ChartContainer>

        {
          totCategories.map(item => (
            <HistoryCard 
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))      
        }
      </Content>      
    }
    </Container>
  )
}