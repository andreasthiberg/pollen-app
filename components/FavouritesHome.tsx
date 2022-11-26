import FavouriteList from './Favourites';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleDelay from './SingleDelay';

const Stack = createNativeStackNavigator();

export default function Favourites(props: any) {

    return (
        <Stack.Navigator initialRouteName="Lista">
            <Stack.Screen name="Lista">
                {(screenProps) =><FavouriteList {...screenProps} navigation={screenProps.navigation} userFavourites={props.userFavourites} reloadFavourites={props.dreloadFavourites} delays={props.delays} />}
            </Stack.Screen>
            <Stack.Screen name="Försening">
                {(screenProps) => <SingleDelay {...screenProps} navigation={screenProps.navigation} userFavourites={props.duserFavourites} reloadFavourites={props.dreloadFavourites} delays={props.delays}  />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}

