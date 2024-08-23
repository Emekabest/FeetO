import { Text, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import { getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import OrdersScreenStyles from "./OrdersScreenStyles"


interface OrdersScreenProp{
    navigation:any
    route:any
}


const OrderScreen:React.FC<OrdersScreenProp> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)



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