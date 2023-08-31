import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TemperatureComponent = () => {
  const [temperature, setTemperature] = useState(null);

  const fetchTemperature = () => {
    fetch('http://lulinucs.com.br:3000/temperatura')
      .then(response => response.text())
      .then(data => {
        setTemperature(parseFloat(data));
      })
      .catch(error => {
        console.error('Error fetching temperature:', error);
      });
  };

  useEffect(() => {
    fetchTemperature(); // Fetch inicial

    const intervalId = setInterval(fetchTemperature, 5000); // Intervalo de atualização (5 segundos)

    return () => {
      clearInterval(intervalId); // Limpar intervalo ao desmontar o componente
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.temperatureText}>Temperature:</Text>
      <Text style={styles.temperatureValue}>{temperature} °C</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  temperatureText: {
    fontSize: 20,
    marginBottom: 10,
  },
  temperatureValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TemperatureComponent;
