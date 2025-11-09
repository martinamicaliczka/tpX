import React, { Component } from 'react'
import { Text, View } from 'react-native'

export class ComentarPost extends Component {
  constructor(props){
    super(props)
    this.state={
      comentario: '',
      error: false
    }
  }
  componentDidMount(){

  }
  render() {
    return (
      <View>
        <Text> comentar post </Text>
      </View>
    )
  }
}

export default ComentarPost
