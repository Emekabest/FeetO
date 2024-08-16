import { StyleSheet } from "react-native"
import { appPrimaryColor } from "../AllScreenFuntions"



const AccountScreenStyles = StyleSheet.create({

    mainBody:{
        padding:7

    },

    TopSection:{
        minHeight:200,
        width:'100%',
        backgroundColor:'#fff',
        borderRadius:8,
        padding:5
    },

    TopSectionLi:{
        height:50,
        // width:
        borderWidth:1,
        borderColor:'#e1e1e1',
        borderRadius:5,
        justifyContent:'center',
        paddingHorizontal:8,
        marginVertical:7,
    },

    TopSectionLiTxt:{
        fontSize:16,
        fontWeight:'500',
        color:'#333'

    },

    BottomSection:{
        marginVertical:10,
        height:50,
        width:'100%',
        backgroundColor:'#fff',
        borderRadius:8

    },

    BottomSectionInner:{  
        height:'100%',
        alignItems:'center',
        justifyContent:'center'      
    },


    BottomSectionBtn:{
        backgroundColor:appPrimaryColor,
        height:"80%",
        width:'50%',
        borderRadius: 7,
        alignItems:'center',
        justifyContent:'center',

    },

    BottomSectionBtnTxt:{
        color:'#fff',
        fontWeight:'bold'
    }

    
})



export default AccountScreenStyles