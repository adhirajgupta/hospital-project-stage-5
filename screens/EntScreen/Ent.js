import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { Button, Text, Headline, Caption, Subheading, Title, Provider, Menu, Divider, DarkTheme, } from 'react-native-paper';
import TableEnt from './components/TableEnt';
import * as Animate from 'react-native-animatable'
export default class Ent extends Component {
	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#fff' }}>

				<Animate.View
					animation="fadeInUpBig"
					duration={301}
				>

					<ScrollView>
						<View style={{ margin: 15 }}>
							{/* <Button
						icon={"phone"}
						labelStyle={{ fontSize: 25 }}
						mode="contained"
						contentStyle={[styles.button, { width: width - 40, }]}
						style={styles.button}
						color='red'
						onPress={() => console.log("Emergency helpline")}>
						<Text style={[styles.buttonText, { color: 'white' }]}>Emergency Helpline</Text>
					</Button> */}
							<Headline style={{ textAlign: 'center' }}>Empty Space</Headline>
							<Subheading style={{ textAlign: 'center', }}>
								Free Space
								{'\n'}
							</Subheading>
							<Headline style={{ textAlign: 'center', fontSize: 22, }}>Doctor: Unknown {'\n'}</Headline>
							{/* <TouchableOpacity
						// onPress={() => navigation.navigate('Home')}
						style={[styles.button, {
							borderColor: '#009387',
							borderWidth: 1,
							marginTop: 15,
						}]}
					>
						<LinearGradient
							colors={['#08d4c4', '#01ab9d']}
							style={styles.button}

						>
							<Text
								onPress={() => this.getFirestoreDocs()}
								style={[styles.buttonText, {
									color: '#fff'
								}]}>Schedule Now</Text>
						</LinearGradient>
					</TouchableOpacity> */}
							<TableEnt off />
						</View>
					</ScrollView>
				</Animate.View>
			</View>
		)
	}
}