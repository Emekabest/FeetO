import { Animated, Dimensions, FlatList, Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AllScreenStyles from "../AllScreenStyles";
import HomeScreenStyles from "./HomeScreenStyles";
import Header from "../Header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCircleDot } from "@fortawesome/free-solid-svg-icons";
import { height } from "@fortawesome/free-solid-svg-icons/fa0";
import BottomTab from "../BottomTab/BottomTab";
import { useNavigationState } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { appPrimaryColor } from "../AllScreenFuntions";

interface HomeScreenProps{
    navigation:any
}


const HomeScreen:React.FC<HomeScreenProps> = ({navigation})=> {
    const numColumnsId = 3 //Coulmn number of the Home Items UI




    /**Contains all items available.............*/
    
    const AllItems: { key: never; name: never; price: never; image: never; }[] = [];
    //////////////////////////////////////////////////////////////////////////////////////////////

    

    /**Contains items gotten from the database.........*/
    const [Items_db, setItems_db] = useState([])
    ///////////////////////////////////////////////////



    /**Getting the the items data from the databse................................................................................ */
    axios.get('https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com/').then((res)=>{


        if (!Items_db.length){

            setItems_db(res.data.items)
        }

    }).catch((err)=>{

        console.log('Error: ' + err)
    })

    //////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////




/**Appending each data from the database to a new array "AllItems"...........................*/
    if (!AllItems.length){

        Items_db.forEach((item)=>{

            const {_id, name, price, image} = item
            AllItems.push({
                key:_id,
                name,
                price,
                image
            })
            
        })
    }
    //////////////////////////////////////////////////////////////////////////////////////





/**Advert Panel Modification..................................................................................................
 * ...........................................................................................................................
 */
const scrollViewRef = useRef(null)
const scrollX = useRef(new Animated.Value(0)).current;
const [currentIndex, setCurrentIndex] = useState(0);
const [direction, setDirection] = useState('forward')
const { width } = Dimensions.get('window')
const slideWidth = width * 0.8

/**All slide data information... */
const slides = [
    {
        key:1,
        text:'Slide 1'
    },

    {
        key:2,
        text:'Slide 2'
    },

    {
        key:3,
        text:'Slide 3'
    },

    {
        key:4,
        text:'Slide 4'
    },

]
/**.................................. */



/**This effect controls the effect of slides whenever there is a change in it position */
useEffect(()=>{

    /**This interval enables the slides to move or be modified automatically based on the specified time range inputed (5 seconds) */
    const interval = setInterval(()=>{
        let nextIndex;

        if (direction === 'forward'){//This block runs only when the slides is moving in the forward direction


            /**Incrementing the currentIndex position based on the fact that we are in the foward direction movement lane,
             *  and assigning the incremented value to nextIndex */
            nextIndex = currentIndex + 1;

            /**This statement runs when nextIndex is confirmed to be equals or greater than the slides.length  */
            if (nextIndex >= slides.length){

                nextIndex = slides.length - 1//if this statement becomes true then we assign nextIndex to the last index value of slides array

                setDirection('backward') //Direction is set to backward so as to enable reversing of the slides panel
            }

        }
        else{//This block runs only when the slides is moving in the backward direction / reverse direction

            /**Decrementing the currentIndex position based on the fact that we are in the backward direction movement lane,
             *  and assigning the decremented value to nextIndex */
            nextIndex = currentIndex - 1;

            /**This statement runs when nextIndex is confirmed to be less than 0 */
            if (nextIndex < 0){

                nextIndex = 0; //Assigning nextIndex to 0 so as to repeat the slides animation movement

                setDirection('forward')//Direction is set to forward.
            }

        }

        
        /**This function controls the animation scroll*/
        scrollViewRef.current?.scrollTo({ x: nextIndex * (slideWidth), animated: true });
        /**................................................. */


        setCurrentIndex(nextIndex);//At the end of all the arithmetic and logics, currentIndex is being set as the value of nextIndex
                                    //It determines the current slides index value to be displayed in the UI
        
    }, 5000)
    
    return () => clearInterval(interval);
},[currentIndex, direction])

/**//////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
/**//////////////////////////////////////////////////////////////////////////////////////////////////////////////// */






/**This function handles when the slide is being scrolled manually or dragged */
const handleScroll = (event:any)=>{

    const newIndex = Math.round(event.nativeEvent.contentOffset.x / slideWidth);//Gets the X direction offset value of the slide animation scrollView after being dragged or scrolled
                                                                                //and divides it by the screen/slideWidth to return a rounded integer
    setCurrentIndex(newIndex);//Sets the currentIndex to the newIndex value gotten after being dragged or scrolled


    
    if (newIndex === slides.length - 1) {

        setDirection('backward');
      } else if (newIndex === 0) {

        setDirection('forward');
      }


    console.log(newIndex, currentIndex)

}

////////////////////////////////////////////////////////////////////////////////////


if (AllItems.length){
    

    return (
        <View style = {AllScreenStyles.body}>
            <Header screenName = "Home" previousScreen="None"/>{/**Header............................................. */}

            <ScrollView>{/**Body............ */}
                <View style = {HomeScreenStyles.mainAdvertContainer} >{/**Advert Slider */}
                        <View style = {HomeScreenStyles.advertULContainer}>

                        {/**Animation.................................................... */}
                            <Animated.ScrollView
                                // contentContainerStyle = {{paddingHorizontal:2 }}
                                ref={scrollViewRef}
                                horizontal
                                showsHorizontalScrollIndicator = {false}
                                pagingEnabled
                                snapToInterval={slideWidth + (10 * 2)}
                                decelerationRate="fast"
                                snapToAlignment='center'
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { useNativeDriver: false }
                                )}
                                onMomentumScrollEnd={handleScroll}
                            >

                                {
                                    slides.map((slide)=>(
                                        <View key={slide.key} style = {HomeScreenStyles.advertList}></View>
                                    )
                                    )
                                }
                                
                            </Animated.ScrollView>
                            {/*////////////////////////////////////////////////////////////////////////////////*/}
                            
                        </View>

                    <View style = {HomeScreenStyles.advertListIndicatorContainer}>

                        {
                            slides.map((slide)=>(
                                <View key={slide.key} style = {HomeScreenStyles.advertListIndicator}>
                                    <FontAwesomeIcon 
                                    icon={faCircleDot}
                                    size={8}
                                    color={slide.key - 1 === currentIndex ? appPrimaryColor : 'lightgray'}
                                    />
                                </View>
                            ))
                        }

                    </View>
                </View>

                <View style = {HomeScreenStyles.productCardMainContainer}>{/**All Product Template*/}
                    <View style = {HomeScreenStyles.productCardMainContainerInner}>
                        
                        <FlatList
                            key={numColumnsId}
                            data={AllItems}
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
                            scrollEnabled = {false}
                            numColumns={numColumnsId}
                            contentContainerStyle = {HomeScreenStyles.flatListProductCard}
                        />

                    </View>
                </View>
            </ScrollView>

        <BottomTab />
        </View>
    );
}
  }

  export default HomeScreen
