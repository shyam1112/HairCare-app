import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Image, KeyboardAvoidingView, ScrollView, ToastAndroid, TouchableOpacity, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Shoplogin() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [btn, setbtn] = useState(false);

  useEffect(() => {
    // AsyncStorage.getItem('userid')
    //   .then((auth) => {
    //     if (auth) {
    //       navigation.navigate('shophome');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error retrieving data:', error);
    //   });
  }, []);


  const fetchdata = async () => {
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


  const login = async () => {
    setbtn(true);
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
        const response = await fetch('https://haircare.onrender.com/checkEmail', {
          method: 'POST',
          body: JSON.stringify({ email }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!data.exists) {
          ToastAndroid.show("Email doesn't exists. Please use a different email.", ToastAndroid.TOP);
        } else {
          // Email is available, proceed with login
          fetchdata();
        }
      } catch (error) {
        console.error('Error checking email:', error);
        ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.TOP);
      }
    }
    setbtn(false);
  }

  const registernow = () => {
    // console.warn('Register');
    navigation.navigate('shopregi');
  }

  const gotoforgot = () => {
    navigation.navigate('forgotpassword');

  }
  const [toggle, setToggle] = useState(true);
  const togglepass = () => {
    setToggle(!toggle);
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#DFEBF5' }}>
      <View style={styles.lotify}>
        <LottieView style={{ flex: 1 }} source={require('./shoplogin.json')} autoPlay loop />
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
              {/* <View> */}
              <Image
                source={require('./email.png')}
                style={styles.icon}
              />
              {/* </View> */}
              <ScrollView horizontal={true}>
                <TextInput style={styles.textbox1text} placeholder='Enter Email' value={email} onChangeText={(text) => setEmail(text.toLowerCase())} />
              </ScrollView>
            </View>
            <View style={styles.textbox2}>
              <View style={{ flexDirection: 'row' }}>
                <Image
                  source={require('./password.png')}
                  style={styles.icon}
                />
                <TextInput secureTextEntry={toggle} style={styles.textbox1text} placeholder='Enter Password' value={pass} onChangeText={(text) => setPass(text)} />
              </View>
              {toggle ? 
                <Pressable onPress = { togglepass }>
                <Image
                source = { require('./passhide.png') }
                style = { [styles.icon, { marginRight: 10 }] }
                />
            </Pressable>
              :
                <Pressable onPress = { togglepass }>
                <Image
                source = { require('./passshow.png') }
                style = { [styles.icon, { marginRight: 10 }] }
                />
            </Pressable>
                }
          </View>
          <View>
            {btn ? (
              <View style={{ marginTop: 20 }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) :

              <Pressable onPress={login}>
                <View style={styles.btn}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white', flex: 1, fontWeight: 800, fontSize: 20 }}>Login</Text>
                </View>
              </Pressable>
            }
          </View>

          <View>
            <TouchableOpacity onPress={gotoforgot}>
              <Text style={{ textAlign: 'center', marginTop: 35, color: 'darkblue', fontSize: 14 }}>
                Forgot password ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </View >
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginTop: 12,
    marginLeft: 8,
    alignContent: 'center',
  },
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
    borderColor: 'grey',
    width: 250,
    borderRadius: 20,
    height: 50,
    marginTop: 50,
    backgroundColor: '#fff',
    flexDirection: 'row',
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
    borderColor: 'grey',
    width: 250,
    borderRadius: 20,
    height: 50,
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
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
