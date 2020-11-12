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
import { connect } from 'react-redux';


const {width, height} = Dimensions.get('window')
class AppointmentAction extends Component {
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons  name="arrow-back" size={30} color={Colors.TEXT_GREY} />     
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Manage Appointments</Text>
                </View>
                <View style={styles.appLogo}>

                </View>
                <Text style={styles.sectText}>Appointments</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Appointments',{name:'Appointments'})} style={styles.signUpButton}>
                        <Text style={styles.btnText}>Booked Appointments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('ChooseServices',{name:'ChooseServices'})} style={styles.loginButton}>
                        <Text style={styles.btnText}>Book Now </Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentAction)
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
    appLogo:{
        // width: width / 1.3,
        height: width / 2.3,
        // backgroundColor: Colors.BG_BLACK,
        alignSelf: 'center',
        borderRadius: 20,
        paddingHorizontal: 25,
        justifyContent: 'space-between',
        paddingVertical: 50
    },
    signUpButton:{
        alignSelf: 'center', 
        width:  width / 1.2,
        backgroundColor: 'snow',
        borderRadius: 13,
        paddingVertical: 10,
        marginBottom: 25,
        marginTop: 20
    },
    loginButton:{
        alignSelf: 'center', 
        width:  width / 1.2,
        backgroundColor: Colors.BUTTON_ORANGE,
        borderRadius: 13,
        paddingVertical: 10
    },
    btnText:{
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.BG_BLACK,
    },
    detailText: {
        color: "snow",
        fontSize: 23,
        fontWeight: 'bold',
        alignSelf: "center"
    },
    sectText: {
        alignSelf: 'center',
        color: "snow",
        fontSize: 25,
        marginLeft: 30,
        fontWeight: 'bold',
        borderBottomColor:'snow',
        borderBottomWidth: 3,
        paddingBottom: 3
    }
})
