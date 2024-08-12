import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Header from "../Header/Header"
import ProductDetailsSCreenStyles from "./ProductDetailsScreenStyles"
import AllScreenStyles from "../AllScreenStyles"
import { height } from "@fortawesome/free-solid-svg-icons/fa0"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCartPlus, prefix } from "@fortawesome/free-solid-svg-icons"
import FontWebView from "../../fontWebView"
import { useEffect, useState } from "react"
import { getPreviousScreen} from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import Loader from "../Loader/Loader"

interface ProductDetailsProp{
     navigation:any,
     route:any
}

const fontAwesomeIconSize = 19

const ProductDetailsScreen:React.FC<ProductDetailsProp> = ({navigation, route})=>{
    
    const [product, setProduct] = useState({})
    
    const [myProduct, setMyProduct] = useState({})
    
    const { id } = route.params
    
    /** */
    const [forthSectionInner2_display, setForthSectionInner2_display] = useState<boolean>(false)
    const previousScreen = getPreviousScreen(useNavigationState)




    /**Sets the product of this page to the what the user select/chooses from the home page........*/
    useEffect(()=>{
        const getProduct = ()=>{

            axios.get(`https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/product/${id}`).then((res)=>{

                console.log(res.data.product)
                setProduct(res.data.product)

            }).catch((err)=>{
                console.log('Error Occured: ' + err)
            })


        }

        getProduct()
        
    },[])
    /////////////////////////////////////////////////////////////////////////////////////

    


    /**Handles when the user adds a product/item to the cart.............................................................. */
    const handleAddToCart = async ()=>{
        if (product.name){
            
            setForthSectionInner2_display(true)


            /**Asigning the product details into a new edited object */
            const {_id, name, price, image} = product 
            const obj = {key:_id, name, price, image, qty:5, color:'red', size:40}
            /**......................................................... */


            try{

                const cartItems =  JSON.parse(await AsyncStorage.getItem('CartItems')) //Getting all items from the local storage if available


                if (cartItems?.length){

                    const ItemAvailableInCart = cartItems.find(item => item.key.trim() === _id.trim() ) //Checking if an item/product is available in the cart
                    

                    /** Temporarily deletes item if found available in the cart...................................*/
                    if (ItemAvailableInCart){
                        console.log('item available')
                        const itemAvailableInCart_Index = cartItems.findIndex(item => item.key.trim() === _id.trim())//Gets the index of the available item 

                        cartItems.splice(itemAvailableInCart_Index, 1) //Removes the item from the cart
                        
                        
                    }
                    /**............................................................................................. */



                    /**Adds product items into the cart......................... */
                    const allCartItems = [...cartItems, obj] //Concating the product to other items in the cart

                    await AsyncStorage.setItem('CartItems', JSON.stringify(allCartItems))//Updates the cart with current product item
                    console.log('added to cart again ' + allCartItems.length)
                    
                }
                else{
                    /**Sets the first item/product into the cart */
                    await AsyncStorage.setItem('CartItems', JSON.stringify([obj])) 
                    console.log('added to the cart ' + 1)
                }
                

            }
            catch(err){
                console.log('err occurred: ' + err)
            }


        }

        else{
            Alert.alert("Couldn't add to cart, Check your network connectivity")
        }

    
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    


    if (!product.name){

        return <Loader />
    }
    return (
        <View style = {AllScreenStyles.body}>
            <View style = {{position:"relative", height:'100%'}}>
                <Header screenName="Details" previousScreen={previousScreen} id = {null} />{/**Header.....................*/}

                <ScrollView style = {{height:"80%"}}>{/**Body.................*/}
                    <View style = {ProductDetailsSCreenStyles.firstSection}>
                        <View>
                            <Image source={{uri:`data:image/jpeg;base64,${product.image.data}`}}
                            style = {{height:"100%"}}
                            resizeMode="cover"
                            />
                        </View>
                    </View>

                    <View style = {ProductDetailsSCreenStyles.secondSection}>
                        <View>
                                <Text style = {{color:'#333'}}>{product.name}</Text>
                        </View>
                    </View>

                    <View style = {ProductDetailsSCreenStyles.thirdSection}>
                        <View>

                        </View>
                    </View>
                </ScrollView>

                <View style = {ProductDetailsSCreenStyles.forthSection}>
                    <View style = {[ProductDetailsSCreenStyles.forthSectionInner, {display:forthSectionInner2_display ?  'none': 'flex'  }]}>
                        <TouchableOpacity style = {ProductDetailsSCreenStyles.forthSectionLeft} onPress={async()=>{ await AsyncStorage.removeItem('CartItems'); console.log("cleared")} }>
                            <View>
                                <Text style = {ProductDetailsSCreenStyles.forthSectionLeftTxt}>Try Out</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style = {ProductDetailsSCreenStyles.forthSectionRight} onPress={handleAddToCart}>
                            <View style = {ProductDetailsSCreenStyles.forthSectionRightInner}>
                                <View><FontAwesomeIcon icon={faCartPlus} size={25} color="#fff"/></View>
                                <View><Text style = {ProductDetailsSCreenStyles.forthSectionRightInnerTxt}>ADD TO CART</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {[ProductDetailsSCreenStyles.forthSectionInner2, {display:forthSectionInner2_display ? 'flex' : 'none'}]}>{/**After Add to cart Container */}
                        <TouchableOpacity style = {ProductDetailsSCreenStyles.forthSectionInner2Left} onPress={()=> setForthSectionInner2_display(false)}>
                            <View><Text style = {ProductDetailsSCreenStyles.forthSectionInner2LeftTxt}>Keep Shopping</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {ProductDetailsSCreenStyles.forthSectionInner2Right} onPress={()=> navigation.navigate('Cart',{id})}>
                            <View><Text style = {ProductDetailsSCreenStyles.forthSectionInner2RightTxt}>Proceed To Checkout</Text></View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    )
}


export default ProductDetailsScreen