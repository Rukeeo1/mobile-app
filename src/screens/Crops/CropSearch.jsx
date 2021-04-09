import { AntDesign, EvilIcons } from '@expo/vector-icons'
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
import Menu, { MenuDivider, MenuItem } from 'react-native-material-menu'
import { GradientButton, Input } from '../../components/'
import constants from '../../constants'

const { colors } = constants
const CropSearch = ({ navigation }) => {
  const [search, setSearch] = useState('')
  let _menu = null

  let setMenuRef = (ref) => {
    _menu = ref
  }

  let hideMenu = () => {
    _menu.hide()
  }

  let showMenu = () => {
    _menu.show()
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <LinearGradient
              style={[styles.searchContainer]}
              colors={[colors.green, colors.greenDeep]}
            >
              <View style={[styles.searchForm]}>
                <Input
                  placeholder="Search"
                  containerStyle={styles.searchInputContainer}
                  inputStyle={{ marginTop: -10, paddingRight: 10 }}
                  onChangeText={(text) => setSearch(text)}
                >
                  <EvilIcons
                    name="search"
                    size={24}
                    color={colors.blue}
                    style={{
                      right: 10,
                      top: '30%',
                      position: 'absolute',
                    }}
                  />
                </Input>
                <Text
                  style={[styles.cancelText]}
                  onPress={() => navigation.goBack()}
                >
                  Cancel
                </Text>
              </View>

              <ScrollView horizontal style={[styles.scrollDate]}>
                <View
                  style={[
                    styles.optionsContainer,
                    {
                      borderTopLeftRadius: 100 / 2,
                      borderTopRightRadius: 100 / 2,
                    },
                  ]}
                >
                  <Text style={[styles.clearFilter]}>clear filters</Text>
                  <GradientButton gradient={[colors.red, colors.redDeep]}>
                    <Menu
                      ref={setMenuRef}
                      style={{ width: 100 }}
                      button={
                        <Text
                          onPress={showMenu}
                          style={{ color: colors.white, width: '100%' }}
                        >
                          Grow in February
                        </Text>
                      }
                    >
                      <ScrollView>
                        <MenuItem style={{ width: '100%' }} onPress={hideMenu}>
                          Jan
                        </MenuItem>
                        <MenuItem onPress={hideMenu}>Feb</MenuItem>
                        <MenuItem onPress={hideMenu}>March</MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={hideMenu}>April</MenuItem>
                        <MenuItem onPress={hideMenu}>May</MenuItem>
                        <MenuItem onPress={hideMenu}>June</MenuItem>
                        <MenuItem onPress={hideMenu}>March</MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={hideMenu}>July</MenuItem>
                        <MenuItem onPress={hideMenu}>August</MenuItem>
                        <MenuItem onPress={hideMenu}>September</MenuItem>
                        <MenuItem onPress={hideMenu}>October</MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={hideMenu}>November</MenuItem>
                        <MenuItem onPress={hideMenu}>December</MenuItem>
                      </ScrollView>
                    </Menu>
                  </GradientButton>
                </View>
              </ScrollView>
            </LinearGradient>
          </View>

          {search.length > 3 ? (
            <View style={{ marginTop: 30 }}>
              <Text style={{ textAlign: 'center' }}>No matches found</Text>

              <View style={{ marginTop: 50 }}>
                <Text style={{ textAlign: 'center' }}>
                  Looks like you are getting adventurous!
                </Text>
                <Text style={{ textAlign: 'center' }}>
                  Create a new crop below
                </Text>
              </View>
            </View>
          ) : (
            <View style={[styles.cropSection]}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cropCardContainer]}
                onPress={() => navigation.navigate('Crop-selection')}
              >
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
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cropCardContainer]}
              >
                <View style={[styles.cropDetails]}>
                  <Image
                    style={[styles.cropAvatar]}
                    source={require('../../assets/tomatoe1.png')}
                  />
                  <View style={[styles.cropText]}>
                    <Text style={[styles.cropName]}>Tomato</Text>
                    <Text>star Beginner</Text>
                  </View>
                </View>
                <AntDesign name="right" size={24} color={colors.green} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cropCardContainer]}
              >
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
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cropCardContainer]}
              >
                <View style={[styles.cropDetails]}>
                  <Image
                    style={[styles.cropAvatar]}
                    source={require('../../assets/tomatoe3.png')}
                  />
                  <View style={[styles.cropText]}>
                    <Text style={[styles.cropName]}>Tomato</Text>
                    <Text>Intermediate</Text>
                  </View>
                </View>
                <AntDesign name="right" size={24} color={colors.green} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cropCardContainer]}
              >
                <View style={[styles.cropDetails]}>
                  <Image
                    style={[styles.cropAvatar]}
                    source={require('../../assets/tomatoe4.png')}
                  />
                  <View style={[styles.cropText]}>
                    <Text style={[styles.cropName]}>Tomato</Text>
                    <Text>Intermediate</Text>
                  </View>
                </View>
                <AntDesign name="right" size={24} color={colors.green} />
              </TouchableOpacity>
            </View>
          )}

          <View style={[styles.createNewCropBtn]}>
            <GradientButton
              gradient={[colors.green, colors.greenDeep]}
              onPress={() => navigation.navigate('New-crop')}
            >
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={[styles.btnText]}>Create new crop</Text>
              </View>
            </GradientButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: '20%',
    paddingBottom: '10%',
    paddingHorizontal: 25,
  },
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
    width: '80%',
  },
  optionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    color: colors.white,
    marginLeft: 10,
  },
  scrollDate: {
    padding: 10,
  },
  clearFilter: {
    color: colors.white,
    textDecorationLine: 'underline',
  },
  cropSection: {
    marginVertical: 28,
    padding: 20,
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
    marginVertical: 10,
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
  arrow: {
    width: 20,
    height: 20,
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  gradientBtn: {
    marginVertical: 50,
  },
  createNewCropBtn: {
    padding: 20,
    flex: 1,
    // bottom: '-30%',
  },
})

export default CropSearch
