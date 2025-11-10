import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator, StyleSheet } from 'react-native'
import { db, auth } from "../firebase/config"
import firebase from "firebase"
import FormComentar from '../components/FormComentar'

export class ComentarPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coments: [],
      loading: true,
      ownerPost: '',
      desc: '',
      createdAt: ''
    }
  }
  componentDidMount() {
    let postId = this.props.route.params.postId
    if (!postId) {
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
  agregarComentario(texto) {
    let postId = this.props.route.params.postId
    if (postId) {
      let nuevoComentario = {
        owner: auth.currentUser.email,
        text: texto,
        createdAt: Date.now(),
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
        <View style={styles.respuesta}>
        <View style={styles.postItemContainer}>
          <View style={styles.post}>
            <Text style={styles.ownerPost}>{this.state.ownerPost}</Text>
            <Text style={styles.postText}>{this.state.desc}</Text>
            <Text style={styles.date}> {new Date(this.state.createdAtPost).toLocaleDateString()}</Text>
          </View>
        </View>
        <FormComentar onEnviar={(texto) => this.agregarComentario(texto)} />
        </View>
        <FlatList 
          data={this.state.coments}
          keyExtractor={(item) => String(item.createdAt)}
          renderItem={({ item }) => (
            <View style={styles.comentsContainer}>
              <Text style={styles.owner}>{item.owner}</Text>
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>
          )}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  postItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#2F3336',
    backgroundColor: '#0A0A0A',
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
  },
  post: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
    marginRight: 10,
  },
  postText: {
    color: 'white',
    fontSize: 15,
    lineHeight: 20,
  },
  owner: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginBottom: 2,
  },
  ownerPost: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginBottom: 2,
    color:'#1D9BF0'
  },
  date: {
    color: '#8B98A5',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  comentsContainer: {
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderColor: '#2F3336',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  text: {
    color: 'white',
    fontSize: 15,
    lineHeight: 20,
  },
  respuesta:{
    borderLeftWidth: 2,
    borderColor: '#71767B',
  },
});

export default ComentarPost
