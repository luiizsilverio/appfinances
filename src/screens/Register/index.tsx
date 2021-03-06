import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid'
import { useNavigation } from '@react-navigation/native'

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
import { useAuth } from '../../hooks/auth'

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
    .required('Informe o valor')
})

export function Register(){
  const [transactionType, setTransactionType] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const { user } = useAuth()
  const userKey = `@gofinances:transactions_user:${user.id}`
      
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  const navigation = useNavigation()

  const { 
    control, 
    handleSubmit, 
    formState,
    reset
  } = useForm({ resolver: yupResolver(schema) })

  const errors = formState.errors
  
  function handleTransactionsTypeSelect(type: "income" | "outcome") {
    setTransactionType(type);
  }

  function handleCloseModal() {
     setModalOpen(false)
  }

  function handleOpenModal() {
    setModalOpen(true)
  }

  async function handleRegister(form: FormData) {
    if (!transactionType)
      return Alert.alert('Selecione o tipo da transa????o')

    if (category.key === 'category') 
      return Alert.alert('Selecione a categoria')

    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    }

    try {   
      const data = await AsyncStorage.getItem(userKey)      
      const currentData = data ? JSON.parse(data) : []

      const newData = [...currentData, newTransaction]

      await AsyncStorage.setItem(userKey, JSON.stringify(newData))

      reset()

      setTransactionType('')

      setCategory({
        key: 'category',
        name: 'Categoria'
      })

      navigation.navigate('Listagem')

    } catch (err) {
      console.error(err)
      Alert.alert('N??o foi poss??vel salvar')
    }
  }

  // useEffect(() => {
  //   async function loadData() {
  //     const data = await AsyncStorage.getItem(userKey)
  //     console.log(JSON.parse(data!))
  //   }

  //   async function clearData() {
  //     await AsyncStorage.removeItem(userKey)
  //   }

  //   loadData()
  // }, [])

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
            placeholder="Pre??o" 
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
          />
          
          <TransactionTypes>
            <TransactionTypeButton 
              type="up"
              title="Entrada"
              isActive={transactionType === 'income'}
              onPress={() => setTransactionType("income")}
            />
            <TransactionTypeButton 
              type="down"
              title="Sa??da"
              isActive={transactionType === 'outcome'}
              onPress={() => setTransactionType("outcome")}
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

      <Modal visible={modalOpen} testID="modal-category">
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