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
import { ScrollView } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import { connect } from 'react-redux';
import {AddBooking} from '../../store/actions/actions';

const {width, height} = Dimensions.get('window')
class ChooseProvider extends Component {
    state = {
        providers: null
    }
    componentDidMount(){
        database().ref('Users').once('value').then(snapshot => {
            let barbers = Object.values(snapshot.val()).filter((barber)=>{
                return barber.isBarber == true
            })
            this.setState({
                providers: barbers
            })
          });
    }
    onChooseProvider = (uid) => {
        this.props.AddBooking({
            ...this.props.booking,
            provider: uid
        })
        this.props.navigation.navigate('DatePicker',{name:'DatePicker'})
    }
    render() {
        const mapBarbers = () => {
            let validBarber = this.state.providers.filter((provider)=>{
                return provider.availableTimes != undefined
            })
            return validBarber.map((barber)=>{
                return (
                    <TouchableOpacity key={Math.random()} onPress={()=> this.onChooseProvider(barber)} style={styles.provider}>
                        <Image source={{uri: barber.photoURL}} style={styles.providerImage} />
                        <Text style={styles.name}>{barber.displayName}</Text>
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
                    <Text style={styles.headerText}>Choose Provider</Text>
                </View>
                <ScrollView contentContainerStyle={styles.main}>
                    {
                        this.state.providers ? mapBarbers () : null
                    }
                </ScrollView>
                
            </View>
            </ImageBackground>
        )
    }
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
export default connect(mapStateToProps, mapDispatchToProps)(ChooseProvider)

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
    main:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    provider: {
        width: width / 2.4,
        height: width / 2,
        backgroundColor: Colors.BUTTON_ORANGE,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 20
    },
    providerImage: {
        width: "100%",
        height: "60%",
        resizeMode: "cover",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15
    },
    name: {
        color: 'snow',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: "center",
        marginTop: 15,
        textAlign: "center"
    }
})
