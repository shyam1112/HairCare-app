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
                  <StatusBar  hidden = {false} backgroundColor = "black"  translucent = {true}/>


            <View style={homestyle.mainpage} >
                <Image
                    style={homestyle.homeimage}
                    source={require('./shop.jpg')}
                />
                <Pressable onPress={customer}>
                    <Text style={homestyle.textbox1}>As a Customer</Text>
                </Pressable>
                <Pressable onPress={shopkeeper}>
                    <Text style={homestyle.textbox2}>As a Shopkeeper</Text>
                </Pressable>

            </View>
        </View>
    )
}
const homestyle = StyleSheet.create({
    textbox1: {
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: 'black',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 40,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        color: 'white',
        shadowColor:'blue',
        elevation:8,
        shadowOpacity:5,
        

    },
    textbox2: {
        fontSize: 25,
        textAlign: 'center',
        backgroundColor: 'black',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
        borderRadius: 20,
        padding: 10,
        color: 'white',
        shadowColor:'blue',
        elevation:8,
        shadowOpacity:5,
    },
    mainpage: {
        backgroundColor: '#84E7D9',
        width: 300,
        height: 480,
        borderRadius: 20,
        shadowColor:'black',
        elevation:10,
        shadowOpacity:5
    },
    homeimage: {
        width: 250,
        height: 250,
        marginLeft: 24,
        marginTop: 20,
        borderRadius: 25,
    },
    mainpage1:{
        flex: 1,
        backgroundColor: '#DDEAFF',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
export default Home;