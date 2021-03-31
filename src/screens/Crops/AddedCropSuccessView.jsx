import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, View } from 'react-native'
import constant from '../../constants/'

const { colors } = constant
const AddedSuccess = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <Image
        style={{ flex: 1, resizeMode: 'cover', width: '100%' }}
        source={require('../../assets/bg.png')}
      />

      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: 'flex-start',
        }}
      >
        <MaterialIcons
          name="arrow-back-ios"
          size={24}
          color="white"
          onPress={() => navigation.navigate('Crop-search')}
          style={{ marginTop: '15%', marginLeft: '7%' }}
        />

        <Text
          style={{
            textAlign: 'center',
            marginTop: '10%',
            fontSize: 60,
            color: colors.white,
            fontWeight: '100',
          }}
        >
          Great
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 60,
            color: colors.white,
            fontWeight: '100',
          }}
        >
          Choice!
        </Text>
        <Text style={{ textAlign: 'center', color: colors.white }}>
          Added to calendar
        </Text>
      </View>
    </View>
  )
}

export default AddedSuccess
