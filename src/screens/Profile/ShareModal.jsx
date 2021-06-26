import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheet } from 'react-native-btr';
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { deleteUserPosts } from '../../redux/actions/authActions'

import constants from '../../constants';

const { colors } = constants;

export const ShareModal = ({ showBottomSheet, setShowShare, post, Toast }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <BottomSheet
      visible={showBottomSheet}
      onBackdropPress={() => setShowShare(false)}
    >
      <View style={styles.bottomSheetItemWrapper}>
        <View style={styles.optionsContainer}>
          <View style={styles.optionItem}>
            <Text>Share to...</Text>
          </View>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => {
              setShowShare(false)
              navigation.navigate('Posts', {
                screen: 'posts-form',
                params: { post }
              })
            }}
          >
            <Text>Edit Post</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => {
              setShowShare(false)
              dispatch(deleteUserPosts(post?.id, Toast))
            }}
          >
            <Text style={{ color: colors.red, fontWeight: '500' }}>
              Delete Post
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.cancelBottomSheet}
          onPress={() => setShowShare(false)}
        >
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
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

export default ShareModal;
