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

const {width, height} = Dimensions.get('window')
export default class Confirm extends Component {
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                    <Ionicons style={{alignSelf: 'center', marginLeft: 13}} name="arrow-back" size={40} color={Colors.TEXT_GREY} />
                    <Text style={styles.headerText}>Confirm</Text>
                </View>
                <View style={styles.inputSection}>
                    <View style={styles.form}>
                        <TextInput value="Awais" style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} placeholder="Name" />
                        <TextInput value="youremail@gmail.com" style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} placeholder="Email" />
                        <TextInput value="+91714292389" style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} placeholder="Phone Number" />
                        <TextInput value="Booking notes wrote here, Booking notes wrote here" style={{...styles.textInput, height: 100, fontSize: 18}} placeholderTextColor={Colors.TEXT_GREY} placeholder="Booking Notes" multiline = {true} numberOfLines = {4} />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Success',{name:'Success'})} style={styles.signUpButton}>
                            <Text style={styles.btnText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    inputSection: {
        justifyContent: "space-between",
        backgroundColor: Colors.BG_BLACK,
        marginHorizontal: 20,
        borderRadius: 14,
        marginTop: (height - 80) / 5,
        paddingTop: 10
    },
    form: {
        alignSelf: 'center',
        color: 'snow'
    },
    textInput:{
        color: 'snow',
        borderBottomColor: Colors.TEXT_GREY,
        borderBottomWidth: 2,
        fontSize: 20,
        height: 50,
        width: width /1.5,
        marginBottom: 8
    },
    signUpButton:{
        alignSelf: 'center', 
        width:  width / 1.6,
        backgroundColor: Colors.BUTTON_ORANGE,
        borderRadius: 13,
        paddingVertical: 10,
        marginBottom: 25,
        marginTop: 25
    },
    loginButton:{
        alignSelf: 'center', 
        width:  width / 1.4,
        backgroundColor: Colors.BUTTON_ORANGE,
        borderRadius: 13,
        paddingVertical: 10
    },
    btnText:{
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'snow'
    }
})
