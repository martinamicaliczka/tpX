import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import FormComentar from '../components/FormComentar';
import Post from '../components/Post'
import { db } from '../firebase/config';

export default class HomePage extends Component {
    constructor(props) {
    super(props)
    this.state = {
        posts: []
    }
    }
    componentDidMount(){
        db.collection("posts").orderBy('createdAt', 'desc').onSnapshot((docs) => {
            const posteos=[]
            docs.forEach((doc)=>{
                posteos.push({
                    id:doc.id,
                    data:doc.data()
                })
            })
        this.setState({
            posts: posteos})
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}> Home</Text>
                <Text style={styles.titulo}>Todos los Posteos</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Post post={item} HomePage={true}/>
                    )}
                    style={styles.post }
                    contentContainerStyle={{ alignItems: 'center' }}
                />
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    titulo: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color:'white',
    },
    container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor:'black',
    },
    post:{
        color:'white',
    },
})