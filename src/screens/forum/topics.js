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
export default class Topics extends Component {
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                    <Ionicons style={{alignSelf: 'center', marginLeft: 13}} name="arrow-back" size={40} color={Colors.TEXT_GREY} />
                    <Text style={styles.headerText}>Choose Provider</Text>
                </View>
                <ScrollView contentContainerStyle={styles.main}>
                    <View style={styles.provider}>
                        <Image source={require('../../../assets/barber1.jpg')} style={styles.providerImage} />
                        <View style={styles.second}>
                            <Text style={styles.title}>Tips to get Better Hair Cuts?</Text>
                            <Text style={styles.body}>Tips to get Better Hair Cuts are as shown in the details of this post...</Text>
                            <TouchableOpacity style={styles.postLink}>
                                <Text style={styles.link}>Read More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.provider}>
                        <Image source={require('../../../assets/barber1.jpg')} style={styles.providerImage} />
                        <View style={styles.second}>
                            <Text style={styles.title}>Tips to get Better Hair Cuts?</Text>
                            <Text style={styles.body}>Tips to get Better Hair Cuts are as shown in the details of this post...</Text>
                            <TouchableOpacity style={styles.postLink}>
                                <Text style={styles.link}>Read More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.provider}>
                        <Image source={require('../../../assets/barber1.jpg')} style={styles.providerImage} />
                        <View style={styles.second}>
                            <Text style={styles.title}>Tips to get Better Hair Cuts?</Text>
                            <Text style={styles.body}>Tips to get Better Hair Cuts are as shown in the details of this post...</Text>
                            <TouchableOpacity style={styles.postLink}>
                                <Text style={styles.link}>Read More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.provider}>
                        <Image source={require('../../../assets/barber1.jpg')} style={styles.providerImage} />
                        <View style={styles.second}>
                            <Text style={styles.title}>Tips to get Better Hair Cuts?</Text>
                            <Text style={styles.body}>Tips to get Better Hair Cuts are as shown in the details of this post...</Text>
                            <TouchableOpacity style={styles.postLink}>
                                <Text style={styles.link}>Read More</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20
    },
    provider: {
        width: width / 1.3,
        height: width - 100,
        backgroundColor: Colors.BG_BLACK,
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center'
    },
    providerImage: {
        width: "100%",
        height: "50%",
        resizeMode: "cover"
    },
    second: {

    },
    title:{
        color: 'snow',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    },
    body:{
        color: 'snow',
        fontSize: 17,
        alignSelf: 'center',
        marginHorizontal: 10,
        marginTop: 10
    },
    postLink: {
        backgroundColor: Colors.BUTTON_ORANGE,
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        justifyContent: 'center',
        marginTop: 15,
        marginRight: 5

    },
    link:{
        textAlign: 'center',
        color: 'snow'
    }
})
