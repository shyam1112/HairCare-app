import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'

export default function Homedesign() {
  return (
    <View style={{marginBottom:35}}> 
    

      <View style={styles.mainimage}>
        <Image
         source={require('../../assets/homepageimg2.png')}
         style={styles.mainimageimg}
        />
      </View>

      <View style={{ marginBottom: 2,marginTop:18 }}>
        <Text style={{ fontSize: 22, fontWeight: '400', color: 'black' }}>Categories</Text>
      </View>


      <View style={styles.line1}>
      <View style={{marginLeft:10,marginBottom:10}}>
          <Image
            source={require('../../assets/homepageimg6.png')}
            style={styles.img1}
          />
          <Text style={{alignContent:"center", textAlign:'center', textAlignVertical:'center', flex:1, fontWeight:'500'}}>Hair-Treatment</Text>
        </View>
        
        <View style={{marginLeft:27}}>
          <Image
            source={require('../../assets/homepageimg3.png')}
            style={[styles.img1]}
          />
          <Text style={{alignContent:"center", textAlign:'center', textAlignVertical:'center', flex:1, fontWeight:'500'}}>Hair-Style</Text>
        </View>
      </View>


      <View style={styles.line1}>
       
      <View style={{marginLeft:10,marginBottom:10}}>
          <Image
            source={require('../../assets/homepageimg4.png')}
            style={styles.img1}
          />
          <Text style={{alignContent:"center", textAlign:'center', textAlignVertical:'center', flex:1, fontWeight:'500'}}>Haircut</Text>
        </View>
        <View style={{marginLeft:27}}>
          <Image
            source={require('../../assets/homepageimg5.png')}
            style={[styles.img1]}
          />
          <Text style={{alignContent:"center", textAlign:'center', textAlignVertical:'center', flex:1, fontWeight:'500'}}>Cuts</Text>
        </View>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  img1: {
    marginTop: 5,
    width: 135,
    height: 135,
    borderRadius: 20,
    // margin:12
  },
  line1:{
    flexDirection:'row',
  },
  mainimageimg:{
    height:180,
    width:300,
    alignSelf:'center',
    borderRadius:10,
    alignContent:'center'
  },
  mainimage:{
marginTop:0,
  }

})
