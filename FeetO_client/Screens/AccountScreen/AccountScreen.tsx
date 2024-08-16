import { Alert, Text, TouchableOpacity, View } from "react-native"
import Header from "../Header/Header"
import { useNavigationState } from "@react-navigation/native"
import { getPreviousScreen } from "../AllScreenFuntions"
import AccountScreenStyles from "./AccountScreenStyles"
import AllScreenStyles from "../AllScreenStyles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import BottomTab from "../BottomTab/BottomTab"


interface AccountScreenProp{
    navigation:any
    route:any
}

const AccountScreen:React.FC<AccountScreenProp> =  ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)

    const [user, setUser] = useState('')
    
    
    useEffect(()=>{

        const getUser = async()=>{
            
            const User =  JSON.parse(await AsyncStorage.getItem('UserDetails_F'))
            
            setUser(User)
        }
        getUser()

    },[])



   const handleLogout = async()=>{

       await AsyncStorage.removeItem('UserDetails_F')
       navigation.navigate('Home')
       Alert.alert('Successfully logged out')
   }




    return(
        <View style = {AllScreenStyles.body}>
            {/* <View> */}
                <Header screenName="Account" previousScreen={previousScreen} />

                    <View style = {AccountScreenStyles.mainBody}>
                            <View style = {AccountScreenStyles.TopSection}>
                                <View>




                                <TouchableOpacity style = {AccountScreenStyles.TopSectionLi} onPress={()=> navigation.navigate('Profile')}>
                                                <Text style = {AccountScreenStyles.TopSectionLiTxt}>Profile</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style = {AccountScreenStyles.TopSectionLi}>
                                                <Text style = {AccountScreenStyles.TopSectionLiTxt}>Orders</Text>
                                </TouchableOpacity>

                                    {/**Admin Section................................ */}
                                    <View>
                                        {
                                            user && user.email === 'josephemekabest2611@gmail.com' ?

                                            <TouchableOpacity style = {AccountScreenStyles.TopSectionLi} onPress={()=> navigation.navigate('Admin')}>
                                                <Text style = {AccountScreenStyles.TopSectionLiTxt}>Admin Hub</Text>
                                            </TouchableOpacity>

                                            :

                                            null
                                        }
                                        
                                    </View>
                                    {/**......................................... */}

                                    
                                </View>
                            </View>



                            {/**Signings section.............................................................*/}
                            <View style = {AccountScreenStyles.BottomSection}>

                                <View style = {AccountScreenStyles.BottomSectionInner}>
                                {
                                    !user ? 
                                    <TouchableOpacity style = {AccountScreenStyles.BottomSectionBtn} onPress={()=> navigation.navigate('Login')}>
                                        <Text style = {AccountScreenStyles.BottomSectionBtnTxt}>Login</Text>
                                    </TouchableOpacity>

                                    :

                                    <TouchableOpacity style = {AccountScreenStyles.BottomSectionBtn} onPress={handleLogout}>
                                        <Text style = {AccountScreenStyles.BottomSectionBtnTxt}>Log Out</Text>
                                    </TouchableOpacity>

                                }

                                    
                                </View>
                            </View>
                    </View>


            {/* </View> */}
                    <BottomTab />
        </View>
    )
}


export default AccountScreen