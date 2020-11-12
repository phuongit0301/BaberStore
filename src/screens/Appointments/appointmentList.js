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
import { connect } from 'react-redux';
import {Appoint} from '../../store/actions/actions'
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('window')
class Appointments extends Component {
    state = {

    }
    componentDidMount(){
        database().ref(`Bookings/${this.props.userdata.uid}`).once('value').then((snapshot)=>{
            console.log(snapshot.val())
            this.setState({
                services: snapshot.val()
            })
        }).catch((e)=>{
            console.log(e)
        })
    }
    onView = (service) => {
        this.props.Appoint(service)
        this.props.navigation.navigate('AppointmentDetails',{name:'AppointmentDetails'})
    }
    onMapAppointments = () => {
        return (
            <View key={Math.random()} style={styles.appoint}>
                <Text style={styles.appointmentText}>An Appointment at <Text style={styles.appointmentText}>{this.state.services.date}</Text></Text>
                <TouchableOpacity onPress={()=>this.onView(this.state.services)} style={styles.viewSection}>
                    <Text style={styles.viewBtn}>View</Text>
                </TouchableOpacity>
            </View>
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
                    <Text style={styles.headerText}>Your Appointments</Text>
                </View>
                <ScrollView contentContainerStyle={styles.listSection}>
                    {
                        this.state.services ? this.onMapAppointments() : null
                    }
                </ScrollView>
            </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userdata: state.UsersReducer.userdata
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Appoint: (apoint)=>(dispatch(Appoint(apoint)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Appointments)


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
    listSection: {
        justifyContent: 'flex-start',
        paddingVertical: 30
    },
    appoint: {
        width: width / 1.2,
        height: 70,
        alignSelf: 'center',
        borderColor: Colors.TEXT_GREY,
        borderWidth: 1,
        marginVertical: 20,
        backgroundColor: Colors.BG_BLACK,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    appointmentText: {
        color: Colors.TEXT_GREY,
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'center',
  
    },
    viewSection: {
        alignSelf: 'center'
    },
    viewBtn: {
        backgroundColor: Colors.BUTTON_ORANGE,
        color: 'snow',
        fontWeight: 'bold',
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15
    }
})
