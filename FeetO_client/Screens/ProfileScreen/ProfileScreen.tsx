import { Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import { getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import ProfileScreenStyles from "./ProfileScreenStyles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"


interface ProfileScreenProps{
    navigation:any
    route:any
}


const ProfileScreen:React.FC<ProfileScreenProps> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)

    const [user, setUser] = useState('')
    
    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setnewLastname] = useState('')
    const [newPassword, setNewPassword] = useState('')



    useEffect(()=>{
        const getUser = async()=>{
            const User =  JSON.parse(await AsyncStorage.getItem('UserDetails_F')) 
            
            setUser(User)
            
        }
        getUser()
    },[])   



    const updateAccount = ()=>{

        const {_id, firstname, lastname, password} = user

        const updatedUserDetails = {
            firstname: newFirstname ? newFirstname : firstname,
            lastname: newLastname ? newLastname : lastname,
            password: password
        }

        console.log(_id)

    }

        


    return(
        <View style = {AllScreenStyles.body}>
            <View>
                <Header screenName="Profile" previousScreen={previousScreen}/>

                {
                    !user ? 

                    <View><Text>Sign In for more details</Text></View>

                    :

                    <View style = {ProfileScreenStyles.profileCont}>
                        <View>
                            <View style = {ProfileScreenStyles.profileContImage}></View>{/**Profile Image........................... */}

                            <View style = {ProfileScreenStyles.InputCont}>
                                <TextInput  style = {ProfileScreenStyles.Input} value={!newFirstname ? user.firstname : newFirstname  } onChangeText={setNewFirstname} placeholderTextColor= '#aaa' placeholder="Enter your firstname" />{/**firstname edit........................... */}
                                <TextInput  style = {ProfileScreenStyles.Input} value={!newLastname ? user.lastname : newLastname} onChangeText={setnewLastname} placeholderTextColor= '#aaa' placeholder="Enter your lastname" />{/**lastname edit........................... */}
                                <TextInput  style = {ProfileScreenStyles.Input} value={user.email} placeholderTextColor= '#aaa' placeholder="Enter your email" editable = {false} selectTextOnFocus={false}/>{/**email edit........................... */}
                                <TextInput  style = {ProfileScreenStyles.Input} placeholderTextColor= '#aaa' placeholder="password" />{/**password edit........................... */}
                            </View>
                            
                            <View style = {ProfileScreenStyles.ButtonCont}>
                                <TouchableOpacity style = {ProfileScreenStyles.Button} onPress={updateAccount}>
                                    <Text style = {ProfileScreenStyles.ButtonTxt}>Save</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>

                }


            </View>
        </View>
    )
}


export default ProfileScreen