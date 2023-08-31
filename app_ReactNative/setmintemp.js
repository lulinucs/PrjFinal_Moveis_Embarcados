import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const MinTemp = () => {
  const [value, setValue] = useState('');

  const handleInputChange = (text) => {
    setValue(text);
  };

  const handleButtonClick = () => {
    if (value !== '') {
      const data = { value: value }; // Criar um objeto com a propriedade "value"
      
      fetch('http://lulinucs.com.br:3000/setmintemp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Passar o objeto "data" para JSON.stringify()
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Valor enviado com sucesso:', data);
        })
        .catch((error) => {
          console.error('Erro ao enviar o valor:', error);
        });
    }
  };

  return (
    <View>
      <Text>Definir Temperatura Mínima</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10 }}
        placeholder="Digite o valor"
        keyboardType="numeric"
        value={value}
        onChangeText={handleInputChange}
      />
      <Button title="Enviar" onPress={handleButtonClick} />
    </View>
  );
};

export default MinTemp;
