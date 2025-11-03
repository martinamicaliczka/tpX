import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'

export default class Post extends Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    borrarPost(){

    }
    render() {
        return (
        <View style={styles.postItemContainer}>
        <Text style={styles.postText}>{post.text}</Text>
            <Pressable
                style={styles.deleteButton}
                onPress={this.borrarPost} // Llama a la confirmación
            >
            <Text style={styles.deleteButtonText}>X</Text>
        </Pressable>
        </View>
        )
    }
}
