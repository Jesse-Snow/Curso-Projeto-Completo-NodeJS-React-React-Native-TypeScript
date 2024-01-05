import { View, Text,StyleSheet,Image,TextInput,TouchableOpacity, Alert} from 'react-native';

import { useState } from 'react';

export default function SignIn(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    function handleButton(){
        Alert.alert('email:' + email + ', senha:' + password);
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../../assets/logo.png')}/>

            <View style={styles.inputContainer}>
                <TextInput 
                  placeholder='Digite seu email'
                  style={styles.input}
                  placeholderTextColor='#F0F0F0'
                  onChangeText={(text) => setEmail(text)}
                  value={email}
                />

                <TextInput 
                  placeholder='Digite sua Senha'
                  style={styles.input}
                  placeholderTextColor='#F0F0F0'
                  secureTextEntry={true}
                  onChangeText={(text) => setPassword(text)}
                  // também pode ser onChangeTex(setPassword)
                  value={password}
                />

                <TouchableOpacity 
                  style={styles.button}
                  onPress={handleButton}
                >
                    <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1D1D2E'
    },
    logo:{
        marginBottom:18
    },
    inputContainer:{
        width:'95%',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:32,
        paddingHorizontal:14
    },
    input:{
        width:'95%',
        height:40,
        backgroundColor:'#101026',
        marginBottom:12,
        borderRadius:4,
        paddingHorizontal:8,
        color:'#FFF'
    },
    button:{
        backgroundColor:'#3fffa3',
        width:'95%',
        height:40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4
    },
    buttonText:{
        fontSize:18,
        fontWeight:'bold',
        color:'#101026'
    }
});