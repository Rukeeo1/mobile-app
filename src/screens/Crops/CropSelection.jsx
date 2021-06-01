import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';

import { getCropsFavoriteToGrow, getCropVarieties } from '../../redux/actions';

import { Input, GradientButton } from '../../components/';
import { CropItem } from './CropItem';

import constants from '../../constants';
import ManageCropContext from '../../context/ManageCropsContext';

const { colors, months } = constants;

const CropSelection = ({ navigation, route }) => {
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const manageCropContext = useContext(ManageCropContext);

  const { cropDetail, favoriteCrops } = useSelector((state) => state.crops);

  const { cropName, sowTip, growLevel, cropId } = route?.params || {};

  useEffect(() => {
    if (cropName) {
      dispatch(getCropVarieties(cropName));
    }
    dispatch(getCropsFavoriteToGrow(months[new Date().getMonth()]));
  }, [cropName]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {/* <SafeAreaView> */}
        <ScrollView>
          <View>
            <LinearGradient
              style={[styles.searchContainer]}
              colors={[colors.green, colors.greenDeep]}
            >
              <AntDesign
                name='left'
                size={24}
                color={colors.white}
                onPress={() => navigation.goBack()}
              />
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.titleTop]}>{cropName}</Text>

                <View style={[styles.titleTag]}>
                  <MaterialIcons name='star' size={20} color={colors.white} />
                  <Text style={{ color: colors.white, marginHorizontal: 4 }}>
                    {growLevel}
                  </Text>
                </View>
              </View>
              <View>
                <Input
                  placeholder='Enter your variety name here'
                  containerStyle={styles.searchInputContainer}
                  inputStyle={{
                    marginTop: -10,
                    paddingRight: 10,
                    color: 'red',
                  }}
                  onChangeText={(text) => setSearch(text)}
                  isCenter={true}
                  placeholderText='red'
                ></Input>
              </View>

              <View style={{ alignItems: 'center', marginVertical: 15 }}>
                <Text style={{ color: colors.white, marginVertical: 4 }}>
                  You can find this on your seed pack
                </Text>
                {search.length > 2 && (
                  <Text style={{ fontWeight: 'bold', color: colors.white }}>
                    What type is the variety you have chosen
                  </Text>
                )}
              </View>
              {cropDetail?.crops?.length > 0 ? (
                <View>
                  {cropDetail?.crops
                    ?.filter((crop) =>
                      search === '' ? true : crop?.variety
                        ?.toLowerCase()
                        .includes(search?.toLowerCase())
                    )
                    ?.map((crop) => {
                      return (
                        <GradientButton
                          key={crop?.id}
                          gradient={[colors.blueLigth, colors.blue]}
                          onPress={() => {
                            manageCropContext?.actions?.updateCropToGrowDetails(
                              {
                                variety: crop?.variety,
                                cropName,
                                cropId: crop?.id,
                              }
                            );
                            navigation.navigate('Success');
                          }}
                        >
                          <View
                            style={{
                              alignItems: 'center',
                              width: '100%',
                              paddingHorizontal: 20,
                            }}
                          >
                            <Text style={[styles.btnText]}>
                              {crop?.variety}
                            </Text>
                          </View>
                        </GradientButton>
                      );
                    })}
                </View>
              ) : (
                <GradientButton
                  gradient={[colors.blueLigth, colors.blue]}
                  onPress={() => {
                    navigation.navigate('Success');
                    ManageCropContext?.actions?.updateCropToGrowDetails({
                      variety: crop?.variety,
                      cropName,
                      cropId,
                    });
                  }}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={[styles.btnText]}>Grow Crop</Text>
                  </View>
                </GradientButton>
              )}
            </LinearGradient>
          </View>

          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ fontSize: 20 }}>Grow it Recommends</Text>
            <Text style={{ width: '80%', textAlign: 'center' }}>{sowTip}</Text>
          </View>

          <View style={[styles.cropSection]}>
            {favoriteCrops?.crops?.map((crop, index) => (
              <CropItem key={index} crop={crop} />
            ))}
          </View>
        </ScrollView>
      {/* </SafeAreaView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: '10%',
    paddingBottom: '10%',
    paddingHorizontal: 25,
  },
  titleTop: {
    fontSize: 42,
    color: colors.white,
    marginTop: 5,
    fontWeight: '100',
  },
  titleTag: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  searchForm: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchInputContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center',
    borderRadius: 50 / 2,
    width: '100%',
  },
  cropSection: {
    marginVertical: 5,
    paddingHorizontal: 20,
  },
  cropCardContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    borderRadius: 100 / 2,
    height: 70,
    paddingRight: 20,
    marginVertical: 6,
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
  cropAvatar: {
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
  },
  cropText: {
    marginLeft: 10,
  },
  cropName: {
    fontSize: 20,
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default CropSelection;
