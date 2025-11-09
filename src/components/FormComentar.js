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
          loading: false
        })
      }
    }   
  }
  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '5%',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'black'
  },
  input: {
        width: '100%', 
        height: 50, 
        color: 'white', 
        borderBottomColor: '#2F3336', 
        borderBottomWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 0,
        fontSize: 18,
        textAlignVertical: 'top', 
    },
     button: {
        alignSelf: 'flex-end', 
        backgroundColor: '#1D9BF0', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, 
    },
})

export default FormComentar
