import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { GradientButton, Input } from '../../components/'
import constants from '../../constants'
import DropDownPicker from 'react-native-dropdown-picker'
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'
import { useDispatch, useSelector } from 'react-redux'
import { addCrop } from '../../redux/actions'

const { colors } = constants
const NeCrop = ({ navigation }) => {
  const [state, setState] = useState({
    name: '',
    variety: '',
    level: null,
    image: null,
  })

  const handleState = (value) => {
    setState({
      ...state,
      ...value,
    })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Im,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
      quality: 0.5,
    });

    if (!result.cancelled) {
      handleState({ image: result?.uri })
    }
  }

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.loading)

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
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
            <TouchableOpacity style={styles.imageWrapper} onPress={pickImage}>
              {state.image ? (
                <Image
                  source={{ uri: state.image }}
                  style={{ height: '100%', width: '100%' }}
                />
              ) : (
                <Ionicons
                  name='ios-camera-outline'
                  size={45}
                  color={colors.white}
                />
              )}
            </TouchableOpacity>
            <View>
              <View style={[styles.inputContainer]}>
                <Input
                  placeholder="Enter the crop name"
                  labelText="Name"
                  labelStyle={styles.labelText}
                  value={state.name}
                  onChangeText={(name) => handleState({ name })}
                />
              </View>
              <View style={[styles.inputContainer]}>
                <Text style={styles.labelText}>Variety</Text>
                <Text>You can find this on your seed pack</Text>
                <Input
                  placeholder="Enter the variety"
                  labelStyle={styles.labelText}
                  value={state.variety}
                  onChangeText={(variety) => handleState({ variety })}
                />
              </View>
              <View style={[styles.inputContainer]}>
                <Text style={styles.labelText}>Select grow level</Text>
                <DropDownPicker
                  items={[
                    { label: 'Beginner', value: 'Beginner' },
                    { label: 'Intermediate', value: 'Intermediate' },
                    { label: 'Advanced', value: 'Advanced' },
                  ]}
                  defaultValue={state.level}
                  containerStyle={{ height: 40 }}
                  style={{ backgroundColor: '#fafafa', zIndex: 1000 }}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  dropDownStyle={{ backgroundColor: '#fafafa' }}
                  onChangeItem={(item) => handleState({ level: item.value })}
                />
                <GradientButton
                  title="Grow It"
                  gradient={[colors.green, colors.greenDeep]}
                  coverStyle={styles.button}
                  // onPress={() => navigation.navigate('Success')}
                  loading={loading}
                  onPress={() => dispatch(addCrop(state, navigation))}
                />
              </View>
              
            </View>
            {/* <GradientButton
              title="Grow It"
              gradient={[colors.green, colors.greenDeep]}
              coverStyle={styles.button}
              onPress={() => navigation.navigate('Success')}
            /> */}
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
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 30,
  },
  button: {
    marginTop: 30
  },
  imageWrapper: {
    backgroundColor: colors.grey100,
    height: 131,
    width: 131,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
})

export default NeCrop
