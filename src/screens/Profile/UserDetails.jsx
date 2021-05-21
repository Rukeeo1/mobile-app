import { AntDesign, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'

import { SafeArea } from '../../components'
import { GradientButton, SmallGradientButton } from '../../components/Button'
import constants from '../../constants'

const { colors } = constants
const UserDetails = ({ navigation }) => {
  const [showShare, setShowShare] = useState(false)
  const [follow, setFollow] = useState(false)
  const [grow, setGrow] = useState(false)
  const toggleModal = () => setShowShare((prevState) => !prevState)
  return (
    <>
      <SafeArea>
        <LinearGradient
          style={styles.container}
          colors={[colors.purshBlue, colors.blue]}
        >
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexGrow: 1,
              width: Dimensions.get('screen').width * 0.1,
              overflow: 'visible',
            }}
          >
            <AntDesign
              name="left"
              size={24}
              color={colors.white}
              style={{ marginTop: 30, marginLeft: 0 }}
              onPress={() => navigation.goBack()}
            />
          </View>
          {/* </View> */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View>
              <View>
                <View>
                  <Image
                    source={require('../../assets/details.png')}
                    style={[styles.profileImg]}
                  />
                </View>
                <View style={[styles.detailsContainer, styles.detaileText]}>
                  <Text style={[styles.title]}>Garden_of_Riley</Text>
                  <Text>
                    {'<'}User bio grow baby grow{'>'}
                  </Text>
                  <Text>🇬🇧 Buckinghamshire</Text>
                </View>

                {!follow && (
                  <View style={{ paddingHorizontal: '6%' }}>
                    <SmallGradientButton
                      gradient={[colors.red, colors.redDeep]}
                      onPress={() => setFollow(!follow)}
                    >
                      <Text style={[styles.btnText]}>Follow</Text>
                    </SmallGradientButton>
                  </View>
                )}

                {follow && (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.detailsContainer,
                      styles.follows,
                      { marginTop: 30 },
                    ]}
                    onPress={() => setFollow(!follow)}
                  >
                    <View activeOpacity={0.7}>
                      <Text style={[styles.followsText]}>0 Following</Text>
                    </View>
                    <Text>{'|'}</Text>
                    <View activeOpacity={0.7}>
                      <Text style={[styles.followsText]}>0 Followers</Text>
                    </View>
                  </TouchableOpacity>
                )}

                {!grow && (
                  <View style={{ paddingHorizontal: '6%', backgroundColor: '#F7F7F7', paddingVertical: 20, marginTop: 10 }}>
                    <Text style={{textAlign: 'center'}}>You aren't growing anything!</Text>
                    <SmallGradientButton
                      gradient={[colors.green, colors.greenDeep]}
                      onPress={() => setGrow(!grow)}
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
                        <Text style={[styles.btnText]}>Add to Grow Calendar</Text>
                        <Ionicons
                          name="calendar"
                          size={24}
                          color={colors.white}
                        />
                      </View>
                    </SmallGradientButton>
                  </View>
                )}

                {grow && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ marginTop: 30, backgroundColor: '#F7F7F7', paddingVertical: 20 }}
                    onPress={() => setGrow(!grow)}
                  >
                    <Text style={[styles.growTitle]}>Current grow list</Text>
                    <ScrollView horizontal={true}>
                      <View style={[styles.growCard]}>
                        <Image
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 70 / 2,
                          }}
                          source={require('../../assets/growavatar.png')}
                        />
                        <Text style={[styles.growText]}>
                          {'<'}New Crop Name{'>'} “Variety Name”
                        </Text>
                      </View>
                      <View style={[styles.growCard]}>
                        <Image
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 70 / 2,
                          }}
                          source={require('../../assets/tomatoe.png')}
                        />
                        <Text style={[styles.growText]}>
                          Chillies “Variety Name”
                        </Text>
                      </View>
                      <View style={[styles.growCard]}>
                        <Image
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 70 / 2,
                          }}
                          source={require('../../assets/tomatoe1.png')}
                        />
                        <Text style={[styles.growText]}>
                          Peppers “Variety Name”
                        </Text>
                      </View>
                      <View style={[styles.growCard]}>
                        <Image
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 70 / 2,
                          }}
                          source={require('../../assets/tomatoe2.png')}
                        />
                        <Text style={[styles.growText]}>
                          Dahlias “Variety Name”
                        </Text>
                      </View>
                      <View style={[styles.growCard]}>
                        <Image
                          style={{
                            height: 70,
                            width: 70,
                            borderRadius: 70 / 2,
                          }}
                          source={require('../../assets/tomatoe3.png')}
                        />
                        <Text style={[styles.growText]}>
                          Corn “Variety Name”
                        </Text>
                      </View>
                    </ScrollView>
                  </TouchableOpacity>
                )}

                <View style={[styles.postCard]}>
                  <View style={[styles.postAvatarContainer]}>
                    <Image
                      style={[styles.postAvatarImg]}
                      source={require('../../assets/profileAvatar.png')}
                    />
                    <Text style={[styles.postTitle]}>Garden_of_Riley</Text>
                  </View>

                  <View>
                    <Image
                      style={[styles.postImg]}
                      source={require('../../assets/profile.png')}
                    />
                  </View>

                  <View style={[styles.postDateTime]}>
                    <Text>23 July 2020</Text>
                    <TouchableOpacity onPress={toggleModal}>
                      <Text>...</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginLeft: 15 }}>
                    <Text>
                      <Text style={[styles.bold]}>Garden_of_Riley</Text> First
                      handful of tomatoes!! Well worth the wait!
                    </Text>

                    <Text style={[styles.bold]}>Tomatoes - ‘Sungold’</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={{ height: 50, backgroundColor: colors.white }} />
          </ScrollView>
        </LinearGradient>
      </SafeArea>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    overflow: 'visible',
  },
  content: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 15,
    width: Dimensions.get('screen').width * 0.8,
    paddingBottom: 50,
    overflow: 'visible',
  },
  profileImg: {
    width: '100%',
  },
  detailsContainer: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 5,
  },
  detaileText: {
    fontSize: 14,
  },
  title: {
    fontSize: 32,
    lineHeight: 45,
    marginVertical: 10,
    fontWeight: '100',
    fontFamily: 'Hero-New-Light',
  },
  edit: {
    marginVertical: 15,
    fontWeight: 'bold',
  },
  follows: {
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  followsText: {
    fontWeight: 'bold',
  },
  growList: {
    backgroundColor: colors.nearWhite,
    padding: 20,
    paddingRight: 5,
    alignItems: 'center',
  },
  btnText: {
    color: colors.white,
  },
  growCard: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
  growTitle: {
    textAlign: 'center',
    marginBottom: 15,
  },
  growText: {
    maxWidth: 120,
    textAlign: 'center',
  },
  btnText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  growMovement: {
    height: 350,
  },
  growMovementImgContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  growMovementImg: {
    width: 255,
    height: 255,
    position: 'absolute',
  },
  growMoveTextContainer: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 160 / 2,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
  growMoveText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginHorizontal: 5,
    maxWidth: 90,
  },
  growMoveFooterText: {
    textAlign: 'center',
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 16,
  },
  postCard: {
    marginVertical: 40,
  },
  postAvatarImg: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  postAvatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginLeft: 15,
  },
  postTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 14,
  },
  postImg: {
    width: '100%',
    height: 353,
  },
  postDateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    marginLeft: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
})

export default UserDetails
