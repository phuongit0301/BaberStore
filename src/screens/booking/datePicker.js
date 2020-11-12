import React, { Component, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    StyleSheet, 
    View ,
    ImageBackground,
    Dimensions,
    TextInput,
    TouchableOpacity, 
    Image,
    ScrollView, Alert
} from 'react-native'
import Colors from '../../themes/colors'
import {  } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import {AddBooking} from '../../store/actions/actions';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('window')
function DatePicker (props) {

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [isActive, setIsActive] = useState('')

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  console.log(date)

  const onTimeChoose = (time) => {
      setIsActive(time)
      console.log(isActive)
  }
//   console.log(props.booking)
 const onConfirm = () => {
     if(isActive == ''){
         Alert.alert(
             "Please Select time",
             "Time for service must be selected before proceeding"
         )
     } else {
        database().ref(`Bookings/${props.userdata.uid}`).set({
            service: props.booking.serviceName,
            provider: props.booking.provider.uid,
            date: new Date(date).toISOString().split('T')[0],
            time: isActive
        }).then(()=>{
            props.navigation.navigate('Success',{name: 'Success'})
        }).catch((e)=>{
            console.log(e)
        })
     }
 
 }
 const onMapTimes = () => {
    return props.booking.provider.availableTimes.times.map((time)=>{
        return (
            <TouchableOpacity key={Math.random()} onPress={()=>onTimeChoose(time)}>
                <Text style={{...styles.time, backgroundColor: isActive == time ? Colors.BUTTON_ORANGE : 'transparent'}}>{time}</Text>
            </TouchableOpacity>
        )
    })
 }
 console.log(props.booking)
    return (
        <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.headerSection}>
                    <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons  name="arrow-back" size={30} color={Colors.TEXT_GREY} />     
                    </TouchableOpacity>
                <Text style={styles.headerText}>Choose Date</Text>
            </View>
            <ScrollView contentContainerStyle={styles.main}>
                <TouchableOpacity onPress={showDatepicker} style={styles.dateBtn}>
                    <Text style={styles.guide}>Tap To Choose Date</Text>
                </TouchableOpacity>
                <Text style={{...styles.guide, marginTop: 20}}>ON: {new Date(date).toISOString().split('T')[0]}</Text>
                <View style={styles.providers}>
                    <View style={styles.provider}>
                        <Text style={styles.name}>{props.booking.provider.displayName}'<Text style={{...styles.name, textTransform: 'lowercase', fontWeight: 'normal'}}>s available times</Text></Text>
                        <View style={styles.timesS}>
                            {
                                props.booking ? onMapTimes () : null
                            }
                        </View>
                    </View>

                </View>
                <TouchableOpacity onPress={()=> onConfirm()} style={{...styles.dateBtn,marginTop: 20, marginBottom: 40}}>
                    <Text style={styles.guide}>Confirm</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    />
                )}
            </ScrollView>
            
        </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
        userdata: state.UsersReducer.userdata,
        booking: state.UsersReducer.booking
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddBooking: (booking)=>(dispatch(AddBooking(booking)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DatePicker)


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
        fontSize: 20,
        marginLeft: 30,
        fontWeight: 'bold'
    },
    dateBtn:{
        backgroundColor: Colors.BUTTON_ORANGE,
        height: 70,
        width: width / 1.5,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'center',
        marginTop: 40
    },
    guide:{
        color: 'snow',
        fontSize: 23,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    providers:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50
    },
    name:{
        color: 'snow',
        fontSize: 23,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    time:{
        color: 'snow',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 8,
        borderColor: Colors.BUTTON_ORANGE,
        borderWidth: 2,
        borderRadius: 8,
        padding: 8
    },
    provider:{
        padding: 13,
        alignItems: 'center'
    },
    timesS:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10
    }
})
