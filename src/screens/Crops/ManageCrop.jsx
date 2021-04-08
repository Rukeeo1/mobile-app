import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { GradientButton } from '../../components/Button'
import constants from '../../constants'

const { colors } = constants
const ManageCrops = () => {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView>
        <ScrollView>
          <View style={[styles.titleContainer]}>
            <Text style={[styles.title]}>Manage Crops</Text>
          </View>

          <View style={{ paddingHorizontal: '5%' }}>
            <View style={[styles.growCalendarCard]}>
              <Text style={[styles.growText]}>
                You aren’t growing anything yet!
              </Text>
              <Text style={[styles.growText]}>
                Add a crop to your <Text>Grow Calendar</Text> today
              </Text>

              <GradientButton
                gradient={[colors.green, colors.greenDeep]}
                onPress={() => navigation.navigate('GrowItCalendar')}
              >
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={[styles.btnText]}>Go to Grow Calendar</Text>
                  <Ionicons name="calendar" size={24} color={colors.white} />
                </View>
              </GradientButton>
            </View>
          </View>

          <View style={{ paddingHorizontal: '5%' }}>
            <View>
              <Text style={[styles.growingCrops]}>Current growing</Text>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cropCardContainer]}
                onPress={() => navigation.navigate('Grow-Crop')}
              >
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
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cropCardContainer]}
                onPress={() => navigation.navigate('Grow-Crop')}
              >
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
              </TouchableOpacity>
            </View>
            <View>
              <Text style={[styles.growingCrops]}>Past Harvest</Text>

              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cropCardContainer]}
                onPress={() => navigation.navigate('Grow-Crop')}
              >
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
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={[styles.cropCardContainer]}
                onPress={() => navigation.navigate('Grow-Crop')}
              >
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
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: 70,
    marginBottom: 30,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '100',
  },
  growCalendarCard: {
    backgroundColor: colors.greenTransparent,
    borderRadius: 50 / 2,
    paddingTop: 30,
  },
  growingCrops: {
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cropCardContainer: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '98%',
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
  growText: {
    textAlign: 'center',
    color: colors.green,
    marginVertical: 10,
    fontWeight: 'bold',
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
})

export default ManageCrops
