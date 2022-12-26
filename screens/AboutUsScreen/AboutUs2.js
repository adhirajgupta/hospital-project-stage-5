import {
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView,
    Dimensions
} from "react-native";
import React from "react";
import { DescriptionHospital, DescriptionPradyumn, DescriptionSachin } from "./components/Descriptions";
import { TreatmentPradyumn, TreatmentSachin } from "./components/Treatments";
import { Headline, Title, Paragraph, Avatar, Caption, Divider } from 'react-native-paper';
const { width, height } = Dimensions.get('screen')

const AboutUs = () => {
    return (
        <ScrollView style={styles.aboutContainer} contentContainerStyle={{ alignItems: 'center' }}>

            {/* //!Description of the hospital  */}
            <View style={{ marginTop: 20, alignItems: 'center' }}>
                <Image
                    style={styles.tinyLogo}
                    source={require('../../assets/icons/img_bg1.jpg')}
                />
                <View style={styles.aboutLayout}>
                    <Text style={[styles.aboutSubHeader, { fontSize: 23 }]}> Company Overview </Text>
                    <Text style={[styles.paraStyle, styles.aboutPara]}>
                        {DescriptionHospital}
                    </Text>
                </View>
            </View>


            {/*  //! Each profile of the doctors   */}


            <>
                <Text style={styles.mainHeader}> DR. PRADYUMN SHARMA </Text>
                {/* <Text style={styles.paraStyle}> I am a full stack developer 😀 </Text> */}

                <View>
                    <Image
                        style={styles.imgStyle}
                        source={{
                            uri: "http://www.gopinathhospital.com/admin/images/img_gallery/dr1.png",
                        }}
                    />
                </View>

                <View style={styles.aboutLayout}>
                    <Text style={styles.aboutSubHeader}> Description </Text>
                    <Text style={[styles.paraStyle, styles.aboutPara]}>{DescriptionPradyumn}
                    </Text>
                    <Text style={styles.aboutSubHeader}> Treatments </Text>
                    <Text style={[styles.paraStyle, styles.aboutPara]}>{TreatmentPradyumn}
                    </Text>
                </View>

                {/* //! Second Doctors start here */}

                <Text style={styles.mainHeader}> DR. SACHIN SHARMA </Text>
                {/* <Text style={styles.paraStyle}> I am a full stack developer 😀 </Text> */}

                <View>
                    <Image
                        style={styles.imgStyle}
                        source={{
                            uri: "",
                        }}
                    />
                </View>

                <View style={styles.aboutLayout}>
                    <Text style={styles.aboutSubHeader}> Description </Text>
                    <Text style={[styles.paraStyle, styles.aboutPara]}>{DescriptionSachin}
                    </Text>
                    <Text style={styles.aboutSubHeader}> Treatments </Text>
                    <Text style={[styles.paraStyle, styles.aboutPara]}>{TreatmentSachin}
                    </Text>
                </View>
            </>


            {/* 
            //!Profiles end here 
            */}




            {/* //! Social profiles start here */}
            <Text style={styles.mainHeader}> Follow us on Social Network </Text>
            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() =>
                        Linking.openURL("https://www.instagram.com/thapatechnical/")
                    }>
                    <Image
                        style={styles.iconStyle}
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/2111/2111463.png",
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() =>
                        Linking.openURL(
                            "https://www.youtube.com/channel/UCwfaAHy4zQUb2APNOGXUCCA"
                        )
                    }>
                    <Image
                        style={styles.iconStyle}
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/187/187210.png",
                        }}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.buttonStyle}
                    onPress={() => Linking.openURL("https://discord.gg/AN8ThRBXtY")}>
                    <Image
                        style={styles.iconStyle}
                        source={{
                            uri: "https://cdn-icons-png.flaticon.com/512/906/906361.png",
                        }}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    aboutContainer: {
        // display: "flex",
        flex: 1,
        // alignItems: "center",
        backgroundColor: '#fff'
    },

    imgStyle: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
    mainHeader: {
        fontSize: 23,
        color: "#344055",
        textTransform: "uppercase",
        fontWeight: "500",
        marginTop: 20,
        marginBottom: 10,
    },
    paraStyle: {
        fontSize: 18,
        color: "#7d7d7d",
        paddingBottom: 30,
    },
    aboutLayout: {
        backgroundColor: "#4c5dab",
        paddingHorizontal: 30,
        marginVertical: 30,
    },
    aboutSubHeader: {
        fontSize: 18,
        color: "#fff",
        textTransform: "uppercase",
        fontWeight: "500",
        marginVertical: 15,
        fontFamily: "JosefinSans_700Bold",
        alignSelf: "center",
    },
    aboutPara: {
        color: "#fff",
    },
    menuContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom:65
    },

    iconStyle: {
        width: "100%",
        height: 50,
        aspectRatio: 1,
    },
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

export default AboutUs;