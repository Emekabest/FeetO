import { Dimensions, StyleSheet } from "react-native";
import { appPrimaryColor } from "../AllScreenFuntions";

const screenHeight = Math.floor(Dimensions.get("window").height);



const AdminScreenStyles = StyleSheet.create({

    /**AdminScreen Styles Section................................................ */
    AdminMainCont:{
    },

    AdminMenuLi:{
        height:50,
        backgroundColor:appPrimaryColor,
        alignItems:'center',
        justifyContent:'center',
        marginVertical:5
    },

    AdminMenuLiTxt:{
        color:'#fff',
        fontWeight:'bold'
    },



    //////////////////////////////////////////////////////////////////////////////




    
    
    /**AllOrders Styles Section.................................................. */
    mainBody:{
        marginVertical:10,
        paddingHorizontal:10,
    },

    allOrderCont:{
        height:'96%'
    },

    allOrdersLi:{
        backgroundColor:'#fff',
        height:120,
        borderRadius:8,
        // overflow:'hidden',
        marginVertical:4,
        display:'flex',
        flexDirection:'row',
        padding:3
    },



    leftSection:{
        height:'100%',
        width:'30%',
        justifyContent:'center',
        alignItems:'center'
    },

    rightSection:{
        height:'100%',
        width:'70%',
        paddingLeft:7,
        justifyContent:'space-around',
        borderLeftWidth:0.3,
        borderLeftColor:'#e2e2e2',
    },

    rightSectionTxt:{
        color:"#707070",
        fontSize:15,
        fontWeight:'bold'
    },

    allOrdersLiArrowRight:{
        position:'absolute',
        right:10,
        top:'40%',
    },


    //////////////////////////////////////////////////////////////////////////////////////////////////





    /**AddProduct Style section.................................................................... */

    addProductMainBody:{
        paddingHorizontal:6,
        marginTop:20

    },

    addproductInput:{
        borderWidth:1,
        height:40,
        color:'#333',
        marginVertical:5
    },

    addProductImageSection:{
        height:100, 
        backgroundColor:"white", 
        marginTop: 15, 
        borderRadius:8,
        paddingLeft:10, 
        alignItems:'center',
        display:'flex', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        overflow:'hidden'
    },

    addProductBtnCont:{
        height:50,
        backgroundColor:'#fff',
        marginTop:50,
        alignItems:'center',
        justifyContent:'center'
    },

    addProductBtn:{
        height:'80%',
        width:'80%',
        backgroundColor:appPrimaryColor,
        borderRadius:8,
        alignItems:'center',
        justifyContent:"center"
    }

    //////////////////////////////////////////////////////////////////////////////

})


export default AdminScreenStyles