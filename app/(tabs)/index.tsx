import { ScrollView, StyleSheet, Image, FlatList } from 'react-native';
import { Text, View } from '@/components/Themed';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faLightbulb, faThermometerHalf, faWater, faFan, faLeaf } from '@fortawesome/free-solid-svg-icons';

interface System {
  name: string;
  status: string;
}

const systemsData: System[] = [
  { name: 'Light', status: 'running' },
  { name: 'Cooling Fan', status: 'stopped' },
  { name: 'pH Sensor', status: 'running' },
  { name: 'EC Sensor', status: 'running' },
  { name: 'Water Level Sensor', status: 'running' },
  { name: 'Extractor Fan', status: 'running' },
  { name: 'Humidifier', status: 'running' },
]

const SystemItem = ({ name, status }: System) => {
  // Define a mapping from system names to icons
  const systemIcons: { [key: string]: IconDefinition } = {
    'Light': faLightbulb,
    'Cooling Fan': faFan,
    'pH Sensor': faThermometerHalf,
    'EC Sensor': faThermometerHalf,
    'Water Level Sensor': faWater,
    'Extractor Fan': faFan,
    'Humidifier': faLeaf,
  };

  const icon = systemIcons[name] as IconDefinition;

  return (
    <View style={[styles.systemItem, status === 'running' ? styles.running : styles.stopped]}>
      <FontAwesomeIcon icon={icon} size={24} color="#fff" />
      <Text style={styles.systemText}> {name}</Text>
      <Text style={styles.statusText}>{status}</Text>
    </View>
  );

};

export default function TabOneScreen() {
  const sortedSystems = [...systemsData].sort((a, b) => (a.status === 'stopped' ? -1 : 1));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.topContainer}>
        <Image
          source={require('./../../assets/images/crop.jpeg')}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.overlayText}>Hydroponics IoT AI Project (Donkerbos)</Text>
      </View>

      <Text style={styles.title}>Systems Status</Text>
      <FlatList
        data={sortedSystems}
        renderItem={({ item }) => <SystemItem {...item} />}
        keyExtractor={(item) => item.name}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  topContainer: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    position: 'absolute',
    zIndex: 0, // Ensure the image is behind the overlay
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    opacity: 0.5,
    borderRadius: 8,
    zIndex: 1, // Ensure the overlay is above the image
  },
  overlayText: {
    color: 'white',
    fontSize: 24,
    zIndex: 2, // Ensure the text is above the overlay
    textAlign: 'center'
  },
  title: {
    fontSize: 24,
    marginTop: 25,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  systemItem: {
    paddingHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    height: 55,
    flexDirection: 'row', // Arrange items horizontally
    alignItems: 'center', // Align items vertically in the center
  },
  running: {
    backgroundColor: '#70C1B3', // Green
  },
  stopped: {
    backgroundColor: '#f24157', // Red
  },
  systemText: {
    fontSize: 18,
    color: '#fff',
    flex: 1, // Allow text to expand and fill remaining space
  },
  iconContainer: {
    marginRight: 10, // Add margin for spacing between icon and text
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});
