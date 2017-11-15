import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

const dashboard = () => {
    return (
      <View style={styles.container}>
        <Text>
          Hola!
        </Text>
        <Text>
          Este será nuestro dashboard
        </Text>
      </View>
    )
  };

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


export { dashboard };