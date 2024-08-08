import { StyleSheet, Dimensions } from "react-native";


const screenHeight = Math.floor(Dimensions.get("window").height);



const appPrimaryColor = "#a12323"
const headerHeight = 75

const CartScreenStyles = StyleSheet.create({

    emptyCart:{
        

    },

    mainBody:{
        height: screenHeight - headerHeight,
        position:'relative',
    },


    allItemsContainer:{


    },


    itemContiner:{
        height:200,
        backgroundColor:"#fff",
        marginHorizontal:7,
        borderRadius:8,
        paddingVertical:7,
        marginVertical:7,
        
    },

    itemContinerInner:{
        display:'flex',
        flexDirection:'row',
    },

    itemImage:{
        height:"100%",
        width:"40%",
    },


    itemDetails:{
        width:'60%',
        height:"100%",
    },

    itemDetailsInner:{
    paddingLeft:8,
    // backgroundColor:'yellow'
    },

    itemDetailsLi:{
        paddingVertical:6,
        // width:'100%',
    },

    itemDetailsLiName:{
        fontSize:15,
        color:"#333",
        fontWeight:'condensedBold',
        maxWidth:"100%",
        flexWrap:'wrap',
        // textAlign:'center'
    },

    itemDetailsLiPrice:{
        fontSize:15,
        color:"#333",
        fontWeight:'bold',
    },

    itemDetailsLiAvailablity:{

    },

    itemDetailsLiLogo:{

    },

    checkoutContainer:{
    height:60,
    width:'100%',
    position:'absolute',
    backgroundColor:'#fff',
    bottom:0,
    borderTopWidth:0.2,
    borderTopColor:'#aaaaaa',
    padding:5
    },

    checkoutContainerInner:{
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
    },


    checkoutBtn:{
        backgroundColor:appPrimaryColor,
        width:'70%',
        height:'80%',
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center'

    },

    checkoutBtnTxt:{
        color:'#fff',
        fontWeight:'bold'
    },

    deleteCont:{
        position:'absolute',
        bottom:10,
        right:20
    }




})


export default CartScreenStyles