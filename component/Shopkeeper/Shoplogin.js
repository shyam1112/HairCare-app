import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Shoplogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  // navigation.navigate('shophome');
  useEffect(() => {
    AsyncStorage.getItem('userid')
      .then((auth) => {
        if (auth) {
          navigation.navigate('shophome');
        }
      })
      .catch((error) => {
        console.error('Error retrieving data:', error);
      });
  }, []);
  

  const login = async () => {
    if (email === '') {
      ToastAndroid.show('Email is required!', ToastAndroid.TOP);
    } else if (!email.includes('@')) {
      ToastAndroid.show('Include @ in your email!', ToastAndroid.TOP);
    } else if (pass === '') {
      ToastAndroid.show('Password is required!', ToastAndroid.TOP);
    } else if (pass.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters!', ToastAndroid.TOP);
    } else {
      try {
        const response = await fetch('https://haircare.onrender.com/shoplogin', {
          method: 'POST',
          body: JSON.stringify({ email, pass }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.name) {
          await AsyncStorage.setItem('user', JSON.stringify(data));
          await AsyncStorage.setItem('userid', data._id);
          navigation.navigate('shophome');
        } else {
          ToastAndroid.show('Login failed. Please check your credentials and try again.', ToastAndroid.TOP);
        }
      } catch (error) {
        console.error('Error during login:', error);
        ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.TOP);
      }
    }
  }

  const registernow = () => {
    console.warn('Register');
    navigation.navigate('shopregi');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#DFEBF5' }}>
      <View style={styles.lotify}>
        <LottieView style={{ flex: 1 }} source={require('./shoplogin.json')} autoplay loop />
      </View>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1, height: 2 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.login}>
            <View style={{}}>
              <Text style={{ marginLeft: 60, marginTop: 30, fontSize: 30, fontWeight: 500 }}>Welcome,</Text>
              <Text style={{ marginLeft: 60, marginTop: 2, fontSize: 15 }}>Don't have an account?
                <Pressable onPress={registernow}>
                  <Text style={{ color: 'red', marginTop: 3, fontSize: 15 }}> Register Now</Text>
                </Pressable>
              </Text>
            </View>
            <View style={styles.textbox1}>
              <TextInput style={styles.textbox1text} placeholder='Enter Email' value={email} onChangeText={(text) => setEmail(text.toLowerCase())} />
            </View>
            <View style={styles.textbox2}>
              <TextInput secureTextEntry={true} style={styles.textbox1text} placeholder='Enter Password' value={pass} onChangeText={(text) => setPass(text)} />
            </View>
            <Pressable onPress={login}>
              <View style={styles.btn}>
                <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white', flex: 1, fontWeight: 800, fontSize: 20 }}>Login</Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  lotify: {
    width: 400,
    height: 200,
    alignSelf: 'center',
    flex: 0.5,
  },
  login: {
    backgroundColor: '#F5FBFF',
    flex: 1,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    shadowColor: 'black',
    elevation: 10,
    shadowOpacity: 1,
  },
  textbox1: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    width: 250,
    borderRadius: 20,
    height: 50,
    marginTop: 50,
    backgroundColor: '#fff',
  },
  textbox1text: {
    height: 50,
    fontSize: 15,
    marginLeft: 10,
    marginTop: -3,
  },
  textbox2: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    width: 250,
    borderRadius: 20,
    height: 50,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  btn: {
    alignSelf: 'center',
    backgroundColor: '#5B83A5',
    width: 150,
    borderRadius: 40,
    height: 50,
    marginTop: 30,
    shadowColor: 'black',
    elevation: 5,
    shadowOpacity: 1,
  },
});
