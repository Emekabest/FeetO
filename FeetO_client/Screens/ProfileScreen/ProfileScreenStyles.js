import { StyleSheet } from "react-native";
import { appPrimaryColor } from "../AllScreenFuntions";




const ProfileScreenStyles = StyleSheet.create({

    profileCont:{
        margin:5,
        borderRadius:8,
        // backgroundColor:'#fff'
    },

    profileContImage:{
        height:150,
        backgroundColor:'lightgreen',
        borderRadius:8,

    },


    InputCont:{
        marginTop:10,
        backgroundColor:'#fff',
        borderRadius:8,
        paddingHorizontal:8

    },

    Input:{
        borderWidth:1,
        borderColor:'#aaaaaa',
        borderRadius:8,
        marginVertical:8,
        height:45
    },


    ButtonCont:{
        marginVertical:10,
        height:50,
        alignItems:'center',
        justifyContent:'center',
    
    },

    Button:{
        backgroundColor:appPrimaryColor,
        width:'50%',
        height:'80%',
        borderRadius:8,
        alignItems:'center',
        justifyContent:'center',

    },

    ButtonTxt:{
        color:'#fff',
        fontWeight:'bold'
    },




})

export default ProfileScreenStyles