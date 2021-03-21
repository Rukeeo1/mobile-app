import { AntDesign, EvilIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Input } from '../../components/'
import { GradientButton } from '../../components/Button'
import constants from '../../constants'
import RNPickerSelect from 'react-native-picker-select'

const { colors } = constants
const CropSearch = () => {
  const [selectedValue, setSelectedValue] = useState('java')
  return (
    <View style={{ flex: 1 }}>
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
                <Text style={[styles.cancelText]}>Cancel</Text>
              </View>

              <ScrollView horizontal style={[styles.scrollDate]}>
                <Text style={[styles.clearFilter]}>clear filters</Text>
                <View>
                  <RNPickerSelect
                    onValueChange={(value) => console.log(value)}
                    items={[
                      { label: 'JavaScript', value: 'JavaScript' },
                      { label: 'TypeStript', value: 'TypeStript' },
                      { label: 'Python', value: 'Python' },
                      { label: 'Java', value: 'Java' },
                      { label: 'C++', value: 'C++' },
                      { label: 'C', value: 'C' },
                    ]}
                  />
                </View>
              </ScrollView>
            </LinearGradient>
          </View>

          <View style={[styles.cropSection]}>
            {/* 
          carrd of crops 
        */}

            <View style={[styles.cropCardContainer]}>
              <View style={[styles.cropDetails]}>
                <Image
                  style={[styles.cropAvatar]}
                  source={require('../../assets/avatarimg.png')}
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
                  source={require('../../assets/avatarimg.png')}
                />
                <View style={[styles.cropText]}>
                  <Text style={[styles.cropName]}>Tomato</Text>
                  <Text>star Beginner</Text>
                </View>
              </View>
              <AntDesign name="right" size={24} color={colors.green} />
            </View>
            <View style={[styles.cropCardContainer]}>
              <View style={[styles.cropDetails]}>
                <Image
                  style={[styles.cropAvatar]}
                  source={require('../../assets/avatarimg.png')}
                />
                <View style={[styles.cropText]}>
                  <Text style={[styles.cropName]}>Tomato</Text>
                  <Text>Intermediate</Text>
                </View>
              </View>
              <AntDesign name="right" size={24} color={colors.green} />
            </View>
          </View>

          <View style={[styles.createNewCropBtn]}>
            <GradientButton gradient={[colors.green, colors.greenDeep]}>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <Text style={[styles.btnText]}>Crete new crop</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    borderRadius: 100 / 2,
    borderColor: colors.greyDark,
    borderWidth: 1,
    borderColor: '#ddd',
    height: 70,
    paddingRight: 20,
    marginVertical: 3,
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
    bottom: '-30%',
  },
})

export default CropSearch
