import { EvilIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input } from '../../components/'
import constants from '../../constants'

const { colors } = constants
const CropSearch = () => {
  return (
    <View>
      <View >
        <LinearGradient style={[styles.searchContainer]} colors={[colors.green, colors.greenDeep]}>
          <View>
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
            <Text>Cancel</Text>
          </View>

          <View>
            <Text>clear</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 191,
  },
})

export default CropSearch
