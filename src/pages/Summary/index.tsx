import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { VictoryPie } from 'victory-native'

import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categories'

import { 
  Container,
  Header, 
  Title,
  Content,
  ChartContainer
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

  async function loadData() {
    const chave = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(chave)
    const respFormatted = response ? JSON.parse(response) : []

    const saidas = respFormatted
    .filter((item: TransactionData) => item.type === 'outcome')

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
  }
    
  useEffect(() => {
    loadData()
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>  
      <ChartContainer>
        <VictoryPie
          data={totCategories}
          x="name"
          y="total"
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
    </Container>
  )
}