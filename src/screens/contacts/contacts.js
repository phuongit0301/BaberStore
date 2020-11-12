import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    StyleSheet, 
    View ,
    ImageBackground,
    Dimensions,
    TextInput,
    Linking,
    TouchableOpacity, Image
} from 'react-native'
import Colors from '../../themes/colors'
import { ScrollView } from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window')
export default class Contact extends Component {
    render() {
        const onWhatsapp = () => {
            let url =
            "whatsapp://send?text=" +
            "Hello from Barber App" +
            "&phone=91" +
            254714292389;
          Linking.openURL(url)
        }
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons  name="arrow-back" size={30} color={Colors.TEXT_GREY} />     
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Contacti</Text>
                </View>
                <View style={styles.logosection}>

                </View>
                <ScrollView contentContainerStyle={styles.main}>
                   <TouchableOpacity style={styles.contactMedium}>
                        <Image style={{width: 50, height:50,alignSelf: 'center',marginLeft: 7}} source={require('../../../assets/mail.png')} />
                        <Text style={styles.contactGuide}>Contacttaci per richiedere informazioni</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=> Linking.openURL(`tel:${+254714292389}`)} style={styles.contactMedium}>
                   <Image style={{width: 50, height:50,alignSelf: 'center',marginLeft: 7}} source={require('../../../assets/call.png')} />
                        <Text style={styles.contactGuide}>Chioma</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=> Linking.openURL('mailto:support@barber.com')} style={styles.contactMedium}>
                   <Image style={{width: 50, height:50,alignSelf: 'center',marginLeft: 7}} source={require('../../../assets/mail.png')} />
                        <Text style={styles.contactGuide}>Invia Email</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=>onWhatsapp()} style={styles.contactMedium}>
                   <Image style={{width: 50, height:50,alignSelf: 'center',marginLeft: 7}} source={require('../../../assets/whatsapp.png')} />
                        <Text style={styles.contactGuide}>WhatsApp(SOLO PER INFORMATION)</Text>
                   </TouchableOpacity>
                   <TouchableOpacity style={styles.lastcontactMedium}>
                   <Image style={{width: 50, height:50,alignSelf: 'center',marginLeft: 5}} source={require('../../../assets/marker.png')} />
                        <View style={styles.second}>
                            <Text style={styles.address}>Indirizzo</Text>
                            <Text style={styles.contactGuide}>Piazza Regina Margehertia,60,800400 San Gennaro Vesuviano,NA,Italia</Text>
                        </View>
                   </TouchableOpacity>
                </ScrollView>
                
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
        backgroundColor: 'rgba(0, 0,  0, 0.6)'
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
    main:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30
    },
    logosection: {
        height: height / 4
    },
    contactMedium: {
        backgroundColor: 'snow',
        height: 80,
        width: width / 1.1,
        borderRadius: 20,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 30
    },
    lastcontactMedium: {
        backgroundColor: 'snow',
        height: 140,
        width: width / 1.1,
        borderRadius: 20,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        marginBottom: 25
    },
    contactGuide:{
        fontSize: 22,
        fontWeight: 'normal',
        color: Colors.BG_BLACK,
        marginLeft: 20,
        alignSelf: 'center'
    },
    address:{
        // marginRight: width / 2
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.BG_BLACK,
        alignSelf: 'flex-start'
    }
})
