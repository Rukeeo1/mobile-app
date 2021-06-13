import { EvilIcons } from '@expo/vector-icons'
import React, { useState, useCallback, useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'

import { getPosts, getPostUser, selectPost } from '../../redux/actions/postsActions'
import { followUser } from '../../redux/actions/authActions'

const { colors } = constants

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout))
}

const Explore = () => {
  const navigation = useNavigation()
  const [showShare, setShowShare] = useState(false)
  const [spinner, setSpinnner] = useState(true)
  // const [refreshing, setRefreshing] = React.useState(false)
  const [text, setText] = useState(false)
  const [search, setSearch] = useState('')

  // let spinValue = new Animated.Value(0)
  // const onRefresh = React.useCallback(() => {
  //   setRefreshing(true)
  //   wait(2000).then(() => setRefreshing(false))
  // }, [])
  // First set up animation
  // Animated.timing(spinValue, {
  //   toValue: 1,
  //   duration: 3000,
  //   easing: Easing.linear, // Easing is an additional import from react-native
  //   useNativeDriver: true, // To make use of native driver for performance
  // }).start()

  // Next, interpolate beginning and end values (in this case 0 and 1)
  // const spin = spinValue.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '360deg'],
  // })

  // setTimeout(() => {
  //   setSpinnner(false)
  // }, 1000)

  const dispatch = useDispatch()
  const { loading, refreshing } = useSelector((state) => state.loading)
  const { all: posts = [] } = useSelector((state) => state.posts)
  const { following = [] } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <View style={{ backgroundColor: colors.white, flex: 1, }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing || loading}
              onRefresh={() => dispatch(getPosts(true))}
              tintColor={colors.blue}
              colors={[colors.blue]}
            />
          }
        >
          <View style={[styles.container]}>
            <View style={styles.searchBarWrapper}>
              <Input
                placeholder="Find"
                containerStyle={styles.searchInputContainer}
                inputStyle={{ marginTop: -10, paddingRight: 10 }}
                onChangeText={(val) => setSearch(val)}
                value={search}
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

            {/* <View style={[styles.flowercircle]}>
            {spinner && (
              <Animated.Image
                style={{ transform: [{ rotate: spin }] }}
                source={require('../../assets/flowercircle.png')}
              />
            )}
          </View> */}

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
            {posts
              ?.filter((post) => post?.fullname?.toLowerCase()?.includes(search.toLowerCase()) || post?.title?.toLowerCase()?.includes(search.toLowerCase()) || post?.content?.toLowerCase()?.includes(search.toLowerCase()))
              ?.map((post) => {
                let isFollowing = !!(following?.find((user) => user?.id === post?.user_id)) ?? false

                return (
                  <View
                    style={[styles.postCard]}
                    key={post.id}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={[styles.userDetail]}
                      onPress={() => {
                        dispatch(selectPost(post))
                        // navigation.navigate('Single-Post')
                        dispatch(getPostUser(post?.user_id))
                        navigation.navigate('User-details')
                      }}
                    // onPress={() => navigation.navigate('User-details')}
                    >
                      <Image
                        style={[styles.imgAvatar]}
                        source={{ uri: post?.avatar }}
                      />
                      <Text style={[styles.imgText]}>{post?.fullname}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          if (!isFollowing) {
                            isFollowing = true
                            dispatch(followUser(post?.user_id))
                          }
                        }}
                      >
                        <Text>
                          {' • '}
                          <Text style={{ textDecorationLine: isFollowing ? 'none' : 'underline' }}>
                            {isFollowing ? 'Following' : 'Follow'}
                          </Text>
                        </Text>
                      </TouchableOpacity>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={1}
                      // onPress={() => navigation.navigate('User-details')}
                      onPress={() => {
                        dispatch(selectPost(post))
                        navigation.navigate('Single-Post')
                      }}
                    >
                      <Image
                        style={[styles.postImg]}
                        source={{ uri: post?.media_url }}
                      />
                    </TouchableOpacity>

                    <View style={[styles.dateTime]}>
                      <Text style={[styles.date]}>{new Date(post?.created_at).toDateString()}</Text>
                      {/* <Text>...</Text> */}
                    </View>

                    <View style={[styles.postText]}>
                      <Text style={[styles.boldContainer, {}]}>
                        {' '}
                        <Text style={[styles.bold]}>{post?.fullname}</Text>{' '}{post?.title}
                        {/* {!text && (
                      <Text
                        style={{ color: '#085BAC' }}
                        onPress={() => setText(!text)}
                      >
                        ...more
                      </Text>
                    )}
                    {text && <Text> yes, patient is golden any time!</Text>} */}
                      </Text>
                    </View>
                  </View>

                )
              })}
          </View>
        </ScrollView>
      </View>
    </View>
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
