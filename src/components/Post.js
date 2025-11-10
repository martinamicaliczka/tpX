import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { db, auth } from "../firebase/config"
import firebase from "firebase"
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            likes: this.props.post.data.likes,
            likeado: this.props.post.data.likes.includes(auth.currentUser.email)
        }
    }
    componentDidMount() { 
    db.collection("posts")
      .doc(this.props.post.id)
      .onSnapshot(doc => {
        const data = doc.data()
        this.setState({
          likes: data.likes,
          likeado: data.likes.includes(auth.currentUser.email)
        })
      })
}
    comentarPost(){
        let postId = this.props.post.id
        this.props.navigation.navigate('TabNavigator', {
                screen: 'MiniTabNavigator',
                    params:{ 
                        screen: 'ComentarPost',
                        params: {postId}
                    }
        });
    }
    likearPost(postId){
        db.collection("posts")
        .doc(postId)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                likeado: true
            })
            console.log("Like dado");
        })
        .catch(error => console.log(error))
    }
    quitarLikePost(postId){
        db.collection("posts")
        .doc(postId)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                likeado: false
            })
            console.log("Like quitado");
        })
        .catch(error => console.log(error))
    }
    render() {
        return (
        <View style={styles.postItemContainer}>
            <View style={styles.post}>
                <View>
                    <Text style={styles.owner}>{this.props.post.data.owner}</Text>
                </View>
                    <Text style={styles.postText}>{this.props.post.data.desc}</Text>
                    <Text style={styles.date}>{new Date(this.props.post.data.createdAt).toLocaleDateString()}</Text>
                <View style={styles.actionsContainer}>
                    <Pressable 
                        style={styles.likeButtonContainer} 
                        onPress={() => this.state.likeado ? 
                            this.quitarLikePost(this.props.post.id) 
                            : 
                            this.likearPost(this.props.post.id)}
                    >
                        {this.state.likeado ? (
                        <Entypo name="heart" size={16} color={'rgb(224 32 67)'} />
                        ) : (
                        <FontAwesome5 name="heart" size={16} color={'#71767B'} />
                        )}
                        <Text style={ this.state.likeado ? styles.likeTextLiked : styles.likeText }>
                            {this.props.post.data.likes.length}
                        </Text>
                    </Pressable>
                    <Pressable 
                        style={styles.comment}
                        onPress={() => this.comentarPost()}>
                    <Feather name="message-square" size={16} color="white" style={styles.comment} />
                    <Text style={styles.comentText}> {this.props.post.data.coments.length} </Text>
                    </Pressable>
                </View>
            </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    postItemContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 0.5,
        borderColor: '#2F3336',
        backgroundColor: 'black',
        width: '100%',
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
    date: {
        color: '#8B98A5',
        fontSize: 12,
        marginTop: 4,
        textAlign:'right' 
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end', 
        alignItems: 'center',
        gap: 10, 
    },
    comment:{
        color: "#71767B", 
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        font:'bold',
        alignItems: 'center',
    },
    likeButtonContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        gap: 6, 
        paddingRight:3,
    },
    likeText:{
        color:'#71767B',
        fontWeight: "bold",
        fontSize: 14, 
    },
      likeTextLiked: {
        color: 'rgb(224 32 67)',
        textAlign:'right',
        fontWeight: "bold",
        fontSize: 14,
    },
    comentText:{
        color:'#71767B',
        fontWeight: "bold",
        fontSize: 14
    },
});