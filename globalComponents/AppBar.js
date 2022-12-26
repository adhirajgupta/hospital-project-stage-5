import * as React from 'react';
import { Appbar } from 'react-native-paper';

const AppBar = (props) => (
    <Appbar.Header style={{ backgroundColor: 'white', elevation: 25, }}>
        <Appbar.Action icon="menu" size={32} onPress={() => props.navigation.toggleDrawer()} />
        <Appbar.Content title="Gopinath Hospital" titleStyle={{ textAlign: 'center', fontWeight: 'bold', fontSize: 25 }} />
        <Appbar.Action icon="home" size={32} onPress={() => props.navigation.navigate('Home')} />
    </Appbar.Header>
);

export default AppBar
