import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Header from "../Header/Header"
import { getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import AdminScreenStyles from "./AdminScreenStyles"
import AllScreenStyles from "../AllScreenStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowRight, faUser } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useState } from "react"

interface AllOrdersScreenProp{
    navigation:any
    route:any
}




const AllOrdersScreen:React.FC<AllOrdersScreenProp> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)
    
    const numColoumnId = 1
    const AllOrders = []


    const [allOrdersDemo, setAllOrdersDemo] = useState([])
    axios.get('https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/getorders').then((res)=>{

        
        if (!allOrdersDemo.length){
            setAllOrdersDemo(res.data.allorders)

            console.log('Uploaded successfully')
        }

    })
    .catch((err)=>{

        console.log('An error occured o :' + err)
    })



    /**Modifying the each users orders and appending it to the "AllOrders" arrays........................*/
    allOrdersDemo.forEach((orders)=>{

        const {_id, totalItemPrice, address, phoneNumber, user, items} = orders

        AllOrders.push({
            key: _id,
            totalItemPrce:totalItemPrice,
            address,
            phoneNumber,
            user,
            items:JSON.parse(items),//Converting the user Orders to non-string
        })

    })
    ////////////////////////////////////////////////////////////////////////////////////////////////////



    return(
        <View style = {AllScreenStyles.body}>
            <View>
                <Header screenName="AllOrders" previousScreen={previousScreen} />
                <View  style = {AdminScreenStyles.mainBody}>
                    <View style = {AdminScreenStyles.allOrderCont}>

                        <FlatList
                            key={numColoumnId}
                            scrollEnabled = {true}
                            numColumns={numColoumnId}
                            data={AllOrders}
                            keyExtractor={(item)=> String(item.key)}
                            renderItem={({item: order})=>(
                                
                                <TouchableOpacity style = {AdminScreenStyles.allOrdersLi}>
                                    <View style = {AdminScreenStyles.leftSection}>
                                        <FontAwesomeIcon icon={faUser} size={100} color="lightgray"/>
                                    </View>
                                    
                                    <View style = {AdminScreenStyles.rightSection}>
                                        <View><Text style = {AdminScreenStyles.rightSectionTxt}>Item(s) ({order.items.length})</Text></View>
                                        <View><Text style = {AdminScreenStyles.rightSectionTxt}>4/08/2024</Text></View>
                                    </View>

                                    <View style = {AdminScreenStyles.allOrdersLiArrowRight}><FontAwesomeIcon icon={faArrowRight} size={25} color="#707070"/></View>
                                </TouchableOpacity>

                            )}
                        />

                    </View>
                </View>
            </View>
        </View>
    )
}


export default AllOrdersScreen