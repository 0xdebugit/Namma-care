import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem,} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';

import Home from './pages/Home';
import HCPList from './pages/HCPList';
import TestPage from './pages/TestPage';
import SymptomCheck from './pages/SymptomCheck';
import GetVaccinated from './pages/GetVaccinated';
import ProfileScreen from './pages/ProfileScreen';
import AboutScreen from './pages/AboutScreen';
import SearchHCP from './pages/SearchHCP';
import DownloadReport from './pages/DownloadReport';

import {
	useFonts,
	Poppins_100Thin,
	Poppins_100Thin_Italic,
	Poppins_200ExtraLight,
	Poppins_200ExtraLight_Italic,
	Poppins_300Light,
	Poppins_300Light_Italic,
	Poppins_400Regular,
	Poppins_400Regular_Italic,
	Poppins_500Medium,
	Poppins_500Medium_Italic,
	Poppins_600SemiBold,
	Poppins_600SemiBold_Italic,
	Poppins_700Bold,
	Poppins_700Bold_Italic,
	Poppins_800ExtraBold,
	Poppins_800ExtraBold_Italic,
	Poppins_900Black,
	Poppins_900Black_Italic 
  } from '@expo-google-fonts/poppins';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function TestChecklist() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TestPage" component={TestPage}
        options={{
          title: "Namma Care",
          headerStyle: {
            backgroundColor: '#014c7a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            // fontSize: 25, 
            fontFamily: 'Poppins_600SemiBold',
          },
        }}
  />
      <Stack.Screen name="SymptomCheck" component={SymptomCheck} options={{ title: "Symptom Check list", headerShown: false }} />
      <Stack.Screen name="HCPList" component={HCPList} options={{ title: "HCP Near me", headerShown: true }} />
      <Stack.Screen name="SearchHCP" component={SearchHCP} options={{ title: "Search HCPs", headerShown: true }} />
      <Stack.Screen name="DownloadReport" component={DownloadReport} options={{ title: "Download Report", headerShown: true }} />
    </Stack.Navigator>
  );
}

function CheckVaccination() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="GetVaccinated" component={GetVaccinated}
        options={{
          title: "Namma Care",
          headerStyle: {
            backgroundColor: '#014c7a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            // fontSize: 25, 
            fontFamily: 'Poppins_600SemiBold',
          },
        }}  />
      <Stack.Screen name="HCPList" component={HCPList} options={{ title: "HCP Near me", headerShown: true }} />
    </Stack.Navigator>
  );
}

function ProfilePage() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}
        options={{
          title: "Namma Care",
          headerStyle: {
            backgroundColor: '#014c7a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            // fontSize: 25, 
            fontFamily: 'Poppins_600SemiBold',
          },
        }} />
    </Stack.Navigator>
  );
}

function AboutPage() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AboutScreen" component={AboutScreen}
        options={{
          title: "Namma Care",
          headerStyle: {
            backgroundColor: '#014c7a',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            // fontSize: 25, 
            fontFamily: 'Poppins_600SemiBold',
          },
        }} />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList activeBackgroundColor='#001f3f' activeTintColor='white' {...props} />
      <DrawerItem
        
        label="Close"
        icon={({ focused, color, size }) => <Ionicons name="close-circle" color={color} size={size}/>}
        onPress={() => props.navigation.closeDrawer()}
      />      
    </DrawerContentScrollView>
  );
}

export default function App() {

	let [fontsLoaded] = useFonts({		
		Poppins_100Thin,
		Poppins_100Thin_Italic,
		Poppins_200ExtraLight,
		Poppins_200ExtraLight_Italic,
		Poppins_300Light,
		Poppins_300Light_Italic,
		Poppins_400Regular,
		Poppins_400Regular_Italic,
		Poppins_500Medium,
		Poppins_500Medium_Italic,
		Poppins_600SemiBold,
		Poppins_600SemiBold_Italic,
		Poppins_700Bold,
		Poppins_700Bold_Italic,
		Poppins_800ExtraBold,
		Poppins_800ExtraBold_Italic,
		Poppins_900Black,
		Poppins_900Black_Italic,		
	});  

  if (!fontsLoaded) {
    return <AppLoading />;
  }else{
    return (
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home" drawerPosition="right" 
        drawerType="slide" ges drawerContent={props => <CustomDrawerContent {...props} />} drawerContentOptions={{contentContainerStyle: {flex: 1,justifyContent: 'flex-end', marginBottom: 60}}}>
                  
          <Drawer.Screen name="Home" component={Home} options={{
            swipeEnabled:false,
            drawerIcon: ({ focused, color, size }) => <Ionicons name="md-home-outline" color={color} size={size} /> }}  />
          <Drawer.Screen name="TestChecklist" component={TestChecklist} options={{
            swipeEnabled:false,
            title: "Symptom Check",
            drawerIcon: ({ focused, color, size }) => <Ionicons name="newspaper-outline" color={color} size={size} /> }}  />
          <Drawer.Screen name="CheckVaccination" component={CheckVaccination} options={{
            swipeEnabled:false,
            title: "Get Vaccinated",
            drawerIcon: ({ focused, color, size }) => <Ionicons name="eyedrop-outline" color={color} size={size} /> }}  />
          <Drawer.Screen name="ProfilePage" component={ProfilePage} options={{
            title: "Profile",
            drawerIcon: ({ focused, color, size }) => <Ionicons name="finger-print" color={color} size={size} /> }}  />
          <Drawer.Screen name="AboutPage" component={AboutPage} options={{
            swipeEnabled:false,
            title: "About",
            drawerIcon: ({ focused, color, size }) => <Ionicons name="information-circle" color={color} size={size} /> }}  />                                    

        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
