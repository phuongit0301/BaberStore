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
    ScrollView
} from 'react-native'
import Colors from '../../themes/colors'
import {  } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';
import { connect } from 'react-redux';

const {width, height} = Dimensions.get('window')
function SetTime (props) {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('time');
  const [show, setShow] = useState(false);
  const [times, setTimes] = useState([])

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    times.push(currentDate.toLocaleTimeString())
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

  const onTimeChoose = () => {
      setIsActive(!isActive)
      console.log(isActive)
  }
  const mapTimes = () => {
      console.log(times)
      return times.map((time)=>{
          return (
            <Text style={styles.timeS}>At  {time}</Text>
          )
      })
  }
  const onsubmit = () => {
    database().ref(`Users/${props.userdata.uid}/availableTimes`).set({
        times
    }).then(()=>{
        props.navigation.navigate('SuccessService',{name: 'SuccessService'})
    }).catch((e)=>{
        console.log(e)
    })

  }
    return (
        <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
        <View style={styles.wrapper}>
            <View style={styles.headerSection}>
                    <TouchableOpacity onPress={()=> props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons  name="arrow-back" size={30} color={Colors.TEXT_GREY} />     
                    </TouchableOpacity>
                <Text style={styles.headerText}>Choose Available times</Text>
            </View>
            <ScrollView contentContainerStyle={styles.main}>
                <TouchableOpacity onPress={showTimepicker} style={styles.dateBtn}>
                    <Text style={styles.guide}>Tap To Choose Times</Text>
                </TouchableOpacity>
                <View style={styles.providers}>
                    {
                        times[0] ? mapTimes () : null
                    }
                </View>
                <TouchableOpacity onPress={()=>onsubmit()} style={{...styles.dateBtn,marginTop: 20, marginBottom: 40}}>
                    <Text style={styles.guide}>Submit</Text>
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
        userdata: state.UsersReducer.userdata
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        Appoint: (apoint)=>(dispatch(Appoint(apoint)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SetTime)

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
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 50,
        paddingHorizontal: 30
    },
    name:{
        color: 'snow',
        fontSize: 23,
        fontWeight: 'bold'
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
    timeS:{ 
        color: 'snow',
        fontSize: 23,
        fontWeight: 'bold',
        borderColor: Colors.BUTTON_ORANGE,
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 10,
        padding: 10
    }
})
