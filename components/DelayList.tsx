import { Text, View, StyleSheet} from 'react-native';
import { DataTable } from "react-native-paper";
import { useEffect, useState } from 'react';

export default function DelayList({delays, setDelays}: any) {
    
    const table = delays.map((delay: any, index: any) => { 
    let stationName = "N/A";
    if(delay.stationInfo != undefined){
        stationName = delay.stationInfo.AdvertisedLocationName;
    }
    return (
        <DataTable.Row key={index}>
          <DataTable.Cell style={{flex: 1}}>{delay.AdvertisedTrainIdent}</DataTable.Cell>
          <DataTable.Cell style={{flex: 1}}>{delay.advertisedTimeShort.slice(5,11)}</DataTable.Cell>
          <DataTable.Cell style={{flex: 1}}><Text style={styles.lateTime}>{delay.estimatedTimeShort.slice(5,11)}</Text></DataTable.Cell>
          <DataTable.Cell style={{flex: 1.5}}>{stationName}</DataTable.Cell>
        </DataTable.Row>
    )
    });

    return (
        <DataTable>
        <DataTable.Header>
                <DataTable.Title>Tåg-ID</DataTable.Title>
                <DataTable.Title>Avång</DataTable.Title>
                <DataTable.Title>Ny</DataTable.Title>
                <DataTable.Title>Ort</DataTable.Title>
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