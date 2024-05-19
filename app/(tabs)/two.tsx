import { useState, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';

//  Configuration for the charts
const chartConfig = {
  backgroundGradientFrom: '#ffffff',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#ffffff',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 3, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  decimalPlaces: 0,
};

const screenWidth = Dimensions.get('window').width;

interface SensorData {
  PH: string;
  Light: string;
  EC: string;
  FlowRate: string;
  Humidity: string;
  Temperature: string;
}

export default function TabTwoScreen() {
  const [data, setData] = useState<SensorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.8.14/ec');
        setData(response.data); // Directly setting the data
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  
  
  
  const [selectedComponent, setSelectedComponent] = useState("EC");
  // const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF']; // Array of colors
  const colors = [
    // Gradient Blue (calm and professional)
    '#247BA0',
    '#70C1B3',

    // Gradient Yellow (optimistic and energetic)
    '#ffc107',
    '#ff9800',

    // Gradient Green (fresh and growth-oriented)
    '#43A047',
    '#96D9A3',
  ];

  const eCData = {
    labels: ['12AM', '6AM', '12PM', '6PM'],
    values: [
      [1, 1.0],
      [2, 2.0],
      [3, 3.5],
      [4, 2.8],
    ],
  };

  const pHData = {
    labels: ['12AM', '6AM', '12PM', '6PM'],
    values: [
      [1, 6.0],
      [2, 5.8],
      [3, 7.5],
      [4, 6.4],
    ],
  };

  const tempData = {
    labels: ['12AM', '6AM', '12PM', '6PM'],
    values: [
      [1, 18],
      [2, 16],
      [3, 17],
      [4, 22],
    ],
  };

  const waterLevel = {
    labels: ['12AM', '6AM', '12PM', '6PM'],
    values: [
      [1, 4.8],
      [2, 3.5],
      [3, 3.1],
      [4, 2.7],
    ],
  };

  const humidityLevel = {
    labels: ['12AM', '6AM', '12PM', '6PM'],
    values: [
      [1, 37],
      [2, 35],
      [3, 33],
      [4, 38],
    ],
  };

  const handleSelection = (component: string) => {
    setSelectedComponent(component);
  };

  const SelectedCard = (name: string, value: string|undefined) => {
    if (data) {
      return (
        <View style={styles.selectedCard}>
          <View style={styles.cardLeft}>
            <Text style={styles.cardValue}>{value}</Text>
            <Text style={styles.cardValue}> {name}</Text>
          </View>
          <View style={styles.cardRight}>
            <TouchableOpacity><Text style={styles.icon}>▲</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.icon}>▼</Text></TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  const renderLineChart = (data: { labels: string[]; values: number[][] }, title: string) => {
    return (
      <>
        <Text style={styles.titleSmall}>{title}</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <LineChart
            data={{
              labels: data.labels,
              datasets: [{ data: data.values.map((row) => row[1]) }],
            }}
            width={screenWidth}
            height={220}
            yAxisLabel={''}
            chartConfig={chartConfig}
            bezier
          />
        </View>
      </>
    );
  };


  return (
    <>
      <ScrollView
        horizontal
        contentContainerStyle={styles.buttonContainer}
        showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[0] }]} onPress={() => handleSelection('EC')}>
          <Text style={styles.buttonText}>Nutrient Level</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: colors[1] }]} onPress={() => handleSelection('PH')}>
          <Text style={styles.buttonText}>pH Level</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: colors[2] }]} onPress={() => handleSelection('Temp')}>
          <Text style={styles.buttonText}>Temperature</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: colors[3] }]} onPress={() => handleSelection('Water')}>
          <Text style={styles.buttonText}>Water Level</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: colors[4] }]} onPress={() => handleSelection('Humidity')}>
          <Text style={styles.buttonText}>Humidity</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView style={styles.container}>
        {
          selectedComponent === "EC" ? (
            <>
              {SelectedCard("EC",  data?.EC)}
              <Text style={styles.shortDescription}>The Nutrient Levels are good! The ideal nutrient level for plants is 2.1</Text>
              {renderLineChart(eCData, "Nutrient Levels")}
              <View style={styles.highlightItem}>
                <Text style={{ fontSize: 18, textAlign: "justify" }}>
                  The level has been steadily increasing throughout the day,
                  starting at 1.0 at 12am, reaching 2.0 at 6am, 3.5 at 12pm, and 2.8 at 6pm.
                </Text>
              </View>
            </>

          ) : selectedComponent === "PH" ? (
            <>
              {SelectedCard("PH", data?.PH)}
              <Text style={styles.shortDescription}>The pH Levels are good! The ideal pH level for plants is 7</Text>
              {renderLineChart(pHData, "Ph Level")}
              <View style={styles.highlightItem}>
                <Text style={{ fontSize: 18, textAlign: "justify" }}>
                  The level has been steadily increasing throughout the day,
                  starting at 1.0 at 12am, reaching 2.0 at 6am, 3.5 at 12pm, and 2.8 at 6pm.
                </Text>
              </View>
            </>
          ) : selectedComponent === "Temp" ? (
            <>
              {SelectedCard("Celsius", data?.Temperature)}
              <Text style={styles.shortDescription}>The temperature is good! The ideal pH level for plants is 20 degrees celsius.</Text>
              {renderLineChart(tempData, "Temperature")}
              <View style={styles.highlightItem}>
                <Text style={{ fontSize: 18, textAlign: "justify" }}>
                  The level has been steadily increasing throughout the day,
                  starting at 1.0 at 12am, reaching 2.0 at 6am, 3.5 at 12pm, and 2.8 at 6pm.
                </Text>
              </View>
            </>
          ) : selectedComponent === "Water" ? (
            <>
              {SelectedCard("Litters", data?.FlowRate)}
              <Text style={styles.shortDescription}>The water level is too low! The ideal water level is 5 Litters.</Text>
              {renderLineChart(waterLevel, "Water Level")}
              <View style={styles.highlightItem}>
                <Text style={{ fontSize: 18, textAlign: "justify" }}>
                  The level has been steadily decreasing throughout the day,
                  starting at 1.0 at 12am, reaching 2.0 at 6am, 3.5 at 12pm, and 2.8 at 6pm.
                </Text>
              </View>
            </>
          ) : selectedComponent === "Humidity" ? (
            <>
              {SelectedCard("%", data?.Humidity)}
              <Text style={styles.shortDescription}>The humidity is low! The ideal humidity is 67%.</Text>
              {renderLineChart(humidityLevel, "Humidity")}
              <View style={styles.highlightItem}>
                <Text style={{ fontSize: 18, textAlign: "justify" }}>
                  The level has been steadily decreasing throughout the day,
                  starting at 1.0 at 12am, reaching 2.0 at 6am, 3.5 at 12pm, and 2.8 at 6pm.
                </Text>
              </View>
            </>
          ) : (
            <></>
          )
        }
      </ScrollView>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    height: 35,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#000', // Use your desired button color
    borderRadius: 20,
    borderWidth: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: "500"
  },
  selected: {
    backgroundColor: '#e0e0e0', // Optional: Apply a lighter background for selected button
  },
  selectedCard: {
    height: 120,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E0E0E0', // Use the first color from yellow gradient
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  cardRight: {
    flexDirection: 'column',
    padding: 20
  },
  icon: {
    fontSize: 32
  },
  cardValue: {
    fontSize: 34,
    fontWeight: 'bold',
    marginRight: 5,
  },
  shortDescription: {
    fontSize: 18,
    marginVertical: 20,
    paddingHorizontal: 10,
    textAlign: "justify"
  },
  highlightItem: {
    display: 'flex',
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
    paddingVertical: 16,
    paddingLeft: 15,
    paddingRight: 40,
    borderRadius: 8,
  },
  titleSmall: {
    fontSize: 24,
    marginTop: 25,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});
