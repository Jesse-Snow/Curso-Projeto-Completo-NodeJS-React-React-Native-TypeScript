import { View,Text,Button } from 'react-native';
import { useContext } from 'react';

import { AuthContext } from '../../contexts/AuthContext';

export default function Dashboard(){
    const { signOut } = useContext(AuthContext);

    return (
        <View>
            <Text>Dashboard</Text>
            <Button title='Click' onPress={signOut}></Button>
        </View>
    )
}