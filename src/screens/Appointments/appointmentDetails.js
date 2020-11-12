import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    StyleSheet, 
    View ,
    ImageBackground,
    Dimensions,
    TextInput,
    TouchableOpacity, Alert
} from 'react-native'
import Colors from '../../themes/colors'
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('window')
class AppointmentDetail extends Component {
    cancelApointment = () => {
        console.log('canceled')
        database().ref(`Bookings/${this.props.userdata.uid}`).remove().then(()=>{
            this.props.navigation.navigate('Home',{name:'Home'})
        })
    }
    onCancel = () => {
        Alert.alert(
            "Delete AppointMent!",
            "Are you sure you want to delete this appointment?",
            [
                { text: 'Proceed Cancelation', onPress: () => this.cancelApointment() },
                { text: 'Back Home', onPress: () => this.props.navigation.navigate('Home',{name:'Home'}) },
            ]
        )
    }
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons  name="arrow-back" size={30} color={Colors.TEXT_GREY} />     
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Appointment Detail</Text>
                </View>
                <View style={styles.appDetail}>
                    <Text style={styles.detailText}>You have an Appointment at <Text style={{...styles.detailText,color: Colors.BUTTON_ORANGE, fontWeight: 'bold'}}>{this.props.appoint.time}</Text> of <Text style={{...styles.detailText,color: Colors.BUTTON_ORANGE, fontWeight: 'bold'}}>{this.props.appoint.date}</Text>. Don't miss!</Text>
                    <TouchableOpacity onPress={()=> this.onCancel()} style={styles.signUpButton}>
                        <Text style={styles.btnText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userdata: state.UsersReducer.userdata,
        appoint: state.UsersReducer.appoint
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Appoint: (apoint)=>(dispatch(Appoint(apoint)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetail)

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
    appDetail:{
        width: width / 1.3,
        height: width / 1.3,
        backgroundColor: Colors.BG_BLACK,
        alignSelf: 'center',
        borderRadius: 20,
        marginTop:  ( height - 80 ) / 8,
        paddingHorizontal: 25,
        justifyContent: 'space-between',
        paddingVertical: 50
    },
    signUpButton:{
        alignSelf: 'center', 
        width:  width / 1.6,
        backgroundColor: Colors.BUTTON_ORANGE,
        borderRadius: 13,
        paddingVertical: 10,
        marginBottom: 25,
        marginTop: 20
    },
    btnText:{
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'snow'
    },
    detailText: {
        color: "snow",
        fontSize: 23,
        fontWeight: 'normal',
        alignSelf: "center",
        lineHeight: 35
    }
})
