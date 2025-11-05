import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'

export default class Post extends Component {
    borrarPost(){
        this.props.onDelete(this.props.post.id);
    };
    render() {
        return (
        <View style={styles.postItemContainer}>
            <Text style={styles.postText}>{this.props.post.data.text}</Text>
                <Pressable
                    style={styles.deleteButton}
                    onPress={() => this.borrarPost()}
                >
                <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    postItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2F3336',
    },
    postText: {
        color: '#FFFFFF',
        fontSize: 16,
        flex: 1,
    },
    deleteButton: {
        marginLeft: 16,
        padding: 8,
    },
    deleteButtonText: {
        color: '#8B98A5',
        fontSize: 18,
        fontWeight: 'bold',
    },
});