import { Text, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import { useState } from "react";

interface AlertBoxProps{
    text:string;
}

const AlertBox:React.FC<AlertBoxProps> = ({text})=>{
    const [alertBox_display, setAlertBox_display] = useState('flex')



    return(
        <View style = {[AllScreenStyles.AlertBoxBody, {display:alertBox_display}]}>
            <View>

                <View style = {AllScreenStyles.AlertBoxCont}>{/**Box */}
                    <View style = {AllScreenStyles.AlertBoxContInner}>
                        <View style = {AllScreenStyles.TextSection}>
                            <Text style = {AllScreenStyles.TextSectionTxt}>{text}</Text>
                        </View>

                        <View style = {AllScreenStyles.ButtonSection}>
                          <View style = {AllScreenStyles.ButtonSectionInner}>
                                <TouchableOpacity style = {AllScreenStyles.Button} onPress={()=> setAlertBox_display('none')}>
                                    <Text style = {AllScreenStyles.ButtonTxt}>Ok</Text>
                                </TouchableOpacity>
                          </View>
                        </View>
                    </View>
                </View>

            </View>
        </View>
    )
}


export default AlertBox