import { StyleSheet } from "react-native";
import { appPrimaryColor } from "../AllScreenFuntions";



const RegisterScreenStyles = StyleSheet.create({

    bodyInner:{
        height:'100%',
        alignItems:'center',
        justifyContent:'center',

    },

    RegisterCont:{
        minHeight:'50%',
        width:'80%',
        backgroundColor:'#fff',
        padding:8,
        borderRadius:8,

    },

    headingTxt:{
        color:'#333',
        fontSize:17,
        fontWeight:'500'
    },

    
    inputCont:{
        marginVertical:20

    },

    input:{
        height:40,
        borderWidth:0.5,
        borderColor:'gray',
        borderRadius:5,
        color:'#333',
    },
    
    inputContLi:{
        marginVertical:7
    },

    errorDetailsTxt:{
        color:appPrimaryColor,
        fontSize:11.5
    },

    buttonCont:{
        alignItems:'center'
        
    },

    button:{
        backgroundColor:appPrimaryColor,
        width:'80%',
        height:40,
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center'

    },

    buttonTxt:{
        color:'#fff',
        fontWeight:'bold'

    }





})

export default RegisterScreenStyles