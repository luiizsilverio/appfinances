import React from 'react'
import { FlatList } from 'react-native'

import { 
  Container,
  Header,
  Title,
  Category,
  Icon,
  Name,
  Separator,
  Footer
} from './styles'

import { categories } from '../../utils/categories'
import { Button } from '../../components/Form/Button'

type Category = {
  key: string
  name: string
}

interface Props {
  category: Category
  setCategory: (category: Category) => void
  closeCategory: () => void
}

export function CategorySelect(props: Props) {

  function handleSelect(category: Category) {
    props.setCategory(category)
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%'}}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleSelect(item)}
            isActive={props.category.key === item.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => <Separator />}
      /> 

      <Footer>
        <Button 
          title="Selecionar" 
          onPress={props.closeCategory}
        />
      </Footer>
    </Container>
  )
}