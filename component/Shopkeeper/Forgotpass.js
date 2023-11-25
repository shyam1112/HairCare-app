import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ToastAndroid, ActivityIndicator,ScrollView, Pressable } from 'react-native';
import emailjs from "emailjs-com";
import { useNavigation } from '@react-navigation/native';

export default function Forgotpass() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(true);
  const [otp, setOtp] = useState();
  const [inputotp, setInputotp] = useState('');
  const [isotptrue, setIsotptrue] = useState(false);

  const [newpass, setNewpass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigation = useNavigation();
  const [btn, setbtn] = useState(false);


  const changepass = async () => {
    if (newpass === '') {
      ToastAndroid.show('Password is required!', ToastAndroid.TOP);
    } else if (newpass.length < 6) {
      ToastAndroid.show('Password must be at least 6 characters!', ToastAndroid.TOP);
    } else if (confirmPass === '') {
      ToastAndroid.show('Confirm Password is required!', ToastAndroid.TOP);
    } else if (confirmPass.length < 6) {
      ToastAndroid.show('Confirm Password must be at least 6 characters!', ToastAndroid.TOP);
    } else if (newpass !== confirmPass) {
      ToastAndroid.show('Password and Confirm Password do not match!', ToastAndroid.TOP);
    } else if (newpass === confirmPass) {
      try {
        const response = await fetch(`https://haircare.onrender.com/updatepass/${email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pass: newpass }),
        });

        // Assuming a JSON response, you can handle the result accordingly
        const result = await response.json();
        // console.log(result);
        if (result) {
          ToastAndroid.show('Your password successfully changed.', ToastAndroid.TOP);
          navigation.navigate('shoplogin');
        }
      } catch (error) {
        console.error('Error updating password:', error);
      }
    } else {
      ToastAndroid.show('Both password must be same.', ToastAndroid.TOP);
    }
  }

  const sendEmail = () => {

    const random = Math.floor(Math.random() * 9000 + 1000);
    console.log(email);
    setOtp(random);

    let templateParams = {
      name: "TrimTime",
      message: `Your otp is : ${random}`,
      to_email: email,
      reply_to: "sp410555@gmail.com",
    };
    // console.log('ENVIADOS: ', JSON.stringify(templateParams));

    emailjs.send('service_6se97ge', 'template_avsr4gr', templateParams, 'oDZE8-JCpOxxHwxUr').then(
      function (response) {
        console.log('SUCCESS!', response.status, response.text);
        setSuccess(false);
      },
      function (error) {
        console.log('FAILED...', error);
      }
    );

  }

  const checkemail = async() => {
    setbtn(true);
    if (email === '') {
      ToastAndroid.show('Email is required!', ToastAndroid.TOP);
    } else if (!email.includes('@')) {
      ToastAndroid.show('Include @ in your email!', ToastAndroid.TOP);
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
          sendEmail();
        }
        setbtn(false);
      } catch (error) {
        console.error('Error checking email:', error);
        ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.TOP);
      }
    }
  }
  const submitotp = () => {
    if (inputotp.length < 4) {
      ToastAndroid.show('Please Enter Correct OTP!', ToastAndroid.TOP);
    } else {
      if (String(inputotp) === String(otp)) {
        setIsotptrue(true);
        // console.log("OTP is same!!");
      } else {
        console.log("OTP is undefine/wrong");
        ToastAndroid.show('OTP is incorrect.', ToastAndroid.TOP);
      }
    }
    // console.log(inputotp);
  }

  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(true);

  const togglepass = () => {
    setToggle1(!toggle1);
  }

  const toggleconpass = () => {
    setToggle2(!toggle2)
  }


  return (
    <View style={styles.container}>
      {
        success ? (
          <View style={styles.container}>
            <View style={styles.title}>
              <Text style={{ textAlign: 'center', fontSize: 20 }}>Don't Worry! We are here</Text>
            </View>

            <Text style={{ marginTop: 40, fontSize: 11, marginBottom: 5, color: 'grey' }}>We will send OTP to your mailID</Text>
            <View style={{
              alignSelf: 'center',
              borderWidth: 1,
              borderColor: 'grey',
              width: 250,
              borderRadius: 20,
              height: 50,

              backgroundColor: '#fff',
              flexDirection: 'row',
            }}>

              <Image
                source={require('./email.png')}
                style={styles.icon}
              />
              <ScrollView horizontal={true}>

                <TextInput
                  style={styles.email}
                  placeholder='Enter Your Email'
                  value={email}
                  onChangeText={(e) => setEmail(e)}
                />
              </ScrollView>
            </View>

            {btn ? (
              <View style={{ marginTop: 20 }}>
                <ActivityIndicator size="large" color="#0000ff" />
              </View>
            ) :
            <View>
              <TouchableOpacity onPress={checkemail}>
                <Text style={{ backgroundColor: 'skyblue', width: 100, height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 10, fontSize: 15, marginTop: 20 }}>Send</Text>
              </TouchableOpacity>
            </View>
            }
          </View>
        ) : (
          <View style={styles.container}>
            {isotptrue ? (
              <View style={styles.container}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Change Password</Text>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: '500', color: 'grey' }}>Enter New Password</Text>

                  <View style={styles.textbox2}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={require('./password.png')}
                        style={styles.icon}
                      />
                      <TextInput secureTextEntry={toggle1} style={styles.textbox1text} placeholder='Enter Password' value={newpass} onChangeText={(text) => setNewpass(text)} />
                    </View>
                    {toggle1 ?
                      <Pressable onPress={togglepass}>
                        <Image
                          source={require('./passhide.png')}
                          style={[styles.icon, { marginRight: 10 }]}
                        />
                      </Pressable>
                      :
                      <Pressable onPress={togglepass}>
                        <Image
                          source={require('./passshow.png')}
                          style={[styles.icon, { marginRight: 10 }]}
                        />
                      </Pressable>
                    }
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <Text style={{ fontWeight: '500', color: 'grey' }}>Confirm Password</Text>
                  <View style={styles.textbox2}>
                    <View style={{ flexDirection: 'row' }}>
                      <Image
                        source={require('./password.png')}
                        style={styles.icon}
                      />
                      <TextInput secureTextEntry={toggle2} style={styles.textbox1text} placeholder='Enter Password' value={confirmPass} onChangeText={(text) => setConfirmPass(text)} />
                    </View>
                    {toggle2 ?
                      <Pressable onPress={toggleconpass}>
                        <Image
                          source={require('./passhide.png')}
                          style={[styles.icon, { marginRight: 10 }]}
                        />
                      </Pressable>
                      :
                      <Pressable onPress={toggleconpass}>
                        <Image
                          source={require('./passshow.png')}
                          style={[styles.icon, { marginRight: 10 }]}
                        />
                      </Pressable>
                    }
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={changepass}>
                    <Text style={{ backgroundColor: 'skyblue', width: 100, height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 10, fontSize: 15, marginTop: 20 }}> Submit </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.container}>
                <Text style={{ textAlign: 'center', fontSize: 20 }}>Verify the Authorisation Code</Text>
                <Text style={{ textAlign: 'center', fontSize: 17, fontWeight: '500' }}>Sent to {email}</Text>
                <View style={{ borderColor: 'gray', borderWidth: 1, flexDirection: 'row', marginTop: 30, borderRadius: 10, marginBottom: 10 }}>

                  <TextInput
                    style={styles.otpinput}
                    placeholder='Enter otp here'
                    value={inputotp}
                    onChangeText={(e) => setInputotp(e)}
                    require
                  />
                </View>

                <View>
                  <TouchableOpacity onPress={submitotp}>
                    <Text style={{ backgroundColor: 'skyblue', width: 100, height: 40, textAlign: 'center', textAlignVertical: 'center', borderRadius: 10, fontSize: 15, marginTop: 20 }}> Submit </Text>
                  </TouchableOpacity>
                </View>

              </View>
            )

            }
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
    marginTop: 11,
    marginLeft: 8,
    alignContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 50
  },
  email: {
    height: 40,
    marginTop: 3,
    paddingHorizontal: 10,
    width: 220,
    marginBottom: 3
  },
  otpinput: {
    height: 40,
    marginTop: 3,
    paddingHorizontal: 10,
    width: 220,
    marginBottom: 3
  },
  textbox2: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    width: 250,
    borderRadius: 10,
    height: 45,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textbox1text: {
    height: 50,
    fontSize: 15,
    marginLeft: 10,
    marginTop: -4,
  },
});
