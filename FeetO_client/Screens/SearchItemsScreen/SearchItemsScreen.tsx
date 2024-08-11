import { Alert, FlatList, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import SearchItemsScreenStyles from "./SearchItemsScreenStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faArrowLeft, faCancel, faTimes } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import axios from "axios"
import { getAllItems, getPreviousScreen } from "../AllScreenFuntions"
import HomeScreenStyles from "../HomeScreen/HomeScreenStyles"
import { useNavigationState } from "@react-navigation/native"


interface SearchItemsScreenProps{
    navigation:any
}


const fontAwesomeIconSize = 22
const SearchItemsScreen:React.FC<SearchItemsScreenProps> = ({navigation})=>{
    const previousScreen = getPreviousScreen(useNavigationState)
    
    
    const numColumnsId = 3
    const [searchedItems, setSearchedItems] = useState([])
    const [searchInputText, setSearchInputText] = useState('')
    const [isSearched, setIsSearched] = useState(false)


    /**Focusing on the search input.............................................. */
    const textInputRef = useState(null)

    const focusTextInput = ()=>{
        if (textInputRef.current){
            textInputRef.current.focus()
        }
        
    }

    useEffect(() => {
        // Automatically focus the input with a small delay
        const timeoutId = setTimeout(() => {
            focusTextInput();
        }, 100); // Adjust the delay as needed
        return () => clearTimeout(timeoutId);
        }, []);
    /////////////////////////////////////////////////////////////////////////////
    


    

    const handleSearchItems = async ()=>{
        
            if (searchInputText.trim()){

                try {

                    /**Getting the the items data from the databse................................................................................ */
                    const allItems = await getAllItems('/')                   
                    //////////////////////////////////////////////////////////////////////////////////////
    
                    
                    /**Filter all items based on search input text */
                    const filterSearchedItems = allItems.filter((item)=> item.name.toLowerCase().includes(searchInputText.toLowerCase()))
                    setSearchedItems(filterSearchedItems)
    
                    setIsSearched(true)
                }
                catch(err){
                    console.log(err)
                    Alert.alert('An error occured, ensure you have a stable internet connection')
                }

            }
            else{
                Alert.alert('Please enter a keyword')
            }
    }


    /**Handles when the search is canceled.............................. */
    const handleCancelSearch = ()=>{
        setSearchInputText('')


        if (!searchInputText.trim()){

            navigation.navigate(previousScreen)
        }
        
    }
    ////////////////////////////////////////////////////////////////////////


    return(
        <View style = {AllScreenStyles.body}>
            <View style = {SearchItemsScreenStyles.header}>
                <View style = {SearchItemsScreenStyles.headerInner}>
                    <TouchableOpacity onPress={()=> navigation.navigate(previousScreen)}>
                        <FontAwesomeIcon icon={faArrowLeft} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts} />
                    </TouchableOpacity>

                    <View style = {SearchItemsScreenStyles.headerInputCont}>
                        <TextInput style = {SearchItemsScreenStyles.headerInput}
                         placeholder="What are you looking for?" 
                         placeholderTextColor='#aaaaaa'
                        onSubmitEditing={handleSearchItems}
                        returnKeyType="search"
                        value={searchInputText}
                        onChangeText={setSearchInputText}
                        ref={textInputRef}
                         />
                    </View>

                    <TouchableOpacity onPress={handleCancelSearch}>
                        <FontAwesomeIcon icon={faTimes} size={fontAwesomeIconSize} style={AllScreenStyles.headerFonts} />
                    </TouchableOpacity>
                </View>
            </View>




            <ScrollView>
                <View style = {HomeScreenStyles.productCardMainContainer}>{/**All Product Template*/}
                    <View style = {HomeScreenStyles.productCardMainContainerInner}>

                        {
                            isSearched && !searchedItems.length ?

                            <View style = {{justifyContent:'center', alignItems:'center'}}>
                                <Text style = {{color:'#333'}}>No Items Found</Text>
                                <Text style = {{color:'#333'}}>Please search another Item</Text> 
                            </View>

                            :

                            <FlatList 
                                key={numColumnsId}
                                data={searchedItems}
                                scrollEnabled = {false}
                                numColumns={numColumnsId}
                                contentContainerStyle = {HomeScreenStyles.flatListProductCard}
                                keyExtractor={(item)=> String(item.key)}
                                renderItem={({item})=>(
    
                                    <TouchableOpacity style = {HomeScreenStyles.productCard} onPress={()=> navigation.navigate('ProductDetails', {id:item.key})}>
                                        <View style = {HomeScreenStyles.productCardImg}>
                                            <Image source={{ uri: `data:image/jpeg;base64,${item.image.data}`}}
                                                style = {{height:'100%'}}
                                            />
                                        </View>
    
                                        <View style = {HomeScreenStyles.productCardDetails}>
                                            <View style ={HomeScreenStyles.productCardDetailsNameCont}>
                                                <Text style = {HomeScreenStyles.productCardDetailsName}>{item.name}</Text>
                                            </View>
                                            <View style ={HomeScreenStyles.productCardDetailsPriceCont}>
                                                <Text style = {HomeScreenStyles.productCardDetailsPrice}>N {item.price}</Text>
                                            </View>
                                        </View>
    
                                    </TouchableOpacity>
    
                                )}
                            />
                            
                        }

                        
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default SearchItemsScreen