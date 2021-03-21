import { AntDesign } from '@expo/vector-icons'
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

const { colors } = constants
const CropSelection = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'dodgerblue' }}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <LinearGradient
              style={[styles.searchContainer]}
              colors={[colors.green, colors.greenDeep]}
            >
              <View>
                <Input
                  placeholder="Search"
                  containerStyle={styles.searchInputContainer}
                  inputStyle={{ marginTop: -10, paddingRight: 10 }}
                >
                </Input>
              </View>
            </LinearGradient>
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
    width: '100%',
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

export default CropSelection
