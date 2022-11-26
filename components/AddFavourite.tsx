import { Text, View, ScrollView, TextInput, Button } from 'react-native';
import { Typography, Forms, Base } from '../styles';
import { useState, useEffect } from "react";
import settingsModel from "../models/settings";
import { showMessage } from "react-native-flash-message";
import { Picker } from '@react-native-picker/picker';
import FavouriteList from './FavouriteStations';

export default function addFavourite({userFavourites, navigation, reloadFavourites, delays}: any) {

    const [newFavourite, setNewFavourite] = useState("");

    async function addFavourite(){
        if(newFavourite == ""){
            showMessage({
                message: "Fyll i en stad",
                type: "warning",
            });
            return;
        } else {
            let result = await settingsModel.addFavourite(newFavourite);
            reloadFavourites();
            if("errors" in result){
                showMessage({
                    message: "Misslyckades",
                    type: "danger",
                }); 
            } else if ((userFavourites.map((favourite:any) => favourite.artefact)).includes(newFavourite))  {
                showMessage({
                    message: "Stationen är redan tillagd",
                    type: "warning",
                }); 
            } else {
                setNewFavourite("");
                showMessage({
                    message: "Favorit tillagd",
                    type: "success",
                });
                navigation.navigate('List'); 
            }

        }
    }

    return (
        <View style={Base.base}>
        
            <Text style={Typography.label}>Välj eller skriv in en favoritstation</Text>
            <TextInput
                style={Forms.favouriteInput}
                onChangeText={(content: string) => {
                    setNewFavourite(content)
                }}
                value={newFavourite}
            />
            <StationDropDown  setNewFavourite={setNewFavourite} newFavourite={newFavourite} delays={delays} userFavourites={userFavourites}/>

            <Button
                title="Lägg till"
                onPress={() => {
                    addFavourite();
                }}  
            />
        </View>
    );
}

function StationDropDown(props: any) {

    let delaysWithStationInfo = props.delays.filter((delay:any) => delay.hasOwnProperty("stationInfo"));
    let stations: any = [""];
    let currentFavouriteStations = props.userFavourites.map((favourite:any) => favourite.artefact);
    for(let delay of delaysWithStationInfo){
        let stationName = delay["stationInfo"]["AdvertisedLocationName"];
        if(!(stations.includes(stationName)) && !(currentFavouriteStations.includes(stationName))){
            stations.push(delay["stationInfo"]["AdvertisedLocationName"]);
        }
    }
    stations.sort();

    const stationList = stations.map((station: any, index: any) => {
        return <Picker.Item key={index} label={station} value={station} />;
    });


    return (
        <Picker
            style={{ ...Forms.picker }}
            selectedValue={props.newFavourite}
            onValueChange={(itemValue) => {
                props.setNewFavourite(itemValue);
            }}>
            {stationList}
        </Picker>
    );
}
