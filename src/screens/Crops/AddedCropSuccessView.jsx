import React from 'react';
import { Image, Text, View } from 'react-native';
import constant from '../../constants/';

const {colors} = constant;
const AddedSuccess = () => {
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
        <Text style={{ textAlign: 'center', marginTop: '30%', fontSize: 60, color: colors.white
     }}>
          Great
        </Text>
        <Text style={{ textAlign: 'center', fontSize: 60, color: colors.white}}>
          Choice!
        </Text>
        <Text style={{ textAlign: 'center', color: colors.white }}>Added to calendar</Text>
      </View>
    </View>
  )
}

export default AddedSuccess
