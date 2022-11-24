import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';
import Delays from "./components/Delays";
import Map from "./components/Map";
import Favourites from "./components/Favourites";
import Settings from "./components/Settings";
import Auth from "./components/auth/Auth";
import delaysModel from './models/delays';
import { useState, useEffect } from 'react';

const Tab = createBottomTabNavigator();

const routeIcons : any = {
  "Förseningar": "train-outline",
  "Karta": "map",
  "Logga in": "log-in-outline",
  "Favoriter": "bookmarks-outline",
  "Inställningar": "settings"
};

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [delays, setDelays] = useState([]);

  useEffect(() => {
    reloadDelays();
  },[]);

  async function reloadDelays(){
    setDelays(await delaysModel.getDelaysWithStationInfo());
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = routeIcons[route['name']] || "alert";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Förseningar">
          {() => <Delays delays={delays} setDelays={setDelays} />}
        </Tab.Screen>
        <Tab.Screen name="Karta" component={Map} />
        {isLoggedIn ?
        <Tab.Screen name="Favoriter" component={Favourites} /> :
        <Tab.Screen name="Logga in">
          {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
        }
        <Tab.Screen name="Inställningar" component={Settings} />
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
