import { Text, TouchableOpacity, View } from "react-native"
import AllScreenStyles from "../AllScreenStyles"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import {faHouseChimneyWindow, faList, faQuestionCircle, faUser } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "../type"
import { appPrimaryColor } from "../AllScreenFuntions"

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;


interface BottomTabProp{
    navigation: any,
    route: any

}


const fontAwesomeIconSize = 22
const appSecondaryColor2 = "#333"

const BottomTab:React.FC<BottomTabProp> = ()=>{
    const navigation = useNavigation<HomeScreenNavigationProp>();

    const [bottomTab1stChild_color, setBottomTab1stChild_color] = useState(appPrimaryColor)
    const [bottomTab2ndChild_color, setBottomTab2ndChild_color] = useState(appSecondaryColor2)
    const [bottomTab3rdChild_color, setBottomTab3rdChild_color] = useState(appSecondaryColor2)
    const [bottomTab4thChild_color, setBottomTab4thChild_color] = useState(appSecondaryColor2)


    /**This function handles the logic behind switching the active icons colors based on the active screen  */
    const handleActiveBottomMenu = (position:number, screen:string)=>{
      const colors = [appSecondaryColor2, appSecondaryColor2, appSecondaryColor2, appSecondaryColor2]

      colors[position - 1] = appPrimaryColor

      setBottomTab1stChild_color(colors[0])
      setBottomTab2ndChild_color(colors[1])
      setBottomTab3rdChild_color(colors[2])
      setBottomTab4thChild_color(colors[3])
        

      if (screen){
          navigation.navigate(screen)
      }
    }



    return (
        <View style = {AllScreenStyles.BottomTab}>{/**Bottom Tab...............*/}
                <View style = {AllScreenStyles.BottomTabInner}>
                    <TouchableOpacity style = {AllScreenStyles.BottomTabInnerLi} onPress = {()=> handleActiveBottomMenu(1)}>
                      <View><FontAwesomeIcon icon={ faHouseChimneyWindow} size={fontAwesomeIconSize} style={{color:bottomTab1stChild_color}} /></View>
                      <View><Text style = {[{color:bottomTab1stChild_color}, AllScreenStyles.BottonTabInnerTxt]}>Home</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity style = {AllScreenStyles.BottomTabInnerLi} onPress = {()=> handleActiveBottomMenu(2)}>
                        <FontAwesomeIcon icon = {faList} size={fontAwesomeIconSize} style={{color:bottomTab2ndChild_color}} />
                        <View><Text style = {[{color:bottomTab2ndChild_color}, AllScreenStyles.BottonTabInnerTxt]}>Categories</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity style = {AllScreenStyles.BottomTabInnerLi} onPress = {()=> handleActiveBottomMenu(3, 'Account')}>
                        <FontAwesomeIcon icon = {faUser} size={fontAwesomeIconSize} style={{color:bottomTab3rdChild_color}} />
                        <View><Text style = {[{color:bottomTab3rdChild_color}, AllScreenStyles.BottonTabInnerTxt]}>Account</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity style = {AllScreenStyles.BottomTabInnerLi} onPress = {()=> handleActiveBottomMenu(4)}>
                        <FontAwesomeIcon icon = {faQuestionCircle} size={fontAwesomeIconSize} style={{color:bottomTab4thChild_color}} />
                        <View><Text style = {[{color:bottomTab4thChild_color}, AllScreenStyles.BottonTabInnerTxt]}>Help</Text></View>
                    </TouchableOpacity>
                </View>
            </View>
    )
}


export default BottomTab