import { Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import { getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import ProfileScreenStyles from "./ProfileScreenStyles"


interface ProfileScreenProps{
    navigation:any
    route:any
}


const ProfileScreen:React.FC<ProfileScreenProps> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)


    return(
        <View style = {AllScreenStyles.body}>
            <View>
                <Header screenName="Profile" previousScreen={previousScreen}/>

                    <View style = {ProfileScreenStyles.profileCont}>
                        <View>
                            <View style = {ProfileScreenStyles.profileContImage}></View>{/**Profile Image........................... */}

                            <View style = {ProfileScreenStyles.InputCont}>
                                <TextInput  style = {ProfileScreenStyles.Input} placeholderTextColor= '#aaa' placeholder="Enter your firstname" />{/**Firstname edit........................... */}
                                <TextInput  style = {ProfileScreenStyles.Input} placeholderTextColor= '#aaa' placeholder="Enter your lastname" />{/**Firstname edit........................... */}
                                <TextInput  style = {ProfileScreenStyles.Input} placeholderTextColor= '#aaa' placeholder="Enter your password" />{/**Firstname edit........................... */}
                            </View>

                            
                            <View style = {ProfileScreenStyles.ButtonCont}>
                                <TouchableOpacity style = {ProfileScreenStyles.Button}>
                                    <Text style = {ProfileScreenStyles.ButtonTxt}>Save</Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>

            </View>
        </View>
    )
}


export default ProfileScreen