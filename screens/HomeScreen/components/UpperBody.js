import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Text } from 'react-native-paper'

class UpperBody extends Component {

    render() {
        return (
            <><View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={styles.tinyLogoView} onStartShouldSetResponder={()=>this.props.navigation.navigate('Asthma')}>
                    <Image
                        style={styles.tinyLogo}
                        // source={{
                        //     uri: 'https://cdn-icons-png.flaticon.com/512/3654/3654698.png',
                        // }}
                        source={require('../../../assets/icons/Asthma.png')}
                         />
                    <Text style={styles.tinyLogoText}>Asthma</Text>
                </View>
                <View style={styles.tinyLogoView} onStartShouldSetResponder={()=>this.props.navigation.navigate('Ent')}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/icons/ent.png')} />
                    <Text style={styles.tinyLogoText}>ENT</Text>
                </View>
                {/* <View style={styles.tinyLogoView}>
                    <Image
                        style={styles.tinyLogo}
                        source={
                            {
                            uri: 'https://cdn-icons.flaticon.com/png/512/2722/premium/2722661.png?token=exp=1647607656~hmac=3fa03ebd3a35748e3b5945341e9e39cb',
                        }
                        // require('../../../assets/icons/allergy.png')
                        } />
                    <Text style={styles.tinyLogoText}>Allergy</Text>
                </View> */}
                 <View style={styles.tinyLogoView} onStartShouldSetResponder={()=>this.props.navigation.navigate('Allergy')}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/icons/allergy.png')} />
                    <Text style={styles.tinyLogoText}>Allergy</Text>
                </View>
            </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                     <View style={styles.tinyLogoView}>
                    <Image
                        style={[styles.tinyLogo]}
                        source={require('../../../assets/icons/homeopathy.png')} onStartShouldSetResponder={()=>this.props.navigation.navigate('Homeopathy')}/>
                    <Text style={styles.tinyLogoText}>Homeopathy</Text>
                </View>
                    <View style={[styles.tinyLogoView]} onStartShouldSetResponder={()=>this.props.navigation.navigate('Diabetes')}> 
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/4228/4228683.png',
                            }} />
                        <Text style={styles.tinyLogoText}>Diabetes</Text>
                    </View>
                    <View style={styles.tinyLogoView} onStartShouldSetResponder={()=>this.props.navigation.navigate('Dental')}>
                        <Image
                            style={styles.tinyLogo}
                            source={{
                                uri: 'https://cdn-icons-png.flaticon.com/512/2818/2818318.png',
                            }} />
                        <Text style={styles.tinyLogoText}>Dental</Text>
                    </View>
                </View></>

        );
    }
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 50,
        height: 50,
        paddingBottom: 5,
    },
    tinyLogoText: {
        fontSize: 17,
        textAlign:'center'
         },
    tinyLogoView: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20,
        alignItems:'center'
    }
});


export default UpperBody;