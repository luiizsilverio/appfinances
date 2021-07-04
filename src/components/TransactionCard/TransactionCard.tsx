import React from 'react'
import { Text } from 'react-native'
import { categories } from '../../utils/categories'

import { 
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date
} from './styles'

export interface Transaction {
  name: string
  amount: string
  type: 'income' | 'outcome'
  date: string
  category: string  
}

interface TransactionProps {
  data: Transaction
}

export function TransactionCard({ data }: TransactionProps) {
  const [category] = categories.filter(
    item => item.key === data.category
  )

  return (
    <Container>
      <Title>{ data.name }</Title>

      <Amount type={data.type}>
        { data.type === 'outcome' && '- ' }
        { data.amount }
      </Amount>

      <Footer>
        <Category>
          <Icon name={ category.icon || "dollar-sign" } />
          <CategoryName>{ category.name }</CategoryName>
        </Category>

        <Date>{ data.date }</Date>
      </Footer>

    </Container>
  )
}