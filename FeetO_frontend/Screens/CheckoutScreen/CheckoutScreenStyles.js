import { StyleSheet } from "react-native";
import { appPrimaryColor } from "../AllScreenFuntions";


const CheckoutScreenStyles = StyleSheet.create({

    checkoutBody:{
        margin:8,
    },

    paymentSummaryCont:{
        backgroundColor:'#fff',
        borderRadius:8,
        padding:8
    },

    paymentSummaryContLi:{
        display:'flex',
        flexDirection:'row',
        borderBottomWidth:0.5,
        borderBottomColor:'#e5e4e4',
        paddingVertical:10
    },

    paymentSummaryContLiInnerLeft:{
        flex: 1,
    },

    paymentSummaryContLiInnerRight:{
        flex: 1,
        alignItems:'flex-end',
    },

    paymentSummaryContLiInnerLeftTxt:{
        color:'#333',
        fontSize:15,
        fontWeight:'condensedBold'
    },

    paymentSummaryContLiInnerRightTxt:{
        color:'#333',
        fontWeight:'bold'
        
    },

    deliveryAddressCont:{
        minHeight:100,
        backgroundColor:'#fff',
        borderRadius:8,
        padding:8,
        marginTop:8
    },

    deliveryAddressContHeading:{
        paddingBottom:15,

    },

    deliveryAddressContHeadingTxt:{
        color:'#333',
        fontWeight:'500'
    },

    deliveryAddress:{
    },

    deliveryAddressTxt:{
       color:'#333',
       lineHeight:23
    },

    deliveryAddressEdit:{
        position:'absolute',
        right:0
    },

    phoneNumCont:{
        minHeight:70,
        backgroundColor:'#fff',
        borderRadius:8,
        padding:8,
        marginTop:8
    },

    phoneNumInput:{
        borderWidth:1,
        borderColor:'gray',
        height:35,
        borderRadius:7,
        color:'#333'
    },

    phoneNumInputErrMsg:{
        color:appPrimaryColor,
        fontSize:13
    },

    deliveryAddressInputCont:{
        height:'100%',
        width:'100%',
        backgroundColor:'#ececec',
        position:'absolute',
        zIndex:1,
        alignItems:'center',
        justifyContent:'center'
    },

    deliveryAddressInputContInner:{
    
    
    
    

        
    },

    deliveryAddressInput:{
        color:'#333',
        borderWidth:1,
        borderColor:'#aaaaaa',
        height:'50%',
        width:'90%',
        backgroundColor:'#fff',
        borderRadius:8,
        padding:8

    }

})

export default CheckoutScreenStyles