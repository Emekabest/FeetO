import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import CheckoutScreenStyles from "./CheckoutScreenStyles"
import CartScreenStyles from "../CartScreen/CartScreenStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCancel, faCreditCard, faEdit, faFloppyDisk, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useNavigationState } from "@react-navigation/native"
import { getPreviousScreen } from "../AllScreenFuntions"
import { Paystack } from "react-native-paystack-webview"
import { useEffect, useState } from "react"
import { appPrimaryColor } from "../AllScreenFuntions"
import { height } from "@fortawesome/free-solid-svg-icons/fa0"
import AsyncStorage from "@react-native-async-storage/async-storage"


interface CheckoutProp{
    navigation:any,
    route:any
}


const CheckoutScreen:React.FC<CheckoutProp> = ({navigation, route})=>{
    const CartItems = []

    const previousScreen = getPreviousScreen(useNavigationState)
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [cartItemsDemo, setCartItemsDemo] = useState([])
    const [user, setUser] = useState('')

    const [addressInputCont_display, setAddressInputCont_display] = useState('none')
    const [paymentBtnOverlay_display, setPaymentBtnOverlay_display] = useState('flex')


    const recentProductDetailsID = route.params ? route.params.id : ''
    const totalItemPrice = route.params ? route.params.totalItemPrice : ''


    /**Setting the payment button display status..................... */
    useEffect(()=>{

        if (address && phoneNumber){
            setPaymentBtnOverlay_display('none')
        }
        else{
            setPaymentBtnOverlay_display('flex')
    
        }

    }, [address, phoneNumber])
    /////////////////////////////////////////////////////////////



    useEffect(()=>{

        const getUserItems_Details = async()=>{
            const items = JSON.parse(await AsyncStorage.getItem('CartItems'))
            const user = JSON.parse(await AsyncStorage.getItem('UserDetails_F'))
            
            
            if (!cartItemsDemo.length){
                setCartItemsDemo(items)

            }

            setUser(user)
            
        }
        getUserItems_Details()
    }, [])



    cartItemsDemo.forEach((item)=>{

        const {key, name, price, qty, size, color, image  } = item

        CartItems.push({
            key,
            name,
            price,
            qty,
            size,
            color,

        })

    })

    // console.log(CartItems)



    
    const handleMoveToPaymentScreen = ()=>{
        const customerCheckoutInfo = {
            items:JSON.stringify(CartItems),
            user:JSON.stringify({
                firstname:user.firstname,
                lastname:user.lastname,
                email:user.email,
            }),
            address,
            phoneNumber,
            totalItemPrice
        
        }


        navigation.navigate('Payment', {customerCheckoutInfo})

    }




    return (
        <View style = {AllScreenStyles.body}>
            <Header screenName="Checkout" previousScreen={previousScreen} id = {recentProductDetailsID} />

            {/* <View style = {{height:'100%', backgroundColor:'blue'}}> */}
                {/* <ScrollView style = {{height:'100%', backgroundColor:'green',  position:'relative'}}> */}

                <ScrollView style = {CheckoutScreenStyles.checkoutBody}>{/**Body..................... */}
                    <View>
                        <View>

                            <View style = {CheckoutScreenStyles.paymentSummaryCont}>{/**Payment Summary */}
                                <View style = {CheckoutScreenStyles.paymentSummaryContLi}>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeft}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeftTxt}>SubTotal</Text>
                                    </View>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerRight}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerRightTxt}>N{totalItemPrice}</Text>
                                    </View>
                                </View>

                                <View style = {CheckoutScreenStyles.paymentSummaryContLi}>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeft}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeftTxt}>DeliveryCost</Text>
                                    </View>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerRight}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerRightTxt}>N500</Text>
                                    </View>
                                </View>

                                <View style = {CheckoutScreenStyles.paymentSummaryContLi}>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeft}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeftTxt}>Discount</Text>
                                    </View>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerRight}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerRightTxt}>None</Text>
                                    </View>
                                </View>

                                <View style = {[CheckoutScreenStyles.paymentSummaryContLi, {paddingTop:40}]}>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeft}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeftTxt}>Total</Text>
                                    </View>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerRight}>
                                        <Text style = {[CheckoutScreenStyles.paymentSummaryContLiInnerRightTxt, {color:appPrimaryColor}]}>N{totalItemPrice}</Text>
                                    </View>
                                </View>
                            </View>


                            {/**Delivery Address ....................................................................................
                             * ......................................................................................................
                            */}
                            <View style = {CheckoutScreenStyles.deliveryAddressCont}>
                                <View>
                                    <View style = {CheckoutScreenStyles.deliveryAddressContHeading}>
                                        <Text style = {CheckoutScreenStyles.deliveryAddressContHeadingTxt}>Delivery Address</Text>
                                        <Text style = {{color:appPrimaryColor, fontSize:10}}>please ensure you enter your delivery address</Text>
                                    </View>
                                    <View style = {CheckoutScreenStyles.deliveryAddress}>
                                        <Text style = {CheckoutScreenStyles.deliveryAddressTxt}>{address}</Text>
                                    </View>
                                    
                                    <TouchableOpacity style = {CheckoutScreenStyles.deliveryAddressEdit} onPress={()=> setAddressInputCont_display('flex')}>
                                        <FontAwesomeIcon icon={faEdit} size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/**...................................................................................................... */}


                            <View style = {CheckoutScreenStyles.phoneNumCont}>
                                <View>
                                    <View style = {CheckoutScreenStyles.deliveryAddressContHeading}>
                                            <Text style = {CheckoutScreenStyles.deliveryAddressContHeadingTxt}>Phone Number</Text>
                                            <Text style = {{color:appPrimaryColor, fontSize:10}}>please ensure you enter a valid phone number</Text>
                                    </View>
                                    <View>
                                            <TextInput style = {CheckoutScreenStyles.phoneNumInput} value={phoneNumber} onChangeText={setPhoneNumber}/>
                                            <Text style = {CheckoutScreenStyles.phoneNumInputErrMsg}></Text>
                                    </View>
                                </View>
                            </View>
                                
                        </View>

                        </View>
                    </ScrollView>



                    {/**Address Input Popup container......................................................................... */}
                    <View style = {[CheckoutScreenStyles.deliveryAddressInputCont, {display: addressInputCont_display}]}>
                        <TouchableOpacity style={{position:'absolute', top:10, right:10}}>
                            <FontAwesomeIcon icon={faTimes}  color="#333" size={30}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{position:'absolute', bottom:50, right:'50%'}} onPress={()=> setAddressInputCont_display('none')}>
                            <FontAwesomeIcon icon={faFloppyDisk}  color="#333" size={50}/>
                            <Text style = {{color:'#333'}}>Save</Text>
                        </TouchableOpacity>
                            
                                <TextInput style = {CheckoutScreenStyles.deliveryAddressInput} textAlignVertical="top" multiline = {true} 
                                value={address}
                                onChangeText={setAddress}
                                />
                    </View>
                    {/**........................................................................................................... */}


                
                    <View style = {[CartScreenStyles.checkoutContainer, {position:'static',  bottom:0}]}>
                        <View style = {CartScreenStyles.checkoutContainerInner}>
                            <TouchableOpacity style = {[CartScreenStyles.checkoutBtn, {display:'flex', flexDirection:'row'}]} onPress={handleMoveToPaymentScreen}>
                                <Text style = {[CartScreenStyles.checkoutBtnTxt, {marginRight:10}]}>Make Payment</Text>
                                <FontAwesomeIcon icon={faCreditCard} color="#fff"/>
                            </TouchableOpacity>
                        </View>


                        <View style = {{display:paymentBtnOverlay_display, height:'100%', width:'100%', backgroundColor:'#fff', position:'absolute', opacity:0.6}}>

                        </View>
                    </View>
        </View>
    )
}


export default CheckoutScreen