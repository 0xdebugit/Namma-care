import React, { useState, useEffect, useRef  } from 'react';
import { Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const _OpenBrowser = async (url) => {	
  let result = await WebBrowser.openBrowserAsync(url);
}; 

function GetVaccinated({navigation}){

    const isFocused = useIsFocused();
    const [CountryData,SetCountryData] = useState([]);
    const [CountrySelected,SetCountrySelected] = useState('');
  
    useEffect(() => {
      async function vaccine_info(){
        let country_name = await readData('Country');

        SetCountrySelected(country_name);
  
        let fsdata = await fetch('https://jsonkeeper.com/b/47CI')
        .then((response) => response.json())
        .then((json) => {
          SetCountryData(json);
        })
        .catch((error) => {
          // error in http call
          console.error(error);
        });
  
      }
  
      vaccine_info();
  
    }, [isFocused]);
    
    return(
      <SafeAreaView style={{ flex: 1, padding: 10, marginTop: 20}}>
        { CountryData.map(item => {
            if(item.location == CountrySelected){
              return(
                <View style={{padding: 20, borderWidth: 1, borderRadius: 30, backgroundColor: '#001f3f', elevation: 150,}} key={item.iso_code}>
                  <Text style={{color: 'white', fontSize: 25, fontFamily: 'Poppins_500Medium', textDecorationLine: 'underline'}}>Vaccination Status</Text>
                  <Text style={{color: 'white', fontSize: 30, fontFamily: 'Poppins_400Regular'}}>{item.location}</Text>
                  <Text style={{color: 'white', fontSize: 15, fontFamily: 'Poppins_600SemiBold', marginTop: 20}}>Available Vaccines : </Text>
                  <Text style={{color: 'white', fontSize: 15, fontFamily: 'Poppins_400Regular'}}>{item.vaccines}</Text>
                  <Text style={{color: 'white', fontSize: 15, fontFamily: 'Poppins_600SemiBold', marginTop: 20}}>Last Updated :</Text>
                  <Text style={{color: 'white', fontSize: 15, fontFamily: 'Poppins_400Regular'}}>{item.last_observation_date}</Text>
                  
                  <TouchableOpacity style={{marginTop: 20, borderRadius: 20, borderWidth: 2, padding: 10, borderColor: 'white', backgroundColor: '#001f3f'}} onPress={() => _OpenBrowser(item.source_website)}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <Text style={{color: 'white', marginHorizontal: 20}}>{item.source_name}</Text>
                      <Ionicons name="open" color={'white'} size={20}/>
                    </View>                    
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={{marginTop: 20, borderRadius: 20, borderWidth: 2, padding: 10, borderColor: 'white', backgroundColor: '#001f3f'}} onPress={() => navigation.navigate('HCPList', {specialist_id : 'SP.WCA.01'})}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <Text style={{color: 'white', marginHorizontal: 20}}>Vaccination near me</Text>
                      <Ionicons name="open" color={'white'} size={20}/>
                    </View>                    
                  </TouchableOpacity>
  
                  <TouchableOpacity style={{marginTop: 20, borderRadius: 20, borderWidth: 2, padding: 10, borderColor: 'white', backgroundColor: '#001f3f'}} onPress={() => alert('One Place to store your Vaccine Report Card - contact developer to unlock this feature.')}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <Text style={{color: 'white', marginHorizontal: 20}}>Vaccine Card Vault</Text>
                      <Ionicons name="card" color={'white'} size={20}/>
                    </View>                    
                  </TouchableOpacity>
  
                  <TouchableOpacity style={{marginTop: 20, borderRadius: 20, borderWidth: 2, padding: 10, borderColor: 'white', backgroundColor: '#001f3f'}} onPress={() => _OpenBrowser(`https://wwwnc.cdc.gov/travel/`)}>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                      <Text style={{color: 'white', marginHorizontal: 20}}>Travel Restrictions</Text>
                      <Ionicons name="airplane" color={'white'} size={20}/>
                    </View>                    
                  </TouchableOpacity>                                                            
                  </View>
              );
            }
          })}
          
          <TouchableOpacity style={{position: 'absolute', bottom: 5, right: 5, padding: 15}} onPress={() => navigation.openDrawer()}>
          <Ionicons name="md-menu-outline" size={32} color="grey" />
        </TouchableOpacity>      
      </SafeAreaView>
      
    )
  }

export default GetVaccinated;