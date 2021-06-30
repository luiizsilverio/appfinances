import React, { useState } from 'react'
import { Modal } from 'react-native'

import { Input } from '../../components/Form/Input'
import { Button } from '../../components/Form/Button'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategoryButton } from '../../components/Form/CategoryButton';
import { CategorySelect } from '../CategorySelect'

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';

export function Register(){
  const [transactionType, setTransactionType] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  function handleCloseModal() {
     setModalOpen(false)
  }

  function handleOpenModal() {
    setModalOpen(true)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          
          <TransactionTypes>
            <TransactionTypeButton 
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
              onPress={() => setTransactionType("up")}
            />
            <TransactionTypeButton 
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
              onPress={() => setTransactionType("down")}
            />
          </TransactionTypes>

          <CategoryButton 
            title={category.name}
            onPress={handleOpenModal}
          />
        </Fields>
        
        <Button title="Enviar" />
      </Form>      

      <Modal visible={modalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeCategory={handleCloseModal}
        />
      </Modal>
    </Container>
  );
}