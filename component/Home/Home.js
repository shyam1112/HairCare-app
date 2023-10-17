import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, Image, Pressable,StatusBar } from "react-native";

function Home() {
    const navigation=useNavigation();
    const customer = () => {    
        navigation.navigate('cushome');
    }
    const shopkeeper = () => {
        navigation.navigate('shoplogin')
    }
    return (
        <View style={homestyle.mainpage1}>
            <StatusBar  hidden={false} backgroundColor="black"  translucent={true}/>

            <View style={homestyle.mainpage} >
                <View style={homestyle.homeimagegif}>

                <Image
                    style={homestyle.homeimage}
                    source={require('./logo.gif')}
                    />
                    </View> 
                    <View>
                        <Text style={{textAlign:'center',marginTop:15,fontSize:25,color:'#F0C12E',fontWeight:'700'}}>Welcome to TrimTime</Text>
                        <Text style={{textAlign:'center',marginTop:3,fontSize:13,color:'#fff',fontWeight:'400'}}>Your Style, Your Time, Your Way</Text>
                    </View>

                <Pressable onPress={customer}>
                    <Text style={homestyle.textbox1}>As a Customer</Text>
                </Pressable>
                <Pressable onPress={shopkeeper}>
                    <Text style={homestyle.textbox2}>As a Barber</Text>
                </Pressable>

            </View>
        </View>
    )
}
const homestyle = StyleSheet.create({
 
    homeimagegif: {
        width: 250,
        height: 250,
        marginTop: 20,
        borderRadius: 125, 
        alignSelf: 'center',
        overflow: 'hidden',
      },
    textbox1: {
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#BD973F',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50,
        borderRadius: 50,
        fontWeight:'400',
        padding: 10,
        alignItems: 'center',
        color: 'black',
        shadowColor:'blue',
        elevation:8,
        shadowOpacity:5,
        

    },
    textbox2: {
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: '#BD973F',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderRadius: 50,
        padding: 10,
        color: 'black',
        fontWeight:'400',
        shadowColor:'blue',
        elevation:8,
        shadowOpacity:5,
    },
    homeimage: {
        width: 250,
        height: 250,
        borderRadius: 125,
        alignSelf:'center'
    },
    mainpage: {
        backgroundColor: '#205887',
        width: 330,
        height: 580,
        borderRadius: 50,
        shadowColor:'black',
        elevation:10,
        shadowOpacity:5,
    },
    mainpage1:{
        flex: 1,
        backgroundColor: '#A6C3DE',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default Home;