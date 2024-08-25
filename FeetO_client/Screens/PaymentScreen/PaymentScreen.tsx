import { Alert, View } from "react-native"
import { Paystack } from "react-native-paystack-webview"
import { Text } from "react-native-svg"
import { appPrimaryColor } from "../AllScreenFuntions"
import axios from "axios"
import { useEffect, useState } from "react"
import AlertBox from "../AlertBox/AlertBox"

interface PaymentProp{
    navigation:any,
    route:any
}



const PaymentScreen:React.FC<PaymentProp> = ({navigation, route})=>{

    const customerCheckoutInfo = route.params.customerCheckoutInfo
    const {items, totalItemPrice, user, address, phoneNumer } = customerCheckoutInfo

    const [paymentSuccess, setPaymentSuccess] = useState(false)



    /**Handles when the user has made a successfull payment........................................ */
    const handleSuccessfulPayment = (response:any)=>{

        const url = 'https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/orders'
        axios.post(url, customerCheckoutInfo).then((res)=>{


            if (res.status === 200){
                
                Alert.alert('Payment Status', 'Successful')
            }
            

        })
        .catch((err)=>{

            console.log('Error: ' + err)

        })

        navigation.navigate('Home')

    }
    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////





    /**Paystack UI....................................................................................
     * .......................
     */
        const Payment = ()=>{
    
            try {
                
                    return(
                    <Paystack
                        paystackKey="pk_test_1eb0b395f6ed12417b33d179002bcebe7e32dd47"
                        amount={Number(totalItemPrice)}
                        billingEmail={JSON.parse(user).email}
                        activityIndicatorColor={appPrimaryColor}
                        onSuccess={handleSuccessfulPayment}
                        onCancel={()=> {Alert.alert('Payment Canceled'); navigation.navigate('Cart')}}
                        autoStart = {true}
                    />
            )
    
            }
            catch(err){
    
                
                return (
                    <View><Text>An Error Occured</Text></View>
                )
            }
            
        }
        

        

    return(
        <View>

             {/**PayStack UI.....................................................
              * .................................................................
              */}
            <View>
               <Payment />
            </View>
            {/*//////////////////////////////////////////////////////////////////////*/ }

        </View>
    )

}



export default PaymentScreen