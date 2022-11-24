import { Text, View, ScrollView } from 'react-native';
import { Base } from '../styles';
import { Ionicons } from '@expo/vector-icons';
import DelayList from './DelayList';

export default function Delays({delays, setDelays}: any) {


    return (
        <ScrollView>
        <View style={Base.base}>
            <Text style={{fontSize:20}}>Alla förseningar</Text>
            <DelayList delays={delays} setDelays={setDelays}/>
        </View>
        </ScrollView>
    );
}

