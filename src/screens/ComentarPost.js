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
      loading: true,
      ownerPost: '',
      desc: '',
      createdAt: ''
    }
  }
  componentDidMount(){ 
    let postId = this.props.route.params.postId
    if(!postId){
      this.setState({
        loading: false
      })
    }
    db.collection('posts')
      .doc(postId)
      .onSnapshot((doc) => {
        const data = doc.data()
        let lista = data && data.coments ? data.coments : []
        this.setState({
          coments: lista,
          ownerPost: data.owner,
          desc: data.desc,
          createdAtPost: data.createdAt,
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
      <View style={styles.container}>
        <View>
          <Text style={styles.texto}>{this.props.ownerPost}</Text>
          <Text style={styles.texto}>{this.props.desc}</Text>
          <Text style={styles.texto}>{new Date(this.props.createdAtPost).toLocaleDateString()}</Text>
        </View>
        <FormComentar onEnviar={(texto) => this.agregarComentario(texto)} />
        <FlatList
          data={this.state.coments}
          keyExtractor={(item) => String(item.createdAt)}
          renderItem={({ item }) => (
            <View style={styles.comentsContainer}>
              <Text style={styles.owner}>{item.owner}</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    width: '100%',
    flex: 1,
    paddingTop: '20%',
    paddingHorizontal: 20, 
    paddingTop: 40,
    backgroundColor: 'black'
  },
  comentsContainer:{
    backgroundColor: 'black',         
    borderBottomWidth: 1,            
    borderColor: '#2F3336',       
    paddingVertical: 10,             
    paddingHorizontal: 15,
  },
  owner:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginBottom: 2,
  },
  text:{
     color: 'white',
      fontSize: 15,
      lineHeight: 20,
  },
  texto:{
    color:"white"
  }
})

export default ComentarPost
