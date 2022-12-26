import React, { Component } from 'react';
import { Text } from 'react-native-paper';
import {Image,StyleSheet,View,ScrollView} from 'react-native'
import UpperBody from './components/UpperBody';

class AboutUs extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( 
            <ScrollView style={{backgroundColor:'#fff'}}>

            <View>

            <UpperBody/>
            </View>
            </ScrollView>
         );
    }
}
 
export default AboutUs;