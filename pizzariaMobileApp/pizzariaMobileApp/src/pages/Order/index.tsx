import React from 'react';
import { View,Text,StyleSheet } from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';

type RouteDetailParams = {
    Order: {
        orderNumber: string | number,
        order_id: string
    }
};

type OrderRouteProps = RouteProp<RouteDetailParams>;

export default function Order(){
    const route = useRoute<OrderRouteProps>();
    return(
        <View style={styles.container}>
            <Text>Tela Order</Text>
            <Text>{route.params.orderNumber}</Text>
            <Text>{route.params.order_id}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    }
})