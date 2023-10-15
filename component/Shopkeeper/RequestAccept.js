import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, Pressable,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RequestAccept() {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [acceptedRequests, setAcceptedRequests] = useState([]);


  useEffect(() => {
    fetchData();
    const pollInterval = 3000;
    const pollTimer = setInterval(fetchData, pollInterval);

    return () => clearInterval(pollTimer);
  }, []);

  const fetchData = async () => {
    let auth;

    try {
      auth = await AsyncStorage.getItem('userid');
      // console.log(auth);
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
    // console.log(auth);
    try {
      let result = await fetch(`https://haircare.onrender.com/getreq/${auth}`);
      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      result = await result.json();
      setData(result);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error('Error in fetching data:', error);
    }
  };


  const acceptreq = async (id) => {


    try {
      let result = await fetch(`https://haircare.onrender.com/update/${id}`, {
        method: 'put',
        body: JSON.stringify({ reqee: true }),
        headers: {
          'content-type': 'application/json'
        },
      });
      ToastAndroid.show('Request Accepted..😃!', ToastAndroid.TOP);
      // fetchData();
      setAcceptedRequests([...acceptedRequests, id]);
    } catch (error) {
      console.error('Error in accepting request:', error);
    }
  };


  const deletereq = async (id) => {
    try {
      let result = await fetch(`https://haircare.onrender.com/deletereq/${id}`, {
        method: 'delete'
      });
      result = await result.json();
      if (result) {
        fetchData();
        ToastAndroid.show('Deleted ', ToastAndroid.TOP);
      }
    } catch (error) {
      console.error('Error in deleting request:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>Retrieved Data: {auth}</Text>  */}

      <ScrollView>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) :
        data && data.length > 0 ? (
          data.map((item, index) => (

            <View style={styles.boxmain} key={item._id}>
              <View style={styles.textt}>
                <Text style={styles.name} >{item.name}</Text>
                <Text style={styles.time}>{item.timee}</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>

                {!acceptedRequests.includes(item._id) ? (
                  <Pressable onPress={() => acceptreq(item._id)}>
                    <View style={styles.acceptreq}>
                      <Text style={{ color: 'white', fontSize: 17, fontWeight: 400 }}>Accept Request</Text>
                    </View>
                  </Pressable>
                ) : (
                  <View style={styles.done}>
                    <Text style={{ fontSize: 17, fontWeight: 500 }}>Done</Text>
                  </View>
                )}

                <Pressable onPress={() => deletereq(item._id)}>
                  <View style={styles.deletereq}>
                    <Text style={{ fontWeight: '500', color: 'white' }}>Delete</Text>
                  </View>
                </Pressable>

              </View>
            </View>
          ))) : (
          <Text>No Data</Text>
        )
      }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 25,
    alignItems: 'center',
    marginBottom:20,
  },
  textt: {
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  boxmain: {
    backgroundColor: '#c0c0ff',
    width: 330,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom:10,
  },
  name: {
    fontSize: 20,
    marginLeft: 10
  },
  time: {
    fontSize: 20,
    marginRight: 20
  },
  acceptreq: {
    backgroundColor: 'black',
    width: 150,
    height: 35,
    marginLeft: 10,
    borderRadius: 10,
    shadowColor: 'green',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  deletereq: {
    backgroundColor: 'darkred',
    width: 80,
    borderRadius: 10,
    justifyContent: 'flex-end',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'green',
    elevation: 5,
    marginRight: 20,
  },
  done: {
    backgroundColor: 'green',
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 10,
  }
});
