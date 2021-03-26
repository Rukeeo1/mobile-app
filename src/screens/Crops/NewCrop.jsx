import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GradientButton, Input } from '../../components/'
import constants from '../../constants'

const { colors } = constants
const NeCrop = () => {
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        <ScrollView>
          <LinearGradient
            style={[styles.topSection]}
            colors={[colors.green, colors.greenDeep]}
          >
            <View>
              <Text style={[styles.title]}>New Crop</Text>
            </View>
          </LinearGradient>

          <View style={{padding: 22, flexDirection: 'column'}}>
            <View>
              <View style={[styles.inputContainer]}>
                <Input
                  placeholder="Enter your bio"
                  //   onChangeText={handleChange('bio')}
                  //   onBlur={handleBlur('bio')}
                  labelText="Name"
                  labelStyle={styles.labelText}
                  //   containerStyle={styles.input}
                  //   errorMessage={errors.bio}
                />
              </View>
              <View style={[styles.inputContainer]}>
                <Text style={styles.labelText}>
                  Enter the variety name
                </Text>
                <Text>You can find this on your seed pack</Text>
                <Input
                  placeholder="Enter your variety"
                  //   onChangeText={handleChange('bio')}
                  //   onBlur={handleBlur('bio')}
                  //   labelText="Enter the variety name"
                  labelStyle={styles.labelText}
                  //   containerStyle={styles.input}
                  //   errorMessage={errors.bio}
                />
              </View>
              <View style={[styles.inputContainer]}>
              
                <Text>Select crop category</Text>
                
              </View>
            </View>

            <View style={{}}>
              <GradientButton
                title="Grow It"
                //   onPress={handleSubmit}
                gradient={[colors.green, colors.greenDeep]}
                coverStyle={styles.button}
                //   onPress={() => navigation.navigate('Main-Profile')}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  topSection: {
    height: 143,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 42,
    fontWeight: '100',
    color: colors.white,
    textAlign: 'center',
  },
  labelText: {
    color: colors.green,
    fontWeight: 'normal',
    fontSize: 16
  },
  inputContainer: {
    marginBottom: 30
  }
})

export default NeCrop
