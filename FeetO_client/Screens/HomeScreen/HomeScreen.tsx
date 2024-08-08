import { FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AllScreenStyles from "../AllScreenStyles";
import HomeScreenStyles from "./HomeScreenStyles";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import BottomTab from "../BottomTab/BottomTab";
import { useNavigationState } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

interface HomeScreenProps{
    navigation:any
}


const HomeScreen:React.FC<HomeScreenProps> = ({navigation})=> {
    const numColumnsId = 3 //Coulmn number of the Home Items UI


    /**Contains all items available.............*/
    
    const AllItems: { key: never; name: never; price: never; image: never; }[] = [];
    //////////////////////////////////////////////////////////////////////////////////////////////

    

    /**Contains items gotten from the database.........*/
    const [Items_db, setItems_db] = useState([])
    ///////////////////////////////////////////////////



    /**Getting the the items data from the databse................................................................................ */
    axios.get('https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/').then((res)=>{


        if (!Items_db.length){

            setItems_db(res.data.items)
        }

    }).catch((err)=>{

        console.log('Error: ' + err)
    })

    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////




/**Appending each data from the database to a new array "AllItems"...........................*/
    if (!AllItems.length){

        Items_db.forEach((item)=>{

            const {_id, name, price, image} = item
            AllItems.push({
                key:_id,
                name,
                price,
                image
            })
            
        })
    }
////////////////////////////////////////////////////////////////////////////////




if (AllItems.length){
    
    return (
        <View style = {AllScreenStyles.body}>
            <Header screenName = "Home" previousScreen="None"/>{/**Header............................................. */}

            <ScrollView>{/**Body............ */}
                <View style = {HomeScreenStyles.mainAdvertContainer} >{/**Advert Slider */}
                        <View style = {HomeScreenStyles.advertULContainer}>
                            <ScrollView horizontal showsHorizontalScrollIndicator ={false}>
                                <View style = {HomeScreenStyles.advertList}></View>
                                <View style = {HomeScreenStyles.advertList}></View>
                                <View style = {HomeScreenStyles.advertList}></View>
                                <View style = {HomeScreenStyles.advertList}></View>
                            </ScrollView>
                        </View>

                    <View style = {HomeScreenStyles.advertListIndicatorContainer}>
                        <View style = {HomeScreenStyles.advertListIndicator}><FontAwesomeIcon icon={faCircleDot} size={8} color="gray"/></View>
                        <View style = {HomeScreenStyles.advertListIndicator}><FontAwesomeIcon icon={faCircleDot} size={8} color="gray"/></View>
                        <View style = {HomeScreenStyles.advertListIndicator}><FontAwesomeIcon icon={faCircleDot} size={8} color="gray"/></View>
                        <View style = {HomeScreenStyles.advertListIndicator}><FontAwesomeIcon icon={faCircleDot} size={8} color="gray"/></View>
                    </View>
                </View>

                <View style = {HomeScreenStyles.productCardMainContainer}>{/**All Product Template*/}
                    <View style = {HomeScreenStyles.productCardMainContainerInner}>
                        
                        <FlatList
                            key={numColumnsId}
                            data={AllItems}
                            keyExtractor={(item)=> String(item.key)}
                            renderItem={({item})=>(
                                <TouchableOpacity style = {HomeScreenStyles.productCard} onPress={()=> navigation.navigate('ProductDetails', {id:item.key})}>
                                    <View style = {HomeScreenStyles.productCardImg}>
                                        <Image source={{ uri: `data:image/jpeg;base64,${item.image.data}`}}
                                            style = {{height:'100%'}}
                                        />
                                    </View>

                                    <View style = {HomeScreenStyles.productCardDetails}>
                                        <View style ={HomeScreenStyles.productCardDetailsNameCont}>
                                            <Text style = {HomeScreenStyles.productCardDetailsName}>{item.name}</Text>
                                        </View>
                                        <View style ={HomeScreenStyles.productCardDetailsPriceCont}>
                                            <Text style = {HomeScreenStyles.productCardDetailsPrice}>N {item.price}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )}
                            scrollEnabled = {false}
                            numColumns={numColumnsId}
                            contentContainerStyle ={HomeScreenStyles.flatListProductCard}
                        />
                    </View>
                </View>
            </ScrollView>

        <BottomTab />
        </View>
    );
}
  }

  export default HomeScreen
