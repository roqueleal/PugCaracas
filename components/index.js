import React, { Component } from 'react';
import { 
    Dimensions
 } from 'react-native';
import {StackNavigator} from 'react-navigation';
import {CardStackStyleInterpolator} from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

const {width, height} = Dimensions.get('window');

// Vistas
import App from './App';
import Dashboard, { dashboard } from './Dashboard';

// estilos transiciones

export const fromTopBottom = (index, position) => {
    const inputRange = [0, index, index + 0.80, index + 1];
    const opacity = position.interpolate({
        inputRange,
        outputRange: [1,1,1,1]
    })
    const translateY = position.interpolate({
        inputRange,
        outputRange:[height, 0, 0, 0]
    })

    return {
    opacity,
    transform:[
        {translateY}
        ]
    }
}

//Transiciones conf
const transConfig = () => {
    return {
        screenInterpolator: (sceneProps) => {
            const {position, scene} = sceneProps;
            const {index, route} = scene;
            const params = route.params || {}
            const transition = params.transition || 'default';

        return {
            // lista de transiciones
            default: CardStackStyleInterpolator => forHorizontal(sceneProps),
            fromTopBottom: fromTopBottom(index, position)
              } [transition]
            }
        }
    }

//Scenes
let scenes = {
Home: {
    screen: App
    },

Dashboard: {
    screen: dashboard
    }
}

const Stack = StackNavigator(scenes, {
    transitionConfig: transConfig
})


export default Stack;