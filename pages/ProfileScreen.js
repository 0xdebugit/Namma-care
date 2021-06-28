import React, { useState, useEffect, useRef  } from 'react';
import { Text, View, StatusBar, TouchableOpacity, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import styles from '../styles/externalstyle';

const readData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch(e) {
    // error reading value
    console.log('error reading value '+e);
  }
}

const storeData = async (key,value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    console.log('saving error '+e);
  }
}

function ProfileScreen({navigation}){

    const isFocused = useIsFocused();
    const [UserInfo,SetUserInfo] = useState([{'Username' : '', 'Gender' : '', 'Height' : '', 'Weight' : '', 'Age' : '', 'Country' : ''}]);
    const [CountryList, SetCountryList] = useState([]);
    const UpdateData = (data, box) => {
      let newArr = [...UserInfo];
      newArr[0][box] = data;
      SetUserInfo(newArr);
    }
  
    useEffect(() => {
          async function LoadProfileData(){
            // clearAll();
            let name = await readData("Username");
            let height = await readData("Height");
            let weight = await readData("Weight");
            let gender = await readData("Gender");
            let age = await readData("Age");
            let country = await readData("Country");
            let newArr = [...UserInfo];
            newArr[0]['Username'] = name;
            newArr[0]['Height'] = height;
            newArr[0]['Weight'] = weight;
            newArr[0]['Gender'] = gender;
            newArr[0]['Age'] = age;
            newArr[0]['Country'] = country;
            SetUserInfo(newArr);
      
            fetch('https://jsonkeeper.com/b/OLDX')
              .then((response) => response.json())
              .then((json) => {
                // console.log(json);
                SetCountryList(json);
              })
              .catch((error) => {
                console.error(error);
            });
  
          }
  
          LoadProfileData();
  
      },[isFocused]);  
  
    _onDone = async () => {
      await storeData('Gender', UserInfo[0]['Gender']);
      await storeData('Height',  UserInfo[0]['Height']);
      await storeData('Weight',  UserInfo[0]['Weight']);
      await storeData('Age',  UserInfo[0]['Age']);
      await storeData('Country',  UserInfo[0]['Country']);
      alert('Profile updated !');
      navigation.navigate('Home');
    }  
  
    return(
      <View style={{flex: 1,marginTop: 50}}>
  
        <View style={{flexDirection: 'row', marginTop: StatusBar.currentHeight || 0, padding: 10}}>
          <Ionicons name="information-circle" color={'grey'} size={20}/>
          <Text style={{fontFamily: 'Poppins_300Light'}}> Only for Offline Usage</Text>
        </View> 
    
        <Text style={styles.intro_title}>My Profile</Text>
    
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, padding: 10, marginVertical: 10, marginHorizontal: 15 }}
          onChangeText={text => UpdateData(text, 'Height')}
          placeholder="Type in your Height (in cm)"
          keyboardType="numeric"
          value={UserInfo[0].Height}
        />
        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, padding: 10, marginVertical: 10, marginHorizontal: 15 }}
          onChangeText={text => UpdateData(text, 'Weight')}
          placeholder="Type in your Weight (in Kg)"
          keyboardType="numeric"
          value={UserInfo[0].Weight}
        />

        <TextInput
          style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, padding: 10, marginVertical: 10, marginHorizontal: 15 }}
          onChangeText={text => UpdateData(text, 'Age')}
          placeholder="Type in your Age (in yrs)"
          keyboardType="numeric"
          value={UserInfo[0].Age}
        />
    
        <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, marginVertical: 10, marginHorizontal: 15 }}>
          <Picker
            selectedValue={UserInfo[0].Gender}
            onValueChange={(itemValue, itemIndex) => 
            UpdateData(itemValue, 'Gender')}>

            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
    
        <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 20, marginVertical: 10, marginHorizontal: 15 }}>
          <Picker
            selectedValue={UserInfo[0].Country}
            onValueChange={(itemValue, itemIndex) => 
            UpdateData(itemValue, 'Country')}>

            {CountryList.map(country_name => 
              <Picker.Item label={country_name.location} value={country_name.location} key={country_name.iso_code} />
              )}
          </Picker>
        </View>
    
        <TouchableOpacity style={{alignSelf: 'flex-end', borderWidth: 1, borderRadius: 20, borderColor: '#b0c7d6', backgroundColor: '#001f3f', paddingVertical: 10, paddingHorizontal: 50, marginHorizontal: 20, marginVertical: 20}} onPress={() =>_onDone()}>
            <Text style={{textAlign: 'center', color: 'white'}}>Save</Text>
          </TouchableOpacity>
    
        <View style={{justifyContent: 'flex-end', flex: 1, padding: 20}}>
          <TouchableOpacity style={{alignSelf: 'flex-end'}} onPress={() => navigation.openDrawer()}>
            <Ionicons name="md-menu-outline" size={32} color="grey" />
          </TouchableOpacity>            
        </View>                                                            
  
      </View>
    );
  }

export default ProfileScreen;