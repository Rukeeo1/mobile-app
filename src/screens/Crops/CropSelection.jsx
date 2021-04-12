import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Input } from '../../components/'
import { GradientButton } from '../../components/Button'
import constants from '../../constants'

const { colors } = constants
const CropSelection = ({ navigation }) => {
  const [show, setShow] = useState(false)
  const [search, setSearch] = useState('')
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <LinearGradient
              style={[styles.searchContainer]}
              colors={[colors.green, colors.greenDeep]}
            >
              <AntDesign
                name="left"
                size={24}
                color={colors.white}
                onPress={() => navigation.goBack()}
              />
              <View style={{ alignItems: 'center' }}>
                <Text style={[styles.titleTop]}>Tomato</Text>

                <View style={[styles.titleTag]}>
                  <MaterialIcons name="star" size={20} color={colors.white} />
                  <Text style={{ color: colors.white, marginHorizontal: 4 }}>
                    Begginer crop
                  </Text>
                </View>
              </View>
              <View>
                <Input
                  placeholder="enter your variety here"
                  containerStyle={styles.searchInputContainer}
                  inputStyle={{ marginTop: -10, paddingRight: 10 }}
                  onChangeText={(text) => setSearch(text)}
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
              {search.length > 2 && (
                <View>
                  <GradientButton
                    gradient={[colors.blueLigth, colors.blue]}
                    onPress={() => navigation.navigate('Success')}
                  >
                    <View
                      style={{
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={[styles.btnText]}>Vine (corbon)</Text>
                    </View>
                  </GradientButton>
                  <GradientButton gradient={[colors.blueLigth, colors.blue]}>
                    <View
                      style={{
                        alignItems: 'center',
                        width: '100%',
                        paddingHorizontal: 20,
                      }}
                    >
                      <Text style={[styles.btnText]}>Bush (Trailing)</Text>
                    </View>
                  </GradientButton>
                </View>
              )}
            </LinearGradient>
          </View>

          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ fontSize: 20 }}>Grow it Recommends</Text>
            <Text style={{ width: '80%', textAlign: 'center' }}>
              Still need to buy seeds? Here is some inspiration for you with
              tried and tested suggestions.
            </Text>
          </View>

          <View style={[styles.cropSection]}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.cropCardContainer]}
              onPress={() => setShow(!show)}
            >
              <View style={[styles.cropDetails]}>
                <Image
                  style={[styles.cropAvatar]}
                  source={require('../../assets/tomatoe1.png')}
                />
                <View style={[styles.cropText]}>
                  <Text style={[styles.cropName]}>Tomato</Text>
                  <Text>Intermediate</Text>
                </View>
              </View>
              <AntDesign name="right" size={24} color={colors.green} />
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
                  onPress={() => navigation.navigate('Success')}
                >
                  <View
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={[styles.btnText]}>Grow It</Text>
                  </View>
                </GradientButton>
                <GradientButton gradient={[colors.blueLigth, colors.blue]}>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={[styles.btnText]}>Buy seed</Text>
                    <Entypo
                      name="shopping-cart"
                      size={24}
                      color={colors.white}
                    />
                  </View>
                </GradientButton>
              </View>
            )}

            <View style={[styles.cropCardContainer]}>
              <View style={[styles.cropDetails]}>
                <Image
                  style={[styles.cropAvatar]}
                  source={require('../../assets/tomatoe.png')}
                />
                <View style={[styles.cropText]}>
                  <Text style={[styles.cropName]}>Tomato</Text>
                  <Text>Intermediate</Text>
                </View>
              </View>
              <AntDesign name="right" size={24} color={colors.green} />
            </View>
            <View style={[styles.cropCardContainer]}>
              <View style={[styles.cropDetails]}>
                <Image
                  style={[styles.cropAvatar]}
                  source={require('../../assets/tomatoe2.png')}
                />
                <View style={[styles.cropText]}>
                  <Text style={[styles.cropName]}>Tomato</Text>
                  <Text>Intermediate</Text>
                </View>
              </View>
              <AntDesign name="right" size={24} color={colors.green} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

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
})

export default CropSelection
