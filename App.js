import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './component/Home/Home';
import Cushome from './component/Customer/Cushome';
import Shoplogin from './component/Shopkeeper/Shoplogin';
import Shophome from './component/Shopkeeper/Shophome';
import Shopregistration from './component/Shopkeeper/Shopregistration';
import { Button, View, StyleSheet, TouchableOpacity, Text,StatusBar } from 'react-native';
import AddData from './component/Shopkeeper/AddData';
import RequestAccept from './component/Shopkeeper/RequestAccept';
import Profile from './component/Shopkeeper/Profile';
import Shopdata from './component/Customer/Shopdata';
import Forgotpass from './component/Shopkeeper/Forgotpass';


const Stack = createNativeStackNavigator();

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'skyblue',
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontSize: 20,
          },
        }}
      >
        <Stack.Screen
          name="null"
          component={Home}
          options={{
            title: "✂️  TrimTime  ✂️",
            headerStyle:{
              backgroundColor:'#407CB5',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="cushome"
          component={Cushome}
          options={{
            title: 'TrimTime - Customer',
          }}
        />
        <Stack.Screen
          name="shoplogin"
          component={Shoplogin}
          options={{
            title: 'TrimTime - Login',
          }}
        />
        <Stack.Screen
          name="shophome"
          component={Shophome}
          
          options={() => ({
            title: 'TrimTime - Home',
          })}
        />
        <Stack.Screen
          name="shopregi"
          component={Shopregistration}
          options={{
            title: 'TrimTime - Registration',
          }}
        />
        <Stack.Screen
          name="shopdata"
          component={Shopdata}
          options={{
            title: 'Barber Shop',
          }}
        />
         <Stack.Screen
          name="forgotpassword"
          component={Forgotpass}
          options={{
            title: 'Barber Shop',
          }}
        />
{/* 
        <Stack.Screen
          name="adddata"
          component={AddData}
        />

        <Stack.Screen
          name="requestaccept"
          component={RequestAccept}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    flex: 1,
    backgroundColor: '#333',
    padding: 20,
    justifyContent: 'center',
  },
  sidebarItem: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  content: {
    flex: 2,
    padding: 20,
  },
  menuButton: {
    margin: 10,
  },
  menuButtonInner: {
    width: 30,
    height: 25,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuBar: {
    width: 30,
    height: 3,
    backgroundColor: '#333',
  },
});

