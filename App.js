/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  BackHandler,
  StatusBar,
} from 'react-native';
import AppointmentAction from './src/screens/Appointments/appointmentAction';
import AppointmentDetail from './src/screens/Appointments/appointmentDetails';
import Appointments from './src/screens/Appointments/appointmentList';
import Login from './src/screens/Auth/login';
import SignUp from './src/screens/Auth/signUp';
import Confirm from './src/screens/booking/confirm';
import DatePicker from './src/screens/booking/datePicker';
import Info from './src/screens/booking/info';
import Success from './src/screens/booking/success';
import Contact from './src/screens/contacts/contacts';
import Topics from './src/screens/forum/topics';
import Gallery from './src/screens/gallery/gallery';
import Home from './src/screens/home/home';
import Notifications from './src/screens/notifications/notifications';
import TagCalculator from './src/screens/other/tagCalculator';
import Profile from './src/screens/profile/profile';
import ChooseProvider from './src/screens/services/chooseProvider';
import ChooseServices from './src/screens/services/chooseServices';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen'
import QrVerify from './src/screens/qrVerification/verify';
import Admin from './src/screens/Admin/admin';
import AddService from './src/screens/Admin/addService';
import SuccessService from './src/screens/Admin/successService';
import SetTime from './src/screens/Admin/setTime';
import AsyncStorage from '@react-native-community/async-storage';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import CustomAlertComponent from './src/screens/other/CustomAlertComponent';
import AddBarber from './src/screens/Admin/addBarber';

const Stack = createStackNavigator();
class App extends Component {
  componentDidMount(){

    SplashScreen.hide()


    this.checkPermission();
    // Register all listener for notification 
    this.createNotificationListeners();
  }

  async checkPermission() {
    const enabled = await messaging().hasPermission();
    // If Premission granted proceed towards token fetch
    if (enabled) {
      this.getToken();
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method. 
      this.requestPermission();
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  async requestPermission() {
    try {
      await messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async createNotificationListeners() {

    // This listener triggered when notification has been received in foreground
    this.notificationListener = messaging().onMessage((notification) => {
      
      const { title, body, android } = notification.notification;
      database().ref('Notifications').set({
        title: title,
        body: body,
        imageUrl: android.imageUrl ? android.imageUrl : null
      })
      this.displayNotification(title, body);
    });

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = messaging().onNotificationOpenedApp((notificationOpen) => {
      const { title, body, android } = notificationOpen.notification;
      database().ref('Notifications').set({
        title: title,
        body: body,
        imageUrl: android.imageUrl ? android.imageUrl : null
      })
      this.displayNotification(title, body);
    });

    // This listener triggered when app is closed and we click,tapped and opened notification 
    const notificationOpen = await messaging().getInitialNotification();

    if (notificationOpen) {
      const { title, body, android } = notificationOpen.notification;
      database().ref('Notifications').set({
        title: title,
        body: body,
        imageUrl: android.imageUrl ? android.imageUrl : null
      })
      this.displayNotification(title, body);
    }
  }


  async displayNotification(title, body) {
    // we display notification in alert box with title and body
    console.log(title+ "title  "+ body +"  body")
    Alert.alert(
      title, body,
      [
        { text: 'Ok', onPress: () => console.log('ok pressed') },
      ],
      { cancelable: true },
    );
  }


  render () {
    return (
        <NavigationContainer>
        <StatusBar barStyle="dark-content" />
          <Stack.Navigator headerMode="none"> 
            <Stack.Screen name="Login" component={Login} />     
            <Stack.Screen name="AddBarber" component={AddBarber} />     
            <Stack.Screen name="Admin" component={Admin} />
            <Stack.Screen name="AddService" component={AddService} />
            <Stack.Screen name="SetTime" component={SetTime} />
            <Stack.Screen name="SuccessService" component={SuccessService} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Appointments" component={Appointments} />
            <Stack.Screen name="AppointmentDetails" component={AppointmentDetail} />
            <Stack.Screen name="AppointmentAction" component={AppointmentAction} />
            <Stack.Screen name="Info" component={Info} />
            <Stack.Screen name="Confirm" component={Confirm} />
            <Stack.Screen name="Success" component={Success} />
            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="Gallery" component={Gallery} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="TagCalculator" component={TagCalculator} />
            <Stack.Screen name="Topics" component={Topics} />
            <Stack.Screen name="ChooseProvider" component={ChooseProvider} />
            <Stack.Screen name="ChooseServices" component={ChooseServices} />
            <Stack.Screen name="DatePicker" component={DatePicker} />
            <Stack.Screen name="QrVerify" component={QrVerify} />
          </Stack.Navigator>

        </NavigationContainer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;
