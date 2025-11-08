import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native'

export class FormComentar extends Component {
  constructor(props){
    super(props)
    this.state={
      comentario: '',
      error: false
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text></Text>
        <TextInput
        keyboardType='default'
        placeholder='Postea tu respuesta'
        onChangeText={text => this.setState({comentario:text})}
        value={this.state.comentario}
        />
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
})

export default FormComentar
