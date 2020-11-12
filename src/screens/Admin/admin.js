import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    StyleSheet, 
    View ,
    ImageBackground,
    Dimensions,
    TextInput,
    TouchableOpacity
} from 'react-native'
import Colors from '../../themes/colors'
import { ScrollView } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')
export default class Admin extends Component {
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons  name="arrow-back" size={30} color={Colors.TEXT_GREY} />     
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Admin Section</Text>
                </View>
                <ScrollView contentContainerStyle={styles.listSection}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddService',{name:"AddService"})} style={styles.actionArea}>
                        <Text style={styles.label} >Add a Service</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('SetTime',{name:"SetTime"})} style={styles.actionArea}>
                        <Text style={styles.label} >Set your available times</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('AddBarber',{name:"AddBarber"})} style={styles.actionArea}>
                        <Text style={styles.label} >Add Another Barber</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.actionArea}>
                        <Text style={styles.label} >Send Notifications</Text>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={styles.actionArea}>
                        <Text style={styles.label} >Update Profile</Text>
                    </TouchableOpacity> */}
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
        backgroundColor: 'rgba(0, 0,  0, 0.6)'
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
        fontSize: 21,
        marginLeft: 30,
        fontWeight: 'bold'
    },
    listSection: {
        paddingVertical: 40
    },
    actionArea:{
        backgroundColor: 'rgba(240, 165, 0, 0.4)',
        borderColor: Colors.BUTTON_ORANGE,
        borderWidth: 1,
        height: 80,
        width: width - 80,
        alignSelf: 'center',
        borderRadius: 10,
        justifyContent: 'center',
        marginBottom: 30
    },
    label:{
        color: 'snow',
        fontSize: 21,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})
