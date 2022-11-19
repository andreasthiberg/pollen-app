import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';
import Home from "./components/Home";

const Tab = createBottomTabNavigator();

const routeIcons : any = {
  "Hem": "send",
  "Bort": "send"
};

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = routeIcons[route['name']] || "alert";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Hem" component={Home} />
        <Tab.Screen name="Bort" component={Home} />
      </Tab.Navigator>
      </NavigationContainer>
    <StatusBar style="auto" />
    <FlashMessage position="top" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
