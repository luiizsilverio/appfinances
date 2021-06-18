import React from 'react'

import { 
  Container,
  Header,
  Title,
  Icon,
  Main,
  Amount,
  LastTransaction
} from './styles'

type HighlightCardProps = {
  title: string
  amount: string
  lastTransaction: string
  type: 'in' | 'out' | 'total'
}

const icon = {
  in: 'arrow-up-circle',
  out: 'arrow-down-circle',
  total: 'dollar-sign'
}

export function HighlightCard(props: HighlightCardProps) {
  return (
    <Container type={ props.type }>
      <Header>
        <Title type={ props.type }>{ props.title }</Title>
        <Icon name={ icon[props.type] } type={ props.type } />
      </Header>

      <Main>
        <Amount type={ props.type }>{ props.amount }</Amount>
        <LastTransaction type={ props.type }>
          { props.lastTransaction }
        </LastTransaction>
      </Main>
    </Container>
  )
}