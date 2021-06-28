import React, { useState, useEffect, useRef  } from 'react';
import { Text, View, ScrollView, StatusBar, TouchableOpacity, TextInput, SafeAreaView, ImageBackground} from 'react-native';
import { WebView } from 'react-native-webview';
import AppIntroSlider from 'react-native-app-intro-slider';



import AsyncStorage from '@react-native-async-storage/async-storage';

import * as WebBrowser from 'expo-web-browser';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


import {Picker} from '@react-native-picker/picker';
import styles from '../styles/externalstyle';

const readData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value
    } catch(e) {
      // error reading value
      console.log('error reading value '+e);
    }
  }
  
const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
    console.log('Done.')
  }

const _OpenBrowser = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };    

function Home({ navigation }){

    const isFocused = useIsFocused();
    const [UserInfo,SetUserInfo] = useState([{'name' : '', height: '180', weight: '65', bmi : 0, bmr: 0}]);
    const [NewUser,SetNewUser] = useState(false);
    const [UserData, SetUserData] = useState([{'Username' : '', 'Gender' : '', 'Height' : '', 'Weight' : '', 'Age' : '', 'Country' : ''}]);
    const [CountryList, SetCountryList] = useState([]);
    const slider = useRef();
  
    const bmr_index = (gender, age, weight, height) => {
      if(gender == 'male'){
        return (66.47 + (13.75 * weight) + (5.003 * height) - (6.755 * age)).toFixed(1);
      }else{
        return (655.1 + (9.563 * weight) + (1.85 * height) - (4.676 * age)).toFixed(1);
      }
    }

    const UpdateData = (data, key, box) => {
      let newArr = [...UserData];
      newArr[0][box] = data;
      SetUserData(newArr);
    }    

    useEffect(() => {
          async function LoadHomePageData(){
            // clearAll();
            let name = await readData("Username");
            let height = await readData("Height");
            let weight = await readData("Weight");
            let gender = await readData("Gender");
            let age = await readData("Age");
            let newArr = [...UserInfo];
            newArr[0]['name'] = name;
            newArr[0]['height'] = height;
            newArr[0]['weight'] = weight;
            newArr[0]['bmi'] = (weight / Math.pow(UserInfo[0].height/ 100, 2)).toFixed(1)
            newArr[0]['bmr'] = bmr_index(gender, age, weight, height);
            SetUserInfo(newArr);
      
            fetch('https://jsonkeeper.com/b/OLDX')
              .then((response) => response.json())
              .then((json) => {
                SetCountryList(json);
              })
              .catch((error) => {
                console.error(error);
            });
          }
  
          LoadHomePageData();
  
      },[isFocused,NewUser]);
  
    const bmi_category = (bmi_index) => {
      if(bmi_index < 16){
        return "Severe Thinness"
      }else if(bmi_index >= 16 && bmi_index <= 17){
        return "Moderate Thinness"
      }else if(bmi_index > 17 && bmi_index <= 18.5){
        return "Mild Thinness"
      }else if(bmi_index > 18.5 && bmi_index <= 25){
        return "Normal"
      }else if(bmi_index > 25 && bmi_index <= 30){
        return "Overweight"
      }else if(bmi_index > 30 && bmi_index <= 35){
        return "Obese Class I"
      }else if(bmi_index > 35 && bmi_index <= 40){
        return "Obese Class II"
      }else if(bmi_index > 40){
        return "Obese Class III"
      }
    }
  
    const dashboard_slides = [
      {
        key: '99',
        image_src: require('../assets/336585.jpg'),
        text: `BMI Score : ${UserInfo[0].bmi}\n${bmi_category(UserInfo[0].bmi)}`,
        info: true,
        type: 'My Health Report',
        ext_src: 'https://telegra.ph/BMI-Introduction-06-26',
      },
      {
        key: '98',
        image_src: require('../assets/67278.jpg'),
        text: `BMR Scorecard :\n${UserInfo[0].bmr} Kcal/Day`,
        info: true,
        type: 'My Health Report',
        ext_src: 'https://telegra.ph/BMR-Introduction-06-26'
      },
      {
        key: '97',
        image_src: require('../assets/55856585.jpg'),
        text: `Free Healthcare Policy`,
        info: false,
        type: 'Information',
        ext_src: 'https://www.who.int/news-room/fact-sheets/detail/free-health-care-policies'
      },                
      {
        key: '0',
        image_src: require('../assets/9963652.jpg'),
        text: '10 mins Begineer\'s workout',
        info: false,
        type: 'Health Tips',
        ext_src: 'https://telegra.ph/10-min-Beginners-Workout-06-26'
      },
      {
        key: '1',
        image_src: require('../assets/3696658.jpg'),
        text: 'Physical activity',
        info: false,
        type: 'Health Tips',
        ext_src: 'https://www.who.int/news-room/fact-sheets/detail/physical-activity'
      },
      {
        key: '2',
        image_src: require('../assets/48622.jpg'),
        text: 'Get Vaccinated',
        info: false,
        type: 'Vaccination',
        ext_src: 'https://www.who.int/news-room/q-a-detail/coronavirus-disease-(covid-19)-vaccines'
      },
      {
        key: '3',
        image_src: require('../assets/996585.jpg'),
        text: 'Stress Buster Workouts',
        info: false,
        type: 'Health Tips',
        ext_src: 'https://www.cdc.gov/coronavirus/2019-ncov/daily-life-coping/managing-stress-anxiety.html'
      },
      {
        key: '4',
        image_src: require('../assets/24622.jpg'),
        text: '',
        info: false,
        type: 'Covid-19 Impact',
        ext_src: "https://www.who.int/news/item/13-10-2020-impact-of-covid-19-on-people's-livelihoods-their-health-and-our-food-systems"
      }                
    ]
  
    
  
    const slides = [
      {
          key: '0',
          title: 'Hey, What is your name ?',
          text: 'Discover government & online jobs across india',
          backgroundColor: '#ffffff',
          box: 'Username',
      },
      {
          key: '2',
          title: 'Your Basic Details',
          text: 'STAY HOME, STAY SAFE',
          backgroundColor: '#b3dff8',
          box: 'BMI',
      }
    ];
  
    _renderItem = ({ item }) => {
      if(item.key == 0){
        return (
          <View key={item.key} style={{justifyContent: 'flex-end', flex: 1, marginBottom: 100}}>	
            <Text style={styles.intro_title}>{item.title}</Text>
            <TextInput style={{ borderColor: 'grey', borderWidth: 1, borderRadius: 20, padding: 10, margin: 20, }} onChangeText={text => UpdateData(text, item.key, item.box)} placeholder="Type in your name" />
          </View>
        );      
      }else if(item.key == 2){
        return (
          <View key={item.key} style={{justifyContent: 'flex-end', flex: 1, marginBottom: 100}}>
  
            <View style={{flexDirection: 'row', marginTop: StatusBar.currentHeight || 0, padding: 10}}>
              <Ionicons name="information-circle" color={'grey'} size={20}/>
              <Text style={{fontFamily: 'Poppins_300Light'}}> Only for Offline Usage</Text>
            </View> 
    
            <Text style={styles.intro_title}>{item.title}</Text>
    
            <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, padding: 10, marginVertical: 10, marginHorizontal: 15 }}
                onChangeText={text => UpdateData(text, item.key, 'Height')}
                placeholder="Type in your Height (in cm)"
                keyboardType="numeric"

              />
            <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, padding: 10, marginVertical: 10, marginHorizontal: 15 }}
                onChangeText={text => UpdateData(text, item.key, 'Weight')}
                placeholder="Type in your Weight (in Kg)"
                keyboardType="numeric"
              />
    
            <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, padding: 10, marginVertical: 10, marginHorizontal: 15 }}
                onChangeText={text => UpdateData(text, item.key, 'Age')}
                placeholder="Type in your Age (in yrs)"
                keyboardType="numeric"
              />
    
            <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, marginVertical: 10, marginHorizontal: 15 }}>
              <Picker
                selectedValue={UserData[0].Gender}
                onValueChange={(itemValue, itemIndex) => 
                UpdateData(itemValue, item.key, 'Gender')}>

                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>
    
            <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, marginVertical: 10, marginHorizontal: 15 }}>
              <Picker
                selectedValue={UserData[0].Country}
                onValueChange={(itemValue, itemIndex) => 
                UpdateData(itemValue, item.key, 'Country')}>

                {CountryList.map(country_name => 
                  <Picker.Item label={country_name.location} value={country_name.location} key={country_name.iso_code} />
                  )}
              </Picker>
            </View>                                                        
  
          </View>
        );
      }
    }
  
      
      
    _renderNextButton = () => {
      if(UserData[0].Username.length > 0){
        return (
          <View style={styles.buttonCircle}>
            <Text>Next</Text>
          </View>
        );
      }
    };
      
    _renderDoneButton = () => {
      if(UserData[0].Height.length > 0 && UserData[0].Weight.length > 0 && UserData[0].Age.length > 0){
        return (
          <View style={styles.buttonCircle}>
            <Text>Done</Text>
          </View>
        );
      }
    };
  
    const storeData = async (key,value) => {
      try {
        await AsyncStorage.setItem(key, value)
      } catch (e) {
        // saving error
        console.log('saving error '+e);
      }
    }  
  
    _onDone = async () => {
      await storeData('Gender', UserData[0]['Gender']);
      await storeData('Username',  UserData[0]['Username']);
      await storeData('Height',  UserData[0]['Height']);
      await storeData('Weight',  UserData[0]['Weight']);
      await storeData('Age',  UserData[0]['Age']);
      await storeData('Country',  UserData[0]['Country']);
      SetNewUser(true);
    }
    

    if(UserInfo[0].name == null) {
      return(
        <AppIntroSlider 
          renderItem={_renderItem} 
          keyExtractor={item => item.key} 
          data={slides} 
          onDone={_onDone} 
          renderNextButton={_renderNextButton} 
          scrollEnabled={false}
          renderDoneButton={_renderDoneButton}
          ref={(ref) => (slider.current = ref)} />
      );
    }else{
      return(
        <SafeAreaView style={styles.container}>
          <View style={{paddingVertical: 70, paddingHorizontal: 10}}>
            <Text style={{fontSize: 30, fontFamily: 'Poppins_300Light', color: '#014c7a'}}>Welcome,</Text>
            <Text style={{fontSize: 40, fontFamily: 'Poppins_600SemiBold', marginTop: -10, color: '#014c7a'}}>{UserInfo[0].name}
            </Text>
    
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                // pagingEnabled
                // scrollEnabled={false}
              >

              {dashboard_slides.map(item => 
                <TouchableOpacity style={styles.homecard} key={item.key} onPress={() => _OpenBrowser(item.ext_src)}>
                  <ImageBackground
                    source={item.image_src}
                    imageStyle={{ borderRadius: 20}}
                    style={{
                      height: 150,
                      width: 250,
                      position: 'relative', // because it's parent
                    }}
                  >
                  <Text
                    style={{
                      fontFamily:'Poppins_300Light',
                      fontSize: 20,
                      color: 'white',
                      position: 'absolute', // child
                      bottom: 20,
                      left: 15,
                      // padding: 20,
                    }}
                  >
                  {item.text}
                  </Text>
                  {item.info ? <Ionicons name="information-circle" style={{position: 'absolute', right: 0, padding: 10}} size={15} color="white" /> : <Ionicons name="open" style={{position: 'absolute', right: 0, padding: 10}} size={15} color="white" />}
  
                  <Text style={{color: 'white', fontSize: 12, padding: 10, fontFamily: 'Poppins_700Bold'}}>{item.type}</Text>
                  </ImageBackground>              
                </TouchableOpacity>
              )}           
            </ScrollView>
            
          </View>
    
          <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 0}}>
                <Text style={styles.title}>Namma Care provides a general symptom assessment and will also consider Covid-19 where relevant. For up-to-date guidance specific to Covid-19, please check WHO website.</Text>
                <View style={{justifyContent: 'space-between', padding: 10}}>
                  <TouchableOpacity style={{alignSelf: 'flex-end',paddingHorizontal: 20,paddingVertical: 10, borderWidth: 1, borderRadius: 20, borderColor: '#001f3f', backgroundColor: '#001f3f', marginTop: 10 }} onPress={() => _OpenBrowser('https://www.who.int/emergencies/diseases/novel-coronavirus-2019')}>
                      <Text style={{textAlign: 'center', color: 'white', fontFamily: 'Poppins_400Regular'}}>Learn more on the WHO website</Text>
                    </TouchableOpacity>
    
                  <TouchableOpacity style={{alignSelf: 'flex-end',paddingHorizontal: 20,paddingVertical: 10, borderWidth: 1, borderRadius: 20, borderColor: '#001f3f', backgroundColor: '#001f3f', marginTop: 10 }} onPress={() => navigation.navigate('TestChecklist')}>
                    <Text style={{textAlign: 'center', color: 'white', fontFamily: 'Poppins_400Regular'}}>Continue using Namma Care</Text>
                  </TouchableOpacity>
                </View>          
              </View>
    
              <TouchableOpacity style={{alignSelf: 'flex-end', padding: 20}} onPress={() => navigation.openDrawer()}>
                <Ionicons name="md-menu-outline" size={32} color="grey" />
              </TouchableOpacity>
    
        </SafeAreaView>
      );
    }
  
  }

  export default Home;