import React,{useEffect, useState} from 'react'; 
import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AddData from './AddData';
import RequestAccept from './RequestAccept';
import Profile from './Profile';
import UpdateData from './UpdateData';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Shophome() {
  const Tab = createMaterialTopTabNavigator();

  const [owner, setOwner] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [shopname, setShopname] = useState('');
  const [address, setAddress] = useState('');

  const getData = async () => {
    const userId = await AsyncStorage.getItem('userid');
    let result = await fetch(`https://haircare.onrender.com/getshopdatabyid/${userId}`);
    result = await result.json();
    // console.log(result[0].owner);
    setOwner(result[0].owner);
    setShopname(result[0].shopname);
    setMobilenumber(result[0].mobilenumber);
    setAddress(result[0].address);
}

useEffect(()=>{
  getData();
})

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={RequestAccept} />
      {owner || mobilenumber || shopname ||address ?
      <Tab.Screen name="Update Shop" component={UpdateData} />:
      <Tab.Screen name="Add Shop" component={AddData} />
      }
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

