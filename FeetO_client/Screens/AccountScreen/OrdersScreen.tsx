import { Text, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import { getData, getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import OrdersScreenStyles from "./OrdersScreenStyles"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"


interface OrdersScreenProp{
    navigation:any
    route:any
}


const OrderScreen:React.FC<OrdersScreenProp> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)
    const [allOrderItems, setAllOrderItems] = useState([])
    const [currentLoggedIn_userId, setCurrentLoggedIn_userId] = useState('')
    const [myOrders, setMyOrders] = useState([])



    
    useEffect(()=>{
        const getUserId = async()=>{
    
            const user = JSON.parse(await AsyncStorage.getItem('UserDetails_F'))
      
            setCurrentLoggedIn_userId(user._id)
      
          }
          getUserId()
    },[])







    useEffect(()=>{
        
        const getAllOrders = async()=>{
    
            const items = await getData('/getorders')

            const data = items.allorders


            
            setAllOrderItems(data)
    
        }
        getAllOrders()

    },[])



    
    useEffect(()=>{
        
        // console.log(allOrderItems.length)
        if (allOrderItems.length){

            allOrderItems.forEach((orders)=>{

                const order_userId = JSON.parse(orders.user).id


                if (order_userId === currentLoggedIn_userId.trim()){



                    // setMyOrders(prev => prev.find(item => item.id))
                    // ..console.log(order_userId)

                }


            })

        }


        
    },[allOrderItems])


    console.log(myOrders)

    

    return (
        <View style = {AllScreenStyles.body}>
            <View>
                <Header screenName="Orders" previousScreen={previousScreen}/>

                <View style = {OrdersScreenStyles.mainbody}>
                    <View>
                    
                        <View style = {OrdersScreenStyles.productTagCont}>
                            <View style = {OrdersScreenStyles.productTag}><Text style = {OrdersScreenStyles.productTagTxt}>Items</Text></View>
                            <View style = {OrdersScreenStyles.productTag}><Text style = {OrdersScreenStyles.productTagTxt}>Price</Text></View>
                            <View style = {OrdersScreenStyles.productTag}><Text style = {OrdersScreenStyles.productTagTxt}>Qty</Text></View>
                        </View>


                        <View style = {OrdersScreenStyles.ordersCont}>

                            <TouchableOpacity style = {OrdersScreenStyles.orders}>
                                <View style = {[OrdersScreenStyles.productCont, {flex:1}]}><Text style = {OrdersScreenStyles.ordersTxt}>TimberLand</Text></View>
                                <View style = {[OrdersScreenStyles.priceCont, {flex:1, alignItems:"center"}]}><Text style = {OrdersScreenStyles.ordersTxt}>5000</Text></View>
                                <View style = {[OrdersScreenStyles.qtyCont, {flex:1, alignItems:'flex-end'}]}><Text style = {OrdersScreenStyles.ordersTxt}>2</Text></View>
                            </TouchableOpacity>


                            <TouchableOpacity style = {OrdersScreenStyles.orders}>
                                <View style = {[OrdersScreenStyles.productCont, {flex:1}]}><Text style = {OrdersScreenStyles.ordersTxt}>TimberLand</Text></View>
                                <View style = {[OrdersScreenStyles.priceCont, {flex:1, alignItems:"center"}]}><Text style = {OrdersScreenStyles.ordersTxt}>5000</Text></View>
                                <View style = {[OrdersScreenStyles.qtyCont, {flex:1, alignItems:'flex-end'}]}><Text style = {OrdersScreenStyles.ordersTxt}>2</Text></View>
                            </TouchableOpacity>


                        </View>

                    </View>
                </View>
            </View>
        </View>
    )
}


export default OrderScreen