import React, { Component } from 'react'
import { Text, View, TextInput, Pressable, StyleSheet } from 'react-native'
import { db, auth } from '../firebase/config';

export default class Postear extends Component {
    constructor(props) {
    super(props);
    this.state = {
        post: ""
        }
    }
    Postear(posteo){
        if(posteo !== ""){
            db.collection('posts').add({
            owner: auth.currentUser.email,
            createdAt: Date.now(),
            desc: posteo,
            likes: []
        })
        .then((res) => this.props.navigation.navigate("HomePage"))
        .catch((error) => console.log(error))
        }
    }
    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.textB}> Crea un post con lo que estas pensando </Text>
            <View>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='¿Qué está pensando?'
                    onChangeText={(text) => this.setState({post:text})}
                    value={this.state.post}
                />
                <Pressable onPress={() => this.Postear(this.state.post)}>
                    <Text style={styles.text}> Postear </Text>
                </Pressable>
            </View>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: '20%',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'black'
    },
    input: {
        height: 40,
        borderColor: 'black',
        borderBlockEndColor: '#2F3336',
        color: '#71767B',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        width: 300,
    },
    text: {
        fontSize: 15,
        backgroundColor: 'rgba(49, 129, 199, 1)',
        width: 300,
        justifyContent: 'center',
        textAlign: 'center',
        padding: 10,
        color: 'white',
        borderRadius: 5,
    },
    textB: {
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold',
        color:'white',
    },
})