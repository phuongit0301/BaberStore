import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    StyleSheet, 
    View ,
    ImageBackground,
    Dimensions,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native'
import Colors from '../../themes/colors'
import { ScrollView } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('window')
export default class Notifications extends Component {
    state = {

    }
    componentDidMount () {
        database().ref('Notifications').once('value').then((snapshot)=>{
            console.log(snapshot.val())
            this.setState({
                notifications: snapshot.val()
            })
        })
    }
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons  name="arrow-back" size={30} color={Colors.TEXT_GREY} />     
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Notifications</Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 50, paddingTop: 10}}>
                    <TouchableOpacity style={styles.service}>
                        <Ionicons style={{alignSelf: 'center'}} size={60} color={Colors.BUTTON_ORANGE} name="notifications-outline" />
                        <Text style={{...styles.serviceName, color: 'snow'}}>{this.state.notifications ? this.state.notifications.body : null}</Text>
                        {
                            this.state.notifications ? (
                                <Image style={{width: width / 1.4,marginTop: 15, height: 200, alignSelf: 'center'}} source={{uri: this.state.notifications.imageUrl}} />
                            ) : null
                        }
                    </TouchableOpacity>
                </ScrollView>
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height
    },
    wrapper: {
        flex: 1,
        backgroundColor: 'rgba(0, 0,  0, 0.6)',
        // justifyContent: 'space-between'
    },
    headerSection: {
        flexDirection: 'row',
        height: 80,
        backgroundColor: Colors.BG_BLACK,
        borderBottomColor: Colors.TEXT_GREY,
        borderBottomWidth: 2
    },
    headerText: {
        alignSelf: 'center',
        color: "snow",
        fontSize: 23,
        marginLeft: 30,
        fontWeight: 'bold'
    },
    service: {
        borderTopColor: Colors.TEXT_GREY,
        borderTopWidth: 1,
        backgroundColor: Colors.BG_BLACK,
        paddingVertical: 20,
        paddingHorizontal: 10,
        // flexDirection: 'row',
        justifyContent: 'space-between',
    },
    serviceName: {
        color : 'snow',
        fontWeight: 'normal',
        fontSize: 18,
        alignSelf: 'center'
    }
})
