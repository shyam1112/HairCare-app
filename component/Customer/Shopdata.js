import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, ToastAndroid, Image, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function Shopdata(props) {
  const { id, name } = props.route.params;
  const [data, setData] = useState([]);
  // console.log(data);
  const getData = async () => {
    try {

      let result = await fetch(`https://haircare.onrender.com/shopdatabyid/${id}`);
      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await result.json();
      setData(data);
    } catch (error) {
      console.error('Error in fetching data:', error);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <View style={{ flex: 1 }}>
      {/* <Text>Shop Data Screen</Text> */}
      <ShopItem item={data} name={name} />
    </View>
  )
}



const ShopItem = ({ item, name }) => {
  const [requestSent, setRequestSent] = useState(false);
  const [rsp, setRsp] = useState('Best of luck');
  const [selectedHour, setSelectedHour] = useState(10);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedAmPm, setSelectedAmPm] = useState('AM');

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = [0, 15, 30, 45];
  const ampmOptions = ['AM', 'PM'];


  const sendreq = async (userId) => {
    if (name === '') {
      // console.warn({ userid });
      ToastAndroid.show('Enter Your Name :)', ToastAndroid.TOP);
      return;
    }

    let idd;
    const reqee = false;
    const timee = selectedHour + ':' + selectedMinute + ':' + selectedAmPm;
    // console.log(timee)

    try {
      const response = await fetch('https://haircare.onrender.com/sendreq', {
        method: 'POST',
        body: JSON.stringify({ userId, name, timee, reqee }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        idd = data.id;
        ToastAndroid.show('Request sent Successfully...done 😃!', ToastAndroid.TOP);
        setRequestSent(true);
        setRsp('Confirm');
      } else {
        ToastAndroid.show('Request failed. Please try again later.', ToastAndroid.TOP);
      }
    } catch (error) {
      ToastAndroid.show('Error sending data', ToastAndroid.TOP);
      console.error('Error sending data', error);
    }
    setTimeout(async () => {
      try {
        let result = await fetch(`https://haircare.onrender.com/accept/${idd}`);
        if (!result.ok) {
          throw new Error('Network response was not ok');
        }
        result = await result.json();
        if (result.reqee === true) {
          setRsp('Confirm');
        } else {
          setRsp('Select Another time..');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setRequestSent(false);
      }
    }, 15000);
  }
  const [count, setCount] = useState(20);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (count > 0) {
        setCount(count - 1);
      }
    }, 1000); // Update the count every 1000 milliseconds (1 second)

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(countdownInterval);
    };
  }, [count]);

  return (

    <View style={{ flex: 1, backgroundColor: '#B0BCDD'}}>
      <View style={shopitem.card}>
      <Text style={{fontSize:20,fontWeight: '700',textAlign:'center',marginTop:10}}>{item.shopname}</Text>


        <Image
          style={shopitem.shopimage}
          source={require('./shop.jpg')}
        />
      <View style={shopitem.main}>



        <View style={shopitem.data} >
          <Text style={shopitem.textlabel}><Text style={{ fontWeight: '700' }}>Owner : </Text>{item.owner}</Text>
          <Text style={shopitem.textlabel}><Text style={{ fontWeight: '700' }}>Number :</Text> {item.mobilenumber}</Text>
          <Text style={shopitem.textlabel}><Text style={{ fontWeight: '700' }}>Address :</Text> {item.address}</Text>

          <View>
              <Text style={{ fontWeight: '700',marginTop:10,fontSize:16 }}>Select Time:</Text>
              

              <View style={shopitem.dropdownContainer}>
                <View style={{ width: 40, overflow: 'hidden', flexDirection: 'row' }} >

                  <Picker
                    selectedValue={selectedHour}
                    onValueChange={(value) => setSelectedHour(value)}
                    style={shopitem.dropdown}
                  >
                    {hours.map((hour) => (
                      <Picker.Item key={hour} label={hour.toString()} value={hour} />
                    ))}
                  </Picker>
                </View>

                <Text> :</Text>
                <View style={{ width: 40, overflow: 'hidden', flexDirection: 'row' }} >

                  <Picker
                    selectedValue={selectedMinute}
                    onValueChange={(value) => setSelectedMinute(value)}
                    style={shopitem.dropdown}
                  >
                    {minutes.map((minute) => (
                      <Picker.Item key={minute} label={minute.toString()} value={minute} />
                    ))}
                  </Picker>
                </View>

                <Text> :</Text>
                <View style={{ width: 40, overflow: 'hidden', flexDirection: 'row' }} >

                  <Picker
                    selectedValue={selectedAmPm}
                    onValueChange={(value) => setSelectedAmPm(value)}
                    style={shopitem.dropdown}
                  >
                    {ampmOptions.map((ampm) => (
                      <Picker.Item key={ampm} label={ampm} value={ampm} />
                    ))}
                  </Picker>
                </View>

              </View>

              <Text style={{fontSize:16}}>
                Selected Time: {selectedHour}:{selectedMinute} {selectedAmPm}
              </Text>
          </View>
        </View>
        {requestSent ? (
          <View>
          {/* <Text style={{ color: 'red' }}>Waiting ...</Text> */}
          <Modal
            transparent={true}
            visible={true}
            animationType="slide"
          >
            <View style={shopitem.modal1}>
                <Text style={{color:'white',marginBottom:20}}>Waiting...</Text>
                <Text style={{color:'#F09D44',marginBottom:20,fontSize:15,marginLeft:20,marginRight:20,textAlign:'center'}}>Please hold on for a response to your request.</Text>
                <Text style={{color:'white'}}>{count}</Text>
            </View>
            
          </Modal>
         
          </View>
        ) : (
          <View>
            {rsp !== 'Confirm' ? (
              <Pressable onPress={() =>{ sendreq(item.userId), setCount(20)}}>
                <View style={shopitem.reqbtn}>
                  <Text style={{ textAlign: 'center', fontSize: 16 }}>Send Request</Text>
                </View>
              </Pressable>) : ""}
            {rsp === 'Confirm' ? (
              <Text style={{ backgroundColor: 'green', borderRadius: 10, color: 'white', fontWeight: '600', width: 250, textAlign: 'center', height: 40, textAlignVertical: 'center', marginTop: 10 }}>Confirm</Text>
            ) : ''}


          </View>
        )
        }
      </View>
      </View>
    </View>
  )

}


const shopitem = StyleSheet.create({
  modal1: {
    backgroundColor: '#205887',
    width: 290,
    height: 200, 
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:'auto',
    marginBottom:'auto',
    borderRadius:40,
  },
  
  card:{
    borderRadius:20,
    flex:1,
    backgroundColor:'#A3CEC1',
    marginTop:50,
    marginBottom:50,
    shadowColor:'black',
    elevation:5,
    marginLeft:15,
    marginRight:15,

  },
  shopimage: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 20,
  },
  main: {
    flex:1,
    // alignSelf:'center',
    marginLeft:40,
    marginRight:20,
  },
  textlabel: {
    fontSize: 16,
  },
  reqbtn: {
    marginTop: 10,
    backgroundColor: '#089DF8',
    width: 250,
    height: 35,
    borderRadius: 7,
    shadowColor: 'black',
    elevation: 10,
    shadowOpacity: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -15,
    marginBottom: -10,
  },
  dropdown: {
    width: 150,
  },
  data: {
    marginTop: 20,
  },
})



