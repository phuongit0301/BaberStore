import React, { Component } from 'react'
import { 
    Text, 
    StyleSheet, 
    View,
    Dimensions, 
    ImageBackground,
    TouchableOpacity, Alert, Image, BackHandler
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Colors from '../../themes/colors'
import auth from "@react-native-firebase/auth"
import { connect } from 'react-redux'


const {width, height} = Dimensions.get('window')
class Home extends Component {

    componentDidMount(){

    }
    onAdminPress = () => {
        if(this.props.userdata.isBarber){
            this.props.navigation.navigate('Admin',{name:'Admin'})
        } else {
            Alert.alert(
                'Action Denied',
                "Section Reserved for Barbers only",
                [
                    { text: 'UnderStood', onPress: () => console.log('understood') },
                ]
            )
        }
    }
    render() {
        console.log(this.props.userdata)
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../../assets/barber2.jpg')} style={styles.header}>

                </ImageBackground>
                <ScrollView contentContainerStyle={styles.main}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('AppointmentAction',{name:'AppointmentAction'})} style={styles.menuItem}>
                        <Image source={require('../../../assets/gallery.png')} style={styles.icon}/>
                        <Text style={styles.tag}>Appointments</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Notifications',{name:'Notifications'})} style={styles.menuItem}>
                    <Image source={require('../../../assets/notifications.png')} style={styles.icon}/>
                        <Text style={styles.tag}>Push Notifications</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Contact',{name:'Contact'})} style={styles.menuItem}>
                    <Image source={require('../../../assets/contact.png')} style={styles.icon}/>
                        <Text style={styles.tag}>Contact</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('Gallery',{name:'Gallery'})} style={styles.menuItem}>
                    <Image source={require('../../../assets/gallery.png')} style={styles.icon}/>
                        <Text style={styles.tag}>Imagini</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Profile',{name:'Profile'})} style={styles.menuItem}>
                    <Image source={require('../../../assets/profile.png')} style={styles.icon}/>
                        <Text style={styles.tag}>Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('QrVerify',{name:'QrVerify'})} style={styles.menuItem}>
                    <Image source={require('../../../assets/qr.png')} style={styles.icon} />
                        <Text style={styles.tag}>Scan Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.onAdminPress()} style={styles.menuItem}>
                    <Image source={require('../../../assets/lock.png')} style={styles.icon} />
                        <Text style={styles.tag}>Barbers</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate('Topics',{name:'Topics'})} style={styles.menuItem}>
                    <Image source={require('../../../assets/post.png')} style={styles.icon} />
                        <Text style={styles.tag}>Topics</Text>
                    </TouchableOpacity> */}
                </ScrollView>
            </View>
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

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.BG_BLACK
    },
    header: {
        width: width,
        height: height / 4,
        marginBottom: 50
    },
    main:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 15,
        justifyContent: 'space-around',
        paddingTop: 30
    },
    menuItem:{
        backgroundColor: 'snow',
        width: (width / 2) - 40,
        height: (width / 2) - 50,
        marginBottom: 20,
        justifyContent: 'center'
    },
    tag:{
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center'
    },
    icon: {
        alignSelf: 'center',
        width: 70,
        height: 70
    }
})
