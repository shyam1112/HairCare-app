import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    ScrollView,
    Button,
    Platform,
    Keyboard,
    ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UpdateData() {
    const [owner, setOwner] = useState('');
    const [mobilenumber, setMobilenumber] = useState('');
    const [shopname, setShopname] = useState('');
    const [address, setAddress] = useState('');
    const [mainStyle, setMainStyle] = useState(styles.main);

    const navigation = useNavigation();

    const handleAddData = async () => {
        const userId = await AsyncStorage.getItem('userid');
        if (owner === '') {
            ToastAndroid.show('Name is required!', ToastAndroid.TOP);
        } else if (mobilenumber == '') {
            ToastAndroid.show('Number is required!', ToastAndroid.TOP);
        } else if (shopname == '') {
            ToastAndroid.show('Shopname is required!', ToastAndroid.TOP);
        }
        else if (address == '') {
            ToastAndroid.show('Address is required!', ToastAndroid.TOP);
        } else {


            try {
                const response = await fetch(`https://haircare.onrender.com/updatedata/${userId}`, {
                    method: 'PUT', 
                    body: JSON.stringify({ userId, shopname, owner, mobilenumber, address }),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });

                if (response.ok) {
                    // Data added successfully
                    ToastAndroid.show('Data Updated Successfully..done 😃!', ToastAndroid.TOP);
                    setTimeout(() => {
                        navigation.navigate('Home');
                    }, 2000);
                } else {
                    ToastAndroid.show('Data added failed. Please try again later.', ToastAndroid.TOP);
                }
            } catch (error) {
                console.error('Error sending data', error);
                ToastAndroid.show('An error occurred. Please try again later.', ToastAndroid.TOP);
            }
        }
    };

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




    useEffect(() => {
        getData();
        console.log(owner);
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setMainStyle({ ...styles.main, marginTop: 0, marginBottom: 0 });
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setMainStyle(styles.main);
            });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={mainStyle}
        >
            <ScrollView contentContainerStyle={styles.box}>
                <Text style={styles.textname}>Your Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Name"
                    onChangeText={(text) => setOwner(text)}
                    value={owner}
                />

                <Text style={styles.textname}>Mobile Number:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Mobile Number"
                    onChangeText={(text) => setMobilenumber(text)}
                    value={mobilenumber}
                />

                <Text style={styles.textname} >Shop Name:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Your Shop Name"
                    onChangeText={(text) => setShopname(text.toLowerCase())}
                    value={shopname}
                />

                <Text style={styles.textname}>Address:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Address"
                    onChangeText={(text) => setAddress(text.toLowerCase())}
                    value={address}
                />
                <View style={{ marginTop: 20, marginBottom: 25 }}>

                    <Button
                        title="Update Data"
                        //   onPress={() => console.warn('Right button pressed')}
                        onPress={handleAddData}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#E5E7E9',
        flex: 1,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 50,
        marginBottom: 150,
        borderRadius: 15,
        borderWidth: 2,
    },
    box: {
        margin: 15,
    },
    textname: {
        fontSize: 20,
        fontWeight: '500',
    },
    input: {
        height: 40,
        marginBottom: 12,
        marginTop: 2,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        borderTopWidth:0,
        borderRightWidth:0,
        borderLeftWidth:0,
    },
});

