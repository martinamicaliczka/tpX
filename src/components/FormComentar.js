import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet, Pressable, ActivityIndicator} from 'react-native'

export class FormComentar extends Component {
  constructor(props){
    super(props)
    this.state={
      comentario: '',
      loading: false,
      error: false
    }
  }
  onSubmit(){
    this.setState({
      loading: true
    })
    if(this.state.comentario.length > 0){
      if(this.props.onEnviar){ //paso comentario a ComentarPost
        this.props.onEnviar(this.state.comentario)
        this.setState({
          comentario: '',
          loading: false,
          error: false
        })
      }
    } else {
      this.setState({
        loading: false,
        error: true
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
        style={styles.input}
        keyboardType='default'
        placeholder='Postea tu respuesta'
        placeholderTextColor='#71767B'
        onChangeText={text => this.setState({comentario:text})}
        value={this.state.comentario}
        />
        <Pressable
          style={styles.button}
          onPress={() => this.onSubmit()}>
          {this.state.loading ? (
            <ActivityIndicator size="large" color="white" />
          ) : (
            <Text style={styles.boton}>Postear</Text>
          )}
        </Pressable>
        <View style={styles.error}>
          {this.state.error &&
          <Text style={styles.textoError}>No puedes enviar un comentario vacío</Text>}
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    paddingHorizontal:12,
  },
  input: {
        width: '100%', 
        height: 50, 
        color: 'white', 
        marginBottom: 20,
        paddingHorizontal: 0,
        fontSize: 18,
        textAlignVertical: 'top', 
    },
    boton: {
        alignSelf: 'flex-end', 
        backgroundColor: '#1D9BF0', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, 
        fontWeight:'bold',
        color:'white'
    },
    error: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black'
    },
    textoError: {
      color: 'red'
    }
})

export default FormComentar