import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeScreen/Home";
import Affiliations from "../screens/AffiliationsScreen/Affiliations";
import Asthma from "../screens/AsthmaScreen/Asthma";


const Stack = createNativeStackNavigator();

export default function StackHome() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="AffiliationsScreen" component={Affiliations} />
            <Stack.Screen name="AsthmaScreen" component={Asthma} />
        </Stack.Navigator>
    );
}

