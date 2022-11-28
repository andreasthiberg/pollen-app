import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { Ionicons } from '@expo/vector-icons';
import DelayMap from "./components/DelayMap";
import FavouritesHome from "./components/FavouritesHome";
import Settings from "./components/Settings";
import Auth from "./components/auth/Auth";
import delaysModel from './models/delays';
import settingsModel from './models/settings';
import { useState, useEffect } from 'react';
import HomePage from './components/HomePage';

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
  const [userFavourites, setUserFavourites] = useState([]);

  //All current delays
  const [delays, setDelays] = useState([]);


  useEffect(() => {
    reloadDelays();
    reloadFavourites();
  },[]);

  useEffect(() => {
    reloadFavourites();
  },[isLoggedIn]);

  async function reloadFavourites(){
    let newFavouriteDelays = await settingsModel.getFavourites();
    console.log(newFavouriteDelays);
    setUserFavourites(newFavouriteDelays);
  } 

  async function reloadDelays(){
     setDelays(await delaysModel.getDelaysWithStationInfo());
  }

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator screenOptions={({ route   }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = routeIcons[route['name']] || "alert";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Förseningar">
          {() => <HomePage reloadDelays={reloadDelays} delays={delays} setDelays={setDelays} />}
        </Tab.Screen>
        <Tab.Screen name="Karta">
          {() => <DelayMap delays={delays} />}
        </Tab.Screen>
        {isLoggedIn ?
        <Tab.Screen name="Favoriter">
            {() => <FavouritesHome reloadDelays={reloadDelays} delays={delays} setDelays={setDelays} userFavourites={userFavourites}/>}
        </Tab.Screen>
        :
        <Tab.Screen name="Logga in">
          {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
        </Tab.Screen>
        }
        {isLoggedIn &&
        <Tab.Screen name="Inställningar">
        {() => <Settings reloadFavourites={reloadFavourites} userFavourites={userFavourites} delays={delays} />}
        </Tab.Screen> }
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
