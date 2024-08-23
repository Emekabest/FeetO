import { StyleSheet } from "react-native";
import { appPrimaryColor } from "../AllScreenFuntions";




const OrdersScreenStyles = StyleSheet.create({
    mainbody:{
        paddingHorizontal:5,
        paddingVertical:10
    },

    productTagCont:{
        // backgroundColor:'yellow',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
    },


    productTag:{
        backgroundColor:appPrimaryColor,
        padding:5,
        borderRadius:50
    },

    productTagTxt:{
        color:'#fff'
    },

    ordersCont:{
        marginVertical:15,
        backgroundColor:'#fff',
        borderRadius:10,
        padding:5,

    },


    orders:{
        height:50,
        borderRadius:8,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'#fff',
        alignItems:'center',
        padding:5,
        borderWidth:1,
        borderColor:'#e6e6e6',
        marginVertical:5,
    },


    ordersTxt:{
        color:'#333',
        fontWeight:'bold'
    }

})



export default OrdersScreenStyles