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
  RefreshControl,
  TouchableOpacity,
} from 'react-native'
import { useSelector } from 'react-redux'


import { SafeArea } from '../../components'
import constants from '../../constants'

const { colors } = constants
const ArticleGuide = ({ navigation }) => {
  const { selected: article } = useSelector((state) => state.articles)

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
              </View>
              <View>
                <Image
                  style={{
                    height: Dimensions.get('window').height / 3,
                    borderTopLeftRadius: 15,
                  }}
                  source={{ uri: article?.image_url }}
                />
              </View>

              <View style={{ marginTop: 15 }}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingHorizontal: 20,
                    marginBottom: 30,
                    textAlign: 'center',
                  }}
                >
                  {article?.title}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    marginTop: 5,
                    paddingHorizontal: 20,
                  }}
                >
                  {article?.content}
                </Text>
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
