import React, { Component } from 'react'
import { 
    Text,
    Dimensions, 
    StyleSheet, 
    View, 
    ImageBackground,
    TextInput ,
    Alert,
    TouchableOpacity
} from 'react-native'
import Colors from '../../themes/colors'
import { AddUser } from '../../store/actions/actions'
import auth from "@react-native-firebase/auth"
import database from '@react-native-firebase/database';
import { connect } from 'react-redux'
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get("window")
class Login extends Component {
    state = {
        loading: false
    }
    onSingIn = async () => {
        this.setState({
            loading: true
        })
        if(!this.state.email){
            Alert.alert("Please Input email")
            return
        } else if (!this.state.password){
            Alert.alert("Please Input passWord")
            return    
        }
        try {
          let response = await auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          debugger;
          if (response && response.user) {
              console.log()
              database().ref(`Users/${response.user.uid}`).once('value').then((snapshot)=>{
                console.log(JSON.stringify(snapshot.val()))  
                if(snapshot.val()){
                    let userData = {
                        displayName : snapshot.val().displayName,
                        email : snapshot.val().email,
                        photoURL : snapshot.val().photoURL,
                        uid: snapshot.val().uid,
                        isBarber: snapshot.val().isBarber == true ? true : false
                        }
                        database().ref(`Users/${response.user.uid}`).update(userData).then(()=>{
                            this.setState({loading: false})
                            this.props.AddUser(userData)
                            this.props.navigation.navigate('Home',{name:"Home"})
                        })
                } else {
                    let userData = {
                        displayName : response.user.displayName,
                        email : response.user.email,
                        photoURL : response.user.photoURL,
                        uid: response.user.uid,
                        isBarber: false
                        }
                        database().ref(`Users/${response.user.uid}`).update(userData).then(()=>{
                            this.props.AddUser(userData)
                            this.props.navigation.navigate('Home',{name:"Home"})
                        })
                }

              })
          }
        } catch (e) {
            if(e.message == '[auth/wrong-password] The password is invalid or the user does not have a password.'){
                Alert.alert(
                    "PassWord Mismatch",
                    "The password does not match with the provided email, please checck and try again",
                    [
                        { text: 'Got it!', onPress: () => this.setState({loading: false}) },
                    ]
                )
            } else if (e.message == '[auth/too-many-requests] We have blocked all requests from this device due to unusual activity. Try again later. [ Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. ]'){
                Alert.alert(
                    "Spam Activity Detected",
                    "We have blocked all requests from this device due to unusual activity. Try again later. [ Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.",
                    [
                        { text: 'Got it!', onPress: () => this.setState({loading: false}) },
                    ]
                    )
            } else if (e.message == '[auth/user-not-found] There is no user record corresponding to this identifier. The user may have been deleted.'){
                Alert.alert(
                    "Unknown email",
                    "There is no user record corresponding to this identifier. The user may have been deleted. You may want to Sign Up Instead",
                    [
                        { text: 'Got it!', onPress: () => this.setState({loading: false}) },
                    ]
                    )
            }
        //   console.error(e.message)
        }
      }
      onResetPassword = (email) => {
        if(this.state.email){
            auth().sendPasswordResetEmail(email)
            Alert.alert("Email Resest Link sent",` We have sent email reset link to ${this.state.email}`)
        } else {
            Alert.alert("You haven't provided any password yet",'Please provide email whose password is forgotten')
        }
      }
    render() {
        return (
            <ImageBackground source={require('../../../assets/barber1.jpg')} style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.logoSection}>

                    </View>
                    <View style={styles.inputSection}>
                        <Text style={styles.Header}>Login</Text>
                        <View style={styles.form}>
                            <TextInput style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} onChangeText={(e)=> this.setState({email: e})} placeholder="Email" />
                            <TextInput style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} onChangeText={(e)=>this.setState({password: e})} placeholder="PassWord" />
                            <TouchableOpacity onPress={()=> this.onResetPassword(this.state.email)}>
                                <Text style={styles.forgotten}>Forgotten PassWord?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.signUpButton} onPress={()=>this.onSingIn()}>
                                <Text style={styles.btnText}>Login</Text>
                                {
                                    this.state.loading ? (
                                        <View style={{width: 100, height: 70}}>
                                            <LottieView source={require('../../../assets/loading1.json')} autoPlay loop />
                                        </View>
                                    ) : null
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginButton} onPress={()=>this.props.navigation.navigate('SignUp', {name: 'SignUp'})}>
                                <Text style={styles.btnText}>Create <Text style={{...styles.btnText, color: 'snow'}}>Account</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.faceBook}>
                        <TouchableOpacity style={styles.loginFacebook}>
                            <Text style={styles.fbText}>Continue with <Text style={{...styles.fbText, color: 'snow'}}>Facebook</Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddUser: (user)=>(dispatch(AddUser(user)))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
const styles = StyleSheet.create({
    container:{
        width: width,
        height: height
    },
    wrapper: {
        flex: 1,
        backgroundColor: 'rgba(0, 0,  0, 0.6)',
        justifyContent: 'space-between'
    },
    inputSection: {
        justifyContent: "space-between"
    },
    Header: {
        fontSize: 23,
        color: 'snow',
        fontWeight: 'bold',
        alignSelf: 'center'
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
        width: width /1.4,
        marginBottom: 8
    },
    forgotten: {
        color: Colors.BUTTON_ORANGE,
        alignSelf: 'flex-end',
        borderBottomWidth: 1.5,
        borderBottomColor: Colors.BUTTON_ORANGE,
        marginTop: 5,
        fontSize: 14
    },
    signUpButton:{
        alignSelf: 'center', 
        width:  width / 1.4,
        backgroundColor: 'snow',
        borderRadius: 13,
        paddingVertical: 10,
        marginBottom: 15,
        marginTop: 25,
        flexDirection: 'row',
        justifyContent: 'space-around'
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
    },
    faceBook: {
        alignSelf: 'flex-start',
        marginLeft: 10,
        marginBottom: 50
    },
    loginFacebook: {
        alignSelf: 'center', 
        width:  width / 2,
        backgroundColor: Colors.FACEBOOK_BLUE,
        borderRadius: 13,
        paddingVertical: 8
    },
    fbText:{
        fontSize: 17,
        fontWeight: 'bold',
        alignSelf: 'center'
    }
})
