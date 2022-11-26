import { Text, View, StyleSheet, Button, ScrollView} from 'react-native';
import { DataTable } from "react-native-paper";
import { Typography, Forms, Base } from '../styles';
import { useEffect, useState } from 'react';
import settingsModel from '../models/settings';

export default function FavouriteList({ route, navigation, userFavourites, reloadFavourites}: {route:any;navigation:any;userFavourites:any;reloadFavourites:any}) {

    const [table,setTable] = useState([]);

    async function deleteFavourite(id: number){
        let result = await settingsModel.removeFavourite(id);
        return result;
    }

    useEffect(() => {
        console.log(userFavourites)
        let newTable = userFavourites.map((favourite: any, index: any) => { 

            return (
                <DataTable.Row key={index}>
                  <DataTable.Cell style={{flex: 1}}>{favourite.artefact}</DataTable.Cell>
                  <DataTable.Cell style={{flex: 1.5}}>
                        <Button
                        title="Ta bort"
                        onPress={async () => {
                            await deleteFavourite(favourite.id);
                            reloadFavourites();
                        }}  
                    />
                  </DataTable.Cell>
                </DataTable.Row>
            )
            });
        setTable(newTable);
    },[userFavourites]);

    

    
    return (
        <ScrollView style={Base.pageContainer}>
        <View style={Base.base}>
        <Text style={Base.title}>Dina favoritstationer</Text>
        <DataTable>
        {table}
        </DataTable>
        <Button
                title="Lägg till favoritstation"
                onPress={() => {
                    navigation.navigate('Lägg till favorit');
                }}
            />
        </View>
        </ScrollView>
    );
}
