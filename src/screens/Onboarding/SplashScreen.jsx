import React, {useEffect} from 'react'
import { Image, TouchableOpacity } from 'react-native'

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Settings');
        }, 3000)
    }, [])

  return (
    <TouchableOpacity activeOpacity={0.7} style={{ flex: 1, backgroundColor: 'dodgerblue' }} onPress={() => navigation.navigate('Settings')}>
        <Image source={require("../../assets/splash.gif")}  style={{ flex: 1, resizeMode: 'cover', width: '100%' }}/>
      
    </TouchableOpacity>
  )
}



export default SplashScreen