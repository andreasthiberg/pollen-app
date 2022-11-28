import { useEffect, useState } from "react";
import { StyleSheet, Text, View, } from 'react-native';
import { Base, Typography } from '../styles';
import MapView, { Marker, Circle } from 'react-native-maps';


export default function SingleDelay(props:any) {


    const [stationLocationMarker, setStationLocationMarker] = useState(<Marker
        coordinate={{ latitude: 0, longitude: 0 }}
        title={""}
    />);


    const [walkCircle, setWalkCircle] = useState(<Circle center={{latitude: 0, longitude: 0}} radius={100}/>);

    const { delay } = props.route.params;
    
    let coordString = delay.stationInfo.Geometry.WGS84
    let reg = /(\d*.\.\d*)\s(\d*\.\d*)/
    let match = coordString.match(reg);
    let stationCoords = [match[2],match[1]];

    let dateA = new Date(delay.AdvertisedTimeAtLocation);
    let dateB = new Date(delay.EstimatedTimeAtLocation);
    let timeDifferenceInSeconds = (dateB.getTime() - dateA.getTime()) / 1000;

    let possibleDistance = ((timeDifferenceInSeconds-600)/60) * 50;
    if(possibleDistance < 0 ){
        possibleDistance = 0;
    }

    let timeLeftString = getFormattedTime(timeDifferenceInSeconds);
    let walkString = "Kartan nedan visar hur långt du hinner promenera innan tåget går, med lite marginal.";
    if(possibleDistance == 0){
        walkString = "Eftersom tåget går om tio minuter eller mindre så hinner du ingen promenad."
    }

    useEffect(() => {
        setStationLocationMarker(<Marker
            coordinate={{
                latitude: stationCoords[0],
                longitude: stationCoords[1]
            }}
            title={delay.stationInfo.AdvertisedLocationName}
            pinColor="blue"/>)

    },[]);

    useEffect(() => {
        setWalkCircle(<Circle 
            center={{latitude: stationCoords[0], longitude: stationCoords[1]}} radius={possibleDistance} strokeColor={"gray"} fillColor={"rgba(212,242,214,0.3)"}
        />)
    },[]);

    return (
        <View style={Base.base}>
            <Text style={Base.title}>Promenadkarta</Text>
            <Text style={{marginBottom: 10}}>Försening för tåg med ID {delay.AdvertisedTrainIdent}</Text>
            <Text style={{marginBottom: 10}}>Tåget går om {timeLeftString}. {walkString     } </Text>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: stationCoords[0],
                        longitude: stationCoords[1],
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                    }}>
                    {stationLocationMarker}
                    {walkCircle}
                </MapView>
            </View>
        </View>
    );
}


function getFormattedTime(timeInSeconds: number){
    let hours = Math.floor(timeInSeconds/3600);
    let minutes = Math.floor((timeInSeconds-(hours*3600))/60);
    return (hours + " timmar och " + minutes + " minuter")
}

const styles = StyleSheet.create({
    container: {
        height: 300,
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