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
import { connect } from 'react-redux';


const {width, height} = Dimensions.get('window')
class Profile extends Component {
    constructor(){
        super()
    this.state ={

    }
    }

    render() {
        console.log(this.props.userdata)
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                    <TouchableOpacity onPress={()=> this.props.navigation.goBack()} style={{alignSelf: 'center', marginLeft: 13}}>
                        <Ionicons name="arrow-back" size={30} color={Colors.TEXT_GREY} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Profile</Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom: 40}}>
                    <TouchableOpacity>
                        <Image style={styles.profileImage} source={this.props.userdata.photoURL ? {uri: this.props.userdata.photoURL} : require('../../../assets/barber2.jpg')}/>
                    </TouchableOpacity>
                    <Text style={styles.Name}>{this.props.userdata.displayName}</Text>
                    <Text style={styles.rate}>5.0 Rated</Text>
                    <Text style={{...styles.rate, color: 'snow', marginTop: 5}}>Member Since 2020</Text>
                    <View style={styles.infoView}>
                        <Text style={{...styles.label, fontWeight: "bold"}}>Email</Text>
                        <Text style={styles.label}>{this.props.userdata.email}</Text>
                        <TouchableOpacity>
                            <Ionicons size={30} color="snow" name="pencil"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={{...styles.label, fontWeight: "bold"}}>Phone</Text>
                        <Text style={styles.label}>- - -</Text>
                        <TouchableOpacity>
                            <Ionicons size={30} color="snow" name="pencil"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={{...styles.label, fontWeight: "bold"}}>Total Appointments</Text>
                        <Text style={styles.label}>0</Text>
                        <TouchableOpacity>
                            <Ionicons size={30} color="transparent" name="pencil"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.infoView}>
                        <Text style={{...styles.label, fontWeight: "bold"}}>Fullfilled Appointments</Text>
                        <Text style={styles.label}>0</Text>
                        <TouchableOpacity>
                            <Ionicons size={30} color="transparent" name="pencil"/>
                        </TouchableOpacity>
                    </View>
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
        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)

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
        fontSize: 20,
        marginLeft: 30,
        fontWeight: 'bold'
    },
    profileImage: {
        width: width / 2,
        height: width / 2,
        borderRadius: width / 2,
        borderWidth: 2,
        borderColor: Colors.TEXT_GREY,
        alignSelf: 'center',
        marginTop: 20
    },
    Name:{
        color: 'snow',
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10
    },
    rate:{
        color: Colors.BUTTON_ORANGE,
        fontSize: 21,
        fontWeight: 'bold',
        alignSelf: 'center',
        marginTop: 10
    },
    infoView: {
        height: 60,
        backgroundColor: Colors.BG_BLACK,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: 20
    },
    label:{
        color: 'snow',
        fontSize: 18
    }
})
