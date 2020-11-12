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
import database from '@react-native-firebase/database';
import { connect } from 'react-redux';
import {AddBooking} from '../../store/actions/actions'

const {width, height} = Dimensions.get('window')
class ChooseServices extends Component {
    state = {
        services: null
    }
    componentDidMount(){
        database().ref('Services').once('value').then(snapshot => {
            this.setState({
                services: Object.values(snapshot.val())
            })
          });
    }
    onServiceChoice = (name) => {
        let booking = {
            serviceName: name
        }
        console.log(booking)
        this.props.AddBooking(booking)
        setTimeout(()=>{
            this.props.navigation.navigate('ChooseProvider',{name:'ChooseProvider'})
        }, 700)
    }
    render() {
        const mapServices = () => {
            return this.state.services.map((service)=>{
                return (
                    <TouchableOpacity key={Math.random()} onPress={()=> this.onServiceChoice(service.name)} style={styles.service}>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <View style={styles.secondSec}>
                            <Text style={styles.sectText}>{service.duration}</Text>
                            <Text style={styles.sectText}>{service.price}</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons  name="arrow-back" size={30} color={Colors.TEXT_GREY} />     
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Chooose Service</Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 50, paddingTop: 50}}>
                    {
                        this.state.services ? mapServices() : null
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
        AddBooking: (booking)=>(dispatch(AddBooking(booking)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChooseServices)


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
    btnText:{
        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: Colors.BG_BLACK,
    },
    service: {
        borderTopColor: Colors.TEXT_GREY,
        borderTopWidth: 1,
        backgroundColor: Colors.BG_BLACK,
        paddingVertical: 10,
        paddingHorizontal: 25
    },
    secondSec: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal:0,
        marginTop: 20
    },
    sectText: {
        color : 'snow',
        fontWeight: 'bold',
        fontSize: 20
    },
    serviceName: {
        color : 'snow',
        fontWeight: 'bold',
        fontSize: 20
    }
})
