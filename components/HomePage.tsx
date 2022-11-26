import Delays from './Delays';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleDelay from './SingleDelay';

const Stack = createNativeStackNavigator();

export default function HomePage(props: any) {

    return (
        <Stack.Navigator initialRouteName="Lista">
            <Stack.Screen name="Lista">
                {(screenProps) =><Delays {...screenProps} userFavourites={props.userFavourites} reloadFavourites={props.dreloadFavourites} delays={props.delays} />}
            </Stack.Screen>
            <Stack.Screen name="Försening">
                {(screenProps) => <SingleDelay {...screenProps} userFavourites={props.duserFavourites} reloadFavourites={props.dreloadFavourites} delays={props.delays}  />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
