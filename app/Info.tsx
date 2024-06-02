import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Modal</Text> */}
      <Text style={styles.paragraph}>
        <Text style={styles.bold}>This app provides a real-time overview of your grow tent environment, allowing you to:</Text>
      </Text>
      <Text style={styles.paragraph}>1. View sensor data for factors like temperature, humidity, pH, and nutrient levels.</Text>
      <Text style={styles.paragraph}>2. Leverage AI-powered automation to optimize light, fan, and extractor fan settings for superior yields.</Text>
      <Text style={styles.paragraph}>3. Receive alerts for potential issues, ensuring your plants thrive in a perfectly balanced environment.</Text>
      <Text style={styles.paragraph}>4. Remotely access your tent data from anywhere you are.</Text>
      <Text style={styles.paragraph}>5. Diagnose plant disease with AI for early detection.</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  paragraph: {
    marginBottom: 10,
    marginHorizontal: 20,
    width: 300,
    textAlign: 'left'
  },
  bold: {
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
