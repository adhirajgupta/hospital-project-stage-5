import {
    View,
    ImageBackground,
    Image,
    TouchableOpacity,

} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const drawerList = [
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
            onPress: () => { props.navigation.navigate('ENT') }
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

        },{
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
