import React from 'react'
import { Text } from 'react-native'

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

interface Category {  
  name: string
  icon: string
}

export interface Transaction {
  title: string
  amount: string
  type: 'income' | 'outcome'
  date: string
  category: Category  
}

interface TransactionProps {
  data: Transaction
}

export function TransactionCard({ data }: TransactionProps) {
  return (
    <Container>
      <Title>{ data.title }</Title>

      <Amount type={data.type}>
        { data.type === 'outcome' && '- ' }
        { data.amount }
      </Amount>

      <Footer>
        <Category>
          <Icon name={ data.category.icon || "dollar-sign" } />
          <CategoryName>{ data.category.name }</CategoryName>
        </Category>

        <Date>{ data.date }</Date>
      </Footer>

    </Container>
  )
}