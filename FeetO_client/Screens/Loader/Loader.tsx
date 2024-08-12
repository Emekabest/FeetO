import { View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { appPrimaryColor } from "../AllScreenFuntions"



const Loader = ()=>{



    return(
        <View style = {AllScreenStyles.loaderMainCont}>
            <View style = {AllScreenStyles.loaderMainContInner}>

                <View>
                    <FontAwesomeIcon icon={faSpinner} size={30} color={appPrimaryColor}/>
                </View>


            </View>
        </View>
    )
}


export default Loader