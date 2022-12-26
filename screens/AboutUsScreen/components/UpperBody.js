import React, { Component } from 'react';
import { Text, Headline, Title, Paragraph, Avatar, Caption, Divider } from 'react-native-paper';
import { Image, StyleSheet, View, Dimensions } from 'react-native'
import { DescriptionPradyumn, DescriptionSachin } from './Descriptions';
import { TreatmentPradyumn, TreatmentSachin } from './Treatments';

const { width, height } = Dimensions.get('screen')
class UpperBody extends Component {
    state = {}

    directorProfile(imageSource, Name, Description,Treatment) {
        return <View style={styles.container}>
            <Avatar.Image size={250} source={{ uri: imageSource }} style={{ marginTop: 50 }} />
            <Text style={styles.text}>{Name}</Text>
            <Text style={[styles.text, { fontSize: 17 }]}>{Description}</Text>
            <View style={{marginTop:20}}>
                <Text style={[styles.text, { fontSize: 29 }]}>Treatments</Text>
                <Text style={[styles.text, { fontSize: 17 }]}>{Treatment}</Text>
            </View>
        </View>;

    }

    render() {
        console.log(width)
        return (
            <>
                <View style={{ margin: 20, }}>
                    <Image
                        style={styles.tinyLogo}
                        source={require('../../../assets/icons/img_bg1.jpg')}
                    />
                    <Headline style={{ marginTop: 15, fontWeight: '700', fontFamily: 'Lato-Light' }}>Company Overview</Headline>
                    <Paragraph style={[styles.text, { fontSize: 17 }]}>
                        Gopinath Hospital is a 60-bed Multi-specialty hospital, located near Sanganer, Airport, NH12. It has an ancestral history of more than 100 years. Equipped with I.C.U., O.T. & Super Deluxe Rooms, it provides with 24 hrs Emergency Service. Equipped with the latest technology, the reason that makes Gopinath Hospital special is that it serves to all sections of the society at an affordable cost. Specializing in Asthma, Allergy & Cryosurgery for Piles, Gopinath Hospital is serving the Nationals & Foreigners as well, to their utmost satisfaction.
                        {'\n'}
                        {'\n'}
                        Ours’ is an eco-friendly hospital with:
                        {'\n'}
                        {'Water harvesting facility'}
                        {'\n'}
                        {'Solar heaters'}
                        {'\n'}
                        {'\n'}
                        It’s second 20 bed unit lies within the heart of the city.
                        {'\n'}
                        It also has the following sister concerns:
                        {'\n'}
                        {' Gopinath Charitable Trust'}
                        {'\n'}
                        {' Gopinath Public School'}
                    </Paragraph>
                </View>
                {this.directorProfile('http://www.gopinathhospital.com/admin/images/img_gallery/dr1.png', 'DR. PRADYUMN SHARMA', DescriptionPradyumn,TreatmentPradyumn)}
                <Divider style={{ height: 5 }} />
                {this.directorProfile('', 'DR. SACHIN SHARMA', DescriptionSachin,TreatmentSachin)}


            </>
        );
    }

}

const styles = StyleSheet.create({
    tinyLogo: {
        width: width - 40,
        height: height / 4.5,
        paddingBottom: 5,

    },
    text: {
        fontSize: 25,
        // textAlign: 'center',
    },
    tinyLogoView: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        marginBottom: 20
    },
    container: {
        alignItems: 'center',
        marginBottom: 30
    }
});

export default UpperBody;