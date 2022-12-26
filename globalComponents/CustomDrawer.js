import React, { useState } from 'react';
import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList
} from '@react-navigation/drawer';




import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Drawer, Text, Divider } from 'react-native-paper';

import { getAuth, signOut } from "firebase/auth";
import { db } from '../config';
import { setDoc, doc, getFirestore, collection, getDocs, deleteDoc, query, where, } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firestore = getFirestore(db);
const usersRef = collection(firestore, "Users");


const auth = getAuth(db);




const CustomDrawer = props => {

    const [, updateState] = React.useState();

    //* List of drawer items in an array
    const drawerItems = [
        {
            icon: () => (<Ionicons name='md-home' size={42} />),
            label: 'Home',
            onPress: () => { props.navigation.navigate('Home') }
        },
        {
            icon: () => (
                <Image
                    source={require('../assets/icons/Asthma.png')}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'Asthma',
            onPress: () => { props.navigation.navigate('Asthma') }
        },
        {
            icon: () => (
                <Image
                    source={require('../assets/icons/ent.png')}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'ENT',
            onPress: () => { props.navigation.navigate('Ent') }
        },
        {
            icon: () => (
                <Image
                    source={require('../assets/icons/allergy.png')}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'Allergy',
            onPress: () => { props.navigation.navigate('Allergy') }

        },
        {
            icon: () => (
                <Image
                    source={require('../assets/icons/homeopathy.png')}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'Homeopathy',
            onPress: () => { props.navigation.navigate('Homeopathy') }

        },
        {
            icon: () => (
                <Image
                    source={require('../assets/icons/Diabetes.png')}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'Diabetes',
            onPress: () => { props.navigation.navigate('Diabetes') }

        }, {
            icon: () => (
                <Image
                    source={require('../assets/icons/teeth.png')}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'Dental',
            onPress: () => { props.navigation.navigate('Dental') }

        }, {
            icon: () => (
                <Image
                    source={require('../assets/icons/skin.png')}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'Cosmetology',
            onPress: () => { props.navigation.navigate('Cosmetology') }

        }, {
            icon: () => (
                <Image
                    source={require('../assets/icons/Pharmacy.png')}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'Pharmacy',
            onPress: () => { props.navigation.navigate('Pharmacy') }

        },
        {
            icon: () => (
                <Image
                    source={require('../assets/icons/labTest.png')}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'Lab Test',
            onPress: () => { props.navigation.navigate('LabTest') }

        },
        {
            icon: () => (
                <Ionicons
                    name='people'
                    size={42}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'About Us',
            onPress: () => { props.navigation.navigate('AboutUs') }

        },
        {
            icon: () => (
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4252/4252325.png' }}
                    style={{ width: 42, height: 42 }}
                />
            ),
            label: 'Publications',
            onPress: () => { props.navigation.navigate('Publications') }

        },


    ]

    React.useEffect(() => {
        getCurrentUser()
    }, [])

    //* Setting name in the drawer
    const [userName, setUserName] = React.useState("")

    //! Removes the async storage key when signout button is pressed
    const removeValue = async () => {
        try {
            await AsyncStorage.removeItem('userDetails')
        } catch (e) {
            // remove error
        }

        console.log('Removed Async storage item user details customDrawer.js')
    }



    //! Gets data from async storage and sets the name in the drawer
    const getCurrentUser = async () => {
        //* Stores value in try block of user data
        let userData

        try {
            //* Gets value from async storage
            const jsonValue = await AsyncStorage.getItem('userDetails')
            let val = jsonValue != null ? JSON.parse(jsonValue) : null;
            console.log("user details async storage", val)

            // console.log(jsonValue != null ? JSON.parse(jsonValue) : "no value returned");


            //* Query to get all the user details from the emailId and password stored by the LOGIN page
            getDocs(query(usersRef, where("emailId", "==", val.emailId)))
                .then((querySnapshot) => {
                    //    // console.log(doc.id, " => ", doc.data());
                    //  // console.log(userData)
                    querySnapshot.forEach((doc) => {
                        userData = doc.data().name
                        //* Sets name in the profile photo page
                        setUserName(userData)
                    })
                })

        } catch (e) {
            // error reading value
        }
    }


    return (
        <View style={{ flex: 1 }}>
            {// Move drawerContentScrollView here for second type of look
            }
            <DrawerContentScrollView
                // {...props}
                contentContainerStyle={{ backgroundColor: 'white' }}>
                <ImageBackground
                    source={{ uri: 'https://raw.githubusercontent.com/itzpradip/react-navigation-v6-mix/master/src/assets/images/menu-bg.jpeg' }}
                    style={{ padding: 20 }}
                >
                    <View style={{ flexDirection: 'row', marginTop: 30 }}>
                        <Avatar.Image
                            size={90}
                            source={{ uri: 'https://raw.githubusercontent.com/itzpradip/react-navigation-v6-mix/master/src/assets/images/user-profile.jpg' }}
                            style={{ height: 90, width: 90, borderRadius: 50, marginBottom: 10, marginRight: 15 }}
                        />
                        <View style={{ flexDirection: 'column' }}>

                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 22,
                                    marginBottom: 5,
                                }}>
                                {userName}
                            </Text>
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 15,
                                    marginBottom: 5,
                                    textAlign: 'center',
                                }}>
                                View Account {'>'}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>


                {
                    drawerItems.map((element, index) => (
                        // console.log(element),
                        <>
                            <Drawer.Item
                                icon={element.icon}
                                label={element.label}
                                onPress={element.onPress}
                            // style={{borderBottomWidth:2}}
                            />
                            <Divider style={{ height: 2, borderColor: 'black' }} />
                        </>
                    ))
                }



                {/* <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
         */}
            </DrawerContentScrollView>

            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                {/* <TouchableOpacity onPress={() => { }} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="share-social-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: 'Roboto-Medium',
                                marginLeft: 5,
                            }}>
                            Tell a Friend
                        </Text>
                    </View>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => {
                    signOut(auth).then(() => {
                        props.navigation.navigate('SignOut')
                        removeValue()

                    }).catch((error) => {
                        // An error happened.
                        Alert.alert('Unsuccessful Sign Out', error.message, [

                            {
                                text: 'OK', onPress: () => {
                                    navigation.navigate('Home')
                                }
                            }
                        ])
                    });
                }} style={{ paddingVertical: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}>
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;
