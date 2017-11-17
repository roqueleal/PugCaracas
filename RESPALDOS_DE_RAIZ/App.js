/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { 
  AppRegistry,
  ActivityIndicator, 
  StyleSheet, 
  Text, 
  ImageBackground,
  View,
  Alert,
  TouchableHighlight
} from 'react-native';

import * as firebase from 'firebase';
import { Input } from './components/Input';
import { Button } from './components/Button';
import { Dashboard } from './components/Dashboard';

export default class App extends React.Component {
  state = {
    email: '',
    password: '',
    authenticating: false,
    user: null,
    error: '',
  }

  componentWillMount() {
    const firebaseConfig = {
      apiKey: 'AIzaSyAOvRIlhGovNCCzRJcp_NQkRlsCqMTE3u0',
      authDomain: 'pugcaracas-31ec4.firebaseapp.com',
    }

    firebase.initializeApp(firebaseConfig);
  }

  onPressSignIn() {
    this.setState({
      authenticating: true,
    });

    const { email, password } = this.state;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => this.setState({
        authenticating: false,
        user,
        error: '',
      }))
      .catch(() => {
        // Login was not successful

      firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {
          return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
        });
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => this.setState({
            authenticating: false,
            user,
            error: '',
          }))
          .catch(() => this.setState({
            authenticating: false,
            user: null,
            error: 'Autentificación Fallida',
          }))
      })
  }

  onPressLogOut() {
    firebase.auth().signOut()
      .then(() => {
        this.setState({
          email: '',
          password: '',
          authenticating: false,
          user: null,
        })
      }, error => {
        console.error('Error de registro', error);

      });
  }

  renderCurrentState() {
    if (this.state.authenticating) {
      return (
        <View style={styles.form}>
          <ActivityIndicator size='large' />
        </View>
      )
    }

    if (this.state.user !== null) {
      return (
        <View style={styles.form}>
         <TouchableHighlight>Bienvenido</TouchableHighlight>
          <Button
          onPress={ () => this.onPressLogOut()}>
          Salir</Button>
        </View>
      )
    }

    return (
      <View style={styles.form}>
        <Input
          placeholder='Registre su Correo...'
          label='Email'
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Input
          placeholder='Registre su contraseña...'
          label='Contraseña'
          secureTextEntry
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        
        <Button onPress={
        ()=> this.onPressSignIn()
      <Alert.alert(``,
        'Bienvenido a Centinela',
         [{text: 'Cancelar', onPress: () => this.onPressLogOut()},
          {text: 'OK', onPress: () => console.log('OK Pressed')}]
          )
      }
      >Entrar</Button>
        <Text>{this.state.error}</Text>
      </View>
    )
    
  }

  render() {
    return (
      <ImageBackground source={{uri:'/Users/roqueleal/pugcaracas/components/images/fondo.jpg'}}style={styles.container}>      
      <View style={styles.container}>
        {this.renderCurrentState()}
      </View>
      </ImageBackground>
    );
  }
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    
    
  },
  form: {
    flex: 1,
    
  }
});


AppRegistry.registerComponent('pugcaracas', () => App);
