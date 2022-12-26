import { NavigationContainer } from '@react-navigation/native';
import DrawerComponent from './drawer';


export default function Main() {
    return (
        <NavigationContainer>
            <DrawerComponent/>
        </NavigationContainer>
    );
}

