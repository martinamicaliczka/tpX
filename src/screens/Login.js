import React, { Component } from 'react'
import { Text, View, Pressable, TextInput, StyleSheet } from 'react-native'
import { auth } from '../firebase/config'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state ={
            email: '',
            password: '',
            error: false
        }
    }
    componentDidMount(){
      auth.onAuthStateChanged(user => {
        console.log(`Usuario ya logueado: ${user.email}`)
        this.props.navigation.navigate('HomePage')
      })
    }
    onSubmit(email, password){
        console.log(`Password: ${password} Email: ${email}`)
        if(password.length > 5 && email.includes("@")){
            auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                this.props.navigation.navigate('TabNavigator', {screen: 'HomePage'});
            })
            .catch((err) => {
                console.log(`Error en la creacion de user, err: ${err}`)
            });
        }else {
            this.setState({ error: true });
        }}

    //falta logo de X en Text de Iniciar sesion en 
    render() {
        return (
        <View style={styles.container}> 
            <Text style={styles.titulo}>Iniciar sesión en </Text>
            {this.state.error ? <Text style={styles.error}>El mail o la contraseña ingresada es incorrecta</Text> : null} 
            <TextInput style={styles.input}
                keyboardType='email-address'
                placeholder='Correo electrónico'
                onChangeText={(text) => this.setState({email:text})}
                value={this.state.email}
            />
            <TextInput style={styles.input}
                keyboardType='default'
                placeholder='Contraseña'
                secureTextEntry={true}
                onChangeText={(text) => this.setState({password:text})}
                value={this.state.password}
            />
            <Pressable onPress={() => this.onSubmit(this.state.email, this.state.password)}>
                <Text style={styles.boton}>Iniciar sesión</Text>
            </Pressable>
            <Pressable onPress={() => this.props.navigation.navigate('Register') }>
                <Text style={styles.textoNormal}>¿No tenes una cuenta?</Text>
                <Text style={styles.link} >Crea tu cuenta</Text>
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
    width: 300
  },
  textoNormal:{
    textAlign:'center',
    color: '#71767B',
    paddingBottom: 4
  },
  error:{
    color: 'red'
  }
});
