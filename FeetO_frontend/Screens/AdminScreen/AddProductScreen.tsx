import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native"
import Header from "../Header/Header"
import { appPrimaryColor, getPreviousScreen } from "../AllScreenFuntions"
import { useNavigationState } from "@react-navigation/native"
import { launchImageLibrary } from 'react-native-image-picker'
import axios from "axios"
import { useState } from "react"
import AdminScreenStyles from "./AdminScreenStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faCamera } from "@fortawesome/free-solid-svg-icons"
import ImageResizer from 'react-native-image-resizer'

interface AddProductAdminScreenProp{
    navigation:any
    route:any
}


const AddProdutAdminScreen:React.FC<AddProductAdminScreenProp> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)
    
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState('')
    const [qty, setQty] = useState('')
    const [imageUri, setImageUri] = useState(null);
    const [imageData, setImageData] = useState({});




    /**Selecting a Product image.......................................................................................... */
    const pickImage = async () => {
        const options = {
          mediaType: 'photo',
          includeBase64: false,
        };
    

        /**This function activates the gallery in the app so as to pick the specified product image*/
        launchImageLibrary(options, async(response) => {

          if (response.didCancel) {//If the user cancels the process this statement should execute

                console.log('User cancelled image picker');
          } else if (response.errorCode) {

                console.log('ImagePicker Error: ', response.errorMessage);
          } else {
                
                try{
                    
                    /**This function compresses the image into minimal size */
                    const compressedImg = await ImageResizer.createResizedImage(response.assets[0].uri, 800, 800, 'JPEG', 80)
                    /**..................................................................................................... */

                    
                    setImageUri({uri: compressedImg.uri});//Sets the image url to be displayed in the UI

                    
                    /**Sets the image data to be sent to the server... */
                    setImageData({
                        name: response.assets[0].fileName,
                        type: response.assets[0].type,
                        uri: compressedImg.uri,
                    })
                    /**.............................................. */

                }
                catch(err){

                    console.log('Error resizing image: ', err);//Returns this if there is can error compressing the image
                }

                
                //Sets the image Data

          }
        });
      };
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





      /**Handles when the user uploads the product data to the database................................................ */
      const handleUploadData = ()=>{
        const priceRegex = /^([0-9]+)$/
        const isPrice = priceRegex.test(price)


        /**Checks if the required data is available before proceeding*/
        if (isPrice && imageUri){
            

            /**Aligning the product/item form data...*/
            const newProduct = new FormData();
            newProduct.append('name', productName);
            newProduct.append('price', price);
            newProduct.append('image', imageData);
            /**..................................... */



            /**Api post request information ...................................................*/
            const url = 'https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/upload'
            const options = {
                headers: {
                    Accept:'application/json',
                    'Content-Type': 'multipart/form-data'
                }
            }

            axios.post(url, newProduct, options).then((res)=>{
            
                if (res.status === 200){
                    
                    Alert.alert(res.data.msg)
                }
            })
            .catch((err)=>{

                console.log('Error o ' + err)
            })

        }
        else{
            Alert.alert('A field is missing')
        }
        
      }
      ///////////////////////////////////////////////////////////////////////////////////////////////////////////////





    return(
        <View>
            <View>
                <Header screenName="AddProduct" previousScreen={previousScreen} />



                <View style ={AdminScreenStyles.addProductMainBody}>
                    <View style = {{backgroundColor:'#fff', padding:7, borderRadius:8}}>{/**Input section */}
                        <TextInput placeholder="Product Name" placeholderTextColor='gray' style = {AdminScreenStyles.addproductInput} value={productName} onChangeText={setProductName} />
                        <TextInput placeholder="Price" placeholderTextColor='gray' style = {AdminScreenStyles.addproductInput} value = {price} onChangeText={setPrice} />
                        <TextInput placeholder="Quantity" placeholderTextColor='gray' style = {AdminScreenStyles.addproductInput} />
                    </View>


                    <View style = {AdminScreenStyles.addProductImageSection}>{/**Image Section.......*/}
                        <View>
                            <TouchableOpacity onPress={pickImage}><FontAwesomeIcon icon={faCamera} size={40} color={appPrimaryColor}/></TouchableOpacity>
                        </View>


                        <View style = {{height:100,width:100, backgroundColor:"lightgray"}}>
                             {imageUri && <Image source={imageUri} style={{ width: 100, height: 100 }} />}
                        </View>
                    </View>



                    <View style = {AdminScreenStyles.addProductBtnCont}>{/**Button Section........ */}
                        <TouchableOpacity style = {AdminScreenStyles.addProductBtn} onPress={handleUploadData}><Text>Upload Data</Text></TouchableOpacity>
                    </View>

                </View>
            </View>

        </View>
    )
}

export default AddProdutAdminScreen