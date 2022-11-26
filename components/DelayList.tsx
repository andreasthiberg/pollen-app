import { useLinkProps } from '@react-navigation/native';
import { Text, View, StyleSheet, Button} from 'react-native';
import { DataTable } from "react-native-paper";

export default function DelayList(props: any) {


    let table = props.delays.map((delay: any, index: any) => { 
    let stationName = "N/A";

    if(delay.stationInfo != undefined){
        stationName = delay.stationInfo.AdvertisedLocationName;
    }

    if(stationName == "N/A"){
        return (
            <DataTable.Row key={index}>
              <DataTable.Cell style={{flex: 1}}>{delay.AdvertisedTrainIdent}</DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>{delay.advertisedTimeShort.time}</DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}><Text style={styles.lateTime}>{delay.estimatedTimeShort.time}</Text></DataTable.Cell>
              <DataTable.Cell style={{flex: 1.5}}>{stationName}</DataTable.Cell>
            </DataTable.Row>
        )
    } else {
        return (
            <DataTable.Row 
            onPress={() => {props.navigation.navigate("Försening", {delay:delay})}} 
            key={index}>
              <DataTable.Cell style={{flex: 1}}>{delay.AdvertisedTrainIdent}</DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}>{delay.advertisedTimeShort.time}</DataTable.Cell>
              <DataTable.Cell style={{flex: 1}}><Text style={styles.lateTime}>{delay.estimatedTimeShort.time}</Text></DataTable.Cell>
              <DataTable.Cell style={{flex: 1.5}}>{stationName}</DataTable.Cell>
            </DataTable.Row>
        )
    }
    });

    if(table.length === 0){
        table = <Text style={{textAlign: "center", marginTop: 20, color: "green"}}>Inga förseningar i nuläget!</Text>;
    }

    return (
        <DataTable>
        <DataTable.Header>
                <DataTable.Title style={{flex: 1}}>Tåg-ID</DataTable.Title>
                <DataTable.Title style={{flex: 1}}>Avgång</DataTable.Title>
                <DataTable.Title style={{flex: 1}}>Ny</DataTable.Title>
                <DataTable.Title style={{flex: 1.5}}>Ort</DataTable.Title>
         </DataTable.Header>
        {table}
      
    </DataTable>
    );
}

const styles = StyleSheet.create({
    lateTime: {
        color: "red"
    }
});