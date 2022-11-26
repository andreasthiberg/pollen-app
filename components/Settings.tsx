import { View, ScrollView } from 'react-native';
import { Base } from '../styles';
import FavouriteStations from './FavouriteStations';
import AddFavourite from './AddFavourite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function Settings({userFavourites, reloadFavourites, delays}: any) {


    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List">
                {(screenProps) => <FavouriteStations {...screenProps} userFavourites={userFavourites} reloadFavourites={reloadFavourites} />}
            </Stack.Screen>
            <Stack.Screen name="Lägg till favorit">
                {(screenProps) => <AddFavourite {...screenProps} userFavourites={userFavourites} reloadFavourites={reloadFavourites} delays={delays}  />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
