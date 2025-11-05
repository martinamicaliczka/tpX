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
            <Text style={styles.textB}> Crea un post </Text>
            <View style={styles.formContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType='default'
                    placeholder='¿Qué está pensando?'
                    placeholderTextColor='#71767B'
                    onChangeText={(text) => this.setState({post:text})}
                    value={this.state.post}
                />
                <Pressable 
                    style={styles.button}
                    onPress={() => this.Postear(this.state.post)}
                >
                    <Text style={styles.buttonText}> Postear </Text>
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
        paddingHorizontal: 20, 
        paddingTop: 40,
        width: '100%',
        backgroundColor: 'black'
    },
    formContainer: {
        width: '100%', 
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
        marginBottom: 30, 
        fontWeight: 'bold',
        color: 'white',
        marginTop: "35px"
    },
    button: {
        alignSelf: 'flex-end', 
        backgroundColor: '#1D9BF0', 
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25, 
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
})