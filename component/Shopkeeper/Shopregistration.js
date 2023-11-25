import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Pressable, KeyboardAvoidingView, ScrollView, ToastAndroid, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegistrationForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [btn, setbtn] = useState(false);
  const navigation = useNavigation();

  const adddata = async () => {
    try {
      const response = await fetch('https://haircare.onrender.com/shopreg', {
        method: 'POST',
        body: JSON.stringify({ name, email, pass: password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        ToastAndroid.show('Registration Successfully done 😃!', ToastAndroid.TOP);
        navigation.navigate('shoplogin');
        // You can navigate to another screen or perform other actions here
      } else {
        ToastAndroid.show('Registration failed. Please try again later.', ToastAndroid.TOP);
      }
    } catch (error) {
      console.warn('Error during registration:', error);
      ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.TOP);
    }

  }
  const register = async () => {
    setbtn(true);
    if (name === '') {
      ToastAndroid.show('Name is required!', ToastAndroid.TOP);
    } else if (email === '') {
      ToastAndroid.show('Email is required!', ToastAndroid.TOP);
    } else if (!email.includes('@')) {
      ToastAndroid.show('Email must include @!', ToastAndroid.TOP);
    } else if (password === '') {
      ToastAndroid.show('Password is required!', ToastAndroid.TOP);
    } else if (password.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters!', ToastAndroid.TOP);
    } else if (confirmPassword === '') {
      ToastAndroid.show('Confirm Password is required!', ToastAndroid.TOP);
    } else if (confirmPassword.length < 6) {
      ToastAndroid.show('Confirm Password must be at least 6 characters!', ToastAndroid.TOP);
    } else if (password !== confirmPassword) {
      ToastAndroid.show('Password and Confirm Password do not match!', ToastAndroid.TOP);
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
          adddata();
        } else {
          ToastAndroid.show("Email already exists. Please use a different email.", ToastAndroid.TOP);
        }
      } catch (error) {
        console.error('Error checking email:', error);
        ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.TOP);
      }
    }
    setbtn(false);
  };

  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);

  const togglepass = () => {
    setToggle1(!toggle1);
  }

  const toggleconpass=()=>{
    setToggle2(!toggle2)
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#DFEBF5' }}>
      <View style={styles.lotify}>
        <LottieView style={{ flex: 1 }} source={require('./shoplogin.json')} autoPlay loop />
      </View>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1, height: 2 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.login}>
            <Text style={{ marginLeft: 60, marginTop: 30, fontSize: 30, fontWeight: '500' }}>Register</Text>

            <View style={styles.textbox}>
              <Image
                source={require('./user.png')}
                style={styles.icon}
              />
              <ScrollView horizontal={true}>

                <TextInput
                  style={styles.textboxText}
                  placeholder="Name"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
              </ScrollView>
            </View>

            <View style={styles.textbox}>
              <Image
                source={require('./email.png')}
                style={styles.icon}
              />
              <ScrollView horizontal={true}>

                <TextInput
                  style={styles.textboxText}
                  placeholder="Email"
                  value={email}
                  onChangeText={(text) => setEmail(text.toLowerCase())}
                />
              </ScrollView>
            </View>

            <View style={[styles.textbox,{justifyContent:'space-between'}]}>
              <View style={{flexDirection:'row'}}>
              <Image
                source={require('./password.png')}
                style={styles.icon}
                />
              <TextInput
                style={styles.textboxText}
                placeholder="Password"
                secureTextEntry={toggle1}
                value={password}
                onChangeText={(text) => setPassword(text)}
                />
                </View>
                {toggle1 ? 
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

        
            <View style={[styles.textbox,{justifyContent:'space-between'}]}>
              <View style={{flexDirection:'row'}}>
              <Image
                source={require('./password.png')}
                style={styles.icon}
              />
              <TextInput
                style={styles.textboxText}
                placeholder="Confirm Password"
                secureTextEntry={toggle2}
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
              />
              </View>
              {toggle2 ? 
                <Pressable onPress = { toggleconpass }>
                <Image
                source = { require('./passhide.png') }
                style = { [styles.icon, { marginRight: 10 }] }
                />
            </Pressable>
              :
                <Pressable onPress = { toggleconpass }>
                <Image
                source = { require('./passshow.png') }
                style = { [styles.icon, { marginRight: 10 }] }
                />
            </Pressable>
                }
            </View>

            {btn ? (
              <View style={{ marginTop: 20 }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) :
              <Pressable onPress={register}>
                <View style={styles.btn}>
                  <Text style={{ textAlign: 'center', textAlignVertical: 'center', color: 'white', flex: 1, fontWeight: '800', fontSize: 20 }}>Register</Text>
                </View>
              </Pressable>
            }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
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
  textbox: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'black',
    width: 250,
    borderRadius: 20,
    height: 50,
    marginTop: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  textboxText: {
    height: 50,
    fontSize: 15,
    marginLeft: 10,
    marginTop: -3,
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
