import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { SafeArea } from '../../components'
import constants from '../../constants'

const { colors } = constants
const ArticleGuide = ({ navigation }) => {
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
                <Text
                  style={{
                    fontSize: 32,
                    fontWeight: '100',
                    textAlign: 'center',
                    paddingHorizontal: 70,
                    marginTop: '20%',
                    marginBottom: 27,
                  }}
                >
                  Grow It guides and articles
                </Text>
              </View>

              <View style={{ marginTop: 15 }}>
                <View>
                  <Image
                    style={{ height: 181 }}
                    source={require('../../assets/g1.png')}
                  />
                </View>

                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Your Beginners Guide
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      marginTop: 5,
                      paddingHorizontal: 40,
                    }}
                  >
                    5 Things to remember when learning to grow you own
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 15 }}>
                <View>
                  <Image
                    style={{ height: 181 }}
                    source={require('../../assets/g2.png')}
                  />
                </View>

                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Jargon Buster
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      marginTop: 5,
                      paddingHorizontal: 40,
                    }}
                  >
                    Get up to speed, with some of the most common gardening
                    jargon explained
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 15 }}>
                <View>
                  <Image
                    style={{ height: 181 }}
                    source={require('../../assets/g3.png')}
                  />
                </View>

                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Getting started with Grow It
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      textAlign: 'center',
                      marginTop: 5,
                      paddingHorizontal: 40,
                    }}
                  >
                    Text
                  </Text>
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
})

export default ArticleGuide
