import React, { Component } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    StyleSheet, 
    View ,
    ImageBackground,
    Dimensions,
    TextInput,
    TouchableOpacity, Alert
} from 'react-native'
import Colors from '../../themes/colors'
import { connect } from 'react-redux';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('window')
class AddService extends Component {
    state={

    }
    onSubmit = () => {
        if(!this.state.name){
            Alert.alert(
                "Name field empty",
                "Please input name field then proceed"
                )
        } else if (!this.state.price){
            Alert.alert(
                "Price field empty",
                "Please input price field then proceed"
                )
        } else if (!this.state.duration){
            Alert.alert(
                "Duration field empty",
                "Please input duration field then proceed"
                )
        } else {
            database().ref(`Services/${this.state.name}`).set({
                name: this.state.name,
                price: this.state.price,
                duration: this.state.duration
            }).then(() =>{
                this.props.navigation.navigate('SuccessService',{name:'SuccessService'})
            });
        }
    }
    render() {
        console.log(this.props.userdata)
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.headerSection}>
                    <Ionicons style={{alignSelf: 'center', marginLeft: 13}} name="arrow-back" size={40} color={Colors.TEXT_GREY} />
                    <Text style={styles.headerText}>Add a service</Text>
                </View>
                <View style={styles.inputSection}>
                    <View style={styles.form}>
                        <TextInput onChangeText={(e)=>this.setState({name: e})} style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} placeholder="Name" />
                        <TextInput onChangeText={(e)=>this.setState({price: e})} style={styles.textInput} style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} placeholder="Price" />
                        <TextInput onChangeText={(e)=>this.setState({duration: e})} style={styles.textInput} style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} placeholder="Duration, 50 mins/ 1 hr" />
                    </View>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={()=> this.onSubmit()} style={styles.signUpButton}>
                            <Text style={styles.btnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        AddUser: (user)=>(dispatch(AddUser(user)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddService)

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
        fontSize: 23,
        marginLeft: 30,
        fontWeight: 'bold'
    },
    inputSection: {
        justifyContent: "space-between",
        backgroundColor: Colors.BG_BLACK,
        marginHorizontal: 20,
        borderRadius: 14,
        marginTop: (height - 80) / 5,
        paddingTop: 10
    },
    form: {
        alignSelf: 'center',
        color: 'snow'
    },
    textInput:{
        color: 'snow',
        borderBottomColor: Colors.TEXT_GREY,
        borderBottomWidth: 2,
        fontSize: 20,
        height: 50,
        width: width /1.5,
        marginBottom: 8
    },
    signUpButton:{
        alignSelf: 'center', 
        width:  width / 1.6,
        backgroundColor: 'snow',
        borderRadius: 13,
        paddingVertical: 10,
        marginBottom: 25,
        marginTop: 25
    },
    loginButton:{
        alignSelf: 'center', 
        width:  width / 1.4,
        backgroundColor: Colors.BUTTON_ORANGE,
        borderRadius: 13,
        paddingVertical: 10
    },
    btnText:{

        fontSize: 24,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})
