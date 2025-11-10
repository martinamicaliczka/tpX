import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList} from 'react-native'
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
        db.collection("posts").orderBy('createdAt', 'desc')
        .onSnapshot((docs) => {
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
                <Text style={styles.subtitulo}>Para ti</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <Post 
                            post={item} 
                            EsHomePage={true} 
                            navigation={this.props.navigation}
                            likeado={false} 
                        />
                    )}
                    style={styles.post }
                    contentContainerStyle={{ width: '100%' }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    subtitulo:{
    fontSize: 22,
    marginBottom: 20,
    color:'white',
    textDecorationLine: 'underline',
    textDecorationColor: 'rgb(29, 155, 240)',
    marginTop: 5,
    },
    container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor:'black',
    },
    post:{
        color:'white',
        width: '100%', 
        alignSelf: 'stretch',
    },
})