import { StyleSheet } from "react-native";

const appPrimaryColor = "#a12323"
const AllScreenStyles = StyleSheet.create({

    body:{
        backgroundColor:'#ececec',
        height:'100%',
    },

    
    /**Header Section Styles........................ */
    Header:{
        height:50,
        backgroundColor:"#333",
        padding:6

    },
    
    seacrhBarContainer:{
        width:'87%',
        height:"100%",
        backgroundColor :"#fff",
        borderRadius:5,
        display:'flex',
        flexDirection:'row',
       overflow:'hidden'

    },

    seacrhBarContainerInnerLeft:{
        width:'12%',
        display:'flex',
        alignItems:"center",
        justifyContent:'center',

    },

    seacrhBarContainerInnerRight:{
        height:'100%',
        width:"88%",
        display:'flex',
        justifyContent:'center',
        backgroundColor:"#fde6e6",
        paddingLeft:5
    },

    seacrhBarContainerInnerRightTxt:{
        color: '#333',
        fontSize:17,
        opacity:0.7
    },

    cartSection:{
        // paddingRight:10,
        display:'flex',
        justifyContent:'center',
        width:30,
        height:'100%'
    },

    cartSectionLengthCont:{
        height:12,
        width:12,
        backgroundColor:appPrimaryColor,
        position:'absolute',
        right:5,
        top:5,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    
    cartSectionLengthContTxt:{
        fontSize:8,
        fontWeight:'bold',
        color:'#fff'
    },

    
/**Header 2 Styles................................................*/
header2Inner:{
    height:'100%',
    display:'flex',
    flexDirection:"row",
},

headerFontsCont:{
    paddingHorizontal:15
},

headerFonts:{
    color:'#fff',
},

headerLeftSection:{
    display:'flex',
    flexDirection:'row',
    flex:0.7,
    alignItems:'center'
},

headerLeftSectionTxt:{
    color:'#fff',
    fontSize:18
},


headerRightSection:{
    flex:0.3,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'


},



/**//////////////////////////////////////////////////////////////// */


/**Loader Styles Section...................... */
loaderMainCont:{
height:'100%',
width:'100%',
backgroundColor:'#fff',
// opacity:0.3,
position:'absolute',
zIndex:1

},

loaderMainContInner:{
    height:'100%',
    alignItems:'center',
    justifyContent:'center'
},


//////////////////////////////////////////



/**Bootom Styles.................... */
    BottomTab:{
        backgroundColor:"#fff",
        position:'absolute',
        bottom:0,
        width:'100%'
   },

   BottomTabInner:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignItems:'center',
   },

   BottomTabInnerLi:{
    display:'flex',
    alignItems:'center',
    padding:5,
   },

   BottonTabInnerTxt:{
    fontSize:13
   }



///////////////////////////////////////

})


export default AllScreenStyles