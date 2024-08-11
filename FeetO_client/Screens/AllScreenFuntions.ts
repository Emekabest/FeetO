import axios from "axios";

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
const getAllItems = async (route:string)=>{

    try{
        const response = await axios.get(`https://9s5gflpjlh.execute-api.us-east-1.amazonaws.com${route}`)

        return response.data.items
    }
    catch(err){

        return err
    }

}

////////////////////////////////////////////////////



export {getPreviousScreen, getAllItems, appPrimaryColor}