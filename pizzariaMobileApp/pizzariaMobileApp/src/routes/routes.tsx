import { View,ActivityIndicator } from 'react-native';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';



function Routes(){
    const isAuthenticated = false;
    const loading = true;

    if(loading){
        return (
            <View
              style={{
                flex:1,
                justifyContent:'center',
                alignItems:'center',
                backgroundColor:'#1D1D2E'
              }}
            >
              <ActivityIndicator size={60} color='#FFF' />
            </View>
        )
    }

    return (
       isAuthenticated ? <AppRoutes /> : <AuthRoutes />
    )
}

export default Routes;