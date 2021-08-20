import React from 'react'

import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native'

export function Profile(){
  return (
    <View>
      <Text testID="text-title">Perfil</Text>

      <TextInput
        placeholder="Nome"
        autoCorrect={false}
        value="Luiz"
        testID="input-name"
      />

      <TextInput 
        placeholder="Sobrenome"
        value="Oliveira"
        testID="input-surname"
      />

      <Button
        title="Salvar"
        onPress={() => {}}
      />
    </View>
  )
}