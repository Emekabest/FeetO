import { StyleSheet } from "react-native";
import { appPrimaryColor, screenHeight } from "../AllScreenFuntions";




const ProfileScreenStyles = StyleSheet.create({

    profileCont:{
        margin:5,
        borderRadius:8,
    },

    profileContImage:{
        height:150,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'
    },

    imageCont:{
        height:"80%",
        width:"50%",
        backgroundColor:'#fff',
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center'
    },

    InputCont:{
        marginTop:10,
        backgroundColor:'#fff',
        borderRadius:8,
        paddingHorizontal:8

    },

    InputContLi:{
        marginVertical:10,

    },

    InputContLiTxt:{
        color:'#aaa'
    },

    Input:{
        borderWidth:1,
        borderColor:'#aaaaaa',
        borderRadius:8,
        // marginVertical:8,
        paddingHorizontal:7,
        height:45,
        color:'#333',
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


    changePasswordPanel:{
        height:screenHeight,
        width:'100%',
        backgroundColor:'lightgray',
        position:'absolute',
        zIndex:1

    },

    changePasswordPanelHeader:{
        height:50,
        padding:10,
        backgroundColor:'#333',
        justifyContent:'center',
        alignItems:"flex-start"

    },

    changePasswordPanelBody:{
        padding:10
    }



})

export default ProfileScreenStyles