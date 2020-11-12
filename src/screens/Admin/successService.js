import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    StyleSheet, 
    View ,
    ImageBackground,
    Dimensions,
    TextInput,
    TouchableOpacity, Image
} from 'react-native'
import Colors from '../../themes/colors'

const {width, height} = Dimensions.get('window')
export default class SuccessService extends Component {
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons  name="arrow-back" size={30} color={Colors.TEXT_GREY} />     
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Thank You</Text>
                </View>
                <View style={styles.inputSection}>
                    <View style={styles.form}>
                        <View style={styles.succes}>
                            <Image style={{alignSelf: 'center'}} source={require('../../../assets/tick.png')} />
                        </View>
                        <Text style={styles.successText}>Data added Successfully</Text>
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Admin',{name:'Admin'})} style={styles.signUpButton}>
                            <Text style={styles.btnText}>Back to Admin</Text>
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
        fontSize: 21,
        marginLeft: 30,
        fontWeight: 'bold'
    },
    inputSection: {
        justifyContent: "space-between",
        backgroundColor: Colors.BG_BLACK,
        marginHorizontal: 20,
        borderRadius: 14,
        marginTop: (height - 80) / 6,
        paddingTop: 10
    },
    form: {
        alignSelf: 'center',
        color: 'snow'
    },
    succes: {
        width: width / 2,
        height: width / 2,
        backgroundColor: Colors.BUTTON_ORANGE,
        borderRadius: width / 4,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    successText: {
        alignSelf: 'center',
        color: "snow",
        fontSize: 23,
        // marginLeft: 30,
        fontWeight: 'bold',
        marginHorizontal: 10,
        alignSelf: 'center',
        marginVertical: 15
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
    btnText:{
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'snow'
    }
})
