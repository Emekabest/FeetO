import { Alert, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import Header from "../Header/Header"
import ProductDetailsScreenStyles from "./ProductDetailsScreenStyles"
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
import { useDispatch } from "react-redux"
import { addItemToCart } from "../Redux/ReduxBase"

interface ProductDetailsProp{
     navigation:any,
     route:any
}

const fontAwesomeIconSize = 19
const ProductDetailsScreen:React.FC<ProductDetailsProp> = ({navigation, route})=>{
    const previousScreen = getPreviousScreen(useNavigationState)
    const dispatch = useDispatch();
    
    const [product, setProduct] = useState({})
    
    const [myProduct, setMyProduct] = useState({})
    
    const { id } = route.params

    const [forthSectionInner2_display, setForthSectionInner2_display] = useState<boolean>(false)


    
        

    /**.................................................................................................. */
    useEffect(()=>{

        // setProduct({})

    },[])//id here
    /**Sets the product of this page to the what the user select/chooses from the home page..............*/
    useEffect(()=>{
        const getProduct = ()=>{

            axios.get(`https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/product/${id}`).then((res)=>{

                setProduct(res.data.product)

            }).catch((err)=>{
                console.log('Error Occured: ' + err)
            })
        }

        getProduct()
        
    },[id])
    //////////////////////////////////////////////////////////////////////////////////////////////////////


    


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

                    const ItemAvailableInCart = cartItems.find(item => item.key.trim() === _id.trim() ) //Checking if item/product is available in the cart
                    

                    /** Temporarily deletes product if found available in the cart...................................*/
                    if (ItemAvailableInCart){
                        const itemAvailableInCart_Index = cartItems.findIndex(item => item.key.trim() === _id.trim())//Gets the index of the available item 

                        cartItems.splice(itemAvailableInCart_Index, 1) //Removes the item from the cart
                        
                        
                    }
                    /**............................................................................................ */

                    
                    
                    /**Adds product items into the cart................................. */
                    const allCartItems = [...cartItems, obj] //Concating the product to other items in the cart

                    await AsyncStorage.setItem('CartItems', JSON.stringify(allCartItems))//Updates the cart with current product item


                    dispatch(addItemToCart(allCartItems))
                    
                }
                else{
                    /**Sets the first item/product into the cart */
                    const item = [obj]
                    await AsyncStorage.setItem('CartItems', JSON.stringify(item)) 
                    dispatch(addItemToCart(item))


                }
                

            }
            catch(err){
                console.log('err occurred: ' + err)
            }


        }
    
    }
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    if (!product.name){

        return <Loader />
    }
    return (
        <View style = {AllScreenStyles.body}>
            <View style = {{position:"relative", height:'100%'}}>
                <Header screenName="Details" previousScreen={previousScreen} id = {id} />{/**Header.....................*/}


                <ScrollView style = {{height:"80%"}}>{/**Body.................*/}
                    <View style = {ProductDetailsScreenStyles.firstSection}>
                        <View>
                            <Image source={{uri:`data:image/jpeg;base64,${product.image.data}`}}
                            style = {{height:"100%"}}
                            resizeMode="cover"
                            />
                        </View>
                    </View>

                    <View style = {ProductDetailsScreenStyles.secondSection}>
                        <View>
                        </View>
                    </View>

                    <View style = {ProductDetailsScreenStyles.thirdSection}>
                        <View style = {ProductDetailsScreenStyles.thirdSectionName}>
                            <Text style = {ProductDetailsScreenStyles.thirdSectionNameTxt}>{product.name}</Text>
                        </View>

                        <View style = {ProductDetailsScreenStyles.thirdSectionPrice}>
                            <Text style = {ProductDetailsScreenStyles.thirdSectionPriceTxt}>N {product.price}</Text>
                        </View>
                        
                        <View style = {ProductDetailsScreenStyles.thirdSectionDescription}>
                        <Text style = {ProductDetailsScreenStyles.thirdSectionDescriptionHeader}>Description</Text>
                            <Text style = {ProductDetailsScreenStyles.thirdSectionDescriptionTxt}>
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque, doloremque quod qui tempore vero libero laboriosam quisquam fuga quia dignissimos, temporibus fugiat aperiam rem dolorum laudantium eos dolores tempora fugit tenetur dolorem, laborum veniam suscipit architecto! Accusamus provident adipisci atque!
                            </Text>
                        </View>

                    </View>

                </ScrollView>

                <View style = {ProductDetailsScreenStyles.forthSection}>
                    <View style = {[ProductDetailsScreenStyles.forthSectionInner, {display:forthSectionInner2_display ?  'none': 'flex'  }]}>
                        <TouchableOpacity style = {ProductDetailsScreenStyles.forthSectionLeft} onPress={async()=>{ await AsyncStorage.removeItem('CartItems'); console.log("cleared")} }>
                            <View>
                                <Text style = {ProductDetailsScreenStyles.forthSectionLeftTxt}>Try Out</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style = {ProductDetailsScreenStyles.forthSectionRight} onPress={handleAddToCart}>
                            <View style = {ProductDetailsScreenStyles.forthSectionRightInner}>
                                <View><FontAwesomeIcon icon={faCartPlus} size={25} color="#fff"/></View>
                                <View><Text style = {ProductDetailsScreenStyles.forthSectionRightInnerTxt}>ADD TO CART</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style = {[ProductDetailsScreenStyles.forthSectionInner2, {display:forthSectionInner2_display ? 'flex' : 'none'}]}>{/**After Add to cart Container */}
                        <TouchableOpacity style = {ProductDetailsScreenStyles.forthSectionInner2Left} onPress={()=> setForthSectionInner2_display(false)}>
                            <View><Text style = {ProductDetailsScreenStyles.forthSectionInner2LeftTxt}>Keep Shopping</Text></View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {ProductDetailsScreenStyles.forthSectionInner2Right} onPress={()=> navigation.navigate('Cart',{id})}>
                            <View><Text style = {ProductDetailsScreenStyles.forthSectionInner2RightTxt}>Proceed To Checkout</Text></View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    )
}


export default ProductDetailsScreen