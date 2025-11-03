import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, TextInput} from 'react-native'
import { db, auth } from '../firebase/config';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    }
  }

  submit(username, password, email){
    console.log(`Creando usuario: ${username} Password: ${password} Email: ${email}`);
    if(username.length > 3 && password.length > 5 && email.includes("@")){
      auth.createUserWithEmailAndPassword(email, password)
      .then((res) => {
        return db.collection('users').add({
        owner: auth.currentUser.email,
        username: username,
        createdAt: Date.now(),
    });
      })
      .then((user) => {
          this.props.navigation.navigate('Login'); //redireccionamos al login
      })
      .catch((err) => {
        console.log(`Error en la creacion de user, err: ${err}`);
      });
    }}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}> Crea tu cuenta </Text>
        <View>
          <TextInput
            style={styles.input}
            keyboardType='username'
            placeholder='Username'
            onChangeText={(text) => this.setState({username:text})}
            value={this.state.username}
          />
          <TextInput
            style={styles.input}
            keyboardType='email-address'
            placeholder='Correo electrónico'
            onChangeText={(text) => this.setState({email:text})}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            keyboardType='password'
            placeholder='Contraseña'
            onChangeText={(text) => this.setState({password:text})}
            value={this.state.password}
            secureTextEntry={true}
          />
          <Pressable 
          onPress={() => this.submit(this.state.username, this.state.password, this.state.email)}
          >
            <Text style={styles.boton}>Siguiente</Text>
          </Pressable>
        </View>
        <Pressable onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.textoNormal}>¿Tenes una cuenta?</Text>
            <Text style={styles.link}>Logueate</Text>
        </Pressable>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'black'
  },
  titulo: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color:'white',
  },
  link: {
    fontSize: 15,
    backgroundColor: '#45484bff',
    width: 300,
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
    color: 'black',
    borderRadius: 13,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderBlockEndColor: '#2F3336',
    color: '#71767B',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 300,
  },
  boton: {
    backgroundColor: '#71767B',
    paddingHorizontal:3,
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 13,
    marginBottom: 10,
  },
  textoNormal:{
    textAlign:'center',
    color: '#71767B',
    paddingBottom: '4px'
  }
});