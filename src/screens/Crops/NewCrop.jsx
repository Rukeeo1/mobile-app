import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { GradientButton, Input } from '../../components/'
import constants from '../../constants'
import DropDownPicker from 'react-native-dropdown-picker'

const { colors } = constants
const NeCrop = ({ navigation }) => {
  const [state, setState] = useState(false)
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

          <View style={{ padding: 22, flexDirection: 'column' }}>
            <View>
              <View style={[styles.inputContainer]}>
                <Input
                  placeholder="Enter your bio"
                  labelText="Name"
                  labelStyle={styles.labelText}
                />
              </View>
              <View style={[styles.inputContainer]}>
                <Text style={styles.labelText}>Enter the variety name</Text>
                <Text>You can find this on your seed pack</Text>
                <Input
                  placeholder="Enter your variety"
                  labelStyle={styles.labelText}
                />
              </View>
              <View style={[styles.inputContainer]}>
                <Text>Select crop category</Text>
                <DropDownPicker
                  items={[
                    {
                      label: 'Vetegable',
                      value: 'vetegable',
                    },
                   
                  ]}
                  // defaultValue={this.state.country}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: '#fafafa' }}
                  itemStyle={{
                    justifyContent: 'flex-start',
                  }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  onChangeItem={(item) =>
                    setState({
                      country: item.value,
                    })
                  }
                />
              </View>
            </View>

            <View style={{}}>
              <GradientButton
                title="Grow It"
                gradient={[colors.green, colors.greenDeep]}
                coverStyle={styles.button}
                onPress={() => navigation.navigate('Success')}
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
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 30,
  },
})

export default NeCrop
