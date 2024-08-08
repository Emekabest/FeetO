import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowLeft, faCartArrowDown, faCartPlus, faCartShopping, faEllipsis, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../type"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

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
    
    switch(screenName){
        case 'Home':
        case 'Categories':

            return(
                <View style = {[AllScreenStyles.Header, {display:'flex', flexDirection:'row', justifyContent:'space-between'}]}>
                    <View style = {AllScreenStyles.seacrhBarContainer}>
                        <View style = {AllScreenStyles.seacrhBarContainerInnerLeft}><FontAwesomeIcon icon={faSearch} size={fontAwesomeIconSize} /></View>
                        <View style = {AllScreenStyles.seacrhBarContainerInnerRight}>
                            <Text style = {AllScreenStyles.seacrhBarContainerInnerRightTxt}>Search on FeetO</Text>
                        </View>
                    </View>
                    <TouchableOpacity style = {AllScreenStyles.cartSection} onPress={()=> navigation.navigate('Cart')}>
                        <FontAwesomeIcon icon = {faCartShopping} color="#fff" size={22} />
                    </TouchableOpacity>
                </View>
            )
        break;

        default :
        
            return(
                <View style = {AllScreenStyles.Header}>
                    <View style = {AllScreenStyles.header2Inner}>
                        <View style = {AllScreenStyles.headerLeftSection}>{/**Screen Name*/}
                            <TouchableOpacity style ={AllScreenStyles.headerFontsCont} onPress={()=>navigation.navigate(previousScreen, {id})}>
                                <FontAwesomeIcon icon={faArrowLeft} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts} />
                            </TouchableOpacity>
                            <View><Text style = {AllScreenStyles.headerLeftSectionTxt}>{screenName}</Text></View>
                        </View>

                        <View style = {AllScreenStyles.headerRightSection}>
                            <View>{screenName != 'Cart' && screenName != 'Checkout' && screenName != 'Register' && screenName != 'Login' && screenName != 'Admin' && screenName != 'AllOrders' && screenName != 'Login' && screenName != 'Admin' && screenName != 'AddProduct' ? <FontAwesomeIcon icon = {faSearch} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts}/> : null }</View>
                            <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>{screenName !='Cart' && screenName != 'Checkout' && screenName != 'Register' && screenName != 'Login' && screenName != 'Admin' && screenName != 'AllOrders' && screenName != 'AddProduct' ? <FontAwesomeIcon icon = {faCartShopping} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts}/> : null}</TouchableOpacity>
                            <View><FontAwesomeIcon icon = {faEllipsis} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts}/></View>
                        </View>
                    </View>
                </View>
            )
    
    }
    
    
}


export default Header