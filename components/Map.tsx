import { Text, View, StyleSheet } from 'react-native';
import { Base, Typography } from '../styles';
import { useEffect, useState } from "react";

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';


export default function Map() {


    const [locationMarker, setLocationMarker] = useState(<Marker
        coordinate={{ latitude: 0, longitude: 0 }}
        title={""}
    />);

    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
            />);
        })();
    }, []);

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Skicka order</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 59.334591,
                        longitude: 18.063240,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {locationMarker}
                </MapView>
                <Text>{errorMessage}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: 300,
        margin: 10
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});