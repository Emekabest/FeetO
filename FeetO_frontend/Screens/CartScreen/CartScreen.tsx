import { View, Text, ScrollView, Image, FlatList, TouchableOpacity, useWindowDimensions } from "react-native"
import Header from "../Header/Header"
import AllScreenStyles from "../AllScreenStyles"
import CartScreenStyles from "./CartScreenStyles"
import { useNavigationState } from "@react-navigation/native"
import { getPreviousScreen } from "../AllScreenFuntions"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface CartScreenProp{
    navigation:any
    route:any
}

const CartScreen:React.FC<CartScreenProp>= ({navigation, route})=>{
    const numColoumnId = 1
    const recentProductDetailsID = route.params ? route.params.id : ""
    const previousScreen = getPreviousScreen(useNavigationState)

    const [cartItems, setCartItems] = useState([])
    const [totalItemPrice, setTotalItemPrice] = useState(0)



    useEffect(()=>{
        const getCartItems = async ()=>{
    
            const cartItems = JSON.parse(await AsyncStorage.getItem('CartItems'))

            if (cartItems){

                setCartItems(cartItems)
            }
    
        }

        getCartItems()
    },[])


    useEffect(()=>{
        
        const getTotalItemPrices = ()=>{

            let totalPrice = 0;
            
            cartItems.forEach((item)=> { totalPrice += Number(item.price)})
            
            setTotalItemPrice(totalPrice)
        }
        getTotalItemPrices()

    },[cartItems])





    /**Handles when the user deletes an item/product from the cart............................. */

        const handleDelete = async (id:string)=>{
            const tempCartItems = [...cartItems]
    
            const getItemIndex = tempCartItems.findIndex(item => item.key.trim() === id.trim() )
    
            tempCartItems.splice(getItemIndex, 1)//Deletes item/product
    
            
            /**Updates the cart.......... */
            await AsyncStorage.setItem('CartItems',JSON.stringify(tempCartItems))
            setCartItems(tempCartItems)

            console.log('Item Deleted')
    
        }
    /**////////////////////////////////////////////////////////////////////////////////////////////// */





    /**Handles when a user proceeds to checkout the items...............................................................  */
    const handleCheckout = async ()=>{

        const user = await AsyncStorage.getItem('UserDetails_F')

        if (!user){

            console.log('Login to continue checkout')

            navigation.navigate('Account')
        }
        else{

            navigation.navigate('CheckOut', {id:recentProductDetailsID, totalItemPrice})
        }

    }
    //////////////////////////////////////////////////////////////////////////////////////////
    



    return (
        <View style = {AllScreenStyles.body}>
            <View style = {{height:'100%'}}>
                <Header screenName="Cart" previousScreen={previousScreen} id = {recentProductDetailsID}/>   

                {
                    cartItems.length ? 

                    <View style = {CartScreenStyles.mainBody}>{/**Body.............................................. */}    

                        <ScrollView style = {{marginBottom: 60} }>
                        <View>
                            <View style = {{marginVertical:10, alignItems:'center',}}>
                                <Text style = {{color:'#333'}}>All Items({cartItems.length ? cartItems.length : 0})</Text>
                            </View>

                            <View>{/**Items Container.................. */}

                                    <View>
                                    <FlatList 
                                    key={numColoumnId}
                                    scrollEnabled = {false}
                                    numColumns={numColoumnId}
                                    data={cartItems}
                                    keyExtractor={(item)=> String(item.key)}
                                    renderItem={({item})=>(

                                    <TouchableOpacity style ={CartScreenStyles.itemContiner}>{/**Item.................. */}
                                        <View style = {CartScreenStyles.itemContinerInner}>
                                            <View style = {CartScreenStyles.itemImage}>{/**Item Image Container... */}
                                            <View>
                                                    <Image source={{uri:`data:image/jpeg;base64,${item.image}`}} 
                                                    style ={{height:'100%', width:"100%"}}
                                                    resizeMode="contain"
                                                    />
                                                </View>
                                                
                                            </View>

                                            <View style = {CartScreenStyles.itemDetails}>{/**Item Details... */}
                                                <View style = {CartScreenStyles.itemDetailsInner}>
                                                    <View style = {[CartScreenStyles.itemDetailsLi, {maxWidth:'100%'}]}>
                                                        <Text style = {CartScreenStyles.itemDetailsLiName} >
                                                            {item.name}
                                                        </Text>
                                                    </View>
                                                    <View style = {CartScreenStyles.itemDetailsLi}>
                                                        <Text style = {CartScreenStyles.itemDetailsLiPrice}>N{item.price}</Text>
                                                    </View>
                                                    <View style = {CartScreenStyles.itemDetailsLi}>
                                                        <Text style = {CartScreenStyles.itemDetailsLiAvailablity}>In Stock</Text>
                                                    </View>
                                                    <View style = {CartScreenStyles.itemDetailsLi}>
                                                        <Text style = {CartScreenStyles.itemDetailsLiLogo}>FeetO logo</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>


                                        <TouchableOpacity style = {CartScreenStyles.deleteCont} id={item.key} onPress={()=> handleDelete(item.key)}>{/**Remove Item Button*/}
                                            <View>
                                                <FontAwesomeIcon icon={faTrashCan} />
                                            </View>
                                        </TouchableOpacity>


                                    </TouchableOpacity>

                                    )}
                                    />

                                </View>
                       
                            </View>
                        </View>
                        </ScrollView>
                 

                  
                        <View style = {CartScreenStyles.checkoutContainer}>
                            <View style = {CartScreenStyles.checkoutContainerInner}>
                                <TouchableOpacity style = {CartScreenStyles.checkoutBtn} onPress={handleCheckout}>
                                    <Text style = {CartScreenStyles.checkoutBtnTxt}>CHECKOUT(N{totalItemPrice})</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </View>

                    :

                    <View style = {{backgroundColor:'#ececec', display:'flex', alignItems:'center', justifyContent:'center', height:'100%'}}>
                        <Text style ={{color: '#333', fontSize:20, fontWeight:'bold'}}>Cart is empty</Text>
                    </View>

                }

                

            </View>
        </View>
    )
}


export default CartScreen