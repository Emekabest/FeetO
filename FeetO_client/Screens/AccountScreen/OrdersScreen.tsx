import { FlatList, Text, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import { getData, getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import OrdersScreenStyles from "./OrdersScreenStyles"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import Loader from "../Loader/Loader"


interface OrdersScreenProp{
    navigation:any
    route:any
}



const OrderScreen:React.FC<OrdersScreenProp> = ({navigation})=>{

    const numColoumnId = 1;
    const previousScreen = getPreviousScreen(useNavigationState)
    const [allOrderItems, setAllOrderItems] = useState([])
    const [user, setUser] = useState('')
    const [myOrders, setMyOrders] = useState([])
    const [isLoader, setIsLoader] = useState(false)




    
    useEffect(()=>{
        const getUser = async()=>{
    
            const user = JSON.parse(await AsyncStorage.getItem('UserDetails_F'))

            setUser(user)
      
          }
          getUser()
    },[])






    useEffect(()=>{
        
        const getAllOrders = async()=>{
            setIsLoader(true)
    
            const items = await getData('/getorders')

            const data = items.allorders
            

            setAllOrderItems(data)
            setIsLoader(false)
    
        }
        getAllOrders()

    },[])



    
    useEffect(()=>{
        if (allOrderItems.length && user){

            const myTempOrders = []
            allOrderItems.forEach((order)=>{

                const order_userId = JSON.parse(order.user).id

                
                if (order_userId === user._id.trim()){

                    const {_id, items, totalItemPrice, user} = order
 
                    
                    const myOrder = {
                        key:_id,
                        totalItemPrice,
                        items:JSON.parse(items),
                        user:JSON.parse(user)
                    }


                    myTempOrders.push(myOrder)
                }

            })
            
            setMyOrders(myTempOrders)
        }

    },[allOrderItems])


    
    return (
        <View style = {AllScreenStyles.body}>
            <View>
                <Header screenName="Orders" previousScreen={previousScreen}/>                

                {
                    !user ?

                    <View><Text>Sign In for more details</Text></View>

                    :

                    <View style = {OrdersScreenStyles.mainbody}>
                        {
                            isLoader ? 

                            <Loader />

                            :

                            null
                        }

                        
                        <View>
                        
                            <View style = {OrdersScreenStyles.productTagCont}>
                                <View style = {OrdersScreenStyles.productTag}><Text style = {OrdersScreenStyles.productTagTxt}>Items</Text></View>
                                <View style = {OrdersScreenStyles.productTag}><Text style = {OrdersScreenStyles.productTagTxt}>Price</Text></View>
                                <View style = {OrdersScreenStyles.productTag}><Text style = {OrdersScreenStyles.productTagTxt}>Qty</Text></View>
                            </View>

                                <View style = {OrdersScreenStyles.ordersCont}>

                                    <FlatList
                                        key={numColoumnId}
                                        numColumns={numColoumnId}
                                        scrollEnabled = {false}
                                        data={myOrders}
                                        keyExtractor={(item)=> item.key}
                                        renderItem={({item: order})=>(
                                            <TouchableOpacity style = {OrdersScreenStyles.orders}>
                                                <View style = {OrdersScreenStyles.productCont}>
                                                    <Text style = {OrdersScreenStyles.ordersTxt}>
                                                        {order.items[0].name} {order.items[1] ? ", " + order.items[1].name + "..." : '' }
                                                    </Text>
                                                </View>
                                                <View style = {OrdersScreenStyles.priceCont}><Text style = {OrdersScreenStyles.ordersTxt}>{order.totalItemPrice}</Text>
                                                </View>
                                                <View style = {OrdersScreenStyles.qtyCont}><Text style = {OrdersScreenStyles.ordersTxt}>-</Text></View>
                                            </TouchableOpacity>
                                        )}
                                    />

                                </View>  

                        </View>
                    </View>
                }


            </View>
        </View>
    )
}


export default OrderScreen