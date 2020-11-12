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
export default class TagCalculator extends Component {
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                    <Ionicons style={{alignSelf: 'center', marginLeft: 13}} name="arrow-back" size={40} color={Colors.TEXT_GREY} />
                    <Text style={styles.headerText}>Choose Provider</Text>
                </View>
                <View style={styles.formParent}>
                    <TextInput keyboardType='numeric' style={styles.textInput} placeholderTextColor={Colors.BG_BLACK} placeholder="Amount of bill" />
                    <TextInput keyboardType='numeric' style={styles.textInput} placeholderTextColor={Colors.BG_BLACK} placeholder="Percentage of tip" />
                    <TextInput keyboardType='numeric' style={styles.textInput} placeholderTextColor={Colors.BG_BLACK} placeholder="Number of people" />

                    <TouchableOpacity style={styles.submitBtn}>
                        <Text style={styles.btnText}>Calculate</Text>
                    </TouchableOpacity>
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
        fontSize: 20,
        marginLeft: 30,
        fontWeight: 'bold'
    },
    formParent:{
        width: width / 1.1,
        height: width / 1.1,
        marginTop: (width - 80) / 4,
        backgroundColor: 'snow',
        alignSelf: 'center',
        borderRadius: 15
    },
    textInput:{
        backgroundColor: Colors.BUTTON_ORANGE,
        marginHorizontal: 20,
        borderRadius: 10,
        color: Colors.BG_BLACK,
        fontSize: 20,
        fontWeight: 'bold',
        height: 65,
        paddingHorizontal: 20,
        marginTop: 15
    },
    submitBtn: {
        backgroundColor: Colors.BG_BLACK,
        marginHorizontal: 20,
        height: 65,
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 35
    },
    btnText:{
        color: 'snow',
        fontSize: 23,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})
