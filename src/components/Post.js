import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather';
import { db, auth } from "../firebase/config"
import firebase from "firebase"

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            likes: this.props.post.data.likes,
            likeado: this.props.post.data.likes.includes(auth.currentUser.email)
        }
    }
    comentarPost(){
        this.props.navigation.navigate('TabNavigator', {
                screen: 'MiniTabNavigator',
                    params: { screen: 'ComentarPost' }
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
            <View>
                <Text style={styles.postText}>{this.props.post.data.desc}</Text>
                <Text style={styles.date}>{new Date(this.props.post.data.createdAt).toLocaleDateString()}</Text>
                <View style={styles.actionsContainer}>
                <Pressable 
                    style={styles.comentar}
                    onPress={() => this.comentarPost()}>
                <Feather name="message-square" size={24} color="white" style={styles.comment} />
                </Pressable>
                <Pressable onPress={() => this.state.likeado ? 
                            this.quitarLikePost(this.props.post.id) 
                            : 
                            this.likearPost(this.props.post.id)}
                        >
                            <Text style={styles.likeText}>
                                Me gusta {this.props.post.data.likes.length}
                            </Text>
                        </Pressable>
                    </View>
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
        marginTop: 8,
        gap: 20, 
    },
    comment:{
        color: "white", 
    },
    likeText:{
        color:'rgb(1 184 255)',
        fontWeight: "bold",
        fontSize: 14, 
    }
});