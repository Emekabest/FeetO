import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import RegisterScreenStyles from "./RegisterScreenStyles"
import Header from "../Header/Header"
import { appPrimaryColor, getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import { useState } from "react"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Loader from "../Loader/Loader"

interface RegisterScreenProp{
    navigation:any
    route:any
}



const RegisterScreen:React.FC<RegisterScreenProp> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)

    /**Inputs value state........................................... */
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState('')
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState('')
    const [emailErrorMsg, setEmailErrorMsg] = useState('')
    const [passWordErrorMsg, setPasswordErrorMsg] = useState('')
    const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] = useState('')
    const [isLoader, setIsLoader] = useState(false)



    const createAccount = ()=>{
        const nameRegex = /^[a-zA-Z]{2,30}$/
        const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/
        const passwordRegex = /^.{5,}$/
        const confirmPasswordRegex = new RegExp(`^${password}$`)


        const inputInfos = [


            {
                id:'firstname',
                name:firstname,
                regex:nameRegex.test(firstname.trim()),
                regexErrorMsg:'value must be more than 1 and less than 30, must include only alphabet(a-z)',
                setErrorMsg(errorMsg:string){
                    setFirstNameErrorMsg(errorMsg)
                }
            },
    
            {
                id:'lastname',
                name:lastname,
                regex:nameRegex.test(lastname.trim()),
                regexErrorMsg:'value must be more than 1 and less than 30, must include only alphabet(a-z)',
                setErrorMsg(errorMsg:string){
                    setLastNameErrorMsg(errorMsg)
                }
            },
    
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
                regexErrorMsg:'value must be more than 4',
                setErrorMsg(errorMsg:string){
                    setPasswordErrorMsg(errorMsg)
                }
            },
    
            {
                id:'confirm password',
                name:confirmPassword,
                regex:confirmPasswordRegex.test(confirmPassword.trim()),
                regexErrorMsg:"password dosen't match",
                setErrorMsg(errorMsg:string){
                    setConfirmPasswordErrorMsg(errorMsg)
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
            ////////////////////////////////////////////////////////////////////////////////////////////////////



            
            const noErrorsFound = loopCount <= 0 ? true : false
            if (noErrorsFound){//make request here..........
                setIsLoader(true)
                
                const userDetails = {
                    firstname:firstname.toLowerCase(),
                    lastname:lastname.toLowerCase(),
                    email:email.toLowerCase(),
                    password
                }


                
                /**Making a request to the server to enable us create a new user account */
                const url = 'https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/register'
                axios.post(url, userDetails, {headers: {'Content-Type': 'application/json'}}).then(async(res)=>{
                       const data = res.data 


                    if (res.status === 200){
                        const userDetails = data.data
                        
                        await AsyncStorage.setItem('UserDetails_F', JSON.stringify(userDetails))
                        console.log('data saved', userDetails)
                        navigation.navigate('Home')

                    }

                    setIsLoader(false)
                    Alert.alert(data.msg)
                })
                .catch((err)=>{
                    console.log('Error Occured ' + err)
                })


            }


    }



    return (
        <View style = {AllScreenStyles.body}>
            <Header screenName="Register" previousScreen={previousScreen}/>
            {
                    isLoader ? 

                    <Loader />

                    :

                    null
                }
            <View style = {RegisterScreenStyles.bodyInner}>

                
                <View style = {RegisterScreenStyles.RegisterCont}>{/**Registration Container........................................................................ */}
                    <View>

                        <View><Text style = {RegisterScreenStyles.headingTxt}>Create an account</Text></View>

                        <View style = {RegisterScreenStyles.inputCont}>{/**Input Container.............. */}
                            <View style = {RegisterScreenStyles.inputContLi}>
                                <TextInput style = {RegisterScreenStyles.input} placeholder="Enter firstname" placeholderTextColor='gray' value={firstname} onChangeText={setFirstName} />
                                <Text style = {RegisterScreenStyles.errorDetailsTxt}>{firstNameErrorMsg}</Text>
                            </View>

                            <View style = {RegisterScreenStyles.inputContLi}>
                                <TextInput style = {RegisterScreenStyles.input} placeholder="Enter lastname" placeholderTextColor='gray'value={lastname} onChangeText={setLastName} />
                                <Text style = {RegisterScreenStyles.errorDetailsTxt}>{lastNameErrorMsg}</Text>
                            </View>

                            <View style = {RegisterScreenStyles.inputContLi}>
                                <TextInput style = {RegisterScreenStyles.input} placeholder="Enter email" placeholderTextColor='gray' value={email} onChangeText={setEmail}/>
                                <Text style = {RegisterScreenStyles.errorDetailsTxt}>{emailErrorMsg}</Text>
                            </View>

                            <View style = {RegisterScreenStyles.inputContLi}>
                                <TextInput style = {RegisterScreenStyles.input} placeholder="Enter password" placeholderTextColor='gray' value={password} onChangeText={setPassword}/>
                                <Text style = {RegisterScreenStyles.errorDetailsTxt}>{passWordErrorMsg}</Text>
                            </View>

                            <View style = {RegisterScreenStyles.inputContLi}>
                                <TextInput style = {RegisterScreenStyles.input} placeholder="Confirm password" placeholderTextColor='gray' value={confirmPassword} onChangeText={setConfirmPassword}/>
                                <Text style = {RegisterScreenStyles.errorDetailsTxt}>{confirmPasswordErrorMsg}</Text>
                            </View>
                        </View>



                        <View style = {RegisterScreenStyles.buttonCont}>
                            <TouchableOpacity style = {RegisterScreenStyles.button} onPress={createAccount}>
                                <Text style = {RegisterScreenStyles.buttonTxt}>Register</Text>
                            </TouchableOpacity>
                        </View>



                        {/**Extras........................................................................................ */}
                        <View style = {{display: 'flex', flexDirection:'row', justifyContent:'space-evenly', marginTop:15}}>
                            <Text style = {{color: '#333', fontStyle:'italic'}}>Already a member?</Text>
                            <TouchableOpacity onPress={()=> navigation.navigate('Login')}>
                                <Text style = {{color: appPrimaryColor, fontWeight:'bold'}}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        {/**........................................................................................ */}



                    </View>
                </View>
                
            </View>
        </View>
    )
}


export default RegisterScreen