import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { View, Text, TextInput, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function Cushome() {
  const [name, setName] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => {
    try {
      let result = await fetch('https://haircare.onrender.com/getshopdata');
      if (!result.ok) {
        throw new Error('Network response was not ok');
      }
      let data = await result.json();
      // Slice the first 5 items from the data
      let first5Items = data.slice(0, 6);
      setData(first5Items);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
      console.error('Error in fetching data:', error);
    }
  };
  
  const [search,setsearch]=useState('');
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
          <TextInput placeholder='Search Shop Here' style={[styles.searchinput]} onChangeText={(text) => { searchdata(text) }} />
        </View>
        <ScrollView style={styles.container}>
          {isLoading ? (
            <Text>Loading...</Text>
          ) : error ? (
            <Text>Error: {error.message}</Text>
          ) : data && data.length > 0 ? (
            data.map((item) => (
              <View key={item._id}>
                <ShopItem item={item} name={name} />
              </View>
            ))
            
            )
          : (
            <Text>No data available</Text>
          )}
          
          {!search && data && isLoading == false ? <Text style={{textAlign:'center'}}>& Many More .. </Text>:''} 
        </ScrollView>
      </View>
    </View>
  );

}


const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={[styles.accordionItem,expanded?{backgroundColor:'#87CEF9',borderColor:'#87CEF9',borderWidth:4}:'']}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.icon}>{expanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.content}>{content}</View>}
    </View>
  );
};


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
    const timee =selectedHour+':'+selectedMinute+':'+selectedAmPm;
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
      ToastAndroid.show('Error sending data',ToastAndroid.TOP);
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


  return (

    <View>
      <AccordionItem
        title={item.shopname}
        content={
          <View style={{ flex: 1 }}>

            <View style={shopitem.acco} >
              <Text style={shopitem.textlabel}><Text style={{ fontWeight: '700'}}>Owner : </Text>{item.owner}</Text>
              <Text style={shopitem.textlabel}><Text style={{ fontWeight: '700' }}>Number :</Text> {item.mobilenumber}</Text>
              <Text style={shopitem.textlabel}><Text style={{ fontWeight: '700' }}>Address :</Text> {item.address}</Text>

              <View>
                <View style={shopitem.container}>
                  <Text  style={{ fontWeight: '700' }}>Select Time:</Text>

                  <View style={shopitem.dropdownContainer}>
                    <View style={{width:40,overflow:'hidden',flexDirection:'row'}} >

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
                    <View style={{width:40,overflow:'hidden',flexDirection:'row'}} >

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
                    <View style={{width:40,overflow:'hidden',flexDirection:'row'}} >

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

                  <Text>
                    Selected Time: {selectedHour}:{selectedMinute} {selectedAmPm}
                  </Text>
                </View>
              </View>
            </View>
            {requestSent?(
              <Text style={{color:'red'}}>Waiting ...</Text>
            ):(
              <View>

              {rsp !== 'Confirm' ?(
                <Pressable onPress={() => sendreq(item.userId)}>
                <View style={shopitem.reqbtn}>
                <Text style={{ textAlign: 'center', fontSize: 15 }}>Send Request</Text>
                </View>
                </Pressable>):""}
                {rsp === 'Confirm'?(
                  <Text style={{backgroundColor:'green',borderRadius:10,color:'white',fontWeight:'600',width:290,textAlign:'center',height:40,textAlignVertical:'center',marginTop:10}}>Confirm</Text>
                ):''}
              
                
                </View>
              )
            }
          </View>
        }
      />
    </View>
  )

}


const shopitem = StyleSheet.create({
  textlabel: {
    fontSize: 15,
  },
  reqbtn: {
    marginTop: 10,
    backgroundColor: '#089DF8',
    width: 110,
    height: 35,
    borderRadius: 7,
    shadowColor: 'black',
    elevation: 10,
    shadowOpacity: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:-15,
    marginBottom:-10,
  },
  dropdown: {
    width: 110, 
  },
})



const styles = StyleSheet.create({
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
    fontSize: 20,
    color: 'black',
    width: 280,
    borderWidth: 2,
    padding: 7,
    paddingLeft: 20,
    borderRadius: 10,
    marginTop: 20,
    textAlignVertical: "center",
    backgroundColor: 'white',
    borderColor: '#3498DB'
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
    backgroundColor:'#EAEDED',
  },
})
