import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import TemperatureComponent from './temperatura';

import MaxTemp from './setmaxtemp';
import MinTemp from './setmintemp';



export default function App() {
  return (
    <View style={styles.container}>
      <TemperatureComponent />
      <MaxTemp />
      <MinTemp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
