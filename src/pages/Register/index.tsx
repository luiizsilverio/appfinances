import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { 
  Modal, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native'

import { InputForm } from '../../components/Form/InputForm'
import { Button } from '../../components/Form/Button'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategoryButton } from '../../components/Form/CategoryButton';
import { CategorySelect } from '../CategorySelect'

import { 
  Container, 
  Header, 
  Title, 
  Form, 
  Fields, 
  TransactionTypes 
} from './styles';

interface FormData {
  name: string
  amount: string

}

const schema = Yup.object().shape({
  name: Yup.string()
    .required('Digite o nome'),
  amount: Yup.number()
    .typeError('Valor incorreto')
    .positive('Informe um valor maior que zero')
})

const chave = '@gofinances:transactions'

export function Register(){
  const [transactionType, setTransactionType] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema)
  })

  const errors = formState.errors
  console.count('Register')

  function handleCloseModal() {
     setModalOpen(false)
  }

  function handleOpenModal() {
    setModalOpen(true)
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transação')

    if (category.key === 'category') 
      return Alert.alert('Selecione a categoria')

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    try {   
      await AsyncStorage.setItem(chave, JSON.stringify(data))

    } catch (err) {
      console.error(err)
      Alert.alert('Não foi possível salvar')
    }
  }


  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem(chave)

      console.log(JSON.parse(data!))
    }

    loadData()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>      
    <Container>

      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
            name="name"
            control={control}
            placeholder="Nome" 
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />

          <InputForm 
            name="amount"
            control={control}
            placeholder="Preço" 
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />
          
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
        
        <Button 
          title="Enviar" 
          onPress={handleSubmit(handleRegister)}
        />
      </Form>      

      <Modal visible={modalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeCategory={handleCloseModal}
        />
      </Modal>

    </Container>
    </TouchableWithoutFeedback>
  );
}