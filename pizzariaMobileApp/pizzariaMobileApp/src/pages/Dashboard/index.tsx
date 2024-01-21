import { SafeAreaView,TouchableOpacity,Text,TextInput,StyleSheet } from 'react-native';
import { useContext,useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../contexts/AuthContext';

import { StackParamList } from '../../routes/app.routes';
import { StackNavigationProp } from '@react-navigation/stack';

export default function Dashboard(){
    const navigation = useNavigation<StackNavigationProp<StackParamList>>();

    const { signOut } = useContext(AuthContext);
    const [orderNumber,setOrderNumber] = useState('');

    function handleCreateOrder(){
      if(orderNumber === ''){
        return ;
      }

      navigation.navigate('Order',{ orderNumber: orderNumber, order_id: '5555555'});
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Novo Pedido</Text>
            <TextInput 
              style={styles.input} 
              placeholder='Número da Mesa' 
              keyboardType='numeric'
              placeholderTextColor='#F0F0F0' 
              value={orderNumber}
              onChangeText={setOrderNumber}
            />
            <TouchableOpacity style={styles.button} onPress={handleCreateOrder}>
                <Text style={styles.buttonText}>Abrir Mesa</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        backgroundColor:'#1D1D2E'
    },
    title:{
        fontSize:30,
        fontWeight:'bold',
        color:'#FFF',
        marginBottom:24
    },
    input:{
        width:'90%',
        height:60,
        backgroundColor: '#101026',
        borderRadius:4,
        paddingHorizontal:8,
        textAlign:'center',
        fontSize:22,
        color:'#FFF'
    },
    button:{
        width:'90%',
        height:40,
        backgroundColor:'#3FFFA3',
        borderRadius:4,
        marginVertical:12,
        justifyContent:'center',
        alignItems:'center'
    },
    buttonText:{
        fontSize:18,
        color:'#101026',
        fontWeight:'bold'
    }
});