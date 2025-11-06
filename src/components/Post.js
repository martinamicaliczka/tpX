import React, { Component } from 'react'
import { Text, View, StyleSheet, Pressable } from 'react-native'
import Feather from '@expo/vector-icons/Feather';

export default class Post extends Component {
    borrarPost(){
        this.props.onDelete(this.props.post.id);
    };
    comentarPost(){
        this.props.navigation.navigate('TabNavigator', {
                    screen: 'MiniTabNavigator',
                        params: { screen: 'ComentarPost' }
                        });
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
                <Pressable style={styles.comentar}
                onPress={() => this.comentarPost()}>
                <Feather style={styles.coment}name="message-square" size={24} color="black" />
            </Pressable>
            </View>
            </View>
            {this.props.EsHomePage ? null : (<Pressable
                    style={styles.deleteButton}
                    onPress={() => this.borrarPost()}
                >
                <Text style={styles.deleteButtonText}>X</Text>
            </Pressable>) }
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    postItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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

  deleteButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignSelf: 'flex-start',
  },

  deleteButtonText: {
    color: '#8B98A5',
    fontSize: 16,
    fontWeight: '600',
  },
  coment:{
    color:'white',
    textAlign:'right',
  },
});