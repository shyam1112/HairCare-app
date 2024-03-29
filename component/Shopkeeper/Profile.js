import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const [data, setData] = useState({
    userId: '',
    shopname: '',
    owner: '',
    mobilenumber: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  const getData = async () => {
    try {
      let auth = await AsyncStorage.getItem('userid');
      let result = await fetch(`https://haircare.onrender.com/profile/${auth}`);
      if (!result.ok) {
        throw new Error(`Fetch error: ${result.status}`);
      }
      result = await result.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {

    getData();
  }, []);

  const signout = () => {
    AsyncStorage.clear();
    navigation.navigate('shoplogin');
  }
  return (
    // <View style={styles.container}>
    <View style={styles.profileMain}>
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <View style={styles.card}>
          <View style={styles.cardImage}>
            <Image
              source={require('./16365064.jpg')}
              style={styles.image}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.greetingText}>Hi!</Text>
            {data ? (
              <>
                <Text style={{ color: '#BD973F', fontSize: 16 }}>
                  owner: {data[0]?.owner || 'N/A'}
                </Text>
                <Text style={styles.shopnameText}>
                  Shopname: {data[0]?.shopname || 'N/A'}
                </Text>
                <Text style={{ color: '#BD973F', fontSize: 16 }}>
                  mobilenumber: {data[0]?.mobilenumber || 'N/A'}
                </Text>
                <Text style={{ color: '#BD973F', fontSize: 16 }}>
                  address: {data[0]?.address || 'N/A'}
                </Text>
              </>
            ) : (
              <Text>Data not available</Text>
            )}
          </View>




          <Pressable onPress={signout}>

            <View style={{ backgroundColor: 'grey', width: 80, height: 25, borderRadius: 20, shadowColor: 'black', elevation: 5 }}>
              <Text style={{ color: 'white', fontWeight: '500', textAlign: 'center', textAlignVertical: 'center' }}>Sign Out</Text>
            </View>
          </Pressable>
        </View>
      )}
    </View>
    // </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileMain: {
    marginTop: 20,
    alignItems: 'center',
    flex: 1,
  },
  card: {
    shadowColor: 'blue',
    elevation: 20,
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: 330,
    height: 510,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#205887',
    borderRadius: 40,
  },
  cardImage: {
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    color: 'aliceblue',
    marginTop: 80,

  },
  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  shopnameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
});
