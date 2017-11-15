import React from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    TextInput
 } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{ label }</Text>
      <TextInput
        autoCorrect={false}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        value={value}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    width: '100%',
    borderColor: '#d970d6',
    borderBottomWidth: 2,
    
  },
  label: {
    padding: 5,
    paddingBottom: 0,
    color: 'black',
    fontSize: 25,
    fontFamily: 'helvetica',
    fontWeight: '700',
    width: '100%',
    backgroundColor: 'transparent',
  },
  input: {
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 2,
    color: 'black',
    fontSize: 18,
    fontFamily: 'helvetica',
    width: '100%',
    
  }
});

export { Input };