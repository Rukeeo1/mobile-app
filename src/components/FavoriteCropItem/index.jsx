import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

import { Text, GradientButton } from "../index";

import constants from "../../constants";
import {MaterialIcons} from "@expo/vector-icons";

const { colors } = constants;

const FavoriteCropItem = ({
  crop,
  onSetTipToShow,
  tipToShowId,
  onNavigate,
}) => {
  const { suggestion, media_url, grow_level, id, name } = crop || {};
  const showTip = (cropId) => () => onSetTipToShow(cropId);
  return (
    <View>
      <TouchableOpacity
        style={[styles.flowers, { marginBottom: 10 }]}
        onPress={ id === tipToShowId ? showTip('') : showTip(id) }

      >
        <View>
          <Image style={styles.flowerImg} source={{ uri: media_url }} />
        </View>

        <View style={[styles.flowerText]}>

          <Text fontType="light" style={{ fontSize: 16, fontWeight: "normal" }}>{name}</Text>

              {id === tipToShowId ? (
                  <View style={{ display: "flex", textAlign: 'center', flexDirection: "row", }}>
                      <MaterialIcons name="star" size={15} color={colors.green} style={{display: 'block', marginTop: 2, marginRight: 5, textAlign: 'center',}} />
                      <Text style={{ fontSize: 14, fontWeight: "normal",  color: colors.green, display: 'flex' } }>
                          {grow_level} {'Crop'}
                      </Text>
                  </View>
          ) : (
                  <Text style={{fontSize: 12, fontWeight: "normal",  color: colors.black}}>
                      {grow_level}
                  </Text>
              )}

        </View>
      </TouchableOpacity>
      {id === tipToShowId && (
        <View style={{ marginBottom: 25 }}>
          <Text fontType={'light'} style={styles.quote}>{suggestion}</Text>

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
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    marginVertical: 5,
    backgroundColor: colors.white,
    shadowColor: "grey",
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    marginTop: 6,
  },
  quote: {
    textAlign: "center",
    marginVertical: 15,
      paddingHorizontal: 5,
      fontSize: 16
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
      fontSize: 18
  },
});
