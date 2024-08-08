
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


    
    

    export {getPreviousScreen, appPrimaryColor}