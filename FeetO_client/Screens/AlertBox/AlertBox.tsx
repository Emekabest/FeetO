import { Text, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"



const AlertBox = ()=>{




    return(
        <View style = {AllScreenStyles.AlertBoxBody}>
            <View>

                <View style = {AllScreenStyles.AlertBoxCont}>{/**Box */}
                    <View style = {AllScreenStyles.AlertBoxContInner}>
                        <View style = {AllScreenStyles.TextSection}>
                            <Text style = {AllScreenStyles.TextSectionTxt}>Are you sure you want to Discard changes?</Text>
                        </View>

                        <View style = {AllScreenStyles.ButtonSection}>
                            {/* <View>Hello World</View>
                            <View>Hello World</View> */}
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}


export default AlertBox