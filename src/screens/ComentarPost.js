import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { db, auth } from "../firebase/config"
import firebase from "firebase"
import FormComentar from '../components/FormComentar'

export class ComentarPost extends Component {
  constructor(props){
    super(props)
    this.state={
      coments: [],
      loading: true
    }
  }
  componentDidMount(){ 
    let postId = this.props.route.params.postId
    if(!postId){
      this.setState({
        loading: false
      })
      return;
    }
    db.collection('posts')
      .doc(postId)
      .onSnapshot((doc) => {
        let data = doc.data()
        let lista = data && data.coments ? data.coments : []
        this.setState({
          coments: lista,
          loading: false
        })
      })
  }
  agregarComentario(texto){
    let postId = this.props.route.params.postId
    if(postId){
      let nuevoComentario = {
        owner: auth.currentUser.email,
        text: texto,
        createdAt: Date.now()
      }
    db.collection('posts')
      .doc(postId)
      .update({
        coments: firebase.firestore.FieldValue.arrayUnion(nuevoComentario)
      })
    }
  }
  render() {
    return (
      <View>
        <FlatList
          data = {this.state.coments}
          keyExtractor={(item) => String(item.createdAt)}
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
