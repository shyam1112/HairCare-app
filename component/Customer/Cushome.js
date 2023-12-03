import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Homedesign from './Homedesign';
import { Rating, AirbnbRating } from 'react-native-ratings';

export default function Cushome() {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    // try {
    //   let result = await fetch('https://haircare.onrender.com/getshopdata');
    //   if (!result.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   let data = await result.json();
    //   // Slice the first 5 items from the data
    //   let first5Items = data.slice(0, 6);
    //   setData(first5Items);
    //   setIsLoading(false);
    // } catch (error) {
    //   setError(error);
    //   setIsLoading(false);
    //   console.error('Error in fetching data:', error);
    // }
  };

  const [search, setsearch] = useState('');
  const searchdata = async (event) => {
    setsearch(event);
    let key = event.toLowerCase();
    if (key) {
      let result = await fetch(`https://haircare.onrender.com/search/${key}`);
      result = await result.json();
      if (result) {
        setData(result);
      }
    } else {
      getData();
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <View style={styles.entername}>
        <TextInput placeholder='Enter Yout Name' placeholderTextColor="#FFF" style={[styles.textinput]} value={name} onChangeText={(text) => setName(text)} />
      </View>
      <View style={styles.main}>
        <View style={styles.entername}>
          <View style={[styles.searchinput]}>
            <View style={{ flexDirection: "row" }}>
              <Image
                source={require('./search.png')}
                style={styles.searchicon}
              />
            </View>
            <View style={{ marginLeft: 5 }}>
              <TextInput placeholder='Search Shop Here' onChangeText={(text) => { searchdata(text) }} style={{ fontSize: 18 }} />
            </View>
          </View>
        </View>
        <ScrollView style={styles.container}>
          {/* {isLoading ? ( */}
          {/* // <Text>Loading...</Text> */}
          {/* // <ActivityIndicator size={"large"} color={"blue"}  /> */}
          {/* ) :  */}
          {error ? (
            <Text>Error: {error.message}</Text>
          ) : (
            search.length > 0 ? (
              data && data.length > 0 ? (
                data.map((item) => (
                  <View key={item._id}>
                    <AccordionItem item={item} name={name} />
                  </View>
                ))
              ) : (
                <View>
                  {/* <Text>No data available</Text> */}
                  <ActivityIndicator size={"large"} color={"blue"} />

                </View>
              )
            ) : null
          )}

          {/* <View style={{backgroundColor:'red',flex:1}}> */}
          <Homedesign />
          {/* </View> */}
          {/* {!search && data && isLoading == false ? <Text style={{ textAlign: 'center' }}>& Many More .. </Text> : ''} */}
        </ScrollView>
      </View>
    </View>
  );

}


const AccordionItem = ({ item, name }) => {
  const navigation = useNavigation();
  const toshopdata = () => {
    if (name === '') {
      ToastAndroid.show("Enter Name :)", ToastAndroid.TOP);
      return;
    }
    navigation.navigate('shopdata', { id: item._id, name: name });
  }

  return (

    <View>
      <View style={styles.shopdatamain}>
        <TouchableOpacity onPress={toshopdata}>
          <View style={styles.shoptitle}>
            <View>
              <Image
                source={require('./splash.png')}
                style={styles.imageicon}
              />
            </View>
            <View>
              <Text style={{ fontSize: 20 }}>{item.shopname}</Text>
              {/* <Text>Hair cut</Text> */}
              <AirbnbRating
                count={5}
                defaultRating={3}
                size={15}
                reviewSize={15}
                showRating={false}
                isDisabled
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text style={{ alignSelf: 'flex-end', textAlign: 'right', fontSize: 25, fontWeight: '300', marginRight: 10 }}> {">"} </Text>
            </View>

          </View>
        </TouchableOpacity>
      </View>

    </View>

  );
};



const styles = StyleSheet.create({
  searchicon: {
    width: 20,
    height: 20,
    marginLeft: 2,
    marginRight: 2,
    borderRadius: 8,
    marginTop: 6,
    marginBottom: 6,
    flexDirection: 'row',
  },
  imageicon: {
    width: 50,
    height: 50,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    marginTop: 6,
    marginBottom: 6,

  },
  shoptitle: {
    // backgroundColor:'red',
    width: 300,
    height: 60,
    alignItems: 'center',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 0.3,

  },
  shopdatamain: {
    alignSelf: 'center',
    // flex: 1,
  },
  textinput: {
    backgroundColor: '#2C3E50',
    fontSize: 20,
    color: 'white',
    width: 250,
    borderWidth: 2,
    padding: 7,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  entername: {
    alignItems: 'center',
  },
  searchinput: {
    fontSize: 25,
    color: 'black',
    width: 280,
    height: 50,
    borderWidth: 2,
    padding: 7,
    paddingLeft: 7,
    borderRadius: 10,
    marginTop: 20,
    textAlignVertical: "center",
    backgroundColor: 'white',
    borderColor: '#3498DB',
    flexDirection: 'row',
    marginBottom: 10,
  },
  main: {
    backgroundColor: '#D0ECE7',
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginLeft: 3,
    marginRight: 3,

  },
  container: {
    flex: 1,
    padding: 20,
    overflow: 'scroll'

  },
  accordionItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: 20,
  },
  content: {
    padding: 15,
    backgroundColor: '#EAEDED',
  },

})