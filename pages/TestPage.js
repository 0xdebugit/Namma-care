import React, { useState, useEffect, useRef  } from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/externalstyle';

function TestPage({navigation}){

    // List of Symptom check enabled
    const test_list = [{"name":"Covid-19 Test","id":"0","disabled":"false","check":"covid_19"},{"name":"Headaches","id":"1","disabled":"false","check":"general_checkup"},{"name":"Fever","id":"2","disabled":"false","check":"fever"},{"name":"Skin Rashes","id":"3","disabled":"true","check":"general_checkup_arc"},{"name":"Neck Pain","id":"4","disabled":"true","check":"general_checkup_arc"},{"name":"Nausea & Vomiting","id":"5","disabled":"true","check":"general_checkup_arc"},{"name":"Hearing Problems","id":"6","disabled":"true","check":"general_checkup_arc"},{"name":"Genital Problems","id":"7","disabled":"true","check":"general_checkup_arc"},{"name":"Hair Loss","id":"8","disabled":"true","check":"general_checkup_arc"}];
  
    const Item = ({data}) => {
      if(data.disabled == 'false'){
        return(			
          <View style={[styles.news_topline]}>
          <TouchableOpacity onPress={() => navigation.navigate('SymptomCheck', {data : data.check, id : data.id})} >
            <Text style={{ padding: 20,fontSize: 18, textAlign: 'center', color: 'white', fontFamily: 'Poppins_400Regular'}}>{data.name}</Text>
            </TouchableOpacity>
          </View>
        );
      }else{
        return(			
          <View style={[styles.inactive_topline]}>
          <TouchableOpacity disabled={true}>
            <Text style={{ padding: 20,fontSize: 18, textAlign: 'center', color: 'grey'}}>{data.name}</Text>
            </TouchableOpacity>
          </View>
        );
      }
    }
  
    const renderItem = ({item,index}) => {
        return (
            <Item data={item} />
        );
    };

    const FlatListHeader = ({item}) => {
      return (
        <View elevation={1} 
        >
          <Text style={{fontSize:25,color:'#014c7a', fontFamily: 'Poppins_600SemiBold', marginTop: 50}}>Check your Symptoms</Text>
        </View>
      );
    }
  
    const FlatListFooter = () => {
      return (
          <View elevation={1} >
            <Text style={{marginLeft:20,fontSize:15,color:'black',alignItems:'center'}}></Text>
          </View>
      );
    }  
  
    return(
      <SafeAreaView style={{ flex: 1, padding: 10,}}>			
        <FlatList
            data={test_list}
            renderItem={renderItem}
            ListHeaderComponent = { FlatListHeader }
            ListFooterComponent = { FlatListFooter }				
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        <TouchableOpacity style={{alignSelf: 'flex-end', padding: 10}} onPress={() => navigation.openDrawer()}>
          <Ionicons name="md-menu-outline" size={32} color="grey" />
        </TouchableOpacity>      
    </SafeAreaView>
    );
  }

export default TestPage;