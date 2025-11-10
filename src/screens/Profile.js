import React, { Component } from 'react'
import { Text, View, Pressable, StyleSheet, Image, FlatList, ActivityIndicator} from 'react-native'
import { db, auth } from "../firebase/config"
import Post from '../components/Post';

export default class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            username: "",
            email: "",
            posteosUser:[],
            error: "",
            loadingU: true,
            loadingP: true,
        }
    }
    componentDidMount(){
        console.log("Obteniendo datos del usuario...");
        if(!auth.currentUser){
            this.setState({
                error: "No estas logueado",
                loadingU: false,
                loadingP: false
            })
            this.props.navigation.navigate("Login")
            return
        }
        db.collection("users")
        .where("owner", "==", auth.currentUser.email)
        .onSnapshot((docs)=>{
            docs.forEach((doc)=>{
                if(doc.exists){
                let userData= doc.data()
                this.setState({
                    username: userData.username,
                    email: userData.owner,
                    loadingU: false
                })
            }
            })
        })
        db.collection("posts")
        .where("owner", "==", auth.currentUser.email)
        .orderBy('createdAt', 'desc')
        .onSnapshot((docs)=>{
            let posteos= []
            docs.forEach((doc)=>{
                posteos.push({
                    id: doc.id, 
                    data: doc.data(),
                })
            })
            this.setState({
                posteosUser: posteos,
                loadingP: false
            })
        })
    }
    desloguearse(){
        auth.signOut()
        .then(()=>{
            this.props.navigation.navigate("Login")
        })
        .catch((error) => {
            console.log(error);
            this.setState({ 
                error: 'Error al cerrar sesión.' 
            });
        });
    }
    render() {
    return (
        <View style={styles.screenContainer}>
        {this.state.loadingP && this.state.loadingU ? (
        <ActivityIndicator size="large" color="white" />) 
        : 
        null
        }
        <View style={styles.headerContainer}>
            <View style={styles.headerTopRow}>
            <Image
                source={{ uri: "https://picsum.photos/seed/picsum/200" }}
                style={styles.profileImage}
            />
            <Pressable
                style={styles.logoutButton}
                onPress={() => this.desloguearse()}
            >
                <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>
            </View>
                <Text style={styles.username}>{this.state.username}</Text>
                <Text style={styles.email}>{this.state.email}</Text>
                <Text style={styles.postsTitle}>Posts</Text>
        </View>
        {this.state.error ? (
            <Text style={styles.errorText}>{this.state.error}</Text>
        ) 
        :
        null
        }
        {this.state.posteosUser.length === 0 ? (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No tenés posts todavía</Text>
            </View>)
            :
            (<FlatList
                data={this.state.posteosUser}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Post
                    post={item}
                    navigation={this.props.navigation}
                    EsHomePage={false}
                    likeado={true}
                    />
                )}
            style={styles.list}
            />
            )
        }
        </View>
    )
}
}
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: '#000000',
    },
    list: {
        flex: 1,
    },
    headerContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#2F3336',
    },
    headerTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 12,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#FFFFFF',
        backgroundColor: '#2F3336', 
    },
    logoutButton: {
        borderWidth: 1,
        borderColor: '#536471',
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
        color: '#8B98A5',
        fontSize: 16,
        marginBottom: 16,
    },
    postsTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    emptyContainer: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    emptyText: {
        color: '#8B98A5',
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    }
});