import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/HomeScreen/Home';
import React from 'react';
import Main from './navigation/main';
import { Provider as PaperProvider, DefaultTheme, configureFonts } from 'react-native-paper';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';




const fontConfig = {
	android: {
		regular: {
			fontFamily: 'Lato-Black',
			fontWeight: 'normal',
		},
		medium: {
			fontFamily: 'Lato-Regular',
			fontWeight: 'normal',
		},
		light: {
			fontFamily: 'Lato-Light',
			fontWeight: 'normal',
		},
		thin: {
			fontFamily: 'Lato-Thin',
			fontWeight: 'normal',
		},
	}
};


const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: '#3498db',
		accent: '#f1c40f',
	},
	

	
};


export default function App() {
	const [loaded] = useFonts({
		"Lato-Black": require('./assets/fonts/Lato/Lato-Black.ttf'),
		"Lato-Regular": require('./assets/fonts/Lato/Lato-Regular.ttf'),
		"Lato-Light": require('./assets/fonts/Lato/Lato-Light.ttf'),
		"Lato-Thin": require('./assets/fonts/Lato/Lato-Thin.ttf'),
		
	});

	if (!loaded) {
		return null;
	} else
		return (
			<PaperProvider theme={theme}>
				<Main />
				<StatusBar style='auto' />
			</PaperProvider>
		);
}
