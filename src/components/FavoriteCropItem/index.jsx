import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Text, GradientButton } from '../index';

import constants from '../../constants';

const { colors } = constants;

const FavoriteCropItem = ({
  crop,
  onSetTipToShow,
  tipToShowId,
  onNavigate,
}) => {
  const { sow_tip, media_url, grow_level, id, name } = crop || {};
  const showTip = (cropId) => () => onSetTipToShow(cropId);
  return (
    <View>
      <TouchableOpacity
        style={[styles.flowers, { marginVertical: 15 }]}
        onPress={showTip(id)}
      >
        <View>
          <Image style={styles.flowerImg} source={{ uri: media_url }} />
        </View>

        <View style={[styles.flowerText]}>
          <Text style={{ fontSize: 22, fontWeight: 'normal' }}>{name}</Text>
          <Text style={styles.boldText}>{grow_level}</Text>
        </View>
      </TouchableOpacity>
      {id === tipToShowId && (
        <View style={{ marginBottom: 25 }}>
          <Text style={styles.quote}>{sow_tip}</Text>

          <GradientButton
            gradient={[colors.green, colors.greenDeep]}
            onPress={onNavigate}
          >
            <Text style={styles.btnText}>Grow It</Text>
          </GradientButton>
        </View>
      )}
    </View>
  );
};

export default FavoriteCropItem;

const styles = StyleSheet.create({
  flowers: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    marginVertical: 5,
    backgroundColor: colors.white,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    // shadow android
    elevation: 10,
  },
  flowerImg: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  flowerText: {
    marginLeft: 20,
  },
  explore: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 6,
  },
  quote: {
    textAlign: 'center',
    marginVertical: 10,
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
