import axios from "axios";
import { Dimensions } from "react-native";

const screenHeight = Math.floor(Dimensions.get("window").height);
const screenWidth = Math.floor(Dimensions.get("window").width);


/**App Primary Color */
const appPrimaryColor = "#a12323"
/////////////////////////////////////////

/**This function gets the all previous screens that has been allocated*/
const getPreviousScreen = (useNavigationState:any)=>{

    const routes = useNavigationState((state: { routes: any; }) => state.routes);
    const previousScreen = routes[routes.length - 2].name

    return previousScreen
}
///////////////////////////////////////




/**This function gets all items from the database............ */
const getData = async (route:string)=>{

    try{
        const response = await axios.get(`https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com${route}`)

        return response.data
    }
    catch(err){

        console.log(err)
        return err
    }


}

////////////////////////////////////////////////////




/**.................................................................................................... */
const formatPrice = (totalPrice)=>{


    const priceStr = String(totalPrice)
    let index = 0;

    if(priceStr.length > 3 && priceStr.length < 5){
        index = 1
    }
    else if (priceStr.length > 4 && priceStr.length < 6){
        index = 2
    }
    else if (priceStr.length > 5 && priceStr.length < 7  ){
        index = 3
    }
    else{
        let formattedPrice =  priceStr
        return formattedPrice
    }

    let formattedPrice =  priceStr.slice(0, index) + ',' + priceStr.slice(index)

    return formattedPrice

}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////




export {getPreviousScreen, getData, formatPrice, appPrimaryColor, screenHeight, screenWidth}