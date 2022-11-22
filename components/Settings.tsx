import { Text, View, ScrollView } from 'react-native';
import { Base } from '../styles';

export default function Settings() {


    return (
        <ScrollView>
        <View style={Base.base}>
            <Text style={Base.title}>Välkommen</Text>
        </View>
        <View style={Base.base}>
            <Text style={Base.title}>Välkommen</Text>
        </View>
        </ScrollView>
    );
}

