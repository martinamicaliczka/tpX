import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, Image, FlatList} from 'react-native'
import Post from '../components/Post';

const MOCK_USER_DATA = {
    username: 'Briana_ML',
    email: 'briana_ml@university.edu',
    profilePic: 'https://picsum.photos/100', // Un placeholder
};

const MOCK_POSTS = [
    { id: '1', text: 'Este es mi primer post en la app.' },
    { id: '2', text: 'Hablando sobre React Native.' },
    { id: '3', text: 'El TP de la facu va avanzando.' },
];

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            username: "",
            email: "",
            imgDefault: "",
            posteosUser:[],
            error: ""
        }
    }
    borrarPost(postId){
        this.setState({
            posteosUser
        })
    }
    render() {
        return (
        <View>
            <Text></Text>
        </View>
        )
    }
}
const styles= StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: '#536471', // Borde gris (como "Edit profile")
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    email: {
        color: '#8B98A5', // Gris para info secundaria
        fontSize: 16,
        marginBottom: 16,
    },
    deleteButton: {
    marginLeft: 16,
    padding: 8,
    },
    deleteButtonText: {
        color: '#8B98A5', // Un color sutil para la 'X'
        fontSize: 18,
        fontWeight: 'bold',
    },
})