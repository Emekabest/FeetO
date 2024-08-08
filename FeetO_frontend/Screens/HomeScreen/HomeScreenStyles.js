import { StyleSheet } from "react-native";
import { appPrimaryColor } from "../AllScreenFuntions";


const HomeScreenStyles = StyleSheet.create({

    mainAdvertContainer:{
        width:"100%",
        height:120,
        backgroundColor:'#fff',
        paddingBottom:3

    },
    
    advertULContainer:{
        height: 100,
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
     },

    advertList:{
        height:90,
        width:200,
        backgroundColor:appPrimaryColor,
        marginRight:10,
        marginLeft:10,
        borderRadius:6,
     },

     advertListIndicatorContainer:{
        display:'flex',
        flexDirection:"row",
        justifyContent:'center',
     },

     advertListIndicator:{
        paddingRight:1,
        paddingLeft:1
     },
     
     productCardMainContainer:{
        marginTop:15,
        padding:5,
        minHeight:100,
     },

     productCardMainContainerInner:{
      display:'flex',
      alignItems:'center',

    },

    flatListProductCard:{
      display:'flex',
      alignItems:"flex-start",
      // backgroundColor:'lightgray',
      gap:10,
   },
    
    productCard:{
        height:185,
        width:100,
        borderRadius:5,
        margin:8,
        overflow:'hidden',
        elevation:4
    },

     productCardImg:{
        height:'80%',
     },

     productCardDetails:{
      padding:2,
      backgroundColor:appPrimaryColor
     },

     productCardDetailsNameCont:{
      // backgroundColor:'green'
     },
     
     productCardDetailsName:{
      fontSize: 12,
      fontWeight:'condensedBold',
      color:'#fff'
     },

     productCardDetailsPriceCont:{
      display:'flex',
      alignItems:'flex-end'
     },

     productCardDetailsPrice:{
      fontSize: 12,
      fontWeight:'500',
      color:'#fff'
     }
     
})


export default HomeScreenStyles