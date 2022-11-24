import { Text, View, ScrollView } from 'react-native';
import { Base } from '../styles';
import { Ionicons } from '@expo/vector-icons';

export default function Favourites() {
    return (
        <ScrollView>
        <View style={Base.base}>
            <Text style={Base.title}>Dagens pollenhalt nära dig:</Text>
            <Text style={Base.percentage}>22%</Text>
        </View>
        <View style={Base.base}>
            <Ionicons name={"leaf"} size={200} color={"green"} />
        </View>
        </ScrollView>
    );
}

