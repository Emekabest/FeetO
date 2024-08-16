import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faCartArrowDown, faCartPlus, faCartShopping, faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../type"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";

type HomeScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList
>;

interface HeaderProps{
    screenName:string;
    previousScreen:any;
    id:any
}

const fontAwesomeIconSize = 19
const Header:React.FC<HeaderProps> = ({screenName, previousScreen, id})=>{
    
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [cartItemsLength, setCartItemsLength] = useState(0)


    
    
    const cartItems = useSelector((state)=> state.cart.items)
        /** */
        useEffect(()=>{
            const getCartLength = async ()=>{

                    setCartItemsLength(cartItems.length)

            }
            getCartLength()
        },[cartItems])
        
        
    
    
    switch(screenName){
        case 'Home':
        case 'Categories':

            return(
                <View style = {[AllScreenStyles.Header, {display:'flex', flexDirection:'row', justifyContent:'space-between'}]}>
                    <TouchableOpacity  style = {AllScreenStyles.seacrhBarContainer} onPress={()=> navigation.navigate('SearchItems')}>
                        <View style = {AllScreenStyles.seacrhBarContainerInnerLeft}><FontAwesomeIcon icon={faSearch} size={fontAwesomeIconSize} /></View>
                        <View style = {AllScreenStyles.seacrhBarContainerInnerRight}>
                            <Text style = {AllScreenStyles.seacrhBarContainerInnerRightTxt}>Search on FeetO</Text>
                        </View>
                    </TouchableOpacity>
                    

                    <View style = {AllScreenStyles.cartSection}>
                        <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
                            <FontAwesomeIcon icon = {faCartShopping} color="#fff" size={22} />
                        </TouchableOpacity>

                        <View style = {AllScreenStyles.cartSectionLengthCont}>
                            <Text style = {AllScreenStyles.cartSectionLengthContTxt}>{cartItemsLength}</Text>
                        </View>
                    </View>
                </View>
            )
        break;

        default :

            return(
                <View style = {AllScreenStyles.Header}>
                    <View style = {AllScreenStyles.header2Inner}>
                        <View style = {AllScreenStyles.headerLeftSection}>
                            <TouchableOpacity style ={AllScreenStyles.headerFontsCont} onPress={()=>(navigation.navigate(previousScreen, {id} ), console.log('clicked'))}>
                                <FontAwesomeIcon icon={faArrowLeft} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts}/>
                            </TouchableOpacity>
                            <View><Text style = {AllScreenStyles.headerLeftSectionTxt}>{screenName}</Text></View>
                        </View>
                        
                        <View style = {AllScreenStyles.headerRightSection}>
                            <TouchableOpacity onPress={()=> navigation.navigate('SearchItems', {id})}>{screenName != 'Cart' && screenName != 'Checkout' && screenName != 'Register' && screenName != 'Login' && screenName != 'Admin' && screenName != 'AllOrders' && screenName != 'Login' && screenName != 'Admin' && screenName != 'AddProduct' && screenName != 'Profile' ? <FontAwesomeIcon icon = {faSearch} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts}/> : null }</TouchableOpacity>
                                {screenName !='Cart' && screenName != 'Checkout' && screenName != 'Register' && screenName != 'Login' && screenName != 'Admin' && screenName != 'AllOrders' && screenName != 'AddProduct' && screenName != 'Profile' ?

                                <View style = {AllScreenStyles.cartSection}>
                                    <TouchableOpacity onPress={()=> navigation.navigate('Cart', {id})}>
                                        <FontAwesomeIcon icon = {faCartShopping} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts}/>
                                    </TouchableOpacity>

                                    {/**Items Length indictor.......................... */}
                                    <View style = {AllScreenStyles.cartSectionLengthCont}>
                                        <Text style = {AllScreenStyles.cartSectionLengthContTxt}>{cartItemsLength}</Text>
                                    </View>
                                </View>
                                 
                                 : 
                                 
                                 null
                                 
                                 }


                            <View><FontAwesomeIcon icon = {faEllipsis} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts}/></View>
                        </View>
                    </View>
                </View>
            )
    
    }
    
    
}


export default Header