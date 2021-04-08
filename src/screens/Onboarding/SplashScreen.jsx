import React, {useEffect} from 'react'
import { Image, TouchableOpacity } from 'react-native'
import constants from "../../constants";


const {colors} = constants;
const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Settings');
        }, 3000)
    }, [])

  return (
    <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, backgroundColor: colors.green }} onPress={() => navigation.navigate('Settings')}>
        <Image source={require("../../assets/splash.gif")}  style={{ flex: 1, resizeMode: 'cover', width: '100%' }}/>
      
    </TouchableOpacity>
  )
}



export default SplashScreen