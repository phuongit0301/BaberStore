import React, { Component } from 'react'
import { utils } from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import { 
    Text, 
    Dimensions,
    TouchableOpacity, 
    StyleSheet, 
    View, 
    Image,
    Alert,
    ImageBackground 
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Colors from '../../themes/colors'

import ImagePicker from 'react-native-image-crop-picker';
import auth from "@react-native-firebase/auth";
import LottieView from 'lottie-react-native';

const {width, height} = Dimensions.get('window')
class SignUp extends Component { 
    constructor(){
        super()
        this.state = {
            selected: false,
            image: {},
            loading: false,
            profileImageUrl: null,
        }
        this.onSelectImage = this.onSelectImage.bind(this)

        this.uploadImage = this.uploadImage.bind(this)
    }   
onSignUp = async () =>{
    this.setState({
        loading: true
    })
    if(!this.state.email){
        Alert.alert(
            'Please Enter Valid email!',
            'The email field cannot be empty!',
            [
                { text: 'Got it!', onPress: () => this.setState({loading: false}) },
            ]
          );
    } else if(!this.state.name){
        Alert.alert(
            'Please input Name!',
            'The name field cannot be empty!',
            [
                { text: 'Got it!', onPress: () => this.setState({loading: false}) },
            ]
          );
    } else if(!this.state.password){
        Alert.alert(
            'Please Enter password!',
            'The password field cannot be empty!',
            [
                { text: 'Got it!', onPress: () => this.setState({loading: false}) },
            ]
          );
    // } else if(!this.state.profileImageUrl){
    //     Alert.alert(
    //         'Profile Image issue',
    //         'You havent provided Image or it was not uploaded successfully, please select Image and try again!',
    //         [
    //             { text: 'Got it!', onPress: () => this.setState({loading: false}) },
    //         ]
    //       );
    } else {
        try {
            let response =  await auth().createUserWithEmailAndPassword(this.state.email, this.state.password);
             if(response){
               console.log("🍎",response)
               await auth().currentUser.updateProfile({
                displayName: this.state.name,
                photoURL: this.state.profileImageUrl
             }).then(
               (s)=> console.log(s)
             )
             Alert.alert(
                'Account Created',
                'You can now login with new account details!'
              );
                this.props.navigation.navigate('Login',{name:'Login'})
             }
           } catch (e) {
            if (e.message == '[auth/firebase-auth] API: InternalFirebaseAuth.FIREBASE_AUTH_API is not available on this device. Connection failed with: ConnectionResult{statusCode=SERVICE_INVALID, resolution=null, message=null}'){
                Alert.alert(
                    'Google Play Services Not found',
                    'Please enable google play Services and try again',
                    [
                        { text: 'Got it!', onPress: () => this.setState({loading: false}) },
                    ]
                  );
            } else if(e.message == '[auth/email-already-in-use] The email address is already in use by another account.'){
                Alert.alert(
                    'The email address is already in use by another account.',
                    'Please Login or request a password reset.',
                    [
                        { text: 'Login Instead', onPress: () => this.props.navigation.navigate('Login',{name:'Login'}) },
                    ]
                  );
            } else if(e.message == '[auth/invalid-email] The email address is badly formatted.'){
                Alert.alert(
                    'Invalid email!',
                    'Please Enter a valid email address',
                    [
                        { text: 'Got it!', onPress: () => this.setState({loading: false}) },
                    ]
                  );
            } else if(e.message == '[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]'){
                Alert.alert(
                    'Pass too Weak',
                    'The given password is invalid. Password should be at least 6 characters',
                    [
                        { text: 'Got it!', onPress: () => this.setState({loading: false}) },
                    ]
                  );   
            }
             console.error(e.message);
           }
    }

}
onLogin = async () =>{
    this.props.navigation.navigate('Login',{name:'Login'})
}

onSelectImage = async ()=>{
    ImagePicker.openPicker({
      // width: 300,
      // height: 400,
       cropping: true
    }).then(image => {
      const source = {
        uri: image.path,
        type: image.mime,
        name: "thisimage",
      }
      this.uploadImage(source.uri)
    }).catch((err) => {
      console.log(`erro is ${err}`)
    })
  }

  uploadImage = async (uri) => {
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = uri;
  
  
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
  
    // set progress state
    task.on('state_changed', snapshot => {
        console.log('progress')
    });
  
    try {
      await task;
      let imageRef = storage().ref(filename);
        imageRef
        .getDownloadURL()
        .then((url) => {
            //from url you can fetched the uploaded image easily
            console.log(url)
            this.setState({profileImageUrl: url});
        })
      Alert.alert(
        'Photo uploaded!',
        'Your photo has been uploaded Sucessfully!'
      );
    } catch (e) {
        if(e.message == '[auth/invalid-email] The email address is badly formatted.'){
            Alert.alert(
                'Invalid email!',
                'Please Enter a valid email address',
                [
                    { text: 'Got it!', onPress: () => this.setState({loading: false}) },
                ]
              );
        } else if(e.message == '[auth/weak-password] The given password is invalid. [ Password should be at least 6 characters ]'){
            Alert.alert(
                'Pass too Weak',
                'The given password is invalid. Password should be at least 6 characters',
                [
                    { text: 'Got it!', onPress: () => this.setState({loading: false}) },
                ]
              );   
        }
      console.error("err is "+e.message);
    }
  
  };

    render() {
        return (
            <ImageBackground source={require('../../../assets/barber3.jpg')} style={styles.container}>
                <View style={styles.wrapper}>
                    <TouchableOpacity onPress={()=>this.onSelectImage()} >
                        <Image
                        style={styles.addImage}
                        source={this.state.profileImageUrl ? {uri:this.state.profileImageUrl} : require('../../../assets/avatar-default.jpg')}
                        />
                    </TouchableOpacity>
                    <View style={styles.inputSection}>
                        <View style={styles.form}>
                            <TextInput onChangeText={(e)=>this.setState({name: e})} style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} placeholder="Name" />  
                            <TextInput onChangeText={(e)=>this.setState({email: e})} style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} placeholder="Email" />
                            <TextInput onChangeText={(e)=>this.setState({password: e})} style={styles.textInput} placeholderTextColor={Colors.TEXT_GREY} placeholder="PassWord" />
                        </View>
                        <View style={styles.buttons}>
                            <TouchableOpacity onPress={()=>this.onSignUp()} style={styles.signUpButton}>
                                <Text style={styles.btnText}>SignUp</Text>
                                {
                                    this.state.loading ? (
                                        <View style={{width: 100, height: 70}}>
                                            <LottieView source={require('../../../assets/loading1.json')} autoPlay loop />
                                        </View>
                                    ) : null
                                }
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.onLogin()} style={styles.loginButton}>
                                <Text style={styles.btnText}>Already Member. <Text style={{...styles.btnText, color: 'snow'}}>Login</Text></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

export default SignUp

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
    },
    wrapper: {
        flex: 1,
        backgroundColor: 'rgba(0, 0,  0, 0.55)',
        // justifyContent: 'space-between'
    },
    addImage:{
        marginTop: 35,
        alignSelf: 'center',
        backgroundColor: 'rgb(255, 255, 255)',
        width: width / 2.5,
        height: width/ 2.5,
        borderRadius: width / 5,
        justifyContent: 'center',
        padding: 10,
        marginBottom: 20,
        overflow: 'hidden'
    },
    normalText: {
        alignSelf: 'center',
        fontWeight: "bold",
        fontSize: 22,
        marginLeft: 6,
    },
    inputSection: {
        justifyContent: "space-between"
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
    }

})

