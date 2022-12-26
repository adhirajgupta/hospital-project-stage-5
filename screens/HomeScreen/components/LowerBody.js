import React, { Component } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import SwiperComponent from './SwiperComponent';


// const { width, height } = Dimensions.get('screen')

class LowerBody extends Component {

    render() {
        return (
            <>
                <View style={styles.container} onStartShouldSetResponder={() => {
                    // console.log("Pressed") 
                    this.props.navigation.navigate('Affiliations')
                }}>
                    <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4252/4252325.png' }}
                        style={{ width: 70, height: 70 }}
                    />
                    <View style={styles.textStyle}>
                        <Text style={{ textAlign: 'center', fontSize: 20, marginLeft: 25, fontWeight: '700', alignItems: 'center' }}>Affiliations and {'\n'} Accreditation</Text>
                    </View>
                </View>

                {/* <View style={{ flex: 1, justifyContent: 'center', alignItem: 'center', alignContent: 'center' }}>
                    
                    <Button
                        raised
                        style={{ borderRadius: 10, width: width-40, height:200,alignContent: 'center',backgroundColor:'lightblue' }}
                        icon={() => <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4252/4252325.png' }}
                            style={{ width: 70, height: 70 }}
                        />}

                        mode='contained'
                        onPress={() => { this.props.navigation.navigate('Weather') }} >
                        <Text style={{ textAlign: 'center', fontSize: 20, marginLeft: 25, fontWeight: '700',alignItems:'center' }}> Affiliations and Accredititions</Text>
                    </Button>
                </View> */}

                <View style={{ alignItems: 'center', marginTop: 20, marginBottom:40 }}>
                    <SwiperComponent />
                </View>
                {/* <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'lightblue' }}>
                    <Image source={{ uri: 'https://cdn-icons.flaticon.com/png/512/69/premium/69846.png?token=exp=1646588539~hmac=529682ff37da84245fee1958238739a5' }} />
                    <Text>Affiliations and Accreditation</Text>
                </View> */}

            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', justifyContent: 'center', backgroundColor: 'lightblue', margin: 10, padding: 15, marginRight: 20, marginLeft: 20, paddingBottom: 20, paddingTop: 20, marginTop: 30
    },
    textStyle: {
        textAlign: 'center', fontSize: 20, marginLeft: 25, fontWeight: '700', alignItems: 'center'
    }

})

export default LowerBody;