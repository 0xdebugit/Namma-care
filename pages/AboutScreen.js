import React from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/externalstyle';

function AboutScreen({navigation}){

	const AppName = 'Namma Care v1.0';
	const About = 'A Self Care & General Symptom Assessment app to help users find best care near them. Developed for IQVIA - COVID-19 Healthcare App Challenge.';

		return(
			<View style={{flex: 1,alignItems: 'center', justifyContent: 'center',}}>
					<Image source={require('../assets/frame_1.png')} style={styles.image}/>       
					<Text style={{color: '#4374BA'}}>{AppName}</Text>
					<Text style={{textAlign: 'center', padding: 10}}>{About}</Text>
					<TouchableOpacity style={{position: 'absolute', bottom: 5, right: 5, padding: 15}} onPress={() => navigation.openDrawer()}>
						<Ionicons name="md-menu-outline" size={32} color="grey" />
					</TouchableOpacity>      
			</View>
		);
	}

export default AboutScreen;