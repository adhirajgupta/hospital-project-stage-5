
import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'

import Swiper from 'react-native-swiper'

const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        flex:1,
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
        flexDirection: 'row'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    tinyLogo: {
        width: 50,
        height: 50,
        paddingBottom: 5,
    },
    tinyLogoText: {
        fontSize: 17,
        textAlign: 'center'
    },
    tinyLogoView: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20
    }
})


const { width, height } = Dimensions.get('screen')

export default class SwiperComponent extends Component {
    render() {
        return (
            <Swiper style={styles.wrapper} showsButtons={false} loop={false} pagingEnabled width={width - 40} height={150}>
                <View style={styles.slide1} onStartShouldSetResponder={() => console.log("View")}>
                    <Image
                        source={require('../../../assets/icons/covid-19.png')}
                        style={{ width: 100, height: 100 }}
                    />
                    <Text style={[styles.text, { marginLeft: 20, marginBottom: 15 }]}>Start Protecting {'\n'}yourself from covid-19 {'\n'}today!</Text>
                </View>
                <View style={styles.slide2}>
                    <Text style={styles.text}>ENT</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>Dental</Text>
                </View>
                <View style={styles.slide3}>
                    <Text style={styles.text}>Homeopathy</Text>
                </View>
            </Swiper>
        )
    }
}


