import React, {useState, useEffect} from 'react';
import { Text, View, TouchableOpacity, Image} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/externalstyle';
import { useIsFocused } from '@react-navigation/native';
import * as Print from 'expo-print';
import AsyncStorage from '@react-native-async-storage/async-storage';

const readData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value;
    } catch(e) {
      // error reading value
      console.log('error reading value '+e);
    }
  }

function DownloadReport({navigation, route}){
    // console.log(route.params.UserData);
    const isFocused = useIsFocused();
    const temp_ans = route.params.data;
    const [UserData, SetUserData] = useState({});
    useEffect(() => {
        async function LoadProfileData(){
          // clearAll();
          let name = await readData("Username");
          let gender = await readData("Gender");
          let age = await readData("Age");
          let height = await readData("Height");
          let weight = await readData("Weight");          
          SetUserData({'Username' : name, 'Age': age, 'Gender': gender, 'Bmi': (weight / Math.pow(height/ 100, 2)).toFixed(1)});
          
        }

        LoadProfileData();

    },[isFocused]);    
    const html_template = `<html><style>
    @page {
      padding: 80px;
      font-size: 130px;
    }
    </style><body>
    <h1 style="text-align: center;">Assessment Report</h1>
    <h5 style="position : absolute; bottom: -20; right: 300;">Generated using Namma Care</h5>
    <hr>
    <h3>Name : ${UserData.Username}</h3>
    <h3>Date : ${new Date().toLocaleString()}</h3>
    <h3>Age : ${UserData.Age}</h3>
    <h3>BMI : ${UserData.Bmi}</h3>
    <h3>Gender : ${UserData.Gender}</h3>
    <hr>
    <h3>Symptoms </h3>
    ${temp_ans}
    <hr>
    <p>Recommendations by Namma care :</p>
    ${route.params.rec}
    </body></html>`;    


		return(
			<View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
					<TouchableOpacity style={{borderWidth: 2, borderRadius: 20, paddingHorizontal: 30, paddingVertical: 20}} onPress={() => Print.printAsync({
            html: html_template,
            height: 842,
            width: 595,
          })}>
						<Text style={{textAlign: 'center', color: 'black'}}>Download Report</Text>
					</TouchableOpacity>      
			</View>
		);
	}

export default DownloadReport;