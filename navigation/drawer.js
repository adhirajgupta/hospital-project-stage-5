import { createDrawerNavigator } from '@react-navigation/drawer';
import AppBar from '../globalComponents/AppBar';
import CustomDrawer from '../globalComponents/CustomDrawer';
import Affiliations from '../screens/AffiliationsScreen/Affiliations';
import Asthma from '../screens/AsthmaScreen/Asthma';
import Home from '../screens/HomeScreen/Home';
import StackHome from './stackHome';
import StackAuth from './stackAuth'
import AboutUs from '../screens/AboutUsScreen/AboutUs2';
import Ent from '../screens/EntScreen/Ent';
import Allergy from '../screens/AllergyScreen/Allergy';
import Homeopathy from '../screens/HomeopathyScreen/Homeopathy';
import Diabetes from '../screens/DiabetesScreen/Diabetes';
import Dental from '../screens/DentalScreen/Dental';
import Cosmetology from '../screens/CosmetologyScreen/Cosmetology';
import Pharmacy from '../screens/PharmacyScreen/Pharmacy';
import LabTest from '../screens/LabTestScreen/LabTest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useEffect, useState } from 'react';


const Drawer = createDrawerNavigator()


//! checks if user is logged in

function DrawerComponent() {

const getLoggedInState = async () => {
    const jsonValue = await AsyncStorage.getItem('userDetails')
    let val = jsonValue != null ? JSON.parse(jsonValue) : null;
    // val = null
    console.log("val from drawer.js to check which screen to land",val)
    setLog(val != null && true)
}

    useEffect(()=>{
        getLoggedInState()
    },[])

    const [log,setLog] = useState(false)
    return (
        <Drawer.Navigator initialRouteName={log === false ? "SignOut" :"Home"}
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                header: AppBar,
                drawerActiveBackgroundColor: '#aa18ea',
                drawerActiveTintColor: '#fff',
                drawerInactiveTintColor: '#333',
                drawerLabelStyle: {
                    marginLeft: -25,
                    fontSize: 15,
                },
            }}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Affiliations" component={Affiliations} />
            <Drawer.Screen name='Asthma' component={Asthma} />
            <Drawer.Screen name="SignOut" component={StackAuth} options={{ headerShown: false }} />
            <Drawer.Screen name="AboutUs" component={AboutUs} />
            <Drawer.Screen name="Ent" component={Ent} />
            <Drawer.Screen name="Allergy" component={Allergy} />
            <Drawer.Screen name="Homeopathy" component={Homeopathy} />
            <Drawer.Screen name='Diabetes' component={Diabetes} />
            <Drawer.Screen name='Dental' component={Dental} />
            <Drawer.Screen name='Cosmetology' component={Cosmetology} />
            <Drawer.Screen name='Pharmacy' component={Pharmacy} />
            <Drawer.Screen name='LabTest' component={LabTest} />

        </Drawer.Navigator>
    );
}

export default DrawerComponent;