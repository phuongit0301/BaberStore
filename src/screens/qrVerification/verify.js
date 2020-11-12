import React, { Component, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    StyleSheet, 
    View ,
    ImageBackground,
    Dimensions,
    TextInput,
    TouchableOpacity, 
    Image,
    ScrollView,
    Linking
} from 'react-native'
import Colors from '../../themes/colors'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const {width, height} = Dimensions.get('window')
export default function QrVerify () {
    const onSuccess = e => {
        Linking.openURL(e.data).catch(err =>
          console.error('An error occured', err)
        );
      };
    return (
            <QRCodeScanner
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                <Text style={styles.centerText}>
                    <Text style={styles.textBold}>Please Scan Qr code at the shop for account Verification</Text>
                </Text>
                }
                bottomContent={
                <TouchableOpacity style={styles.buttonTouchable}>
                    <Text style={styles.buttonText}>OK. Got it!</Text>
                </TouchableOpacity>
                }
            />
    )
}

const styles = StyleSheet.create({
    centerText: {
        flex: 1,
        fontSize: 18,
        padding: 5,
        color: 'snow',
        backgroundColor: 'black'
      },
      textBold: {
        fontWeight: '500',
        color: 'snow'
      },
      buttonText: {
        fontSize: 21,
        color: 'snow',
        fontWeight: 'bold'
      },
      buttonTouchable: {
        padding: 16,
        backgroundColor: Colors.BUTTON_ORANGE
      }


})