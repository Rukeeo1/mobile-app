import React, { useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { GradientButton } from '../../components/Button'
import constants from '../../constants'

const { colors } = constants

const FirstView = () => {
  const [isList, setIsList] = useState(true)
  return (
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <Image
          source={require('../../assets/profile.png')}
          style={[styles.profileImg]}
        />

        <View style={[styles.detailsContainer, styles.detaileText]}>
          <Text style={[styles.title]}>Garden_of_Riley</Text>
          <Text>
            {'<'}User bio grow baby grow{'>'}
          </Text>
          <Text>🇬🇧 Buckinghamshire</Text>
          <Text style={[styles.edit]}>Edit profile</Text>
        </View>

        <View style={[styles.detailsContainer, styles.follows]}>
          <Text style={[styles.followsText]}>0 Following</Text>
          <Text>{'|'}</Text>
          <Text style={[styles.followsText]}>0 Followers</Text>
        </View>

        <View style={[styles.growList]}>
          {isList ? (
            <>
              <Text style={[styles.growTitle]}>Current grow list</Text>
              <ScrollView horizontal={true}>
                <View style={[styles.growCard]}>
                  <Image source={require('../../assets/growavatar.png')} />
                  <Text style={[styles.growText]}>
                    {'<'}New Crop Name{'>'} “Variety Name”
                  </Text>
                </View>
                <View style={[styles.growCard]}>
                  <Image source={require('../../assets/growavatar.png')} />
                  <Text style={[styles.growText]}>
                    {'<'}New Crop Name{'>'} “Variety Name”
                  </Text>
                </View>
                <View style={[styles.growCard]}>
                  <Image source={require('../../assets/growavatar.png')} />
                  <Text style={[styles.growText]}>
                    {'<'}New Crop Name{'>'} “Variety Name”
                  </Text>
                </View>
                <View style={[styles.growCard]}>
                  <Image source={require('../../assets/growavatar.png')} />
                  <Text style={[styles.growText]}>
                    {'<'}New Crop Name{'>'} “Variety Name”
                  </Text>
                </View>
                <View style={[styles.growCard]}>
                  <Image source={require('../../assets/growavatar.png')} />
                  <Text style={[styles.growText]}>
                    {'<'}New Crop Name{'>'} “Variety Name”
                  </Text>
                </View>
              </ScrollView>
            </>
          ) : (
            <View>
              <Text style={[styles.growTitle]}>
                You aren’t growing anything!
              </Text>
              <GradientButton gradient={[colors.green, colors.greenDeep]}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    paddingHorizontal: 30,
                  }}
                >
                  <Text style={[styles.btnText]}>Add to Grow Calendar</Text>
                  <Image
                    style={{ width: 25, height: 25 }}
                    source={require('../../assets/calendar-page.png')}
                  />
                </View>
              </GradientButton>
            </View>
          )}
        </View>

        {isList ? (
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
              <Text>...</Text>
            </View>

            <View>
              <Text>
                <Text style={[styles.bold]}>Garden_of_Riley</Text> First handful
                of tomatoes!! Well worth the wait!
              </Text>

              <Text style={[styles.bold]}>Tomatoes - ‘Sungold’</Text>
            </View>
          </View>
        ) : (
          <View style={[styles.growMovement]}>
            <View style={[styles.growMovementImgContainer]}>
              <Image
                style={[styles.growMovementImg]}
                source={require('../../assets/grow-movement.png')}
              />
              <View style={[styles.growMoveTextContainer]}>
                <Text style={[styles.growMoveText]}>
                  You joined the Grow It movement!
                </Text>
                <Text style={{ color: '#fff', marginTop: 20 }}>Feb 2020</Text>
              </View>
            </View>
            <Text style={[styles.growMoveFooterText]}>
              Click the ‘+’ in the side bar to create your first post!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profileImg: {
    width: '100%',
  },
  detailsContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  detaileText: {
    fontSize: 14,
  },
  title: {
    fontSize: 32,
    lineHeight: 45,
    marginVertical: 10,
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
    fontWeight: 'bold',
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
    borderWidth: 2,
    borderColor: '#000',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue,
  },
  growMoveText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 5,
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
  },
  bold: {
    fontWeight: 'bold',
  },
})

export default FirstView
