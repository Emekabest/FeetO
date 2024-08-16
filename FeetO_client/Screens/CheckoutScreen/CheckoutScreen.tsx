import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import CheckoutScreenStyles from "./CheckoutScreenStyles"
import CartScreenStyles from "../CartScreen/CartScreenStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCancel, faCreditCard, faEdit, faFloppyDisk, faSave, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useNavigationState } from "@react-navigation/native"
import { formatPrice, getPreviousScreen } from "../AllScreenFuntions"
import { Paystack } from "react-native-paystack-webview"
import { useEffect, useState } from "react"
import { appPrimaryColor } from "../AllScreenFuntions"
import { height } from "@fortawesome/free-solid-svg-icons/fa0"
import AsyncStorage from "@react-native-async-storage/async-storage"
import AlertBox from "../AlertBox/AlertBox"


interface CheckoutProp{
    navigation:any,
    route:any
}


const CheckoutScreen:React.FC<CheckoutProp> = ({navigation, route})=>{
    const CartItems = []
    const recentProductDetailsID = route.params ? route.params.id : ''
    const totalItemPrice = route.params ? route.params.totalItemPrice : ''

    const [address, setAddress] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [cartItemsDemo, setCartItemsDemo] = useState([])
    const [user, setUser] = useState('')


    const [addressInputCont_display, setAddressInputCont_display] = useState('none')
    const [paymentBtnOverlay_display, setPaymentBtnOverlay_display] = useState('flex')
    const [componentAlertBox_display, setComponentAlertBox_display] = useState('none')


    const previousScreen = getPreviousScreen(useNavigationState)


    /**Setting the payment button default display status..................... */
    useEffect(()=>{

        if (address && phoneNumber){
            setPaymentBtnOverlay_display('none')
        }
        else{
            setPaymentBtnOverlay_display('flex')
            
        }

    }, [address, phoneNumber])
    ///////////////////////////////////////////////////////////////////////////



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


    /**Handles when a user attemps to edit address */
    const handleAddressEdit = ()=>{

        
        setCurrentAddress(address)
        setAddressInputCont_display('flex')
    }
    /**////////////////////////////////////////////////// */



    /**Handles when a user attempts to discard the changes made on the address */
    const handleCancelEdit = ()=>{



        setAddress(currentAddress)
        setAddressInputCont_display('none')
        setComponentAlertBox_display('none')
        
    }
    /////////////////////////////////////////////////////////


    const handleSaveAddress = ()=>{


        setAddressInputCont_display('none')
    }



    /**Handles when the customer proceeds to payment */
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
    /**//////////////////////////////////////////////////////////////// */




    /**AddressInput AlertBox..........................................................................................
     * ...............................................................................................................
     */
    const ComponentAlertBox = ()=>{


        return (
            <View style = {[AllScreenStyles.AlertBoxBody, {display:componentAlertBox_display}]}>
            <View>

                <View style = {AllScreenStyles.AlertBoxCont}>{/**Box */}
                    <View style = {AllScreenStyles.AlertBoxContInner}>
                        <View style = {AllScreenStyles.TextSection}>
                            <Text style = {AllScreenStyles.TextSectionTxt}>Are you sure you want to Discard changes?</Text>
                        </View>

    
                        <View style = {[AllScreenStyles.ButtonSection, {flexDirection:'row', display:'flex'}]}>
                            <TouchableOpacity onPress={handleCancelEdit} style = {AllScreenStyles.ButtonSectionLeft}><Text style = {{color:'#333', fontWeight:'bold'}}>Yes</Text></TouchableOpacity>
                            <TouchableOpacity onPress={()=> setComponentAlertBox_display('none')} style = {AllScreenStyles.ButtonSectionRight}><Text style = {{color:'#333', fontWeight:'bold'}}>No</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>

            </View>
        </View>
        )
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    return (
        <View style = {AllScreenStyles.body}>
            <Header screenName="Checkout" previousScreen={previousScreen} id = {recentProductDetailsID} />


                <ScrollView style = {CheckoutScreenStyles.checkoutBody}>{/**Body.................. */}
                    <View>
                        <View>

                            <View style = {CheckoutScreenStyles.paymentSummaryCont}>{/**Payment Summary */}
                                <View style = {CheckoutScreenStyles.paymentSummaryContLi}>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeft}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeftTxt}>SubTotal</Text>
                                    </View>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerRight}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerRightTxt}>N{formatPrice(totalItemPrice)}</Text>
                                    </View>
                                </View>

                                <View style = {CheckoutScreenStyles.paymentSummaryContLi}>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeft}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerLeftTxt}>DeliveryCost</Text>
                                    </View>
                                    <View style = {CheckoutScreenStyles.paymentSummaryContLiInnerRight}>
                                        <Text style = {CheckoutScreenStyles.paymentSummaryContLiInnerRightTxt}>N0</Text>
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
                                        <Text style = {[CheckoutScreenStyles.paymentSummaryContLiInnerRightTxt, {color:appPrimaryColor}]}>N{formatPrice(totalItemPrice)}</Text>
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
                                    
                                    <TouchableOpacity style = {CheckoutScreenStyles.deliveryAddressEdit} onPress={handleAddressEdit}>
                                        <FontAwesomeIcon icon={faEdit} size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {/**........................................................................................................ */}

                            
                            <View style = {CheckoutScreenStyles.phoneNumCont}>
                                <View>
                                    <View style = {CheckoutScreenStyles.deliveryAddressContHeading}>
                                            <Text style = {CheckoutScreenStyles.deliveryAddressContHeadingTxt}>Phone Number</Text>
                                            <Text style = {{color:appPrimaryColor, fontSize:10}}>please ensure you enter a valid phone number</Text>
                                    </View>
                                    <View>
                                            <TextInput style = {CheckoutScreenStyles.phoneNumInput} keyboardType='numeric' value={phoneNumber} onChangeText={setPhoneNumber}/>
                                            <Text style = {CheckoutScreenStyles.phoneNumInputErrMsg}></Text>
                                    </View>
                                </View>
                            </View> 
                        </View>
                        </View>
                    </ScrollView>

                    
                    
                    {/**Address Input Popup container......................................................................... */}
                    <View style = {[CheckoutScreenStyles.deliveryAddressInputCont, {display: addressInputCont_display}]}>
                        <TouchableOpacity style={{position:'absolute', top:10, right:10}} onPress={()=> setComponentAlertBox_display('flex')}>
                            <FontAwesomeIcon icon={faTimes}  color="#333" size={30}/>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={{position:'absolute', bottom:50, right:'45%'}} onPress={handleSaveAddress}>
                            <FontAwesomeIcon icon={faSave}  color="#333" size={30}/>
                            <Text style = {{color:'#333'}}>Save</Text>
                        </TouchableOpacity>
                            
                                <TextInput style = {CheckoutScreenStyles.deliveryAddressInput} textAlignVertical="top" multiline = {true} 
                                value={address}
                                onChangeText={setAddress}
                                />
                    </View>
                    {/**........................................................................................................... */}

                    
                      <ComponentAlertBox />          


                
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