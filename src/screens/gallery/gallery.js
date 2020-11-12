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

const {width, height} = Dimensions.get('window')
export default class Gallery extends Component {
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                    <Ionicons style={{alignSelf: 'center', marginLeft: 13}} name="arrow-back" size={40} color={Colors.TEXT_GREY} />
                    <Text style={styles.headerText}>Gallery</Text>
                </View>
                <View style={styles.logoSection}>

                </View>
                <ScrollView contentContainerStyle={styles.main}>
                    <Image style={styles.image} source={require('../../../assets/barber1.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber2.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber3.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber1.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber1.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber2.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber3.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber1.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber1.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber2.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber3.jpg')} />
                    <Image style={styles.image} source={require('../../../assets/barber1.jpg')} />
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
        paddingBottom: 50, 
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    logoSection: {
        height: height / 4
    },
    image: {
        width: width / 2,
        height: width / 2.3
    }
})
