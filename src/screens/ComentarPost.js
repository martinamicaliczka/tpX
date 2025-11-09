import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { db } from "../firebase/config"
import firebase from "firebase"
import FormComentar from '../components/FormComentar'

export class ComentarPost extends Component {
  constructor(props){
    super(props)
    this.state={
      comentarios: [],
      loading: true
    }
  }
  componentDidMount(){ 
    let postId = this.props.route.params.postId
    if(!postId){
      this.setState({
        loading: false
      })
    }
    db.collection('post')
      .doc(postId)
      .onSnapshot((doc) => {
        let data = doc.data()
        let lista = data && data.comentarios ? data.comentarios : []
        this.setState({
          comentarios: lista,
          loading: false
        })
      })
  }
  agregarComentario(texto){
    if(!postId){
      let nuevoComentario = {
        owner: auth.currentUser.email,
        text: texto,
        createdAt: Date.now()
      }
    db.collection('post')
      .doc(postId)
      .update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(nuevoComentario)
      })
    }
  }
  render() {
    return (
      <View>
        <Text> comentar post </Text>
        <FlatList
          data = {this.state.comentarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.owner}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />
        <FormComentar onEnviar={(texto) => this.agregarComentario(texto)} />
      </View>
    )
  }
}

export default ComentarPost
