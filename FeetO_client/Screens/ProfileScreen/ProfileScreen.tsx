import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import { appPrimaryColor, getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import ProfileScreenStyles from "./ProfileScreenStyles"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft, faTimes } from "@fortawesome/free-solid-svg-icons"


interface ProfileScreenProps{
    navigation:any
    route:any
}


const ProfileScreen:React.FC<ProfileScreenProps> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)

    const [user, setUser] = useState('')
    
    const [newFirstname, setNewFirstname] = useState('')
    const [newLastname, setNewLastname] = useState('')



    /**Display section state */
    const [changePasswordPanel_display, setChangePasswordPanel_display] = useState('none')
    /**.................... */




    /**.........................................................*/
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setconfirmNewPassword] = useState('')

    const [oldPasswordErrorMsg, setOldPasswordErrorMsg] = useState('')
    const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState('')
    const [confirmNewPasswordErrorMsg, setConfirmNewPasswordErrorMsg] = useState('')
    ////////////////////////////////////////////////////////////////


    /**Getting the userdetails data.................................... */
    useEffect(()=>{
        const getUser = async()=>{
            const User =  JSON.parse(await AsyncStorage.getItem('UserDetails_F')) 
            
            setUser(User)
            
        }
        getUser()

    },[])
    ////////////////////////////////////////////////////////////////////////////////////////////////////




    /**Setting new updated to the recent details intially before any update operation is carried out */
        useEffect(()=>{
            if (user){

                    const {firstname, lastname, email, password} = user
            
                    setNewFirstname(firstname)
                    setNewLastname(lastname)
                }
        },[user])
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    
    


    
    /**Updating or modifying user details.................................................... */
    const updateAccount = ()=>{
        
        const {_id:userId, password} = user

        const updatedUserDetails = {
            firstname: newFirstname,
            lastname: newLastname,
        }
    

        const url = `https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/update_profile/${userId}`
        axios.put(url, updatedUserDetails).then(async(res)=>{

            const User = res.data.updatedUser
            
            await AsyncStorage.setItem('UserDetails_F', JSON.stringify(User))

            Alert.alert('Profile updated successfully')
        })
        .catch((err)=>{

            console.log('An error o ' + err)
        })

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    



    /**This function updates user password................................................................. */
    const updatePassword = ()=>{

        const passwordRegex = /^.{5,}$/
        const confirmPasswordRegex = new RegExp(`^${newPassword}$`)

        const inputInfos = [

            {
                id:'old password',
                name:oldPassword,
                regex:passwordRegex.test(oldPassword.trim()),
                regexErrorMsg:'value must be more than 4',
                setErrorMsg(errorMsg:string){
                    setOldPasswordErrorMsg(errorMsg)
                }
            },

            {
                id:'password',
                name:newPassword,
                regex:passwordRegex.test(newPassword.trim()),
                regexErrorMsg:'value must be more than 4',
                setErrorMsg(errorMsg:string){
                    setNewPasswordErrorMsg(errorMsg)
                }
            },
    
            {
                id:'confirm password',
                name:confirmNewPassword,
                regex:confirmPasswordRegex.test(confirmNewPassword.trim()),
                regexErrorMsg:"password dosen't match",
                setErrorMsg(errorMsg:string){
                    setConfirmNewPasswordErrorMsg(errorMsg)
                }
            },

        ]


            /**Checking if any input is empty................................................. */
            let loopCount = inputInfos.length
            inputInfos.forEach((input)=>{
            if (!input.name ){

                input.setErrorMsg('field is empty')

            }
            /**Checks if the input passed in is valid................................... */
            else if (input.name.length > 0 && !input.regex){
                
                input.setErrorMsg(input.regexErrorMsg)
            }
            /**Runs if there is no error found...................... */
            else{
                input.setErrorMsg('')
                loopCount--
            }

        })  

        /**............................................................................................... */






        /**This section execute when there are no error in the input...................................... */
            const noErrorsFound = loopCount <= 0 ? true : false

            if (noErrorsFound){//Make request here

                const {_id:userId } = user

                const passwordDetails = {
                    oldPassword,
                    newPassword,
                }

                const url = `https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/update_password/${userId}`
                axios.put(url, passwordDetails).then((res)=>{

                    if (res.status === 201){//This condition only becomes true when the oldpassword dosent match with the user database initial password

                        Alert.alert(res.data.msg)
                        return
                    }

                    Alert.alert(res.data.msg)
                    
                })
                .catch((err)=>{

                    console.log('An error occured o ' + err)
                })
                

            }

    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

    







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
                                <View style = {ProfileScreenStyles.InputContLi}>{/**firstname edit........................... */}
                                    <Text style = {ProfileScreenStyles.InputContLiTxt}>Firstname</Text>
                                    <TextInput  style = {ProfileScreenStyles.Input} value={newFirstname} onChangeText={setNewFirstname} placeholderTextColor= '#aaa' placeholder="Enter your firstname" />
                                </View>

                                <View style = {ProfileScreenStyles.InputContLi}>
                                    <Text style = {ProfileScreenStyles.InputContLiTxt}>Lastname</Text>
                                    <TextInput  style = {ProfileScreenStyles.Input} value={newLastname} onChangeText={setNewLastname} placeholderTextColor= '#aaa' placeholder="Enter your lastname" />{/**lastname edit........................... */}
                                </View>

                                <View style = {ProfileScreenStyles.InputContLi}>
                                    <Text style = {ProfileScreenStyles.InputContLiTxt}>email</Text>
                                    <TextInput  style = {[ProfileScreenStyles.Input, {color:'gray'}]} value={user.email} placeholderTextColor= '#aaa' placeholder="Enter your email" editable = {false} selectTextOnFocus={false}/>{/**email edit........................... */}
                                </View>

                                <View style = {ProfileScreenStyles.InputContLi}>
                                    <Text style = {ProfileScreenStyles.InputContLiTxt}>password</Text>
                                    <TextInput  style = {[ProfileScreenStyles.Input, {fontSize: 20}]} value = '000000' placeholderTextColor='#aaa' placeholder="password" secureTextEntry={true} editable = {false}/>{/**password edit........................... */}
                                    <TouchableOpacity onPress={()=> setChangePasswordPanel_display('flex')}><Text style = {{color:appPrimaryColor}}>Change password</Text></TouchableOpacity>
                                </View>
                            </View>
                            
                            <View style = {ProfileScreenStyles.ButtonCont}>
                                <TouchableOpacity style = {ProfileScreenStyles.Button} onPress={updateAccount}>
                                    <Text style = {ProfileScreenStyles.ButtonTxt}>Save</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                }


                {/**Change password panel......................................................... */}
                <View style = {[ProfileScreenStyles.changePasswordPanel, {display:changePasswordPanel_display}]}>
                    <View>
                        <View style = {ProfileScreenStyles.changePasswordPanelHeader}>
                           
                            <TouchableOpacity onPress={()=> setChangePasswordPanel_display('none')}>
                                <FontAwesomeIcon icon={faArrowLeft} color="#fff" size={22}/>
                            </TouchableOpacity>
                        </View> 



                        <View style = {ProfileScreenStyles.changePasswordPanelBody}>
                            <View style = {ProfileScreenStyles.InputCont}>
                                <View style = {ProfileScreenStyles.InputContLi}>
                                    <TextInput style = {ProfileScreenStyles.Input} placeholder="Enter old password" placeholderTextColor='#aaa' value={oldPassword} onChangeText={setOldPassword}/>
                                    <Text style = {{color: appPrimaryColor}}>{oldPasswordErrorMsg}</Text>
                                </View>

                                <View style = {ProfileScreenStyles.InputContLi}>
                                    <TextInput style = {ProfileScreenStyles.Input} placeholder="Enter new password" placeholderTextColor='#aaa' value ={newPassword} onChangeText={setNewPassword}/>
                                    <Text style = {{color: appPrimaryColor}}>{newPasswordErrorMsg}</Text>

                                </View>

                                <View style = {ProfileScreenStyles.InputContLi}>
                                    <TextInput style = {ProfileScreenStyles.Input} placeholder="Confirm new password" placeholderTextColor='#aaa' value={confirmNewPassword} onChangeText={setconfirmNewPassword}/>
                                    <Text style = {{color: appPrimaryColor}}>{confirmNewPasswordErrorMsg}</Text>
                                </View>
                            </View>

                            <View style = {ProfileScreenStyles.ButtonCont}>
                                    <TouchableOpacity onPress={updatePassword} style = {ProfileScreenStyles.Button}>
                                        <Text style = {ProfileScreenStyles.ButtonTxt}>Update</Text>
                                    </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </View>
                {/**...................................................................................... */}
                    

            </View>
        </View>
    )
}


export default ProfileScreen