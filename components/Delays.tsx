import { Text, View, ScrollView } from 'react-native';
import { Base } from '../styles';
import DelayList from './DelayList';

export default function Delays(props: any) {

    return (
        <ScrollView style={Base.pageContainer}>
        <View style={Base.base}>
            <Text style={{fontSize:20}}>Alla förseningar</Text>
            <Text style={{textAlign: "center", marginTop: 5, marginBottom: 5}}>Klicka på en försening med angiven station för att se promenadkarta.</Text>
            <DelayList navigation={props.navigation} delays={props.delays} setDelays={props.setDelays}/>
        </View>
        </ScrollView>
    );
}

