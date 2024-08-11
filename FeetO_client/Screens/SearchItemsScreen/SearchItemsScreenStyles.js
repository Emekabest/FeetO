import { StyleSheet } from "react-native";




const SearchItemsScreenStyles = StyleSheet.create({

    header:{
        height:50,
        backgroundColor:"#333",
        padding:6
    },

    headerInner:{
        // padding:1,
        display:'flex',
        flexDirection:"row",
        justifyContent:'space-between',
        alignItems:'center'
    },

    headerInputCont:{
        width:'80%'

    },

    headerInput:{
        // borderWidth:1,
        // borderColor:'none',
        color:'#fff'
    }


})


export default SearchItemsScreenStyles