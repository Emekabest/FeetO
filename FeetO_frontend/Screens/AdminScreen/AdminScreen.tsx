import { Text, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import Header from "../Header/Header"
import { getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import AdminScreenStyles from "./AdminScreenStyles"


interface AdminScreenProp{
    navigation:any
    route:any
}



const AdminScreen:React.FC<AdminScreenProp> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)


    return (
        <View style = {AllScreenStyles.body}>
            <View>
                <Header screenName="Admin" previousScreen={previousScreen} />

                <View style = {AdminScreenStyles.AdminMainCont}>
                    <TouchableOpacity style = {AdminScreenStyles.AdminMenuLi} onPress={()=> navigation.navigate('AddProductScreen')}>
                        <Text style = {AdminScreenStyles.AdminMenuLiTxt}>Add New Product</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {AdminScreenStyles.AdminMenuLi} onPress={()=> navigation.navigate('AllOrders')}>
                        <Text style = {AdminScreenStyles.AdminMenuLiTxt}>All Orders</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    )
}



export default AdminScreen