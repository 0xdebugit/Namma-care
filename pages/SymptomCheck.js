import React, { useState, useEffect, useRef  } from 'react';
import { Text, View, ScrollView, StatusBar, Dimensions, TouchableOpacity, Image,} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import styles from '../styles/externalstyle';

const deviceWidth = Dimensions.get('window').width;

// Static Symptom Checker good for demo, but accuracy can be improved if it's dynamic

function SymptomCheck({ route, navigation }){
    let scroll;
    const isFocused = useIsFocused();
    const scrollRef = useRef();
    const checkup_type = route.params.data;
    const id = route.params.id;
  
    const [Answer, SetAnswer] = useState([{'covid_19' : [], 'general_checkup' : [], 'fever' : []}]);
    const [Result, SetResult] = useState('');
  
    // This should be dynamic, processing can be done at server and send reponse in JSON
    const static_final_recommendation = [{'covid_19' : {'bad' : 'Seek immediate medical care', 'ok_1' : 'Remain at home and avoid unnecessary contact', 'ok_2' : 'Remain at home and avoid unnecessary contact', 'good' : 'Stay home and monitor your symptoms.'} }, {'general_checkup' : {'bad' : 'You may have the COLD or the FLU. Get plenty of rest and drink plenty of water. If your symptoms get worse, see a doctor immediately.', 'ok_1' : 'Your headaches may be due to VISION PROBLEMS. Give yourself frequent eye breaks while reading or studying for extended periods of time. If your symptoms get worse, see a doctor immediately.', 'ok_2' : 'Your headaches may be from HYPOGLYCEMIA (i.e., low blood sugar). You can also try eating 6 small meals a day rather than 3 large meals. This may regulate your blood sugar. If your symptoms get worse, see a doctor immediately.', 'good' : 'Take care of your self, If your symptoms get worse, see a doctor immediately.'} }, {'fever' : {'bad' : 'Over-the-counter- medicines may help relieve your symptoms. Your symptoms may require medical evaluation. Schedule an appointment with your doctor.', 'ok_1' : 'You may have MONONUCLEOSIS (also known as MONO), which is a viral infection that can lead to swollen glands in your neck and a swollen/tender spleen. If your symptoms get worse, see a doctor immediately.', 'ok_2' : 'You may have GASTROENTERITIS, an intestinal infection commonly called the STOMACH FLU. If your symptoms get worse, see a doctor immediately.', 'good' : 'Take care of your self, If your symptoms get worse, see a doctor immediately.'} }]

    // Test answer logic, again the reponse can be dynamic from server
    const test_answers = {"covid_19_results":["bad","ok_1","ok_2","good"],"covid_19":[{"bad":["Yes","Yes"]},{"ok_1":["Yes","No"]},{"ok_2":["No","Yes"]},{"good":["No","No"]}],"general_checkup_results":["bad","ok_1","ok_2","good"],"general_checkup":[{"bad":["Yes","Yes"]},{"ok_1":["Yes","No"]},{"ok_2":["No","Yes"]},{"good":["No","No"]}],"fever_results":["bad","ok_1","ok_2","good"],"fever":[{"bad":["Yes","Yes"]},{"ok_1":["Yes","No"]},{"ok_2":["No","Yes"]},{"good":["No","No"]}]}
  
    const nextPage = (indexx, data, required) => {
      let newArr = [...Answer];
      
      if(required){
        newArr[0][checkup_type] = [...newArr[0][checkup_type],data];
        SetAnswer(newArr);
      }
      
      // Pagination
      scrollRef.current?.scrollTo({ x: deviceWidth * (indexx + 1) })
      if(newArr[0][checkup_type].length > 0){
        test_answers[`${checkup_type}_results`].map((item, ind) => {
          if(JSON.stringify(newArr[0][checkup_type]) === JSON.stringify(test_answers[checkup_type][ind][item])){
            SetResult(item);
          }
        });
     
      }
    }  
  
    const goBack = () => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
      });
      navigation.goBack();
    }
    
    // Symptom check Queries, again this can be dynamic from server
    const arrayList = {"covid_19":[{"text":"Are you answering for yourself or someone else?","options":["Myself","Someone else"],"process":"step","required":false},{"text":"Do you currently have symptoms that may be due to COVID-19, particularly a ​cough, difficulty breathing, feeling feverish​ as well as, in some cases, diarrhea, muscle aches, fatigue, sore throat or runny nose?","options":["Yes","No"],"process":"step","required":true},{"text":"Have you recently lost the ability to smell or taste without any apparent cause of this situation?","options":["Yes","No"],"process":"step","required":true},{"text":"Thanks for taking test !","options":["Book a Consultation","Close"],"process":"end","required":false,"specialist":"SP.WCA.01"}],"general_checkup":[{"text":"Are you answering for yourself or someone else?","options":["Myself","Someone else"],"process":"step","required":false},{"text":"Do your headaches occur after you read, watch TV, or use a computer?","options":["Yes","No"],"process":"step","required":true},{"text":"Do you get headaches and feel shaky and weak if you miss a meal?","options":["Yes","No"],"process":"step","required":true},{"text":"Thanks for taking test !","options":["Book a Consultation","Close"],"process":"end","required":false,"specialist":"SP.WCA.01"}],"fever":[{"text":"Are you answering for yourself or someone else?","options":["Myself","Someone else"],"process":"step","required":false},{"text":"Have you had a fever for weeks, along with tiredness and a sore throat?","options":["Yes","No"],"process":"step","required":true},{"text":"Do you have aches, chills, nausea, vomiting, cramps, or watery diarrhea?","options":["Yes","No"],"process":"step","required":true},{"text":"Thanks for taking test !","options":["Book a Consultation","Close"],"process":"end","required":false,"specialist":"SP.WCA.01"}]}
  
      return(
        <View style={styles.container}>
  
          <View style={{flexDirection: 'row', marginTop: StatusBar.currentHeight || 0, padding: 10}}>
            <Ionicons name="information-circle" color={'grey'} size={20}/>
            <Text style={{fontFamily: 'Poppins_300Light'}}> Experimental</Text>
          </View>  
  
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            pagingEnabled
            scrollEnabled={false}
            ref={scrollRef}
          >
  
          {
            arrayList[checkup_type].map((option,indexx) => 
            option.process != 'end' ?
              <View style={{width: deviceWidth, justifyContent: 'flex-end', marginVertical: 30}} key={indexx}>
                <Image source={require('../assets/frame_1.png')} style={styles.image}/>                
                <Text style={styles.title}>{option.text}</Text>
                <View style={{justifyContent: 'space-between', padding: 10}}>
                  {option.options.map((item,index) => 
                  <TouchableOpacity style={{alignSelf: 'flex-end',paddingHorizontal: 40,paddingVertical: 10, borderWidth: 1, borderRadius: 20, borderColor: '#2692eb', marginTop: 10 }} onPress={() => nextPage(indexx, item, option.required)} key={index}>
                    <Text style={{textAlign: 'center', fontFamily: 'Poppins_400Regular', color: '#2692eb'}}>{item}</Text>
                  </TouchableOpacity>
                  )}        
                </View>          
              </View>    :
  
              <View style={{width: deviceWidth, justifyContent: 'flex-end', marginVertical: 30}} key={indexx}>
                <Text style={styles.title}></Text>
                <View style={{marginBottom: 50, padding: 10}}>
                <Image source={require('../assets/frame_1.png')} style={styles.image}/>              
                  <Text style={{fontSize: 15, fontFamily: 'Poppins_300Light', color: 'grey'}}>Recommendation</Text>
                  <Text style={{fontSize: 20, fontFamily: 'Poppins_600SemiBold'}}>{static_final_recommendation[id][checkup_type][Result]}</Text>
                  <Text style={{fontFamily: 'Poppins_300Light', color: '#74797d'}}>{checkup_type == 'covid_19' ? `According to XYZ Health Organization’s guidelines, your symptoms are ${Result == 'bad' ? 'suggestive' : 'not suggestive'} of COVID-19 infection. Still, it is better if you recover from your illness or symptoms at home. This will benefit your and other people’s safety. If your symptoms seem severe and you are worried, contact your doctor or local health authorities.` : ''}</Text>
    
                  {checkup_type !== 'covid_19' ?
                  <View>
                  <Text style={{fontFamily: 'Poppins_500Medium'}}>Specialist :</Text><Text style={{fontFamily: 'Poppins_300Light'}}>General Practitioner</Text></View> : <Text></Text>
                  }
    
    
                </View>
                <View style={{justifyContent: 'space-between', padding: 10}}>
    
                  <TouchableOpacity style={{alignSelf: 'flex-end', paddingHorizontal: 20,paddingVertical: 10, borderWidth: 1, borderRadius: 20, borderColor: '#001f3f', backgroundColor: '#001f3f', marginTop: 10 }} onPress={() => navigation.navigate('HCPList', {specialist_id : option.specialist})} >
                    <Text style={{textAlign: 'center', color: 'white'}}>Book a Consultation</Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity style={{alignSelf: 'flex-end', paddingHorizontal: 20,paddingVertical: 10, borderWidth: 1, borderRadius: 20, borderColor: '#001f3f', marginTop: 10 }} onPress={() => goBack()} >
                    <Text style={{textAlign: 'center', color: 'black'}}>Close</Text>
                  </TouchableOpacity>              
          
                </View>          
              </View>          
  
            )
          }
        </ScrollView>
      </View>
      );
  }

export default SymptomCheck;