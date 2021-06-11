import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { BottomSheet } from 'react-native-btr';
import { useDispatch, useSelector } from 'react-redux'

import { getUserFollowers } from '../../redux/actions/authActions'

import { Header, Input } from '../../components/';

import constants from '../../constants/';

const { colors } = constants;

const Followers = ({ navigation }) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.loading)
  const { followers } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUserFollowers())
  }, [])

  return (
    <View style={styles.container}>
      <Header
        title='Followers'
        onIconPress={() => navigation.goBack()}
        containerStyle={styles.headerStyle}
      />
      {loading
        ? (
          <ActivityIndicator
            color={colors.green}
            animating
            size="large"
          />
        ) : (
          <>
            <View style={styles.searchBarWrapper}>
              <Input
                placeholder='Search'
                containerStyle={styles.searchInputContainer}
                inputStyle={{ marginTop: -10, paddingRight: 10 }}
              >
                <EvilIcons
                  name='search'
                  size={24}
                  color={colors.blue}
                  style={{
                    right: 10,
                    top: '30%',
                    position: 'absolute',
                  }}
                />
              </Input>
              <TouchableOpacity style={styles.cancelContainer}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.main}>
              
              {followers?.map((item, index) => (
                <View style={styles.followItem} key={index}>
                  <Image source={{ uri: item.avatar }} style={styles.image} />
                  <Text style={styles.followItemText}>{item.fullname}</Text>
                </View>
              ))}
              <BottomSheet visible={showBottomSheet}>
                <View style={styles.bottomSheetItemWrapper}>
                  {/* <View style={styles.optionsContainer}>
              <View style={styles.optionItem}>
                <Text>Share to...</Text>
              </View>
              <View style={styles.optionItem}>
                <Text>Edit Post</Text>
              </View>
              <View style={styles.optionItem}>
                <Text style={{ color: colors.red, fontWeight: '500' }}>
                  Delete Post
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.cancelBottomSheet}>
              <Text>Cancel</Text>
            </TouchableOpacity> */}
                  <View style={styles.deleteConfirmation}>
                    <Text>Are you sure you want to delete your post</Text>
                  </View>
                  <View style={styles.deleteConfirmationOptions}>
                    <TouchableOpacity
                      style={{ ...styles.cancelBottomSheet, ...{ flex: 1 } }}
                    >
                      <Text>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        ...styles.cancelBottomSheet,
                        ...{
                          flex: 1,
                          marginLeft: 5,
                        },
                      }}
                    >
                      <Text style={{ color: colors.red, fontWeight: '500' }}>
                        Delete
                </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BottomSheet>
            </ScrollView>
          </>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerStyle: {
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
  },
  main: {
    paddingHorizontal: '5%',
    paddingTop: '5%',
    flex: 1,
  },
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
  image: {
    height: 41,
    width: 41,
    borderRadius: 20.5,
  },
  followItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  followItemText: {
    fontWeight: '500',
    marginLeft: 14,
  },
  cancelContainer: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelText: {
    color: colors.greyDark,
    fontWeight: '300',
  },
  // remove the following styling later...
  bottomSheetItemWrapper: {
    paddingHorizontal: '5%',
  },
  optionsContainer: {
    backgroundColor: colors.white,
    borderRadius: 13,
    borderBottomWidth: 0,
  },
  optionItem: {
    height: 55,
    borderBottomColor: colors.grey100,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBottomSheet: {
    backgroundColor: colors.white,
    borderRadius: 13,
    height: 60,
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteConfirmation: {
    backgroundColor: colors.white,
    borderRadius: 13,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteConfirmationOptions: {
    flexDirection: 'row',
  },
});

export default Followers;
