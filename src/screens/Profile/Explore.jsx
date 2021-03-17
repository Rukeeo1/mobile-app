import { EvilIcons } from '@expo/vector-icons'
import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Input } from '../../components'
import constants from '../../constants/'

const { colors } = constants
const Explore = () => {
  return (
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          flexGrow: 1,
        }}
      >
        <View style={[styles.container]}>
          <View style={[styles.searchContainer]}>
            <Input
              placeholder="Search"
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
            <Image source={require('../../assets/flowercircle.png')} />
          </View>

          <View style={[styles.postCard]}>
            <View style={[styles.userDetail]}>
              <Image
                style={[styles.imgAvatar]}
                source={require('../../assets/avatarimg.png')}
              />
              <Text style={[styles.imgText]}>Harriet_loves_to_grow_it</Text>
            </View>

            <Image
              style={[styles.postImg]}
              source={require('../../assets/profile.png')}
            />

            <View style={[styles.dateTime]}>
              <Text style={[styles.date]}>23 July 2020</Text>
              <Text>...</Text>
            </View>

            <View style={[styles.postText]}>
              <Text style={[styles.boldContainer]}>
                {' '}
                <Text style={[styles.bold]}>Harriet_loves_to_grow_it</Text>{' '}
                First handful of tomatoes!! Well worth the wait!
              </Text>
            </View>
          </View>
          <View style={[styles.postCard]}>
            <View style={[styles.userDetail]}>
              <Image
                style={[styles.imgAvatar]}
                source={require('../../assets/avatarimg.png')}
              />
              <Text style={[styles.imgText]}>Harriet_loves_to_grow_it</Text>
            </View>

            <Image
              style={[styles.postImg]}
              source={require('../../assets/profile.png')}
            />

            <View style={[styles.dateTime]}>
              <Text style={[styles.date]}>23 July 2020</Text>
              <Text>...</Text>
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
  searchInputContainer: {
    backgroundColor: colors.grey,
    justifyContent: 'center',
    borderRadius: 20,
    height: 46,
    paddingLeft: 15,
    paddingRight: 25,
    paddingTop: 25,
    paddingBottom: 25,
    flex: 1,
  },
  searchContainer: {
    marginTop: 55,
    marginHorizontal: 25,
  },
  flowercircle: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
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
})

export default Explore
