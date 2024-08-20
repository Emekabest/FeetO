import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import { appPrimaryColor, getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import RegisterScreenStyles from "../RegisterScreen/RegisterScreenStyles"
import { useState } from "react"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Loader from "../Loader/Loader"


interface LoginScreenProp{
    navigation:any
    route:any
}


const LoginScreen:React.FC<LoginScreenProp> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)

    /**Inputs value state........................................... */
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    ////////////////////////////////////////////////////////////////////////
    const [emailErrorMsg, setEmailErrorMsg] = useState('')
    const [passWordErrorMsg, setPasswordErrorMsg] = useState('')
    const [isLoader, setIsLoader] = useState(false)


    const login = ()=>{
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        const passwordRegex = /^.{1,}$/
        

        const inputInfos = [

            {
                id:'email',
                name:email,
                regex:emailRegex.test(email.trim()),
                regexErrorMsg:'invalid email',
                setErrorMsg(errorMsg:string){
                    setEmailErrorMsg(errorMsg)
                }

            },
    
            {
                id:'password',
                name:password,
                regex:passwordRegex.test(password.trim()),
                regexErrorMsg:'',//Setting this to null string due to security reasons
                setErrorMsg(errorMsg:string){
                    setPasswordErrorMsg(errorMsg)
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
                 else{
                     input.setErrorMsg('')
                     loopCount--
                 }
 
             })  
             ///////////////////////////////////////////////////////////////////////////////////////////////////





             /**Runs when there are no inpput errors......................... */
             const noErrorsFound = loopCount <= 0 ? true : false
             if (noErrorsFound){
                //make request here
                setIsLoader(true)//Activate the loader..................

                const userDetails = {
                    email:email.toLowerCase(),
                    password
                }


                const url = 'https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/login'
                axios.post(url, userDetails, {headers:{'Content-Type': 'application/json'}}).then( async(res)=>{
                    const data = res.data

                    
                    if (res.status === 200){
                        const userDetails = data.data

                        await AsyncStorage.setItem('UserDetails_F', JSON.stringify(userDetails))
                        console.log('data saved', userDetails)

                        navigation.navigate('Home')
                    }
                    

                    setIsLoader(false)//Deactive the loader............
                    Alert.alert(data.msg)
                }).catch((err)=>{
                    console.log('Error: ' + err)

                })

             }

    }






    return (
        <View style = {AllScreenStyles.body}>
            <Header screenName="Login" previousScreen={previousScreen}/>
                {
                    isLoader ?

                    <Loader />

                    :

                    null
                }
            <View style = {RegisterScreenStyles.bodyInner}>

            
            
            <View style = {RegisterScreenStyles.RegisterCont}>{/**Registration Container........................................................................ */}
                    <View>

                        <View><Text style = {RegisterScreenStyles.headingTxt}>Welcome Back</Text></View>

                        <View style = {RegisterScreenStyles.inputCont}>{/**Input Container.............. */}
                            <View style = {RegisterScreenStyles.inputContLi}>
                                <TextInput style = {RegisterScreenStyles.input} placeholder="Enter email" placeholderTextColor='gray' value={email} onChangeText={setEmail}/>
                                <Text style = {RegisterScreenStyles.errorDetailsTxt}>{emailErrorMsg}</Text>
                            </View>

                            <View style = {RegisterScreenStyles.inputContLi}>
                                <TextInput style = {RegisterScreenStyles.input} placeholder="Enter password" placeholderTextColor='gray' value={password} onChangeText={setPassword}/>
                                <Text style = {RegisterScreenStyles.errorDetailsTxt}>{passWordErrorMsg}</Text>
                            </View>
                        </View>


                        <View style = {RegisterScreenStyles.buttonCont}>
                            <TouchableOpacity style = {RegisterScreenStyles.button} onPress={login}>
                                <Text style = {RegisterScreenStyles.buttonTxt}>Login</Text>
                            </TouchableOpacity>
                        </View>


                        {/**Extras........................................................................................ */}
                        <View style = {{display: 'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:15}}>
                            <Text style = {{color: '#333', fontStyle:'italic'}}>Not yet a member?</Text>
                            <TouchableOpacity onPress={()=> navigation.navigate('Register')}>
                                <Text style = {{color: appPrimaryColor, fontWeight:'bold'}}>Create an account</Text>
                            </TouchableOpacity>
                        </View>
                        {/**........................................................................................ */}


                    </View>
                </View>




            </View>
            
        </View>
    )
}


export default LoginScreen