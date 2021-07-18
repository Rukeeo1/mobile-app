import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, Entypo } from '@expo/vector-icons';

import ManageCropContext from '../../context/ManageCropsContext';

import { GradientButton, Text } from '../../components/';

import constants from '../../constants';

const { colors, screenHeight } = constants;

export const CropItem = ({ crop, currentVariety }) => {
  const [show, setShow] = useState(false);
  const navigation = useNavigation();
  const { thumbnail_url, name, category, variety, affiliate_links, recommendation } = crop || {}; //{affiliate_links, thumbnail_url, recommendation}

  const manageCropContext = useContext(ManageCropContext);

  const handleNavigation = (path, extraInfo) => () => {
    navigation.navigate(path);
    manageCropContext?.actions?.updateCropToGrowDetails({
      variety: currentVariety,
      cropName: recommendation,
      cropId: crop?.id,
    });
  };

  return (
    <View style={{ marginVertical: screenHeight * 0.005 }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.cropCardContainer]}
        onPress={() => setShow(!show)}
      >
        <View style={[styles.cropDetails]}>
          <Image style={[styles.cropAvatar]} source={{ uri: thumbnail_url }} />
          <View style={[styles.cropText]}>
            <Text style={[styles.cropName]}>{recommendation}</Text>
            <Text>{currentVariety}</Text>
          </View>
        </View>
        <AntDesign name='right' size={24} color={colors.green} />
      </TouchableOpacity>
      {show && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 200,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <GradientButton
            gradient={[colors.blueLigth, colors.blue]}
            onPress={handleNavigation('Success', {})}
          >
            <View
              style={{
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 20,
              }}
            >
              <Text style={styles.btnText}>Grow It</Text>
            </View>
          </GradientButton>
          <GradientButton
            coverStyle={{ marginLeft: 5 }}
            gradient={[colors.blueLigth, colors.blue]}
          >
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}
            >
              <Text style={styles.btnText}>Buy seed</Text>
              <Entypo name='shopping-cart' size={24} color={colors.white} />
            </View>
          </GradientButton>
        </View>
      )}
    </View>
  );
};

export default CropItem;

const styles = StyleSheet.create({
  cropCardContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    borderRadius: 100 / 2,
    height: 70,
    paddingRight: 20,
    // marginVertical: 3,
    // shadow iOS
    shadowColor: 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // shadow android
    elevation: 15,
  },
  cropDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cropText: {
    marginLeft: 10,
  },
  cropAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
