import { Text, View, ScrollView, Button } from 'react-native';
import { Base } from '../styles';
import DelayList from './DelayList';
import { useState, useEffect } from 'react';

export default function FavouriteList(props: any) {

    const [favouriteDelays, setFavouriteDelays] = useState([]);

    let delaysWithStations; 
    let favouriteStationList : Array<String>;

    useEffect(() => {
        delaysWithStations = props.delays.filter((delay: any) => delay.hasOwnProperty("stationInfo"));
        favouriteStationList = props.userFavourites.map((favourite: any) => { return (favourite.artefact)});
        setFavouriteDelays(delaysWithStations.filter((delay:any) => favouriteStationList.includes(delay.stationInfo.AdvertisedLocationName)));
      },[props.userFavourites]);

      
    return (
        <ScrollView style={Base.pageContainer}>
        <View style={Base.base}>
            <Text style={Base.title}>Förseningar vid dina stationer</Text>
            <Text style={{textAlign: "center", marginTop: 5, marginBottom: 5}}>Klicka på en försening för att se promenadkarta.</Text>
            <Button
                title="Uppdatera"
                onPress={() => {
                    props.reloadDelays();
                }}  
            />
            <DelayList reloadDelays={props.reloadDelays} navigation={props.navigation} delays={favouriteDelays} setDelays={props.setDelays} />
        </View>
        </ScrollView>
    );
}

