import { useEffect, useState } from "react";
import { StyleSheet, Text, View, } from 'react-native';
import { Base, Typography } from '../styles';
import { DataTable } from "react-native-paper";

import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';


export default function DelayMap(props: any) {


    const [locationMarker, setLocationMarker] = useState(<Marker
        coordinate={{ latitude: 0, longitude: 0 }}
        title={""}
    />);


    const [errorMessage, setErrorMessage] = useState("");

    const [markerList, setMarkerList] = useState<Array<typeof Marker>>([]);


    useEffect(() => {
    //Create station delay markers
        
        let newMarkerList: any = [];
        let delaysWithStationInfo = props.delays.filter((delay:any) => delay.hasOwnProperty("stationInfo"));
        let stationsWithDelays: any = {};

        for(let delay of delaysWithStationInfo){
            let station = delay.stationInfo.AdvertisedLocationName;
            let delayInfo = {"advertisedTime": delay.advertisedTimeShort.time, "estimatedTime": delay.estimatedTimeShort.time, "trainId": delay.AdvertisedTrainIdent};
            if(!stationsWithDelays.hasOwnProperty(station)){
                stationsWithDelays[station] = {"delays": [delayInfo]};
                stationsWithDelays[station].coordString = delay.stationInfo.Geometry.WGS84;
            } else {
                stationsWithDelays[station].delays.push(delayInfo);
            }
        }


        let index = -1;
        for (const station in stationsWithDelays) {
            index++;

            // Get latitude and longitude with regex
            let coordString = stationsWithDelays[station].coordString;
            let reg = /(\d*.\.\d*)\s(\d*\.\d*)/
            let match = coordString.match(reg);

            let stationLatitude = parseFloat(match[2]);
            console.log(index)
            let stationLongitude = parseFloat(match[1]);

            let delayList = [];
            let delayIndex = 0;
            for(let delay of stationsWithDelays[station].delays){
                delayList.push(
                    <DataTable.Row key={delayIndex}>
                    <DataTable.Cell style={{flex:1}}>{delay.trainId}</DataTable.Cell>
                    <DataTable.Cell style={{flex:1}}>{delay.advertisedTime}</DataTable.Cell>
                    <DataTable.Cell style={{flex:1}}><Text style={{color: "red"}}>{delay.estimatedTime}</Text></DataTable.Cell>
                    </DataTable.Row>
                )
                delayIndex++;
            }

            newMarkerList.push(
                <Marker
                key={index}
                coordinate={{
                    latitude:  stationLatitude,
                    longitude:  stationLongitude
                }}
                pinColor="green">
                <Callout style={{width:180}}>
                    <Text style={styles.markerTitle}>
                        {station}
                    </Text>
                    <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={{flex:1}}>Tåg-ID</DataTable.Title>
                        <DataTable.Title style={{flex:1}}>Tid</DataTable.Title>
                        <DataTable.Title style={{flex:1}}>Ny</DataTable.Title>
                    </DataTable.Header>
                    {delayList}
                    </DataTable>
                </Callout>
                </Marker>)

        };

        setMarkerList(newMarkerList);

    },[props.delays]);


    //Create user location marker
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
            <Text style={Typography.header2}>Förseningskarta</Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 59.334591,
                        longitude: 18.063240,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    <>
                    {locationMarker}
                    {markerList}
                    </>
                </MapView>
                <Text>{errorMessage}</Text> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 400,
        width: 300,
        margin: 5
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerTitle: {
        fontSize: 18,
    },
    markerDelay: {
        fontSize: 14
    },
    markerCallout: {
        padding: 0
    },
    lateTime: {
        color: "red"
    },
    tableRow: {

    }
});