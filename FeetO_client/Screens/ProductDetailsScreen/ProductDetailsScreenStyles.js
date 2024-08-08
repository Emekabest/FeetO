import { StyleSheet } from "react-native";
import { appPrimaryColor } from "../AllScreenFuntions";



const ProductDetailsSCreenStyles = StyleSheet.create({
    firstSection:{
        height:200,
        width:'100%',
        marginTop:5
        
    },

    secondSection:{
        height:75,
        backgroundColor:'#fff',
        marginTop:10
    },

    thirdSection:{
        minHeight:500,
        backgroundColor:'#fff',
        marginTop:10
    },

    forthSection:{
        height:65,
        width:'100%',
        position:'absolute',
        bottom:0,
        marginTop:10,
        borderTopWidth:0.2,
        borderTopColor:'#aaaaaa',
        padding:5
    },
    
    forthSectionInner:{
        display:'flex',
        flexDirection:'row',

    },

    forthSectionLeft:{
        flex:0.3,
        alignItems:'center',
        justifyContent:'center',
        borderWidth: 0.8,
        borderColor:appPrimaryColor,
        borderRadius:8,
        marginRight:5,
        

    },

    forthSectionLeftTxt:{
        fontSize:20,
        color:appPrimaryColor,
        fontWeight:"400"
    },

    forthSectionRight:{
        flex:0.7,
        backgroundColor:appPrimaryColor,
        borderRadius:8,

    },

    forthSectionRightInner:{
        height:"100%",
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-evenly",
        alignItems:"center"
    },

    forthSectionRightInnerTxt:{
        fontSize:15,
        fontWeight:'bold',
        fontFamily:'Roboto',
        color:'#fff'
    },

    forthSectionInner2:{
        height:'100%',
        display:'flex',
        flexDirection:'row',
        display:'none'
    },

    forthSectionInner2Left:{
        flex:0.4,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderRadius:8,
        borderColor:appPrimaryColor,
        marginRight:5
    },

    forthSectionInner2LeftTxt:{
        fontSize:16,
        color:appPrimaryColor,
        fontWeight:'400',
    },

    forthSectionInner2Right:{
        flex:0.6,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:appPrimaryColor,
        borderRadius:8,
    },

    forthSectionInner2RightTxt:{
        color:"#fff",
        fontSize:17,
        fontWeight:'600'
    }

})


export default ProductDetailsSCreenStyles