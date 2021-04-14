import { EvilIcons } from '@expo/vector-icons'
import React, { useState, useCallback } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Easing,
  RefreshControl,
} from 'react-native'
import { Input } from '../../components'
import constants from '../../constants/'
import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const { colors } = constants

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const Explore = () => {
  const navigation = useNavigation()
  const [showShare, setShowShare] = useState(false)
  const [spinner, setSpinnner] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [text, setText] = useState(false)

  let spinValue = new Animated.Value(0)
  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])
  // First set up animation
  Animated.timing(spinValue, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear, // Easing is an additional import from react-native
    useNativeDriver: true, // To make use of native driver for performance
  }).start()

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  setTimeout(() => {
    setSpinnner(false)
  }, 1000)

  return (
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={[styles.container]}>
          <View style={styles.searchBarWrapper}>
            <Input
              placeholder="Find"
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
          </View>

          <View style={[styles.flowercircle]}>
            {spinner && (
              <Animated.Image
                style={{ transform: [{ rotate: spin }] }}
                source={require('../../assets/flowercircle.png')}
              />
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: '#002B55',
              height: 88,
              alignItems: 'center',
              paddingLeft: 19,
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 10,
            }}
            onPress={() => navigation.navigate('Article-guide')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={require('../../assets/book-w.png')} />
              <Text
                style={{
                  fontSize: 16,
                  color: 'white',
                  marginRight: 20,
                  width: 210,
                  paddingLeft: 25,
                }}
              >
                Explore the latest Grow It guides and articles
              </Text>
            </View>
            <View>
              <MaterialIcons
                name="keyboard-arrow-right"
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>

          <View style={[styles.postCard]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.userDetail]}
              onPress={() => navigation.navigate('User-details')}
            >
              <Image
                style={[styles.imgAvatar]}
                source={require('../../assets/avatarimg.png')}
              />
              <Text style={[styles.imgText]}>Harriet_loves_to_grow_it</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('User-details')}
            >
              <Image
                style={[styles.postImg]}
                source={require('../../assets/profile.png')}
              />
            </TouchableOpacity>

            <View style={[styles.dateTime]}>
              <Text style={[styles.date]}>23 July 2020</Text>
              {/* <Text>...</Text> */}
            </View>

            <View style={[styles.postText]}>
              <Text style={[styles.boldContainer, {}]}>
                {' '}
                <Text style={[styles.bold]}>Harriet_loves_to_grow_it</Text>{' '}
                First handful of tomatoes!! Well worth the wait!
                {!text && (
                  <Text
                    style={{ color: 'blue' }}
                    onPress={() => setText(!text)}
                  >
                    ...more
                  </Text>
                )}
                {text && <Text> yes, patient is golden any time!</Text>}
              </Text>
            </View>
          </View>
          <View style={[styles.postCard]}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[styles.userDetail]}
              onPress={() => navigation.navigate('User-details')}
            >
              <Image
                style={[styles.imgAvatar]}
                source={require('../../assets/avatarimg.png')}
              />
              <Text style={[styles.imgText]}>Harriet_loves_to_grow_it</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('User-details')}
            >
              <Image
                style={[styles.postImg]}
                source={require('../../assets/profile.png')}
              />
            </TouchableOpacity>

            <View style={[styles.dateTime]}>
              <Text style={[styles.date]}>23 July 2020</Text>
              {/* <Text>...</Text> */}
            </View>

            <View style={[styles.postText]}>
              <Text style={[styles.boldContainer]}>
                {' '}
                <Text style={[styles.bold]}>Harriet_loves_to_grow_it</Text>{' '}
                First handful of tomatoes!! Well worth the wait!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {},

  searchContainer: {
    marginTop: 55,
    marginHorizontal: 25,
  },
  flowercircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  postCard: {
    marginVertical: 10,
  },
  userDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  imgAvatar: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
  },
  imgText: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  postImg: {
    width: '100%',
    height: 356,
    marginVertical: 10,
  },
  dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  date: {
    color: colors.greyDark,
  },
  postText: {
    marginVertical: 10,
  },
  boldContainer: {
    marginHorizontal: 20,
  },
  bold: {
    fontWeight: 'bold',
  },

  /// search relate ===. to be pulled out
  searchBarWrapper: {
    paddingHorizontal: '5%',
    paddingTop: 20,
    flexDirection: 'row',
  },
  searchInputContainer: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    borderRadius: 20,
    height: 46,
    paddingLeft: 15,
    paddingRight: 25,
    flex: 1,
  },
})

export default Explore
